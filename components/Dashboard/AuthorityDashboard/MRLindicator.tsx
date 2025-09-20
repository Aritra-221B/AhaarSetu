'use client';

import React from "react";
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Text } from "recharts";

const data = [
  { name: "Compliance Score", value: 78, fill: "#4CAF50" },
];

const MRLIndicator: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadialBarChart
        cx="50%"
        cy="50%"
        innerRadius="70%"
        outerRadius="90%"
        barSize={20}
        data={data}
        startAngle={180}
        endAngle={0}
      >
        <RadialBar dataKey="value" fill="#4CAF50" />
        <Text x={300} y={200} textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold" fill="#4CAF50">{`${data[0].value}%`}</Text>
        <Legend
          iconSize={10}
          layout="vertical"
          verticalAlign="middle"
          wrapperStyle={{ top: 0, left: 350, lineHeight: "24px" }}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default MRLIndicator;