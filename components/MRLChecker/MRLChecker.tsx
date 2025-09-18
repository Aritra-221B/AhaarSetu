"use client";

import React, { useState } from "react";
import { Pill, Calendar, Weight, Syringe, FlaskConical, Stethoscope, AlertTriangle, CheckCircle, XCircle, Feather } from "lucide-react";
import { motion } from "framer-motion";

type FormData = {
  drugName: string;
  species: string;
  breed: string;
  weight: string;
  age: string;
  dosage: string;
  productType: string;
  lastCheckup: string;
};

type ComplianceResult = {
  status: "Compliant" | "Under Observation" | "Not Safe" | null;
  message: string;
};

const speciesOptions = ["Cattle", "Buffalo", "Goat", "Sheep", "Pig", "Poultry"];
const productTypes = [
  { name: "Muscle", color: "bg-blue-500 text-white", hover: "hover:bg-blue-600" },
  { name: "Egg", color: "bg-yellow-500 text-white", hover: "hover:bg-yellow-600" },
  { name: "Milk", color: "bg-purple-500 text-white", hover: "hover:bg-purple-600" },
];

export default function MRLChecker(): React.ReactElement {
  const [formData, setFormData] = useState<FormData>({
    drugName: "",
    species: "",
    breed: "",
    weight: "",
    age: "",
    dosage: "",
    productType: "",
    lastCheckup: "",
  });

  const [complianceResult, setComplianceResult] = useState<ComplianceResult | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductTypeChange = (type: string) => {
    setFormData((prev) => ({ ...prev, productType: type }));
  };

  const checkCompliance = () => {
    // Mock compliance rules
    let status: ComplianceResult["status"] = null;
    let message: string = "";

    if (!formData.drugName || !formData.species || !formData.productType) {
      status = "Not Safe";
      message = "Please fill in all required fields to check compliance.";
    } else if (formData.productType === "Antibiotic" && parseFloat(formData.dosage) > 10) {
      status = "Under Observation";
      message = "High dosage of antibiotic detected. Requires further observation.";
    } else if (formData.drugName.toLowerCase().includes("withdrawal") || formData.productType === "Antiparasitic") {
      status = "Under Observation";
      message = "Withdrawal period might be applicable. Verify product safety before consumption.";
    } else {
      status = "Compliant";
      message = "The animal is currently compliant based on available information.";
    }

    setComplianceResult({ status, message });
  };

  const getStatusColor = (status: ComplianceResult["status"]) => {
    switch (status) {
      case "Compliant":
        return "bg-gradient-to-r from-green-400 to-emerald-500 text-white";
      case "Under Observation":
        return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white";
      case "Not Safe":
        return "bg-gradient-to-r from-red-500 to-rose-600 text-white";
      default:
        return "bg-gray-100 border-gray-300 text-gray-700";
    }
  };

  const getStatusIcon = (status: ComplianceResult["status"]) => {
    switch (status) {
      case "Compliant":
        return <CheckCircle className="text-white" size={28} />;
      case "Under Observation":
        return <AlertTriangle className="text-white" size={28} />;
      case "Not Safe":
        return <XCircle className="text-white" size={28} />;
      default:
        return <FlaskConical className="text-gray-500" size={24} />;
    }
  };

  const getPreviewIcon = (label: string) => {
    switch (label) {
      case "Drug":
        return <Pill size={16} className="text-gray-400" />;
      case "Species":
        return <Stethoscope size={16} className="text-gray-400" />;
      case "Breed":
        return <Feather size={16} className="text-gray-400" />;
      case "Weight":
        return <Weight size={16} className="text-gray-400" />;
      case "Age":
        return <Calendar size={16} className="text-gray-400" />;
      case "Dosage":
        return <Syringe size={16} className="text-gray-400" />;
      case "Product Type":
        return <FlaskConical size={16} className="text-gray-400" />;
      case "Last Checkup":
        return <Calendar size={16} className="text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-700 via-green-500 to-green-300 p-4 pt-[12vh]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-green-50 text-center mb-10 drop-shadow-sm">MRL Compliance Checker</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border-b-4 border-green-500">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200">Animal & Treatment Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Drug Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Drug Name</label>
                  <div className="relative">
                    <Pill className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      name="drugName"
                      value={formData.drugName}
                      onChange={handleChange}
                      className="w-full pl-9 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition duration-200"
                      placeholder="Enter drug name"
                    />
                  </div>
                </div>

                {/* Species */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Species</label>
                  <div className="flex flex-wrap gap-2">
                    {speciesOptions.map((s) => (
                      <motion.button
                        key={s}
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFormData((p) => ({ ...p, species: s }))}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 
                          ${formData.species === s
                            ? "bg-teal-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-teal-50 hover:border-teal-400"
                        }`}
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Breed */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
                  <input
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition duration-200"
                    placeholder="Enter breed"
                  />
                </div>

                {/* Weight */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                  <div className="relative">
                    <Weight className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      className="w-full pl-9 pr-14 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition duration-200"
                      placeholder="e.g., 450"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 text-sm">
                      kg
                    </span>
                  </div>
                </div>

                {/* Age */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition duration-200"
                    placeholder="e.g., 3 years"
                  />
                </div>

                {/* Dosage */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                  <div className="relative">
                    <Syringe className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      name="dosage"
                      value={formData.dosage}
                      onChange={handleChange}
                      className="w-full pl-9 pr-14 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition duration-200"
                      placeholder="e.g., 10"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 text-sm">
                      ml
                    </span>
                  </div>
                </div>

                {/* Product Type */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
                  <div className="flex flex-wrap gap-2">
                    {productTypes.map((p) => (
                      <motion.button
                        key={p.name}
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleProductTypeChange(p.name)}
                        className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-all duration-200 
                          ${formData.productType === p.name
                            ? `${p.color} ${p.hover}`
                            : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-blue-400"
                        }`}
                      >
                        {p.name}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Last Checkup Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Checkup Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      name="lastCheckup"
                      value={formData.lastCheckup}
                      onChange={handleChange}
                      className="w-full pl-9 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition duration-200"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
                <button
                  onClick={checkCompliance}
                  className="inline-flex items-center rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-lg hover:from-green-600 hover:to-emerald-700 transition duration-300"
                >
                  Check Compliance
                </button>
              </div>
            </div>

            {/* Compliance Result */}
            {complianceResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-8 p-6 rounded-2xl shadow-xl flex items-center gap-4 ${getStatusColor(complianceResult.status)}`}
              >
                {getStatusIcon(complianceResult.status)}
                <div>
                  <h3 className="text-2xl font-bold mb-1">{complianceResult.status}</h3>
                  <p className="text-lg">{complianceResult.message}</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Preview column */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border-b-4 border-blue-400">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200">Live Preview</h2>
              <div className="space-y-4 text-base">
                {[
                  ["Drug", formData.drugName, "Drug Name entered"],
                  ["Species", formData.species, "Species selected"],
                  ["Breed", formData.breed, "Breed entered"],
                  ["Weight", formData.weight ? `${formData.weight} kg` : "", "Weight entered"],
                  ["Age", formData.age, "Age entered"],
                  ["Dosage", formData.dosage ? `${formData.dosage} ml` : "", "Dosage entered"],
                  ["Product Type", formData.productType, "Product Type selected"],
                  ["Last Checkup", formData.lastCheckup, "Last Checkup Date entered"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-600 flex items-center gap-2">
                      {getPreviewIcon(label)} {label}
                    </span>
                    <span className="font-semibold text-gray-900">{value || "-"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}