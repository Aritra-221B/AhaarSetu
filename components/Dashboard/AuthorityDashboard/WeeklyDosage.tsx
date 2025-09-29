'use client';

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  { week: "2025-07-01", doses: 35 },
  { week: "2025-07-15", doses: 22 },
  { week: "2025-07-22", doses: 30 },
  { week: "2025-08-12", doses: 48 },
  { week: "2025-08-25", doses: 28 },
];

const WeeklyDosage: React.FC = () => {
  return (
    <LineChart width={500} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="week" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="doses" stroke="#8884d8" strokeWidth={2} />
    </LineChart>
  );
};

export default WeeklyDosage;