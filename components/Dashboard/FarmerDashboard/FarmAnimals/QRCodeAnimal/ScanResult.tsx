import React from 'react';
import { CheckCircle, XCircle, ShieldCheck, Award } from 'lucide-react';

interface ScanResultProps {
  animalName: string;
  scanSuccessful: boolean;
  safeForMeat: boolean;
  safeForMilk: boolean;
  nextCheckup: string;
  complianceScore: number;
  certifications: string[];
  onClose: () => void;
}

const ScanResult: React.FC<ScanResultProps> = ({
  animalName,
  scanSuccessful,
  safeForMeat,
  safeForMilk,
  nextCheckup,
  complianceScore,
  certifications,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <XCircle size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Scan Result</h2>

        <div className="flex items-center mb-4">
          {scanSuccessful ? (
            <CheckCircle className="text-green-500 mr-2" size={24} />
          ) : (
            <XCircle className="text-red-500 mr-2" size={24} />
          )}
          <p className="text-xl font-semibold text-gray-900">{animalName}</p>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          {scanSuccessful ? 'Scan successful!' : 'Scan failed or animal not found.'}
        </p>

        {scanSuccessful && (
          <div className="space-y-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Safety Status:</p>
              <div className="flex items-center space-x-2 mt-1">
                {safeForMeat && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <ShieldCheck size={16} className="mr-1" /> Safe for Meat
                  </span>
                )}
                {safeForMilk && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <ShieldCheck size={16} className="mr-1" /> Safe for Milk
                  </span>
                )}
                {!safeForMeat && !safeForMilk && (
                  <span className="text-sm text-red-600">Safety status not confirmed.</span>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">Next Checkup:</p>
              <p className="text-base font-medium text-gray-900">{nextCheckup}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Compliance Score:</p>
              <p className="text-base font-medium text-gray-900">{complianceScore}%</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Certifications:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {certifications.length > 0 ? (
                  certifications.map((cert, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      <Award size={16} className="mr-1" /> {cert}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-600">No certifications.</span>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanResult;