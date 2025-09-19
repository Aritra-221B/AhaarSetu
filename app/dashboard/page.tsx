'use client';
import React, { useState, useCallback, Suspense } from 'react';
import { RoleSelector } from '../../components/Dashboard/Roleselector';
import { FarmerDashboard } from '../../components/Dashboard/FarmerDashboard/FarmerDashboard';
import { VetDashboard } from '../../components/Dashboard/VeterinarianDasboard/VetDashboard';
import { AuthorityDashboard } from '../../components/Dashboard/AuthorityDashboard/AuthorityDashboard';
import { useSearchParams } from 'next/navigation';
import Loading from './loading';

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
    <Suspense fallback={<Loading />}>
      <div className="bg-gradient-to-b from-green-900 via-green-700 to-green-300">
        <div className="w-full py-8 px-6 lg:px-8 text-center">
          {roleFromUrl ? (
            <h1 className="text-5xl font-extrabold text-white mb-6 mt-16 drop-shadow-lg">Welcome {selectedRole}!</h1>
          ) : (
            <>
              <h1 className="text-5xl font-extrabold text-white mb-6 mt-16 drop-shadow-lg">Select Your Role</h1>
              <p className="text-white text-lg mb-8">Choose your role to view the corresponding dashboard.</p>
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
    </Suspense>
  );
};

export default DashboardPage;
