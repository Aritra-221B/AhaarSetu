"use client";
import React from "react";
import { motion } from "framer-motion";
import { Calendar, User, Pill, Clock, AlertCircle } from "lucide-react";

export default function AnimalTreatmentRecord() {
  const treatments = [
    {
      date: "Dec 16, 2025",
      farmerName: "Ramesh Kumar",
      animalId: "CT001",
      medicine: "Penicillin",
      withdrawal: "Dec 30, 2025",
      status: "Withdrawal",
    },
    {
      date: "Nov 28, 2025",
      farmerName: "Sunita Devi",
      animalId: "GT005",
      medicine: "Amoxicillin",
      withdrawal: "Dec 15, 2025",
      status: "Safe",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mt-8"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Treatment Records</h3>
      <div className="space-y-4">
        {treatments.map((treatment, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1, ease: "easeOut" }}
            whileHover={{ scale: 1.01, boxShadow: "0 4px 15px rgba(0,0,0,0.08)" }}
            className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200 flex items-start gap-4"
          >
            <Calendar size={20} className="text-blue-500 flex-shrink-0 mt-1" />
            <div className="flex-grow">
              <p className="text-lg font-semibold text-gray-900 mb-1">
                Treatment for {treatment.animalId}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-4 text-sm text-gray-700">
                <p className="flex items-center gap-2">
                  <User size={16} className="text-gray-500" />
                  <span>{treatment.farmerName}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Pill size={16} className="text-gray-500" />
                  <span>{treatment.medicine}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock size={16} className="text-gray-500" />
                  <span>Withdrawal by {treatment.withdrawal}</span>
                </p>
                <p className="flex items-center gap-2">
                  <AlertCircle size={16} className={`${treatment.status === "Withdrawal" ? "text-red-500" : "text-green-500"}`} />
                  <span className={`font-medium ${treatment.status === "Withdrawal" ? "text-red-600" : "text-green-600"}`}>
                    {treatment.status}
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
