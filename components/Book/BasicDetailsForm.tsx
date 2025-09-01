import React, { useState } from 'react';
import { countries } from '../../constant/countries';

interface Country {
  name: string;
  code: string;
  iso: string;
}

interface Props {
  data: {
    name: string;
    phone: string;
    email: string;
    countryCode: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  isEditing: boolean;
  isCompleted: boolean;
  onEditToggle: () => void;
  onValidationFail: () => void; // New prop for validation failure
}

const BasicDetailsForm: React.FC<Props> = ({
  data,
  onChange,
  onNext,
  isEditing,
  isCompleted,
  onEditToggle
}) => {
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleNext = () => {
    setNameError(null);
    setPhoneError(null);
    setEmailError(null);

    const phoneRegex = /^[0-9]{10,15}$/;
    const emailRegex = /^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}$/;

    let isValid = true;

    if (!data.name) {
      setNameError("Please enter your full name.");
      isValid = false;
    }
    if (!data.phone) {
      setPhoneError("Please enter your phone number.");
      isValid = false;
    } else if (!phoneRegex.test(data.phone)) {
      setPhoneError("Please enter a valid phone number (10-15 digits).");
      isValid = false;
    }

    if (!data.email) {
      setEmailError("Please enter your email address.");
      isValid = false;
    } else if (!emailRegex.test(data.email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    if (isValid) onNext();
  };

  return (
    <div className="space-y-4 sm:space-y-6 bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-xl border border-gray-200 w-full sm:w-[600px] md:w-[700px] lg:w-[800px]">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-4 sm:mb-6">
        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Basic Details
        </span>
      </h2>

      <input
        type="text"
        placeholder="Full Name"
        disabled={!isEditing}
        className={`w-full p-2 sm:p-3 border ${nameError ? 'border-red-500' : 'border-gray-300'} 
          rounded-md text-gray-900 placeholder-gray-500 focus:ring-2 
          focus:ring-purple-500 focus:border-transparent outline-none transition duration-200 
          ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        value={data.name}
        onChange={(e) => {
          onChange('name', e.target.value);
          // Re-validate name on change
          if (e.target.value) {
            setNameError(null);
          } else if (nameError) {
            setNameError("Please enter your full name."); // Keep error if still empty
          }
        }}
      />
      {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}

      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <select
          value={data.countryCode}
          disabled={!isEditing}
          onChange={(e) => onChange('countryCode', e.target.value)}
          className={`w-full sm:w-auto p-2 sm:p-3 border border-gray-300 rounded-md text-gray-900 
            focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none 
            transition duration-200 ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        >
          {countries.map((country: Country) => (
            <option key={country.iso} value={country.code}>
              {country.iso} ({country.code})
            </option>
          ))}
        </select>

        <input
          type="tel"
          placeholder="Phone Number (WhatsApp)"
          disabled={!isEditing}
          className={`w-full p-2 sm:p-3 border ${phoneError ? 'border-red-500' : 'border-gray-300'} 
            rounded-md text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 
            focus:border-transparent outline-none transition duration-200 
            ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          value={data.phone}
          onChange={(e) => {
            onChange('phone', e.target.value);
            const phoneRegex = /^[0-9]{10,15}$/;
            // Re-validate phone on change
            if (phoneRegex.test(e.target.value)) {
              setPhoneError(null);
            } else if (phoneError) {
              setPhoneError("Please enter a valid phone number (10-15 digits)."); // Keep error if still invalid
            }
          }}
          inputMode="numeric"
        />
      </div>
      {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}

      <input
        type="email"
        placeholder="Email Address"
        disabled={!isEditing}
        className={`w-full p-2 sm:p-3 border ${emailError ? 'border-red-500' : 'border-gray-300'} 
          rounded-md text-gray-900 placeholder-gray-500 focus:ring-2 
          focus:ring-purple-500 focus:border-transparent outline-none transition duration-200 
          ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        value={data.email}
        onChange={(e) => {
          onChange('email', e.target.value);
          const emailRegex = /^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}$/;
          // Re-validate email on change
          if (emailRegex.test(e.target.value)) {
            setEmailError(null);
          } else if (emailError) {
            setEmailError("Please enter a valid email address."); // Keep error if still invalid
          }
        }}
      />
      {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}

      <button
        onClick={isCompleted && !isEditing ? onEditToggle : handleNext}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-2 sm:py-3 rounded-md 
          hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 
          focus:ring-purple-500 focus:ring-opacity-50 transition duration-200 shadow-md hover:shadow-lg"
      >
        {isCompleted && !isEditing ? 'Edit Details' : 'Save & Continue'}
      </button>
    </div>
  );
};

export default BasicDetailsForm;
