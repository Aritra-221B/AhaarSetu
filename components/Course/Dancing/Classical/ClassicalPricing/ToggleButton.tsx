import React from 'react';
import { motion } from 'framer-motion';

interface ToggleButtonProps {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ tabs, activeTab, onTabClick }) => {
  return (
    <div role="tablist" className="flex justify-center p-1.5 bg-indigo-100/50 rounded-xl backdrop-blur-sm">
      {tabs.map((tab) => (
        <motion.button
          key={tab}
          onClick={() => onTabClick(tab)}
          role="tab"
          aria-selected={activeTab === tab}
          aria-controls={`panel-${tab.toLowerCase()}`}
          id={`tab-${tab.toLowerCase()}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            relative py-2.5 px-6 sm:px-8 md:px-10
            text-sm sm:text-base font-semibold rounded-lg cursor-pointer
            transition-all duration-300 ease-in-out
            ${
              activeTab === tab
                ? 'text-indigo-700'
                : 'text-gray-600 hover:text-gray-800'
            }
          `}
        >
          {activeTab === tab && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-white rounded-lg shadow-md"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{tab}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default ToggleButton;
