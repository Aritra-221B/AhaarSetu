// accurateComplianceValidator.ts - Enhanced compliance validation with detailed rule matching

import { withdrawal_rules } from '../data/withdrawal_rules';
import { checkCompliance, ComplianceResult, AnimalData } from './compliancechecker';

export interface DetailedComplianceResult extends ComplianceResult {
  ruleValidation: {
    drugFound: boolean;
    speciesSupported: boolean;
    productMatched: boolean;
    exactRuleUsed: string | null;
    availableRulesForDrug: string[];
    alternativeRules: string[];
  };
  calculationDetails: {
    daysSinceTreatment: number;
    withdrawalPeriodUsed: number | null;
    riskPeriodCalculated: number | null;
    complianceLogic: string;
  };
}

/**
 * Enhanced compliance checker with detailed validation and rule tracking
 */
export function validateAccurateCompliance(animalData: AnimalData): DetailedComplianceResult {
  const basicResult = checkCompliance(animalData);
  const { drugName, species, productType, lastCheckup } = animalData;

  // Initialize detailed tracking
  const ruleValidation = {
    drugFound: false,
    speciesSupported: false,
    productMatched: false,
    exactRuleUsed: null as string | null,
    availableRulesForDrug: [] as string[],
    alternativeRules: [] as string[],
  };

  const calculationDetails = {
    daysSinceTreatment: 0,
    withdrawalPeriodUsed: null as number | null,
    riskPeriodCalculated: null as number | null,
    complianceLogic: '',
  };

  // Calculate days since treatment
  if (lastCheckup) {
    const lastTreatmentDate = new Date(lastCheckup);
    const currentDate = new Date();
    calculationDetails.daysSinceTreatment = Math.floor(
      (currentDate.getTime() - lastTreatmentDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  // Check if drug exists in withdrawal rules
  const normalizedDrugName = Object.keys(withdrawal_rules).find(
    drug => drug.toLowerCase() === drugName.toLowerCase()
  );

  if (normalizedDrugName) {
    ruleValidation.drugFound = true;
    const drugRules = withdrawal_rules[normalizedDrugName];
    ruleValidation.availableRulesForDrug = Object.keys(drugRules);

    // Map species and product type
    const speciesMapping: { [key: string]: string } = {
      'Cattle': 'cattle',
      'Buffalo': 'cattle',
      'Goat': 'goat',
      'Sheep': 'sheep',
      'Pig': 'pig',
      'Poultry': 'chicken',
      'Chicken': 'chicken',
      'Turkey': 'turkey',
      'Fish': 'fish',
      'Finfish': 'finfish',
    };

    const productMapping: { [key: string]: string } = {
      'Muscle': 'muscle',
      'Milk': 'milk', 
      'Egg': 'eggs',
    };

    const mappedSpecies = speciesMapping[species];
    const mappedProduct = productMapping[productType];
    
    if (mappedSpecies) {
      ruleValidation.speciesSupported = true;
      
      // Find exact rule match using the mapped product type
      if (mappedProduct) {
        const key = `${mappedSpecies}_${mappedProduct}`;
        if (drugRules[key] !== undefined) {
          ruleValidation.productMatched = true;
          ruleValidation.exactRuleUsed = key;
          calculationDetails.withdrawalPeriodUsed = drugRules[key];
        } else {
          // If specific product not found, try fallback to muscle for non-specific cases
          const fallbackKey = `${mappedSpecies}_muscle`;
          if (drugRules[fallbackKey] !== undefined && mappedProduct !== 'milk' && mappedProduct !== 'eggs') {
            ruleValidation.productMatched = true;
            ruleValidation.exactRuleUsed = fallbackKey;
            calculationDetails.withdrawalPeriodUsed = drugRules[fallbackKey];
          }
        }
      }

      // Find alternative rules for the same species
      ruleValidation.alternativeRules = Object.keys(drugRules).filter(
        key => key.startsWith(mappedSpecies + '_')
      );
    }
  }

  // Calculate risk period if withdrawal period is found
  if (calculationDetails.withdrawalPeriodUsed !== null) {
    const withdrawalPeriod = calculationDetails.withdrawalPeriodUsed;
    calculationDetails.riskPeriodCalculated = withdrawalPeriod === 0 ? 0 : Math.max(3, Math.ceil(withdrawalPeriod * 0.5));

    // Determine compliance logic
    const daysSince = calculationDetails.daysSinceTreatment;
    const riskPeriod = calculationDetails.riskPeriodCalculated;

    if (withdrawalPeriod === 0) {
      calculationDetails.complianceLogic = 'PROHIBITED: Zero withdrawal period means substance is banned';
    } else if (daysSince >= withdrawalPeriod) {
      calculationDetails.complianceLogic = `SAFE: ${daysSince} days >= ${withdrawalPeriod} days withdrawal period`;
    } else if (daysSince >= riskPeriod) {
      calculationDetails.complianceLogic = `NOT SAFE: ${daysSince} days >= ${riskPeriod} days risk period but < ${withdrawalPeriod} days withdrawal`;
    } else {
      calculationDetails.complianceLogic = `HIGH RISK: ${daysSince} days < ${riskPeriod} days risk period`;
    }
  }

  return {
    ...basicResult,
    ruleValidation,
    calculationDetails,
  };
}

/**
 * Validates that the compliance checker is using withdrawal rules accurately
 */
export function auditComplianceAccuracy(): {
  totalDrugs: number;
  totalRules: number;
  rulesBySpecies: { [species: string]: number };
  rulesByProduct: { [product: string]: number };
  prohibitedSubstances: string[];
  longWithdrawalDrugs: Array<{ drug: string; rule: string; days: number }>;
} {
  const totalDrugs = Object.keys(withdrawal_rules).length;
  let totalRules = 0;
  const rulesBySpecies: { [species: string]: number } = {};
  const rulesByProduct: { [product: string]: number } = {};
  const prohibitedSubstances: string[] = [];
  const longWithdrawalDrugs: Array<{ drug: string; rule: string; days: number }> = [];

  Object.entries(withdrawal_rules).forEach(([drug, rules]) => {
    Object.entries(rules).forEach(([key, days]) => {
      totalRules++;
      
      const [species, product] = key.split('_');
      rulesBySpecies[species] = (rulesBySpecies[species] || 0) + 1;
      rulesByProduct[product] = (rulesByProduct[product] || 0) + 1;

      if (days === 0) {
        prohibitedSubstances.push(`${drug} (${key})`);
      }

      if (days >= 30) {
        longWithdrawalDrugs.push({ drug, rule: key, days });
      }
    });
  });

  return {
    totalDrugs,
    totalRules,
    rulesBySpecies,
    rulesByProduct,
    prohibitedSubstances,
    longWithdrawalDrugs: longWithdrawalDrugs.sort((a, b) => b.days - a.days),
  };
}

/**
 * Tests compliance accuracy with known scenarios
 */
export function testComplianceAccuracy(): {
  testResults: Array<{
    scenario: string;
    input: AnimalData;
    result: DetailedComplianceResult;
    expectedStatus: string;
    passed: boolean;
  }>;
  summary: {
    totalTests: number;
    passed: number;
    failed: number;
  };
} {
  const testScenarios: Array<{
    scenario: string;
    input: AnimalData;
    expectedStatus: 'safe' | 'warning' | 'not-safe' | 'high-risk';
  }> = [
    {
      scenario: 'Amoxicillin cattle muscle - old treatment (should be safe)',
      input: {
        drugName: 'Amoxicillin',
        species: 'Cattle',
        productType: 'Muscle',
        lastCheckup: '2024-01-01'
      },
      expectedStatus: 'safe'
    },
    {
      scenario: 'Amoxicillin cattle milk - recent treatment (should be high-risk)',
      input: {
        drugName: 'Amoxicillin',
        species: 'Cattle',
        productType: 'Milk',
        lastCheckup: new Date().toISOString().split('T')[0]
      },
      expectedStatus: 'high-risk'
    },
    {
      scenario: 'Erythromycin chicken egg - specific egg rule',
      input: {
        drugName: 'Erythromycin',
        species: 'Chicken',
        productType: 'Egg',
        lastCheckup: '2024-01-01'
      },
      expectedStatus: 'safe'
    },
    {
      scenario: 'Clenbuterol cattle muscle - prohibited substance',
      input: {
        drugName: 'Clenbuterol',
        species: 'Cattle',
        productType: 'Muscle',
        lastCheckup: '2024-01-01'
      },
      expectedStatus: 'not-safe'
    },
    {
      scenario: 'Unknown drug - should warn',
      input: {
        drugName: 'UnknownDrug',
        species: 'Cattle',
        productType: 'Muscle',
        lastCheckup: '2024-01-01'
      },
      expectedStatus: 'warning'
    },
    {
      scenario: 'Ivermectin cattle muscle - long withdrawal period',
      input: {
        drugName: 'Ivermectin',
        species: 'Cattle',
        productType: 'Muscle',
        lastCheckup: '2024-01-01'
      },
      expectedStatus: 'safe'
    }
  ];

  const testResults = testScenarios.map(({ scenario, input, expectedStatus }) => {
    const result = validateAccurateCompliance(input);
    const passed = result.status === expectedStatus;
    
    return {
      scenario,
      input,
      result,
      expectedStatus,
      passed
    };
  });

  const summary = {
    totalTests: testResults.length,
    passed: testResults.filter(t => t.passed).length,
    failed: testResults.filter(t => !t.passed).length
  };

  return { testResults, summary };
}