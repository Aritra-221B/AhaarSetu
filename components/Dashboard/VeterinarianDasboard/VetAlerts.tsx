"use client";
import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, MessageSquare } from "lucide-react";

export default function VetAlerts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex items-start justify-between gap-4"
    >
      <div className="flex items-start gap-4">
        <AlertCircle size={24} className="text-red-500 mt-1" />
        <div>
          <p className="font-semibold text-lg text-gray-900 mb-1">Farmer Alert: Ramesh</p>
          <p className="text-sm text-gray-700 leading-relaxed">
            Reports side effects from antibiotic treatment. Has questions about the withdrawal period.
          </p>
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "#16A34A" }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md text-base font-medium"
      >
        <MessageSquare size={18} />
        Respond
      </motion.button>
    </motion.div>
  );
}
