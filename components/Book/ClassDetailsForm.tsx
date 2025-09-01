import React from 'react';

interface Props {
  data: {
    age: string;
    gender: string;
    course: string;
    skill: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  isEditing: boolean;
  isCompleted: boolean;
  onEditToggle: () => void;
  onValidationFail: () => void; // New prop for validation failure
}

const ClassDetailsForm: React.FC<Props> = ({
  data,
  onChange,
  onNext,
  isEditing,
  isCompleted,
  onEditToggle,
  onValidationFail // Destructure new prop
}) => {
  const handleNext = () => {
    const { age, gender, course, skill } = data;
    if (!age || !gender || !course || !skill) {
      onValidationFail(); // Call the new prop on validation failure
      return; // Stop execution
    }
    onNext();
  };

  const disableInputClass = !isEditing ? 'bg-gray-100 cursor-not-allowed' : '';

  return (
    <div className="space-y-4 sm:space-y-6 bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-xl border border-gray-200 w-full sm:w-[600px] md:w-[700px] lg:w-[800px]">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-4 sm:mb-6">
        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Class Details
        </span>
      </h2>

      <select
        disabled={!isEditing}
        className={`w-full p-2 sm:p-3 border border-gray-300 rounded-md text-gray-900 focus:ring-2 
          focus:ring-purple-500 focus:border-transparent outline-none transition duration-200 ${disableInputClass}`}
        value={data.age}
        onChange={(e) => onChange('age', e.target.value)}
      >
        <option value="">Select Age</option>
        {Array.from({ length: 70 }, (_, i) => (
          <option key={i + 4} value={String(i + 4)}>{i + 4}</option>
        ))}
      </select>

      <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 md:gap-x-12 md:gap-y-4 justify-center">
        {['Male', 'Female', 'Other'].map((gender) => (
          <label key={gender} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={data.gender === gender}
              disabled={!isEditing}
              onChange={() => onChange('gender', gender)}
              className={`appearance-none h-4 w-4 rounded-full border border-gray-500 
                checked:bg-purple-600 checked:border-transparent focus:outline-none 
                focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200 
                ${disableInputClass}`}
            />
            <span className="text-gray-700 font-medium">{gender}</span>
          </label>
        ))}
      </div>

      <select
        disabled={!isEditing}
        className={`w-full p-2 sm:p-3 border border-gray-300 rounded-md text-gray-900 focus:ring-2 
          focus:ring-purple-500 focus:border-transparent outline-none transition duration-200 ${disableInputClass}`}
        value={data.course}
        onChange={(e) => onChange('course', e.target.value)}
      >
        <option value="">Select Course</option>
        <option value="Piano">Piano</option>
        <option value="Acoustic Guitar">Acoustic Guitar</option>
        <option value="Electric Guitar">Electric Guitar</option>
        <option value="Ukulele">Ukulele</option>
        <option value="Violin">Violin</option>
        <option value="Drums">Drums</option>
        <option value="Western Vocals">Western Vocals</option>
        <option value="Hindustani Vocals">Hindustani Vocals</option>
        <option value="Music Production">Music Production</option>
      </select>

      <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 md:gap-x-12 md:gap-y-4 justify-center">
        {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
          <label key={level} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="skill"
              value={level}
              checked={data.skill === level}
              disabled={!isEditing}
              onChange={() => onChange('skill', level)}
              className={`appearance-none h-4 w-4 rounded-full border border-gray-500 
                checked:bg-purple-600 checked:border-transparent focus:outline-none 
                focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200 
                ${disableInputClass}`}
            />
            <span className="text-gray-700 font-medium">{level}</span>
          </label>
        ))}
      </div>

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

export default ClassDetailsForm;
