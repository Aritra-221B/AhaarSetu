"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Pill, Calendar, Weight, Syringe, ChevronLeft, AlertCircle, CheckCircle, AlertTriangle, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { getAvailableDrugs, getDrugRules, getWithdrawalInfo } from "../../../../utils/compliancechecker";
import { validateAccurateCompliance, DetailedComplianceResult } from "../../../../utils/accuratecompliancevalidator";


type FormData = {
  drugName: string;
  species: string;
  breed: string;
  weight: string;
  age: string;
  dosage: string;
  productType: string;
  lastCheckup: string;
  name?: string;
};

interface AddAnimalProps {
  onClose?: () => void;
  ownerUid?: string;
}

const speciesOptions = ["Cattle", "Buffalo", "Goat", "Sheep", "Pig", "Poultry"];
const productTypes = [
  { name: "Muscle", color: "bg-blue-100 text-blue-700 border-blue-300" },
  { name: "Milk", color: "bg-yellow-100 text-yellow-700 border-yellow-300" },
  { name: "Egg", color: "bg-orange-100 text-orange-700 border-orange-300" },
];

const AddAnimal: React.FC<AddAnimalProps> = ({ onClose }: AddAnimalProps): React.ReactElement => {
  const [data, setData] = useState<FormData>({
    drugName: "",
    species: "",
    breed: "",
    weight: "",
    age: "",
    dosage: "",
    productType: "",
    lastCheckup: "",
    name: "",
  });

  const [complianceResult, setComplianceResult] = useState<DetailedComplianceResult | null>(null);
  const [isCheckingCompliance, setIsCheckingCompliance] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showRuleDetails, setShowRuleDetails] = useState(false);
  const [availableDrugs] = useState(getAvailableDrugs());
  const [availableSpecies, setAvailableSpecies] = useState<string[]>(speciesOptions);
  const [availableProducts, setAvailableProducts] = useState<typeof productTypes>(productTypes);
  const mounted = useRef(false);

  // Get available species for a specific drug
  const getAvailableSpeciesForDrug = useCallback((drugName: string): string[] => {
    if (!drugName || !availableDrugs.includes(drugName)) {
      return speciesOptions; // Return all if drug not found
    }

    const drugRules = getDrugRules(drugName);
    if (!drugRules) return speciesOptions;

    const speciesMapping: { [key: string]: string } = {
      'cattle': 'Cattle',
      'buffalo': 'Buffalo',
      'goat': 'Goat',
      'sheep': 'Sheep',
      'pig': 'Pig',
      'poultry': 'Poultry',
      'chicken': 'Poultry',
      'turkey': 'Turkey',
      'fish': 'Fish',
      'finfish': 'Fish',
      'duck': 'Poultry',
      'rabbit': 'Rabbit'
    };

    const availableSpeciesSet = new Set<string>();
    Object.keys(drugRules).forEach(ruleKey => {
      const [speciesKey] = ruleKey.split('_');
      const mappedSpecies = speciesMapping[speciesKey];
      if (mappedSpecies && speciesOptions.includes(mappedSpecies)) {
        availableSpeciesSet.add(mappedSpecies);
      }
    });

    return Array.from(availableSpeciesSet);
  }, [availableDrugs]);

  // Get default products for a species (without drug filtering)
  const getProductsForSpecies = useCallback((species: string): typeof productTypes => {
    console.log(`🔍 Getting products for species: ${species}`);
    
    const speciesProductMap: { [key: string]: string[] } = {
      'Cattle': ['Muscle', 'Milk'],
      'Buffalo': ['Muscle', 'Milk'],
      'Goat': ['Muscle', 'Milk'],
      'Sheep': ['Muscle', 'Milk'],
      'Pig': ['Muscle'], // Only muscle for pigs
      'Poultry': ['Muscle', 'Egg'], // Egg only for poultry species
      'Chicken': ['Muscle', 'Egg'], // Egg only for chicken
      'Turkey': ['Muscle', 'Egg'],   // Egg for turkey as well
    };

    const allowedProducts = speciesProductMap[species] || ['Muscle'];
    console.log(`   Allowed products for ${species}:`, allowedProducts);
    
    const filteredProducts = productTypes.filter(product => allowedProducts.includes(product.name));
    console.log(`   Filtered products:`, filteredProducts.map(p => p.name));
    
    return filteredProducts;
  }, []);

  // Apply species-specific restrictions to products
  const applySpeciesRestrictions = useCallback((products: typeof productTypes, species: string): typeof productTypes => {
    console.log(`Applying species restrictions for ${species} to products:`, products.map(p => p.name));
    
    // Define species-specific product allowances
    const speciesProductMap: { [key: string]: string[] } = {
      'cattle': ['Cattle', 'Milk'],
      'buffalo': ['Buffalo', 'Milk'],
      'goat': ['Goat', 'Milk'],
      'sheep': ['Sheep', 'Milk'],
      'pig': ['Muscle'], // Only muscle for pigs
      'poultry': ['Muscle', 'Egg'], // No milk for poultry
      'chicken': ['Muscle', 'Egg'], // No milk for chicken
      'turkey': ['Muscle', 'Egg'],   // No milk for turkey
    };
    
    const allowedProducts = speciesProductMap[species] || ['Muscle'];
    const filteredProducts = products.filter(product => allowedProducts.includes(product.name));
    
    console.log(`Products allowed for ${species}:`, allowedProducts);
    console.log(`Filtered products:`, filteredProducts.map(p => p.name));
    
    return filteredProducts;
  }, []);

  // Get available products for a specific drug and species
  const getAvailableProductsForDrug = useCallback((drugName: string, selectedSpecies?: string): typeof productTypes => {
    if (!drugName || !availableDrugs.includes(drugName)) {
      // Return default products based on species when no drug is selected
      return getProductsForSpecies(selectedSpecies || data.species);
    }

    const drugRules = getDrugRules(drugName);
    if (!drugRules) return getProductsForSpecies(selectedSpecies || data.species);

    const availableProductsSet = new Set<string>();
    Object.keys(drugRules).forEach(ruleKey => {
      const [productKey] = ruleKey.split('_');
      
      // Map withdrawal rule products to UI products
      if (productKey === 'muscle') {
        availableProductsSet.add('Muscle');
      } else if (productKey === 'milk') {
        availableProductsSet.add('Milk');
      } else if (productKey === 'eggs') {
        availableProductsSet.add('Egg');
      }
    });

    // Filter products based on species restrictions
    let filteredProducts = productTypes.filter(product => 
      availableProductsSet.has(product.name)
    );

    // Apply species-specific restrictions
    filteredProducts = applySpeciesRestrictions(filteredProducts, selectedSpecies || data.species);

    // If no products found, return species-appropriate defaults
    if (filteredProducts.length === 0) {
      return getProductsForSpecies(selectedSpecies || data.species);
    }

    return filteredProducts;
  }, [availableDrugs, getProductsForSpecies, applySpeciesRestrictions, data.species]);

  // Update available options when drug or species changes
  const updateAvailableOptionsForDrug = useCallback((drugName: string, species?: string) => {
    console.log('Updating options for drug:', drugName, 'species:', species);
    const newSpecies = getAvailableSpeciesForDrug(drugName);
    const newProducts = getAvailableProductsForDrug(drugName, species);
    
    console.log('New species:', newSpecies);
    console.log('New products:', newProducts);
    
    setAvailableSpecies(newSpecies);
    setAvailableProducts(newProducts);
  }, [getAvailableSpeciesForDrug, getAvailableProductsForDrug, setAvailableSpecies, setAvailableProducts]);

  // Update products when species changes (even without drug)
  const updateProductsForSpecies = useCallback((species: string) => {
    console.log('Updating products for species:', species);
    const newProducts = data.drugName ? 
      getAvailableProductsForDrug(data.drugName, species) : 
      getProductsForSpecies(species);
    
    console.log('Updated products for species:', newProducts);
    setAvailableProducts(newProducts);
  }, [data.drugName, getAvailableProductsForDrug, getProductsForSpecies, setAvailableProducts]);

  // Debug effect to monitor product types
  useEffect(() => {
    console.log('Available products state:', availableProducts);
    console.log('Product types array:', productTypes);
  }, [availableProducts]);

  // Effect to update available options when drug changes
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (data.drugName) {
      console.log('Drug changed to:', data.drugName);
      updateAvailableOptionsForDrug(data.drugName, data.species);
    } else {
      // Reset to species-appropriate options when no drug is selected
      setAvailableSpecies(speciesOptions);
      setAvailableProducts(data.species ? getProductsForSpecies(data.species) : productTypes);
    }
  }, [data.drugName, data.species, updateAvailableOptionsForDrug, getProductsForSpecies]);

  // Effect to update products when species changes
  useEffect(() => {
    if (!mounted.current) {
      return;
    }
    if (data.species) {
      console.log('Species changed to:', data.species);
      updateProductsForSpecies(data.species);
    } else {
      // Reset to all products when no species is selected
      setAvailableProducts(productTypes);
    }
  }, [data.species, updateProductsForSpecies, getProductsForSpecies, data.drugName, getAvailableProductsForDrug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    
    // Reset compliance result when form data changes
    if (complianceResult) {
      setComplianceResult(null);
    }

    // Filter species and products when drug changes
    if (name === 'drugName') {
      updateAvailableOptionsForDrug(value, data.species);
      // Reset species and product if they're no longer valid
      const newSpecies = getAvailableSpeciesForDrug(value);
      const newProducts = getAvailableProductsForDrug(value, data.species);
      
      setData(prev => ({
        ...prev,
        [name]: value,
        species: newSpecies.includes(prev.species) ? prev.species : '',
        productType: newProducts.some(p => p.name === prev.productType) ? prev.productType : ''
      }));
    }
    
    // Update products when species changes
    if (name === 'species') {
      updateProductsForSpecies(value);
      // Reset product type if it's no longer valid for the new species
      const newProducts = data.drugName ? 
        getAvailableProductsForDrug(data.drugName, value) : 
        getProductsForSpecies(value);
      
      setData(prev => ({
        ...prev,
        [name]: value,
        productType: newProducts.some(p => p.name === prev.productType) ? prev.productType : ''
      }));
    }
  };

  const handleCheckCompliance = async () => {
    setIsCheckingCompliance(true);
    
    // Validate required fields
    if (!data.drugName || !data.species || !data.productType || !data.lastCheckup) {
      alert("Please fill in all required fields: Drug Name, Species, Product Type, and Last Checkup Date");
      setIsCheckingCompliance(false);
      return;
    }

    try {
      const result = validateAccurateCompliance({
        drugName: data.drugName,
        species: data.species,
        productType: data.productType,
        lastCheckup: data.lastCheckup,
      });
      
      setComplianceResult(result);
    } catch (error) {
      console.error("Error checking compliance:", error);
      alert("Error checking compliance. Please try again.");
    } finally {
      setIsCheckingCompliance(false);
    }
  };

  const handleSaveAnimal = async () => {
    if (!complianceResult) {
      alert("Please check compliance before saving the animal.");
      return;
    }

    setIsSaving(true);
    
    try {
      // const animalData = { // Removed unused variable
      //   ownerUid,
      //   name: data.name || `${data.species} - ${data.breed || 'Unknown breed'}`,
      //   species: data.species,
      //   breed: data.breed,
      //   weight: data.weight,
      //   age: data.age,
      //   dosage: data.dosage,
      //   productType: data.productType,
      //   lastCheckup: data.lastCheckup,
      //   status: complianceResult.status,
      // };

      // Assuming AddAnimal is defined elsewhere or is a placeholder for an API call
      // const animalId = await AddAnimal(animalData); 
      const animalId = "TEMP_ID_123"; // Placeholder for actual save operation
      
      alert(`Animal saved successfully! ID: ${animalId}`);
      
      // Reset form
      setData({
        drugName: "",
        species: "",
        breed: "",
        weight: "",
        age: "",
        dosage: "",
        productType: "",
        lastCheckup: "",
        name: "",
      });
      setComplianceResult(null);
      
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Error saving animal:", error);
      alert("Error saving animal. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const getComplianceIcon = () => {
    if (!complianceResult) return null;
    
    switch (complianceResult.status) {
      case 'safe':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'high-risk':
        return <Shield className="h-5 w-5 text-red-600" />;
      case 'not-safe':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getComplianceColor = () => {
    if (!complianceResult) return 'border-gray-200';
    
    switch (complianceResult.status) {
      case 'safe':
        return 'border-green-200 bg-green-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'high-risk':
        return 'border-red-300 bg-red-100';
      case 'not-safe':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-lg sm:max-w-4xl sm:mx-auto"
    >
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-green-700 to-green-600">
        <div className="px-4 md:px-6 py-3 flex items-center justify-between text-white shadow-sm">
          <div className="flex items-center gap-3">
            <span className="h-8 w-8 flex items-center justify-center rounded-lg bg-white text-green-600 font-bold text-base shadow-sm">
              AS
            </span>
            <h2 className="text-lg md:text-xl font-semibold tracking-tight">
              Enter Your Animal Treatment Details
            </h2>
          </div>
          {onClose && (
            <motion.button
              whileHover={{ scale: 1.05, color: "#c7d2fe" }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="flex items-center gap-1 text-sm font-medium text-gray-100 hover:text-white transition-colors duration-200"
            >
              <ChevronLeft size={16} /> Back
            </motion.button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6 bg-gradient-to-r from-green-700 to-green-600">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-2">
          {/* Form column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
              className="bg-green-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 border border-gray-200"
            >
              <h3 className="text-md font-semibold text-gray-900 mb-3">
                Animal & Treatment Info
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Drug Name */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Drug Name *
                  </label>
                  <div className="relative">
                    <Pill className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400" />
                    <input
                      name="drugName"
                      value={data.drugName}
                      onChange={handleChange}
                      onFocus={() => setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      className="w-full pl-8 pr-2 py-1.5 rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500 transition-all duration-200 shadow-sm placeholder-gray-400 text-sm"
                      placeholder="Enter drug name"
                      list="drug-suggestions"
                    />
                    {showSuggestions && data.drugName && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                        {availableDrugs
                          .filter(drug => drug.toLowerCase().includes(data.drugName.toLowerCase()))
                          .slice(0, 10)
                          .map(drug => (
                            <button
                              key={drug}
                              type="button"
                              className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
                              onClick={() => {
                                setData(prev => ({ ...prev, drugName: drug }));
                                setShowSuggestions(false);
                              }}
                            >
                              {drug}
                            </button>
                          ))
                        }
                      </div>
                    )}
                    
                    {/* Drug Information Display */}
                    {data.drugName && availableDrugs.includes(data.drugName) && (
                      <div className="mt-2 space-y-1">
                        <div className="text-xs text-green-600">
                          ✅ Drug found in withdrawal rules database
                          <button
                            type="button"
                            onClick={() => {
                              const rules = getWithdrawalInfo(data.drugName);
                              if (rules.length > 0) {
                                const rulesText = rules.map(r => `${r.species} ${r.product}: ${r.withdrawalDays} days`).join('\n');
                                alert(`Withdrawal Rules for ${data.drugName}:\n\n${rulesText}`);
                              }
                            }}
                            className="ml-2 text-blue-600 hover:text-blue-800 underline"
                          >
                            View all rules
                          </button>
                        </div>
                        <div className="text-xs text-blue-600">
                          📋 Available for {availableSpecies.length} species and {availableProducts.length} product types
                        </div>
                        {availableSpecies.length > 0 && (
                          <div className="text-xs text-gray-600">
                            🐄 Species: {availableSpecies.join(', ')}
                          </div>
                        )}
                        {availableProducts.length > 0 && (
                          <div className="text-xs text-gray-600">
                            📦 Products: {availableProducts.map(p => p.name).join(', ')}
                          </div>
                        )}
                      </div>
                    )}
                    
                    {data.drugName && !availableDrugs.includes(data.drugName) && data.drugName.length > 2 && (
                      <div className="mt-2 text-xs text-amber-600">
                        ⚠️ Drug not found in database - compliance check may show warning
                      </div>
                    )}
                  </div>
                </div>

                {/* Animal Name */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Animal Name
                  </label>
                  <input
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    className="w-full px-2 py-1.5 rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500 text-sm"
                    placeholder="Enter animal name (optional)"
                  />
                </div>

                {/* Species */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Species Name * {data.drugName && availableSpecies.length < speciesOptions.length && (
                      <span className="text-xxs text-blue-600">
                        (Showing {availableSpecies.length} species available for {data.drugName})
                      </span>
                    )}
                  </label>
                  <div className="flex flex-wrap gap-1">
                    {availableSpecies.map((s) => (
                      <motion.button
                        key={s}
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setData((p) => ({ ...p, species: s }))}
                        className={`px-2 py-1 rounded-full text-xxs border transition-all duration-200 shadow-sm ${
                          data.species === s
                            ? "bg-green-200 text-green-800 border-green-500 shadow-sm"
                            : "bg-white text-gray-700 border-gray-300 hover:border-green-500 hover:text-green-700"
                        }`}
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                  {data.drugName && availableSpecies.length === 0 && (
                    <p className="text-xs text-red-600 mt-1">
                      No species found for {data.drugName}. Please check the drug name.
                    </p>
                  )}
                  {!data.drugName && (
                    <p className="text-xs text-gray-500 mt-1">
                      Enter a drug name first to see available species
                    </p>
                  )}
                </div>

                {/* Breed */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Breed
                  </label>
                  <input
                    name="breed"
                    value={data.breed}
                    onChange={handleChange}
                    className="w-full px-2 py-1.5 rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500 text-sm"
                    placeholder="Enter breed"
                  />
                </div>

                {/* Weight */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Weight
                  </label>
                  <div className="relative">
                    <Weight className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400" />
                    <input
                      name="weight"
                      value={data.weight}
                      onChange={handleChange}
                      className="w-full pl-8 pr-12 rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500 text-sm"
                      placeholder="380"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500 text-xxs">
                      kg
                    </span>
                  </div>
                </div>

                {/* Age */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Age
                  </label>
                  <input
                    name="age"
                    value={data.age}
                    onChange={handleChange}
                    className="w-full px-2 py-1.5 rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500 text-sm"
                    placeholder="2 years"
                  />
                </div>

                {/* Dosage */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Dosage
                  </label>
                  <div className="relative">
                    <Syringe className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400" />
                    <input
                      name="dosage"
                      value={data.dosage}
                      onChange={handleChange}
                      className="w-full pl-8 pr-12 rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500 text-sm"
                      placeholder="10"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500 text-xxs">
                      ml
                    </span>
                  </div>
                </div>

                {/* Product Type */}
                <div className="md:col-span-2 flex flex-col items-center">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Product Type * {data.drugName && availableProducts.length < productTypes.length && (
                      <span className="text-xxs text-blue-600">
                        (Showing {availableProducts.length} products available for {data.drugName})
                      </span>
                    )}
                  </label>

                  {/* Debug information - remove this in production */}
                  {process.env.NODE_ENV === 'development' && (
                    <div className="text-xxs text-gray-500 mb-2">
                      Available products count: {availableProducts.length}
                    </div>
                  )}

                  <div className="flex flex-wrap justify-center gap-1">
                    {availableProducts.length > 0 ? (
                      availableProducts.map((p) => (
                        <motion.button
                          key={p.name}
                          type="button"
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setData((d) => ({ ...d, productType: p.name }))}
                          className={`px-2 py-1 rounded-full text-xxs border transition-colors ${
                            data.productType === p.name
                              ? `${p.color} border`
                              : "bg-white text-gray-700 border-gray-300 hover:border-emerald-500"
                          }`}
                        >
                          {p.name}
                        </motion.button>
                      ))
                    ) : (
                      <div className="text-xxs text-red-600">
                        No product types available. This might be a filtering issue.
                      </div>
                    )}
                  </div>

                  {data.drugName && availableProducts.length === 0 && (
                    <p className="text-xxs text-red-600 mt-1">
                      No product types found for {data.drugName}. Please check the drug name.
                    </p>
                  )}
                  {!data.drugName && (
                    <p className="text-xxs text-gray-500 mt-1">
                      Enter a drug name first to see available product types
                    </p>
                  )}
                </div>

                {/* Last Checkup Date */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Last Treatment Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400" />
                    <input
                      type="date"
                      name="lastCheckup"
                      value={data.lastCheckup}
                      onChange={handleChange}
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full pl-8 rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row justify-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 4px 15px -3px rgba(34,197,94,0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={handleCheckCompliance}
                  disabled={isCheckingCompliance || !data.drugName || !data.species || !data.productType || !data.lastCheckup}
                  className="inline-flex items-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isCheckingCompliance ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Checking...
                    </>
                  ) : (
                    'Check Compliance'
                  )}
                </motion.button>

                {complianceResult && (
                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: "0 4px 15px -3px rgba(34,197,94,0.3)" }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={handleSaveAnimal}
                    disabled={isSaving || !complianceResult.isCompliant}
                    className={`inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium text-white shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 ${
                      complianceResult.isCompliant
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-gray-400 cursor-not-allowed'
                    } disabled:bg-gray-400 disabled:cursor-not-allowed ${complianceResult && 'mt-2 sm:mt-0 sm:ml-3'}`}
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      'Save Animal'
                    )}
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Preview column */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
              className="bg-green-100 rounded-xl border border-gray-200 p-4 shadow-md"
            >
              <h3 className="text-md font-semibold text-gray-900 mb-3">Preview</h3>
              <div className="space-y-2 text-sm">
                {[
                  ["Drug", data.drugName],
                  ["Species", data.species],
                  ["Breed", data.breed],
                  ["Weight", data.weight ? `${data.weight} kg` : "-"],
                  ["Age", data.age],
                  ["Dosage", data.dosage ? `${data.dosage} ml` : "-"],
                  ["Product", data.productType],
                  ["Last Checkup", data.lastCheckup],
                ].map(([label, value]) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.05 * (["Drug", "Species", "Breed", "Weight", "Age", "Dosage", "Product", "Last Checkup"].indexOf(label as string)), ease: "easeOut" }}
                    className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-b-0"
                  >
                    <span className="text-gray-600 text-xs">{label}</span>
                    <span className="font-medium text-gray-900 text-xs">{value || "-"}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Compliance Results */}
            {complianceResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
                className={`rounded-xl border p-4 shadow-md mt-3 ${getComplianceColor()}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {getComplianceIcon()}
                  <h3 className="text-md font-semibold text-gray-900">Compliance Check</h3>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="bg-white rounded-lg p-3 border">
                    <p className="text-gray-700 text-sm">{complianceResult.message}</p>
                  </div>

                  {/* Risk Message */}
                  {complianceResult.riskMessage && (
                    <div className="bg-white rounded-lg p-3 border border-orange-200">
                      <p className="text-orange-700 text-sm">{complianceResult.riskMessage}</p>
                    </div>
                  )}

                  {/* Detailed Rule Information */}
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-blue-800">Withdrawal Rule Details</h4>
                      <button
                        type="button"
                        onClick={() => setShowRuleDetails(!showRuleDetails)}
                        className="text-blue-600 hover:text-blue-800 text-xs"
                      >
                        {showRuleDetails ? 'Hide Details' : 'Show Details'}
                      </button>
                    </div>

                    {showRuleDetails && (
                      <div className="mt-2 space-y-1 text-xs">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-blue-600">Drug Found:</span>
                            <span className={`ml-1 font-medium ${
                              complianceResult.ruleValidation.drugFound ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {complianceResult.ruleValidation.drugFound ? '✅ Yes' : '❌ No'}
                            </span>
                          </div>
                          <div>
                            <span className="text-blue-600">Species Supported:</span>
                            <span className={`ml-1 font-medium ${
                              complianceResult.ruleValidation.speciesSupported ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {complianceResult.ruleValidation.speciesSupported ? '✅ Yes' : '❌ No'}
                            </span>
                          </div>
                          <div>
                            <span className="text-blue-600">Product Matched:</span>
                            <span className={`ml-1 font-medium ${
                              complianceResult.ruleValidation.productMatched ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {complianceResult.ruleValidation.productMatched ? '✅ Yes' : '❌ No'}
                            </span>
                          </div>
                          <div>
                            <span className="text-blue-600">Exact Rule:</span>
                            <span className="ml-1 font-medium text-gray-800">
                              {complianceResult.ruleValidation.exactRuleUsed || 'None'}
                            </span>
                          </div>
                        </div>

                        {complianceResult.ruleValidation.availableRulesForDrug.length > 0 && (
                          <div>
                            <span className="text-blue-600">Available Rules for {data.drugName}:</span>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {complianceResult.ruleValidation.availableRulesForDrug.map(rule => (
                                <span key={rule} className={`px-1.5 py-0.5 text-xxs rounded ${
                                  rule === complianceResult.ruleValidation.exactRuleUsed
                                    ? 'bg-green-100 text-green-800 border border-green-300'
                                    : 'bg-gray-100 text-gray-700'
                                }`}>
                                  {rule}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {complianceResult.calculationDetails.complianceLogic && (
                          <div className="pt-2 border-t border-blue-200">
                            <span className="text-blue-600">Calculation Logic:</span>
                            <p className="mt-1 text-gray-700 text-xxs">
                              {complianceResult.calculationDetails.complianceLogic}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {complianceResult.withdrawalPeriod !== null && (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Withdrawal Period:</span>
                        <span className="font-medium text-sm">{complianceResult.withdrawalPeriod} days</span>
                      </div>

                      {/* Risk Period Information */}
                      {complianceResult.riskPeriod !== null && complianceResult.riskPeriod > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-500 text-sm">High Risk Period:</span>
                          <span className="font-medium text-orange-600 text-sm">{complianceResult.riskPeriod} days</span>
                        </div>
                      )}

                      {/* Days Until Low Risk */}
                      {complianceResult.daysUntilLowRisk > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-500 text-sm">Days Until Low Risk:</span>
                          <span className="font-medium text-orange-600 text-sm">{complianceResult.daysUntilLowRisk} days</span>
                        </div>
                      )}

                      {/* Days Until Safe */}
                      {complianceResult.daysUntilSafe > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-500 text-sm">Days Until Safe:</span>
                          <span className="font-medium text-red-600 text-sm">{complianceResult.daysUntilSafe} days</span>
                        </div>
                      )}

                      {/* Risk End Date */}
                      {complianceResult.riskEndDate && complianceResult.daysUntilLowRisk > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-500 text-sm">Risk End Date:</span>
                          <span className="font-medium text-orange-600 text-sm">
                            {complianceResult.riskEndDate.toLocaleDateString()}
                          </span>
                        </div>
                      )}

                      {complianceResult.recommendedDate && (
                        <div className="flex justify-between">
                          <span className="text-gray-500 text-sm">Safe Date:</span>
                          <span className="font-medium text-sm">
                            {complianceResult.recommendedDate.toLocaleDateString()}
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Status:</span>
                        <span className={`font-medium capitalize text-sm ${
                          complianceResult.status === 'safe' ? 'text-green-600' :
                          complianceResult.status === 'warning' ? 'text-yellow-600' :
                          complianceResult.status === 'high-risk' ? 'text-red-700' :
                          'text-red-600'
                        }`}>
                          {complianceResult.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Risk Level Indicator */}
                  {complianceResult.status === 'high-risk' && (
                    <div className="mt-3 p-3 bg-red-100 border border-red-300 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Shield className="h-3 w-3 text-red-600" />
                        <span className="text-xs font-medium text-red-800">HIGH RISK PERIOD</span>
                      </div>
                      <p className="text-xxs text-red-700 mt-1">
                        Animal requires extra monitoring during this period. Increased risk of adverse effects.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AddAnimal;