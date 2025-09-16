'use client';
import React from 'react';
import { User, UserCheck, Shield } from 'lucide-react';

interface RoleSelectorProps {
  selectedRole: string;
  onRoleChange: (role: 'farmer' | 'veterinarian' | 'authority') => void;
  className?: string; // Add className prop
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({ selectedRole, onRoleChange, className }) => {
  const roles = [
    { id: 'farmer', label: 'Farmer', icon: User },
    { id: 'veterinarian', label: 'Veterinarian', icon: UserCheck },
    { id: 'authority', label: 'Authority', icon: Shield }
  ];

  return (
    <div className={`space-y-3 mb-6 ${className}`}>
      {roles.map((role) => {
        const IconComponent = role.icon;
        return (
          <button
            key={role.id}
            type="button"
            onClick={() => onRoleChange(role.id as 'farmer' | 'veterinarian' | 'authority')}
            className={`w-full flex items-center px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
              selectedRole === role.id
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
            }`}
          >
            <IconComponent className="h-5 w-5 mr-3 " />
            <span className="font-medium">{role.label}</span>
          </button>
        );
      })}
    </div>
  );
};