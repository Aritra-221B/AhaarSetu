
'use client';

import React, { useState } from 'react';
import { withdrawal_rules } from '../../../../data/withdrawal_rules';

interface Animal {
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
  drug?: string; // Add drug property
}

interface SearchAnimalProps {
  animals: Animal[];
  setFilteredAnimals: (filteredAnimals: Animal[]) => void;
}

const SearchAnimal: React.FC<SearchAnimalProps> = ({ animals, setFilteredAnimals }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('All');
  const [filterBreed, setFilterBreed] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterDrug, setFilterDrug] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('name');

  const handleSearch = React.useCallback(() => {
    let filtered = animals.filter(animal =>
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterType !== 'All') {
      filtered = filtered.filter(animal => animal.type === filterType);
    }

    if (filterBreed !== 'All') {
      filtered = filtered.filter(animal => animal.breed === filterBreed);
    }

    if (filterStatus !== 'All') {
      filtered = filtered.filter(animal => animal.status === filterStatus);
    }

    if (filterDrug !== 'All') {
      filtered = filtered.filter(animal => animal.drug === filterDrug);
    }

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'age') {
        // Assuming age is a number followed by "years" or "months"
        const ageA = parseInt(a.age.split(' ')[0]);
        const ageB = parseInt(b.age.split(' ')[0]);
        return ageA - ageB;
      } else if (sortBy === 'weight') {
        // Assuming weight is a number followed by "kg"
        const weightA = parseInt(a.weight.split(' ')[0]);
        const weightB = parseInt(b.weight.split(' ')[0]);
        return weightA - weightB;
      } else if (sortBy === 'drug') {
        return (a.drug || '').localeCompare(b.drug || '');
      }
      return 0;
    });
    setFilteredAnimals(sorted);
  }, [searchTerm, filterType, filterBreed, filterStatus, filterDrug, sortBy, animals, setFilteredAnimals]);

  // Effect to trigger search when filters or sort change
  React.useEffect(() => {
    handleSearch();
  }, [searchTerm, filterType, filterBreed, filterStatus, filterDrug, sortBy, animals, handleSearch]);

  const animalTypes = Array.from(new Set(animals.map(animal => animal.type)));
  const animalBreeds = Array.from(new Set(animals.map(animal => animal.breed)));
  const animalStatuses = ['safe', 'warning', 'not-safe'];

  return (
    <div className="bg-green-100 p-6 sm:p-8 rounded-xl shadow-md mb-6 border border-green-200 animate-fade-in transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-[1.01]">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or ID..."
          className="flex-grow bg-green-50 p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm text-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <select
          className="p-2.5 bg-green-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm text-gray-700"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All Types</option>
          {animalTypes.map(type => <option key={type} value={type}>{type}</option>)}
        </select>
        <select
          className="p-2.5 bg-green-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm text-gray-700"
          value={filterBreed}
          onChange={(e) => setFilterBreed(e.target.value)}
        >
          <option value="All">All Breeds</option>
          {animalBreeds.map(breed => <option key={breed} value={breed}>{breed}</option>)}
        </select>
        <select
          className="p-2.5 bg-green-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm text-gray-700"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Statuses</option>
          {animalStatuses.map(status => <option key={status} value={status}>{status}</option>)}
        </select>
        <select
          className="p-2.5 bg-green-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm text-gray-700"
          value={filterDrug}
          onChange={(e) => setFilterDrug(e.target.value)}
        >
          <option value="All">All Drugs</option>
          {Object.keys(withdrawal_rules).map(drug => <option key={drug} value={drug}>{drug}</option>)}
        </select>
        <select
          className="p-2.5 bg-green-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm text-gray-700"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="age">Sort by Age</option>
          <option value="weight">Sort by Weight</option>
          <option value="drug">Sort by Drug</option>
        </select>
      </div>
    </div>
  );
};

export default SearchAnimal;
