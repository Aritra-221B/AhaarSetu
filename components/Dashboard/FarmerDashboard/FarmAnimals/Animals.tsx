'use client';

import React, { useState } from 'react';
import AddAnimal from './AddAnimal';
import AnimalDashboard from './AnimalDashboard';
import QRCodeAnimal from './QRCodeAnimal/QRCodeAnimal';

type Animal = {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: string;
  weight: string;
  lastTreatment: string;
  nextCheckup: string;
  lastCheckup: string;
  status: 'safe' | 'warning' | 'not-safe';
};

type TreatmentLog = {
  id: string;
  animalId: string;
  medicine: string;
  date: string;
  veterinarian: string;
  notes?: string;
};

export default function Animals({ animals, treatments }: { animals: Animal[]; treatments: TreatmentLog[] }): React.ReactElement {
  const [showAdd, setShowAdd] = useState(false);
  const [selectedAnimalId, setSelectedAnimalId] = useState<string | null>(null);
  const [showQrCodeModal, setShowQrCodeModal] = useState<string | null>(null);

  const getBadge = (status: Animal['status']) => {
    const base = 'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium';
    if (status === 'safe') return <span className={`${base} bg-green-50 text-green-700 border border-green-200`}>Safe</span>;
    if (status === 'warning') return <span className={`${base} bg-yellow-50 text-yellow-700 border border-yellow-200`}>Warning</span>;
    return <span className={`${base} bg-red-50 text-red-700 border border-red-200`}>Not Safe</span>;
  };

  if (showAdd) {
    return <AddAnimal onClose={() => setShowAdd(false)} />;
  }

  if (selectedAnimalId) {
    const animal = animals.find(a => a.id === selectedAnimalId);
    if (animal) {
      return <AnimalDashboard
        animal={animal}
        treatments={treatments.filter(t => t.animalId === animal.id)}
        onClose={() => setSelectedAnimalId(null)}
      />;
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden shadow-lg">
      {showQrCodeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setShowQrCodeModal(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl"
            >
              &times;
            </button>
            <QRCodeAnimal animalId={showQrCodeModal} />
          </div>
        </div>
      )}
      <div className="flex items-center justify-between bg-gray-100 px-6 py-4">
        <p className="text-lg font-bold text-gray-800">Your Animals</p>
        <button onClick={() => setShowAdd(true)} className="inline-flex items-center rounded-lg bg-green-700 px-4 py-2 text-md font-medium text-white shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors">
          + Add Animal
        </button>
      </div>

      <div className="p-6 space-y-6">
        {animals.map((a) => (
          <div key={a.id} className="bg-white border border-gray-200 rounded-xl p-6 md:p-7 shadow-md transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-[1.01]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 text-base font-semibold">{a.type.slice(0,1)}</div>
                <div>
                  <p className="text-lg md:text-xl font-bold text-gray-900">{a.name}</p>
                  <p className="text-sm text-gray-500">ID : {a.id}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {getBadge(a.status)}
                <button onClick={() => setShowQrCodeModal(a.id)} className="ml-4">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=48x48&data=${a.id}`}
                    alt="QR Code"
                    className="w-12 h-12 cursor-pointer"
                  />
                </button>
                <button
                  onClick={() => {
                    setSelectedAnimalId(a.id);
                    setShowQrCodeModal(null);
                  }}
                  className="rounded-lg border border-blue-300 text-blue-700 bg-blue-50 hover:bg-blue-100 text-sm md:text-base px-4 py-2 transition-colors"
                >
                  View Profile
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              <div className="flex flex-col">
                <p className="text-gray-500">Age</p>
                <p className="font-semibold text-gray-900">{a.age}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-gray-500">Weight</p>
                <p className="font-semibold text-gray-900">{a.weight}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-gray-500">Last treatment</p>
                <p className="font-semibold text-gray-900">{a.lastTreatment}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-gray-500">Next checkup</p>
                <p className="font-semibold text-gray-900">{a.nextCheckup}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}