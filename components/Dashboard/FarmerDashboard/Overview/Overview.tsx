'use client';

import React from 'react';

type Activity = { id: string; type: 'success' | 'warning'; title: string; detail: string };
type Animal = { id: string; name: string; nextCheckup: string; status: 'safe' | 'warning' | 'not-safe' };
type TreatmentLog = { id: string; animalId: string; date: string };

export default function Overview({ recentActivity, animals, treatments }: {
  recentActivity: Activity[];
  animals: Animal[];
  treatments: TreatmentLog[];
}): React.ReactElement {
  // Calculate dynamic stats
  const upcomingCheckups = animals.filter(animal => {
    const checkupDate = new Date(animal.nextCheckup);
    const today = new Date();
    return checkupDate > today;
  }).length;

  const recentTreatments = treatments.filter(treatment => {
    const treatmentDate = new Date(treatment.date);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return treatmentDate >= thirtyDaysAgo;
  }).length;

  const alerts = animals.filter(animal => animal.status === 'warning' || animal.status === 'not-safe').length;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm animate-fade-in">
          <ul>
            {recentActivity.map((a, idx) => (
              <li
                key={a.id}
                className={`px-6 py-4 transition-all duration-200 ease-in-out border-b border-gray-100 last:border-b-0 flex items-center justify-between hover:bg-gray-100 ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <div className="flex text-left flex-col">
                  <p className="text-base font-medium text-gray-800">{a.title}</p>
                  <p className="text-sm text-gray-600">{a.detail}</p>
                </div>
                <span className={`flex-shrink-0 inline-flex h-3 w-3 rounded-full ${a.type === 'success' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm flex flex-col items-center justify-center text-center transition-transform duration-200 ease-in-out hover:scale-105">
            <p className="text-md text-gray-600 mb-1">Upcoming Checkups</p>
            <p className="text-4xl font-extrabold text-gray-900">{upcomingCheckups}</p>
          </div>
          <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm flex flex-col items-center justify-center text-center transition-transform duration-200 ease-in-out hover:scale-105">
            <p className="text-md text-gray-600 mb-1">Recent Treatments</p>
            <p className="text-4xl font-extrabold text-gray-900">{recentTreatments}</p>
          </div>
          <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm flex flex-col items-center justify-center text-center transition-transform duration-200 ease-in-out hover:scale-105">
            <p className="text-md text-gray-600 mb-1">Alerts</p>
            <p className="text-4xl font-extrabold text-gray-900">{alerts}</p>
          </div>
        </div>
      </div>
    </div>
  );
}