'use client';

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const usageData = [
  { state: "Andhra Pradesh", value: 68 },
  { state: "Arunachal Pradesh", value: 42 },
  { state: "Assam", value: 59 },
  { state: "Bihar", value: 72 },
  { state: "Chhattisgarh", value: 66 },
  { state: "Goa", value: 35 },
  { state: "Gujarat", value: 75 },
  { state: "Haryana", value: 83 },
  { state: "Himachal Pradesh", value: 44 },
  { state: "Jharkhand", value: 61 },
  { state: "Karnataka", value: 70 },
  { state: "Kerala", value: 50 },
  { state: "Madhya Pradesh", value: 77 },
  { state: "Maharashtra", value: 90 },
  { state: "Manipur", value: 48 },
  { state: "Meghalaya", value: 46 },
  { state: "Mizoram", value: 40 },
  { state: "Nagaland", value: 45 },
  { state: "Odisha", value: 65 },
  { state: "Punjab", value: 86 },
  { state: "Rajasthan", value: 79 },
  { state: "Sikkim", value: 38 },
  { state: "Tamil Nadu", value: 73 },
  { state: "Telangana", value: 69 },
  { state: "Tripura", value: 52 },
  { state: "Uttar Pradesh", value: 88 },
  { state: "Uttarakhand", value: 56 },
  { state: "West Bengal", value: 71 },
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
          bottom: 50,
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