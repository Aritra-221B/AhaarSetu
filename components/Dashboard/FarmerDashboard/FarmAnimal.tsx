import React from 'react';
import { User, QrCode } from 'lucide-react';

export interface Animal {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: string;
  weight: string;
  lastTreatment: string;
  nextCheckup: string;
  status: 'safe' | 'warning' | 'risk';
}

interface FarmAnimalProps {
  animal: Animal;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => React.ReactElement | null;
}

export const FarmAnimal: React.FC<FarmAnimalProps> = ({ animal, getStatusColor, getStatusIcon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-50 rounded-full flex items-center justify-center mr-3 sm:mr-4 border border-gray-200">
            <User className="h-6 w-6 sm:h-7 sm:w-7 text-gray-600" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{animal.name}</h3>
            <p className="text-xs sm:text-sm text-gray-500">ID: {animal.id} • {animal.breed}</p>
            <p className="text-xs text-gray-400 flex items-center mt-1">
              <QrCode className="h-3 w-3 mr-1" /> QR{animal.id}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-between w-full sm:w-auto sm:flex-nowrap sm:items-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm">
          <div className="flex flex-col items-start w-1/2 sm:w-auto">
            <span className="text-gray-500">Age:</span>
            <span className="font-medium">{animal.age}</span>
          </div>
          <div className="flex flex-col items-start w-1/2 sm:w-auto">
            <span className="text-gray-500">Weight:</span>
            <span className="font-medium text-gray-800">{animal.weight}</span>
          </div>
          <div className="flex flex-col items-start w-1/2 sm:w-auto">
            <span className="text-gray-500">Last Check:</span>
            <span className="font-medium text-gray-800">{animal.lastTreatment}</span>
          </div>
          <div className="flex flex-col items-start w-1/2 sm:w-auto">
            <span className="text-gray-500">Next Checkup:</span>
            <span className="font-medium text-gray-800">{animal.nextCheckup}</span>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(animal.status)}`}>
            {getStatusIcon(animal.status)}
            <span className="ml-1 capitalize">{animal.status === 'risk' ? 'Not Safe' : animal.status}</span>
          </span>
          <button className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 mt-4 sm:mt-0">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};
