'use client';

import React from 'react';

type TreatmentLog = {
  id: string;
  animalId: string;
  medicine: string;
  date: string;
  veterinarian: string;
  notes?: string;
};

type Animal = { id: string; name: string };

export default function Treatments({ treatments, animals }: { treatments: TreatmentLog[]; animals: Animal[] }): React.ReactElement {
  const animalNameById = new Map(animals.map((a) => [a.id, a.name] as const));
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-green-400">
          <tr>
            <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">Date</th>
            <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">Animal</th>
            <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">Medicine</th>
            <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">Veterinarian</th>
            <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">Notes</th>
          </tr>
        </thead>
        <tbody className="bg-green-100 divide-y divide-green-200 animate-fade-in">
          {treatments.map((t) => (
            <tr key={t.id} className="transition-all duration-200 ease-in-out hover:bg-green-50">
              <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">{t.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-md text-gray-700">{animalNameById.get(t.animalId) ?? t.animalId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-md text-gray-700">{t.medicine}</td>
              <td className="px-6 py-4 whitespace-nowrap text-md text-gray-700">{t.veterinarian}</td>
              <td className="px-6 py-4 text-md text-gray-500">{t.notes ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}