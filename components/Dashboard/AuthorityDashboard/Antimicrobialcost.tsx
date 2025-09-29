'use client';

import React from "react";
import { Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart } from "recharts";

const data = [
  { month: "2025-04", cost: 200, doses: 300 },
  { month: "2025-05", cost: 450, doses: 600 },
  { month: "2025-06", cost: 700, doses: 500 },
  { month: "2025-07", cost: 500, doses: 650 },
  { month: "2025-08", cost: 250, doses: 700 },
];

const AntimicrobialCost: React.FC = () => {
  return (
    <ComposedChart width={500} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="cost" barSize={30} fill="#413ea0" name="Antimicrobial Cost" />
        <Line type="monotone" dataKey="doses" stroke="#ff7300" name="Antimicrobial Doses" />
      </ComposedChart>
  );
};

export default AntimicrobialCost;