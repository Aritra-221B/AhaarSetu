import React, { useState } from 'react';
import { Plus, Eye, Users, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { FarmAnimal, Animal } from './FarmAnimal'; // Import FarmAnimal component and Animal interface

const mockAnimals: Animal[] = [
  {
    id: 'CT001',
    name: 'Dairy Cow #1',
    type: 'Cattle',
    breed: 'Holstein Friesian',
    age: '3 years',
    weight: '450 kg',
    lastTreatment: '2024-01-15',
    nextCheckup: '2024-02-20',
    status: 'safe',
  },
  {
    id: 'CT002',
    name: 'Dairy Cow #2',
    type: 'Cattle',
    breed: 'Jersey',
    age: '2 years',
    weight: '380 kg',
    lastTreatment: '2024-01-20',
    nextCheckup: '2024-02-15',
    status: 'warning',
  },
  {
    id: 'PL001',
    name: 'Pig #1',
    type: 'Pig',
    breed: 'Large White',
    age: '1 years',
    weight: '120 kg',
    lastTreatment: '2024-01-10',
    nextCheckup: '2024-02-10',
    status: 'safe',
  },
];

export const FarmerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'animals' | 'treatments'>('overview');
  const [animals] = useState<Animal[]>(mockAnimals);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'risk': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'risk': return <XCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const getStatusStats = () => {
    const total = animals.length;
    const safe = animals.filter((a) => a.status === 'safe').length;
    const warning = animals.filter((a) => a.status === 'warning').length;
    const notSafe = animals.filter((a) => a.status === 'risk').length;
    return { total, safe, warning, notSafe };
  };

  const stats = getStatusStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Farmer Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your livestock and track medicine compliance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Animals</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Safe for Sale</p>
                <p className="text-2xl font-bold text-gray-900">{stats.safe}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Under Observation</p>
                <p className="text-2xl font-bold text-gray-900">{stats.warning}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Not Safe</p>
                <p className="text-2xl font-bold text-gray-900">{stats.notSafe}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex flex-wrap sm:flex-nowrap justify-around sm:justify-start gap-y-2 sm:space-x-10 px-4 sm:px-8" aria-label="Tabs">
              {[
                { id: 'overview', name: 'Overview', icon: Eye },
                { id: 'animals', name: 'Animals', icon: Users },
                { id: 'treatments', name: 'Treatments', icon: Plus },
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`flex-1 sm:flex-none flex items-center justify-center sm:justify-start py-3 px-2 sm:px-4 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent className="h-5 w-5 mr-2" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'animals' && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-4 sm:mb-0">Digital Livestock Profiles</h3>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-200 flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Animal
                  </button>
                </div>

                <div className="space-y-4">
                  {animals.map((animal) => (
                    <FarmAnimal key={animal.id} animal={animal} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'overview' && (
              <div className="text-center py-12 px-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Farm Overview</h3>
                <p className="text-gray-600">Welcome to your farm management dashboard. Use the tabs above to manage your animals and treatments.</p>
              </div>
            )}

            {activeTab === 'treatments' && (
              <div className="text-center py-12 px-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Treatment Management</h3>
                <p className="text-gray-600">Track and manage medical treatments for your livestock.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
