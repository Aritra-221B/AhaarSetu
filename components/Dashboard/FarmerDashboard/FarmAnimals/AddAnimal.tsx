"use client";

import React, { useState } from "react";
import { Pill, Calendar, Weight, Syringe, ChevronLeft } from "lucide-react";
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

const speciesOptions = ["Cattle", "Buffalo", "Goat", "Sheep", "Pig", "Poultry"];
const productTypes = [
  { name: "Muscle", color: "bg-blue-100 text-blue-700 border-blue-300" },
  { name: "Egg", color: "bg-yellow-100 text-yellow-700 border-yellow-300" },
  { name: "Milk", color: "bg-purple-100 text-purple-700 border-purple-300"},
];

export default function AddAnimal({ onClose }: { onClose?: () => void }): React.ReactElement {
  const [data, setData] = useState<FormData>({
    drugName: "",
    species: "",
    breed: "",
    weight: "",
    age: "",
    dosage: "",
    productType: "",
    lastCheckup: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-lg"
    >
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-green-700 to-green-600">
        <div className="px-6 md:px-8 py-3 flex items-center justify-between text-white shadow-sm">
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
      <div className="p-6 md:p-8 bg-gradient-to-r from-green-700 to-green-600">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          {/* Form column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
              className="bg-green-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Animal & Treatment Info
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Drug Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Drug Name
                  </label>
                  <div className="relative">
                    <Pill className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      name="drugName"
                      value={data.drugName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500 transition-all duration-200 shadow-sm placeholder-gray-400"
                      placeholder="Enter drug name"
                    />
                  </div>
                </div>

                {/* Species */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Animal Name
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {speciesOptions.map((s) => (
                      <motion.button
                        key={s}
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setData((p) => ({ ...p, species: s }))}
                        className={`px-3 py-1.5 rounded-full text-xs border transition-all duration-200 shadow-sm ${
                          data.species === s
                            ? "bg-green-200 text-green-800 border-green-500 shadow-sm"
                            : "bg-white text-gray-700 border-gray-300 hover:border-green-500 hover:text-green-700"
                        }`}
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Breed */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Breed
                  </label>
                  <input
                    name="breed"
                    value={data.breed}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500 transition-all duration-200 shadow-sm placeholder-gray-400"
                    placeholder="Enter breed"
                  />
                </div>

                {/* Weight */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weight
                  </label>
                  <div className="relative">
                    <Weight className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      name="weight"
                      value={data.weight}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-2 rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500 transition-all duration-200 shadow-sm placeholder-gray-400"
                      placeholder="380"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 text-sm">
                      kg
                    </span>
                  </div>
                </div>

                {/* Age */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age
                  </label>
                  <input
                    name="age"
                    value={data.age}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500 transition-all duration-200 shadow-sm placeholder-gray-400"
                    placeholder="2 years"
                  />
                </div>

                {/* Dosage */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dosage
                  </label>
                  <div className="relative">
                    <Syringe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      name="dosage"
                      value={data.dosage}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-2 rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500 transition-all duration-200 shadow-sm placeholder-gray-400"
                      placeholder="10"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 text-sm">
                      ml
                    </span>
                  </div>
                </div>

                {/* Product Type */}
                <div className="md:col-span-2">
                  <label className="block text-center text-sm font-medium text-gray-700 mb-1">
                    Product Type
                  </label>
                  <div className="flex flex-wrap justify-center gap-2">
                    {productTypes.map((p) => (
                      <motion.button
                        key={p.name}
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setData((d) => ({ ...d, productType: p.name }))}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 shadow-sm ${
                          data.productType === p.name
                            ? `${p.color.replace("border-", "")} border shadow-md`
                            : "bg-white text-gray-700 border-gray-300 hover:border-green-500 hover:text-green-700"
                        }`}
                      >
                        {p.name}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Last Checkup Date */}
                <div>
                  <label className="block text-sm text-center font-medium text-gray-700 mb-1">
                    Last Checkup Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute items-center left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      name="lastCheckup"
                      value={data.lastCheckup}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500 transition-all duration-200 shadow-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 4px 15px -3px rgba(34,197,94,0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Check Compliance
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Preview column */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
              className="bg-green-100 rounded-xl border border-gray-200 p-5 shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
              <div className="space-y-3 text-sm">
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
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                  >
                    <span className="text-gray-600">{label}</span>
                    <span className="font-medium text-gray-900">{value || "-"}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}