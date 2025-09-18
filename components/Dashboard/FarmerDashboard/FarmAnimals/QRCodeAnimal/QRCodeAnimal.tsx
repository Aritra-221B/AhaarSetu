import React from 'react';
import QRCode from 'react-qr-code';

interface QRCodeAnimalProps {
  animalId: string;
}

const QRCodeAnimal: React.FC<QRCodeAnimalProps> = ({ animalId }) => {
  const url = `http://localhost:3001/animalProfile/${animalId}`;

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Digital passport</h3>
      <p className="text-sm text-gray-500 mb-2">ID: {animalId}</p>
      <div className="p-2 bg-white border border-gray-200 rounded-md">
        <QRCode value={url} size={128} level="H" />
      </div>
      <p className="mt-2 text-sm text-gray-600">Scan to verify product safety</p>
    </div>
  );
};

export default QRCodeAnimal;