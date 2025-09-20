"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const data = [
  { name: "Ongoing Treatment", value: 3 },
  { name: "Side Effect Reported", value: 7 },
  { name: "Under Observation", value: 1 },
  { name: "Urgent Feedback", value: 2 },
];

export default function VetChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-green-50 p-6 rounded-xl shadow-lg border border-gray-200"
    >
      <h2 className="text-xl font-bold text-green-900 mb-6">
        Veterinarian Dashboard Overview
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#22C55E" /> {/* Changed fill color to green-500 */}
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
