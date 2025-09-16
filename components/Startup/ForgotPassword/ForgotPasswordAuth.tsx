'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface ForgotPasswordProps {
  toggleForm: (showLogin: boolean) => void;
  showForgotPassword: (show: boolean) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ toggleForm, showForgotPassword }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);

  const handleResetPassword = () => {
    setMobileError('');
    setNewPasswordError('');

    let hasError = false;

    if (!mobileNumber) {
      setMobileError('Mobile Number is required.');
      hasError = true;
    } else if (!/^[0-9]{10}$/.test(mobileNumber)) {
      setMobileError('Please enter a valid 10-digit mobile number.');
      hasError = true;
    }

    if (!newPassword) {
      setNewPasswordError('New Password is required.');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // In a real application, you would send this data to an API to reset the password
    toast.success(`Password for ${mobileNumber} has been reset.`);
    showForgotPassword(false); // Go back to login form after successful reset
    toggleForm(true); // Ensure login form is shown
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-green-800 mb-6 sm:mb-8 text-center">Forgot Password</h2>

      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        <div>
          <input
            type="text"
            placeholder="Enter your Mobile Number"
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
            type={newPasswordVisible ? 'text' : 'password'}
            placeholder="Enter your New Password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setNewPasswordError('');
            }}
            className={`w-full p-3 sm:p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 pr-12 ${newPasswordError ? 'border-red-500' : 'border-gray-300'}`}
          />
          <button
            type="button"
            onClick={() => setNewPasswordVisible(!newPasswordVisible)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
          >
            {newPasswordVisible ? <FaEyeSlash className="text-base sm:text-lg" /> : <FaEye className="text-base sm:text-lg" />}
          </button>
          {newPasswordError && <p className="text-red-500 text-sm mt-1">{newPasswordError}</p>}
        </div>
      </div>

      <button
        onClick={handleResetPassword}
        className="w-full bg-green-600 text-white font-bold py-3 sm:py-4 rounded-xl hover:bg-green-700 transition-colors duration-300 shadow-md mb-4"
      >
        Reset Password
      </button>
      <p className="text-center text-gray-600 text-sm">
        Remember your password? <a onClick={() => { showForgotPassword(false); toggleForm(true); }} className="text-green-700 font-semibold hover:underline transition-colors duration-200 cursor-pointer">Login here</a>
      </p>
    </div>
  );
};

export default ForgotPassword;
