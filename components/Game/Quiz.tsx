import React from 'react';

interface QuizProps {
  options: string[];
  onAnswer: (answer: string) => void;
}

const Quiz: React.FC<QuizProps> = ({ options, onAnswer }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg mt-8">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onAnswer(option)}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold py-5 px-4 rounded-xl shadow-lg transform transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-2xl text-2xl tracking-wide"
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Quiz;
