'use client';

import React from "react";

const MRLIndicator: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-2xl p-4 flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-2">MRL Compliance Indicator</h2>
      <div className="flex flex-col items-center justify-center">
        {/* Placeholder Gauge */}
        <div className="w-40 h-40 rounded-full border-[10px] border-green-500 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-800">78%</span>
        </div>
        <p className="mt-2 text-gray-600 text-sm">Compliance Score</p>
      </div>
    </div>
  );
};

export default MRLIndicator;
