import React from 'react';

const LanguageSwitcher: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 text-gray-50 text-base font-medium">
      <span className="hover:text-green-600 cursor-pointer transition-colors duration-200">भाषा</span>
      <span className="text-gray-400">|</span>
      <span className="hover:text-green-600 cursor-pointer transition-colors duration-200">English</span>
    </div>
  );
};

export default LanguageSwitcher;
