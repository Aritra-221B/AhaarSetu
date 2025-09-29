'use client';

import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "Respiratory", value: 42 },
  { name: "Digestive", value: 28 },
  { name: "Preventive", value: 18 },
  { name: "Other", value: 12 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const TreatmentWiseUsage: React.FC = () => {
  return (
    <PieChart width={600} height={300}>
      <Pie
        data={data}
        cx={270}
        cy={125}
        innerRadius={40}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={2}
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default TreatmentWiseUsage;