// components/SchedulePreferencesForm.tsx
import React from 'react';
import { useRouter } from 'next/navigation';
import { countries } from '../../constant/countries'; // Import the countries data

interface Props {
  data: {
    country: string;
    date: string;
    time: string;
    consent: boolean;
  };
  onChange: (field: string, value: string | boolean) => void;
  onSubmit: () => void;
  isLoading: boolean; // New prop for loading state
  onValidationFail: () => void; // New prop for validation failure
}

const SchedulePreferencesForm: React.FC<Props> = ({ data, onChange, onSubmit, onValidationFail, isLoading }) => {
  const router = useRouter();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Function to generate time slots from 6:00 AM to 12:00 AM (midnight) with 30-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    let hour = 6;
    let minute = 0;

    while (true) {
      if (hour > 23 || (hour === 0 && minute === 0 && slots.length > 0)) { // Stop at 12:00 AM after first iteration
        break;
      }
      const ampm = hour < 12 ? 'AM' : 'PM';
      const displayHour = hour === 0 ? 12 : (hour > 12 ? hour - 12 : hour);
      const displayMinute = minute === 0 ? '00' : String(minute);
      slots.push(`${displayHour}:${displayMinute} ${ampm}`);

      minute += 30;
      if (minute === 60) {
        minute = 0;
        hour++;
      }
      if (hour === 24) { // Handle transition from 11:30 PM to 12:00 AM
        hour = 0;
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleSubmit = () => {
    const { country, date, time, consent } = data;
    if (!country || !date || !time) {
      onValidationFail(); // Call the new prop on validation failure
      return; // Stop execution
    }
    if (!consent) {
      onValidationFail(); // Call the new prop on validation failure
      return; // Stop execution
    }
    onSubmit();
    router.push('/'); // Redirect to home page
  };

  return (
    <div className="space-y-4 sm:space-y-6 bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-xl border border-gray-200 w-full sm:w-[600px] md:w-[700px] lg:w-[800px]">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-4 sm:mb-6">
        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Scheduling Preferences</span>
      </h2>

      <select
        className="w-full p-2 sm:p-3 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-200"
        value={data.country}
        onChange={(e) => onChange('country', e.target.value)}
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.code} value={country.name}>{country.name}</option>
        ))}
      </select>

      <p className="text-sm sm:text-md font-semibold text-center mt-3 sm:mt-4 mb-3 sm:mb-4 px-2">
        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Date and time slots are according to Indian Hours (IST).</span>
      </p>

      <input
        type="date"
        className="w-full p-2 sm:p-3 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-200"
        min={minDate}
        value={data.date}
        onChange={(e) => onChange('date', e.target.value)}
      />

      <select
        className="w-full p-2 sm:p-3 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-200"
        value={data.time}
        onChange={(e) => onChange('time', e.target.value)}
      >
        <option value="">Select Time Slot</option>
        {timeSlots.map((slot) => (
          <option key={slot} value={slot}>{slot}</option>
        ))}
      </select>

      <label className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-md cursor-pointer">
        <input
          type="checkbox"
          checked={data.consent}
          onChange={(e) => onChange('consent', e.target.checked)}
          className="form-checkbox h-4 w-4 text-purple-600 rounded border-gray-500 focus:ring-purple-500 focus:ring-offset-2 transition duration-200 mt-0.5 flex-shrink-0"
        />
        <span className="text-sm sm:text-base text-gray-700 font-medium">
          I agree to be contacted by <span className="font-semibold text-purple-700">Chordscraft Institute Of Music</span> for scheduling and follow-up purposes.
        </span>
      </label>

      <button 
        onClick={handleSubmit} 
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-2 sm:py-3 rounded-md 
          hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 
          focus:ring-purple-500 focus:ring-opacity-50 transition duration-200 shadow-md hover:shadow-lg
          relative flex items-center justify-center"
        disabled={isLoading} // Disable when loading
      >
        {isLoading ? (
          <div className="flex items-center">
            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Scheduling...
          </div>
        ) : (
          'Schedule Trial Class'
        )}
      </button>

      <p className="text-xs sm:text-sm text-gray-600 mt-2 text-center px-2">
        <span className="font-semibold text-orange-500">⚠️</span> Trial class bookings are subject to instructor availability. You&apos;ll receive a confirmation within 24 hours.
      </p>
    </div>
  );
};

export default SchedulePreferencesForm;
