// complianceChecker.ts

import { withdrawal_rules } from '../data/withdrawal_rules';

export interface ComplianceResult {
  isCompliant: boolean;
  status: 'safe' | 'warning' | 'not-safe' | 'high-risk';
  withdrawalPeriod: number | null;
  riskPeriod: number | null;
  message: string;
  riskMessage?: string;
  productKey: string | null;
  recommendedDate: Date | null;
  riskEndDate: Date | null;
  daysUntilSafe: number;
  daysUntilLowRisk: number;
}

export interface AnimalData {
  drugName: string;
  species: string;
  productType: string;
  lastCheckup: string; // Date string
}

/**
 * Maps species names to the format used in withdrawal rules
 */
const speciesMapping: { [key: string]: string } = {
  'Cattle': 'cattle',
  'Buffalo': 'cattle', // Buffalo rules often follow cattle rules
  'Goat': 'goat',
  'Sheep': 'sheep',
  'Pig': 'pig',
  'Poultry': 'chicken', // General poultry maps to chicken
  'Chicken': 'chicken',
  'Turkey': 'turkey',
  'Fish': 'fish',
  'Finfish': 'finfish',
};

/**
 * Maps product types to the format used in withdrawal rules
 */
const productMapping: { [key: string]: string } = {
  'Muscle': 'muscle',
  'Milk': 'milk',
  'Egg': 'eggs',
};

/**
 * Calculates risk period based on withdrawal period
 * Risk period is typically 50% of withdrawal period or minimum 3 days
 */
function calculateRiskPeriod(withdrawalPeriod: number): number {
  if (withdrawalPeriod === 0) return 0; // No risk period for prohibited substances
  return Math.max(3, Math.ceil(withdrawalPeriod * 0.5));
}

/**
 * Checks compliance for an animal treatment based on withdrawal rules
 */
