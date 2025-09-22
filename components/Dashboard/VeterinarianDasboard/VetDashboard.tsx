'use client';

import React, {useState } from 'react';
import NewTreatment from './NewTreatment';
import VetChart from './VetChart';
import VetAlerts from './VetAlerts';
import AnimalTreatmentRecord from './AnimalTreatmentRecord'; // Assuming this will be used in a tab

export const VetDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'dashboard' | 'treatments'>('overview');

  return (
    <div className="min-h-screen rounded-2xl bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-green-900 mb-2">
            Veterinarian Dashboard
          </h1>
          <p className="text-lg text-green-600">
            Monitor and manage livestock health across multiple farms
          </p>
          
        </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200 px-4 sm:px-6">
            <nav className="-mb-px flex gap-6" aria-label="Tabs">
              {(['overview', 'dashboard', 'treatments'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === t ? 'border-green-600 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                  {/* Placeholder for Recent Activity */}
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm p-4 text-gray-600">
                    <VetAlerts />
                    <AnimalTreatmentRecord />
                  </div>
                </div>
                
              </div>
            )}

            {activeTab === 'dashboard' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Assigned Farmers and Animals</h2>
                <div className="mt-8 mb-8">
                  <VetChart />
                </div>
              </div>
            )}

            {activeTab === 'treatments' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">New Treatment Record</h2>
                <NewTreatment />
              </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default VetDashboard;