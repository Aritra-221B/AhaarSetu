'use client';
import React, { useState, useCallback } from 'react';
import { RoleSelector } from '../../components/Dashboard/Roleselector';
import { FarmerDashboard } from '../../components/Dashboard/FarmerDashboard/FarmerDashboard';
import { VetDashboard } from '../../components/Dashboard/VeterinarianDasboard/VetDashboard';
import { AuthorityDashboard } from '../../components/Dashboard/AuthorityDashboard/AuthorityDashboard';
import { useSearchParams } from 'next/navigation';

const DashboardPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'farmer' | 'veterinarian' | 'authority'>('farmer');
  const searchParams = useSearchParams();
  const roleFromUrl = searchParams.get('role') as 'farmer' | 'veterinarian' | 'authority' | null;

  // Set the role from URL on initial load, or default to 'farmer'
  React.useEffect(() => {
    if (roleFromUrl) {
      setSelectedRole(roleFromUrl);
    }
  }, [roleFromUrl]);

  const handleRoleChange = useCallback((role: 'farmer' | 'veterinarian' | 'authority') => {
    setSelectedRole(role);
  }, []);

  return (
    <div className="bg-gradient-to-br from-green-400 via-green-300 to-green-200">
      <div className="w-full py-8 px-6 lg:px-8 text-center">
        {roleFromUrl ? (
          <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-14">Welcome {selectedRole}!</h1>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-14">Select Your Role</h1>
            <p className="text-gray-600 mb-6">Choose your role to view the corresponding dashboard.</p>
            <RoleSelector selectedRole={selectedRole} onRoleChange={handleRoleChange} className="mb-8 " />
          </>
        )}
        <div className="mt-8 ">
          {selectedRole === 'farmer' && <FarmerDashboard />}
          {selectedRole === 'veterinarian' && <VetDashboard />}
          {selectedRole === 'authority' && <AuthorityDashboard />}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