export function checkCompliance(animalData: AnimalData): ComplianceResult {
  const { drugName, species, productType, lastCheckup } = animalData;

  // Validate input data
  if (!drugName || !species || !productType || !lastCheckup) {
    return {
      isCompliant: false,
      status: 'not-safe',
      withdrawalPeriod: null,
      riskPeriod: null,
      message: 'Missing required information for compliance check',
      productKey: null,
      recommendedDate: null,
      riskEndDate: null,
      daysUntilSafe: 0,
      daysUntilLowRisk: 0,
    };
  }

  // Normalize drug name for lookup (case-insensitive)
  const normalizedDrugName = Object.keys(withdrawal_rules).find(
    drug => drug.toLowerCase() === drugName.toLowerCase()
  );

  if (!normalizedDrugName) {
    return {
      isCompliant: false,
      status: 'warning',
      withdrawalPeriod: null,
      riskPeriod: null,
      message: `Drug "${drugName}" not found in withdrawal rules database. Please consult a veterinarian for guidance.`,
      productKey: null,
      recommendedDate: null,
      riskEndDate: null,
      daysUntilSafe: 0,
      daysUntilLowRisk: 0,
    };
  }

  // Get species mapping
  const mappedSpecies = speciesMapping[species];
  if (!mappedSpecies) {
    return {
      isCompliant: false,
      status: 'warning',
      withdrawalPeriod: null,
      riskPeriod: null,
      message: `Species "${species}" not supported in current withdrawal rules.`,
      productKey: null,
      recommendedDate: null,
      riskEndDate: null,
      daysUntilSafe: 0,
      daysUntilLowRisk: 0,
    };
  }

  // Get mapped product type
  const mappedProduct = productMapping[productType];
  if (!mappedProduct) {
    return {
      isCompliant: false,
      status: 'warning',
      withdrawalPeriod: null,
      riskPeriod: null,
      message: `Product type "${productType}" not supported in current withdrawal rules.`,
      productKey: null,
      recommendedDate: null,
      riskEndDate: null,
      daysUntilSafe: 0,
      daysUntilLowRisk: 0,
    };
  }
  
  // Find the applicable withdrawal rule
  const drugRules = withdrawal_rules[normalizedDrugName];
  let withdrawalPeriod: number | null = null;
  let productKey: string | null = null;

  // Try to find a matching rule for the species and product combination
  const key = `${mappedSpecies}_${mappedProduct}`;
  if (drugRules[key] !== undefined) {
    withdrawalPeriod = drugRules[key];
    productKey = key;
  } else {
    // If no specific rule found and it's not milk or eggs, try muscle as fallback
    if (mappedProduct !== 'milk' && mappedProduct !== 'eggs') {
      const fallbackKey = `${mappedSpecies}_muscle`;
      if (drugRules[fallbackKey] !== undefined) {
        withdrawalPeriod = drugRules[fallbackKey];
        productKey = fallbackKey;
      }
    }
  }

  if (withdrawalPeriod === null) {
    return {
      isCompliant: false,
      status: 'warning',
      withdrawalPeriod: null,
      riskPeriod: null,
      message: `No specific withdrawal rule found for ${drugName} in ${species}. Please consult a veterinarian.`,
      productKey: null,
      recommendedDate: null,
      riskEndDate: null,
      daysUntilSafe: 0,
      daysUntilLowRisk: 0,
    };
  }

  // Calculate risk period
  const riskPeriod = calculateRiskPeriod(withdrawalPeriod);

  // Calculate compliance based on last treatment date
  const lastTreatmentDate = new Date(lastCheckup);
  const currentDate = new Date();
  const daysSinceLastTreatment = Math.floor(
    (currentDate.getTime() - lastTreatmentDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Calculate recommended safe date and risk end date
  const recommendedDate = new Date(lastTreatmentDate);
  recommendedDate.setDate(recommendedDate.getDate() + withdrawalPeriod);
  
  const riskEndDate = new Date(lastTreatmentDate);
  riskEndDate.setDate(riskEndDate.getDate() + riskPeriod);

  // Calculate days until safe and low risk
  const daysUntilSafe = Math.max(0, withdrawalPeriod - daysSinceLastTreatment);
  const daysUntilLowRisk = Math.max(0, riskPeriod - daysSinceLastTreatment);

  // Determine compliance status
  let status: 'safe' | 'warning' | 'not-safe' | 'high-risk';
  let message: string;
  let riskMessage: string = '';
  let isCompliant: boolean;

  if (withdrawalPeriod === 0) {
    // Zero withdrawal period means the substance is prohibited
    status = 'not-safe';
    isCompliant = false;
    message = `⚠ BANNED: ${drugName} is not allowed in ${species}. Products are NOT SAFE for consumption. Zero Tolerance`;
  } else if (daysSinceLastTreatment >= withdrawalPeriod) {
    // Safe - withdrawal period has passed
    status = 'safe';
    isCompliant = true;
    message = `✅ SAFE: Withdrawal period of ${withdrawalPeriod} days has been completed. Products are safe for consumption.`;
  } else if (daysSinceLastTreatment >= riskPeriod) {
    // In withdrawal period but past high-risk period
    status = 'not-safe';
    isCompliant = false;
    const remainingDays = withdrawalPeriod - daysSinceLastTreatment;
    message = `⚠ NOT SAFE: ${remainingDays} more days required before products are safe for consumption.`;
    riskMessage = `ℹ LOW RISK: Past high-risk period. Monitor closely but risk of adverse effects is reduced.`;
  } else {
    // High-risk period - still within risk period
    status = 'high-risk';
    isCompliant = false;
    const remainingRiskDays = riskPeriod - daysSinceLastTreatment;
    const remainingSafeDays = withdrawalPeriod - daysSinceLastTreatment;
    message = `🚨 HIGH RISK: ${remainingSafeDays} days until safe for consumption.`;
    riskMessage = `⚠ HIGH RISK PERIOD: ${remainingRiskDays} more days of elevated risk. Extra monitoring required.`;
  }

  return {
    isCompliant,
    status,
    withdrawalPeriod,
    riskPeriod,
    message,
    riskMessage,
    productKey,
    recommendedDate,
    riskEndDate,
    daysUntilSafe,
    daysUntilLowRisk,
  };
}

/**
 * Gets all available drugs in the withdrawal rules database
 */
export function getAvailableDrugs(): string[] {
  return Object.keys(withdrawal_rules).sort();
}

/**
 * Gets withdrawal rules for a specific drug
 */
export function getDrugRules(drugName: string): { [animal_product: string]: number } | null {
  const normalizedDrugName = Object.keys(withdrawal_rules).find(
    drug => drug.toLowerCase() === drugName.toLowerCase()
  );
  
  return normalizedDrugName ? withdrawal_rules[normalizedDrugName] : null;
}

/**
 * Gets formatted withdrawal information for display
 */
export function getWithdrawalInfo(drugName: string): Array<{
  species: string;
  product: string;
  withdrawalDays: number;
}> {
  const rules = getDrugRules(drugName);
  if (!rules) return [];

  return Object.entries(rules).map(([key, days]) => {
    const [species, product] = key.split('_');
    return {
      species: species.charAt(0).toUpperCase() + species.slice(1),
      product: product.charAt(0).toUpperCase() + product.slice(1),
      withdrawalDays: days,
    };
  });
}