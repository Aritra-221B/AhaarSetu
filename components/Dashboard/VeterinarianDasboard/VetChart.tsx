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

const data = [
  { name: "Ongoing Treatment", value: 3 },
  { name: "Side Effect Reported", value: 2 },
  { name: "Under Observation", value: 1 },
  { name: "Urgent Feedback", value: 0 },
];

export default function VetChart() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-md font-semibold mb-3">
        Veterinarian Dashboard Overview
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#34d399" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
