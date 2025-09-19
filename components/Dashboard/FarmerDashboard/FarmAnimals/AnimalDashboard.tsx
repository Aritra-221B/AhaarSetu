'use client';

import React from 'react';
import { Pill } from 'lucide-react'; 

interface AnimalDashboardProps {
  animal: {
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
    farmerName?: string; // Optional, as it might not be directly from Animal type
    registrationDate?: string; // Optional
    farmLocation?: string; // Optional
  };
  onClose: () => void;
  treatments: TreatmentLog[];
}

interface TreatmentLog {
  id: string;
  animalId: string;
  medicine: string;
  date: string;
  veterinarian: string;
  notes?: string;
}

const AnimalDashboard: React.FC<AnimalDashboardProps> = ({ animal, onClose, treatments }) => {
  // Remove useRouter initialization
  // Placeholder data for demonstration - use passed animal prop
  const animalData = {
    name: animal.name,
    id: animal.id,
    qrCode: 'QR:QRCT001', // This can be dynamic if available in animal prop
    animalType: animal.type,
    breed: animal.breed,
    age: animal.age,
    weight: animal.weight,
    farmerName: animal.farmerName || 'Rajesh Kumar', // Use prop or default
    registrationDate: animal.registrationDate || '2024-01-20', // Use prop or default
    farmLocation: animal.farmLocation || 'Village Kothur, Telangana', // Use prop or default
    lastCheckup: animal.lastCheckup,
  };

  // Filter treatmentHistory based on animal.id
  const animalTreatmentHistory = treatments.filter(t => t.animalId === animal.id);

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">{animalData.name}</h1>
          <p className="text-base sm:text-lg text-gray-600 mt-1">ID: {animalData.id}</p>
        </div>
        {/* QR Code and Back button */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-4 sm:mt-0">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=${animal.id}`}
            alt="QR Code"
            className="w-20 h-20 sm:w-24 sm:h-24 cursor-pointer rounded-lg shadow-md transition-transform duration-200 ease-in-out hover:scale-105"
          />
          <button onClick={onClose} className="rounded-lg bg-blue-600 px-4 py-2 sm:px-5 sm:py-2.5 text-base sm:text-lg font-medium text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
            Back to Animals
          </button>
        </div>
      </div>

      {/* Basic Information Card */}
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg mb-6 sm:mb-8 border border-gray-200 animate-fade-in">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="flex flex-col">
            <p className="text-gray-500 text-md">Animal Type</p>
            <p className="font-semibold text-gray-900 text-lg mt-1">{animalData.animalType}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-500 text-md">Farmer</p>
            <p className="font-semibold text-gray-900 text-lg mt-1">{animalData.farmerName}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-500 text-md">Breed</p>
            <p className="font-semibold text-gray-900 text-lg mt-1">{animalData.breed}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-500 text-md">Registration date</p>
            <p className="font-semibold text-gray-900 text-lg mt-1">{animalData.registrationDate}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-500 text-md">Age</p>
            <p className="font-semibold text-gray-900 text-lg mt-1">{animalData.age}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-500 text-md">Farm Location</p>
            <p className="font-semibold text-gray-900 text-lg mt-1">{animalData.farmLocation}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-500 text-md">Weight</p>
            <p className="font-semibold text-gray-900 text-lg mt-1">{animalData.weight}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-500 text-md">Last Checkup</p>
            <p className="font-semibold text-gray-900 text-lg mt-1">{animalData.lastCheckup}</p>
          </div>
        </div>
      </div>

      {/* Treatment History Section */}
      <div className="bg-white p-8 rounded-xl shadow-lg mb-8 border border-gray-200 animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Treatment History</h2>
        <div className="space-y-6">
          {animalTreatmentHistory.map((treatment, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 transition-transform duration-200 ease-in-out hover:scale-[1.005]">
              <div className="flex items-center mb-3">
                <Pill className="text-blue-500 mr-3" size={24} />
                <h3 className="text-xl font-bold text-gray-800">{treatment.medicine}</h3>
                <span className="ml-4 text-gray-600 text-md">Date: {treatment.date}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-md">
                <div className="flex flex-col">
                  <p className="text-gray-500">Veterinarian</p>
                  <p className="font-semibold text-gray-900">{treatment.veterinarian}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-500">Notes</p>
                  <p className="font-semibold text-gray-900">{treatment.notes ?? '-'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimalDashboard;