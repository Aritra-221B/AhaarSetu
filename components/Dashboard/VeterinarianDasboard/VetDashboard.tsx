'use client';

import React from 'react';
import { Users, Calendar, FileText, AlertCircle } from 'lucide-react';
import NewTreatment from './NewTreatment';
import VetChart from './VetChart';
import { motion } from 'framer-motion';

export const VetDashboard: React.FC = () => {
  const cards = [
    { title: "Registered Farms", value: 12, icon: Users, color: "text-blue-600", bgColor: "bg-blue-100" },
    { title: "Scheduled Visits", value: 8, icon: Calendar, color: "text-green-600", bgColor: "bg-green-100" },
    { title: "Pending Reports", value: 5, icon: FileText, color: "text-yellow-600", bgColor: "bg-yellow-100" },
    { title: "Critical Cases", value: 2, icon: AlertCircle, color: "text-red-600", bgColor: "bg-red-100" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Veterinarian Dashboard</h1>
          <p className="text-lg text-gray-600">
            Monitor and manage livestock health across multiple farms
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex items-center gap-4 cursor-pointer"
            >
              <div className={`p-3 rounded-full ${card.bgColor}`}>
                <card.icon className={`h-7 w-7 ${card.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Section - Kept for now, but consider integrating into tabs or removing if redundant */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Veterinarian Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.03, boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}
              className="p-6 border border-gray-200 rounded-xl bg-gray-50 shadow-sm cursor-pointer"
            >
              <h4 className="font-semibold text-lg text-gray-900 mb-2">Farm Monitoring</h4>
              <p className="text-base text-gray-600">
                Monitor livestock health across multiple farms
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
              whileHover={{ scale: 1.03, boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}
              className="p-6 border border-gray-200 rounded-xl bg-gray-50 shadow-sm cursor-pointer"
            >
              <h4 className="font-semibold text-lg text-gray-900 mb-2">Treatment Prescription</h4>
              <p className="text-base text-gray-600">
                Prescribe and track medical treatments
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
              whileHover={{ scale: 1.03, boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}
              className="p-6 border border-gray-200 rounded-xl bg-gray-50 shadow-sm cursor-pointer"
            >
              <h4 className="font-semibold text-lg text-gray-900 mb-2">Compliance Reports</h4>
              <p className="text-base text-gray-600">
                Generate MRL and AMU compliance reports
              </p>
            </motion.div>
          </div>
        </div>

        {/* New Treatment Form */}
        <div className="mb-8">
          <NewTreatment />
        </div>

        {/* Dashboard Chart */}
        <div className="mb-8">
          <VetChart />
        </div>
      </div>
    </div>
  );
};

export default VetDashboard;
