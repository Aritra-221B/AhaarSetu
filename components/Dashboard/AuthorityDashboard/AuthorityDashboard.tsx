import React from 'react';
import MultiDashboardTabs from './MultiDashboardTabs';
import DashboardCards from './DashboardCards';

export const AuthorityDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-green-50 rounded-2xl p-4 sm:p-6 md:p-8">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-green-700 mb-2">Authority Dashboard</h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600">Oversee farm compliance and manage inspections</p>
      </div>
      <div className="max-w-7xl mx-auto">
        <DashboardCards />
        <MultiDashboardTabs />
      </div>
    </div>
  );
};