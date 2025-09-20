"use client";
import React from "react";
import { motion } from "framer-motion";
import { User, PawPrint, Pill, Syringe, Calendar, ClipboardEdit } from "lucide-react";

export default function NewTreatment() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-green-100 rounded-xl shadow-md border border-gray-200 p-6"
    >
      <h3 className="text-xl font-bold text-green-900 mb-6">Record New Treatment</h3>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        {/* Farmer ID */}
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Farmer ID"
            className="w-full pl-10 pr-3 py-2 rounded-md border-gray-300 focus:border-green-600 focus:ring-green-600 transition-all duration-200 shadow-sm placeholder-gray-400"
          />
        </div>
        {/* Animal ID */}
        <div className="relative">
          <PawPrint className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Animal ID"
            className="w-full pl-10 pr-3 py-2 rounded-md border-gray-300 focus:border-green-600 focus:ring-green-600 transition-all duration-200 shadow-sm placeholder-gray-400"
          />
        </div>
        {/* Medicine */}
        <div className="relative">
          <Pill className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Medicine"
            className="w-full pl-10 pr-3 py-2 rounded-md border-gray-300 focus:border-green-600 focus:ring-green-600 transition-all duration-200 shadow-sm placeholder-gray-400"
          />
        </div>
        {/* Dose */}
        <div className="relative">
          <Syringe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Dose"
            className="w-full pl-10 pr-3 py-2 rounded-md border-gray-300 focus:border-green-600 focus:ring-green-600 transition-all duration-200 shadow-sm placeholder-gray-400"
          />
        </div>
        {/* Withdrawal Period */}
        <div className="relative md:col-span-2">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Withdrawal Period (e.g., 7 days)"
            className="w-full pl-10 pr-3 py-2 rounded-md border-gray-300 focus:border-green-600 focus:ring-green-600 transition-all duration-200 shadow-sm placeholder-gray-400"
          />
        </div>
        {/* Note for Farmer */}
        <div className="relative col-span-2">
          <ClipboardEdit className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
          <textarea
            placeholder="Note for Farmer"
            rows={3}
            className="w-full pl-10 pr-3 py-2 rounded-md border-gray-300 focus:border-green-600 focus:ring-green-600 transition-all duration-200 shadow-sm placeholder-gray-400"
          />
        </div>
        {/* Save Treatment Button */}
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: "0 4px 15px -3px rgba(34,197,94,0.3)" }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="col-span-2 inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-base font-medium text-white shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
        >
          Save Treatment
        </motion.button>
      </form>
    </motion.div>
  );
}
