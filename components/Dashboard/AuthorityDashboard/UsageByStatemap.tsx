'use client';

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const usageData = [
  { state: "Uttar Pradesh", value: 75 },
  { state: "Maharashtra", value: 90 },
];

const UsageByStateMap: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={usageData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="state" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" name="Usage Intensity" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default UsageByStateMap;