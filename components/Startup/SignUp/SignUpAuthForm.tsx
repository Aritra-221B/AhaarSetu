'use client';
import React, { useState } from 'react';
import { FaUser, FaStethoscope, FaBuilding, FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface SignUpAuthFormProps {
  toggleForm: (showLogin: boolean) => void;
}

const SignUpAuthForm: React.FC<SignUpAuthFormProps> = ({ toggleForm }) => {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<'farmer' | 'veterinarian' | 'authority' | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [roleError, setRoleError] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleRegister = () => {
    setRoleError('');
    setFullNameError('');
    setMobileError('');
    setPasswordError('');

    let hasError = false;

    if (!selectedRole) {
      setRoleError('Please select a role.');
      hasError = true;
    }
    if (!fullName) {
      setFullNameError('Full Name is required.');
      hasError = true;
    }
    if (!mobileNumber) {
      setMobileError('Mobile Number is required.');
      hasError = true;
    } else if (!/^[0-9]{10}$/.test(mobileNumber)) {
      setMobileError('Please enter a valid 10-digit mobile number.');
      hasError = true;
    }
    if (!password) {
      setPasswordError('Password is required.');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    toast.success(`Registering as ${selectedRole} with name: ${fullName}, mobile: ${mobileNumber}`);
    // Navigate to dashboard with selected role after successful registration
    router.push(`/dashboard?role=${selectedRole}`);
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-green-800 mb-6 sm:mb-8 text-center">Register</h2>

      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        {/* Role Selection */}
        <div
          className={`flex items-center p-3 sm:p-4 border rounded-xl cursor-pointer transition-all duration-200
            ${
              selectedRole === 'farmer'
                ? 'border-green-600 bg-green-100 text-green-800 shadow-sm'
                : 'border-gray-300 hover:border-green-400 hover:shadow-sm'
            }
            ${roleError ? 'border-red-500' : ''}
            `}
          onClick={() => {
            setSelectedRole('farmer');
            setRoleError('');
          }}
        >
          <FaUser className="text-lg sm:text-xl mr-3" />
          <span className="font-medium">Farmer</span>
        </div>

        <div
          className={`flex items-center p-3 sm:p-4 border rounded-xl cursor-pointer transition-all duration-200
            ${
              selectedRole === 'veterinarian'
                ? 'border-green-600 bg-green-100 text-green-800 shadow-sm'
                : 'border-gray-300 hover:border-green-400 hover:shadow-sm'
            }
            ${roleError ? 'border-red-500' : ''}
            `}
          onClick={() => {
            setSelectedRole('veterinarian');
            setRoleError('');
          }}
        >
          <FaStethoscope className="text-lg sm:text-xl mr-3" />
          <span className="font-medium">Veterinarian</span>
        </div>

        <div
          className={`flex items-center p-3 sm:p-4 border rounded-xl cursor-pointer transition-all duration-200
            ${
              selectedRole === 'authority'
                ? 'border-green-600 bg-green-100 text-green-800 shadow-sm'
                : 'border-gray-300 hover:border-green-400 hover:shadow-sm'
            }
            ${roleError ? 'border-red-500' : ''}
            `}
          onClick={() => {
            setSelectedRole('authority');
            setRoleError('');
          }}
        >
          <FaBuilding className="text-lg sm:text-xl mr-3" />
          <span className="font-medium">Authority</span>
        </div>
        {roleError && <p className="text-red-500 text-sm mt-2">{roleError}</p>}
      </div>

      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        <div>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              setFullNameError('');
            }}
            className={`w-full p-3 sm:p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 ${fullNameError ? 'border-red-500' : 'border-gray-300'}`}
          />
          {fullNameError && <p className="text-red-500 text-sm mt-1">{fullNameError}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(e) => {
              setMobileNumber(e.target.value);
              setMobileError('');
            }}
            className={`w-full p-3 sm:p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 ${mobileError ? 'border-red-500' : 'border-gray-300'}`}
          />
          {mobileError && <p className="text-red-500 text-sm mt-1">{mobileError}</p>}
        </div>
        <div className="relative">
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError('');
            }}
            className={`w-full p-3 sm:p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 pr-12 ${passwordError ? 'border-red-500' : 'border-gray-300'}`}
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
          >
            {passwordVisible ? <FaEyeSlash className="text-base sm:text-lg" /> : <FaEye className="text-base sm:text-lg" />}
          </button>
          {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
        </div>
      </div>

      <button
        onClick={handleRegister}
        className="w-full bg-green-600 text-white font-bold py-3 sm:py-4 rounded-xl hover:bg-green-700 transition-colors duration-300 shadow-md mb-4"
      >
        Register
      </button>
      <p className="text-center text-gray-600 text-sm">
        Already have an account? <a onClick={() => toggleForm(true)} className="text-green-700 font-semibold hover:underline transition-colors duration-200 cursor-pointer">Login here</a>
      </p>
    </div>
  );
};

export default SignUpAuthForm;
