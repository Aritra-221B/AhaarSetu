"use client";

import React, { useState } from "react";

export default function MultiDashboardTabs() {
  const [activeTab, setActiveTab] = useState<
    "dashboard1" | "dashboard2" | "dashboard3"
  >("dashboard1");

  return (
    <>
      {/* Tabs container */}
      <div className="w-full max-w-8xl mx-auto mt-6 sm:mt-8 bg-white shadow-2xl rounded-2xl p-4 sm:p-6 md:p-8 min-h-[700px]">
        {/* Tabs */}
        <div className="flex flex-col sm:flex-row border-b mb-4 sm:mb-6">
          {[
            { id: "dashboard1", label: "Dashboard 1" },
            { id: "dashboard2", label: "Dashboard 2" },
            { id: "dashboard3", label: "Dashboard 3" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "dashboard1" | "dashboard2" | "dashboard3")}
              className={`flex-1 px-3 py-2 sm:px-6 sm:py-4 text-sm sm:text-base font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? "text-green-600 border-b-4 border-green-600 bg-green-50"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-2 sm:p-4 md:p-6">
          {/* Dashboard 1 */}
          {activeTab === "dashboard1" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border min-h-[350px] sm:min-h-[400px]">
                <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
                  Antimicrobial Usage Intensity by State
                </h2>
                <div className="flex items-center justify-center h-[250px] sm:h-[300px] text-gray-400">
                  [India Map Chart Placeholder]
                </div>
              </div>
            </div>
          )}

          {/* Dashboard 2 */}
          {activeTab === "dashboard2" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border min-h-[350px] sm:min-h-[400px]">
                <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
                  Antimicrobial Usage, Treatment-Wise
                </h2>
                <div className="flex items-center justify-center h-[250px] sm:h-[300px] text-gray-400">
                  [Pie/Donut Chart Placeholder]
                </div>
              </div>
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border min-h-[350px] sm:min-h-[400px]">
                <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">MRL Compliance Indicator</h2>
                <div className="flex items-center justify-center h-[250px] sm:h-[300px] text-gray-400">
                  [Gauge Chart Placeholder]
                </div>
              </div>
            </div>
          )}

          {/* Dashboard 3 */}
          {activeTab === "dashboard3" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border min-h-[350px] sm:min-h-[400px]">
                <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
                  Weekly Antimicrobial Dosage and Frequency
                </h2>
                <div className="flex items-center justify-center h-[250px] sm:h-[300px] text-gray-400">
                  [Line Chart Placeholder]
                </div>
              </div>
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border min-h-[350px] sm:min-h-[400px]">
                <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Antimicrobial Cost vs Doses</h2>
                <div className="flex items-center justify-center h-[250px] sm:h-[300px] text-gray-400">
                  [Bar + Line Chart Placeholder]
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
