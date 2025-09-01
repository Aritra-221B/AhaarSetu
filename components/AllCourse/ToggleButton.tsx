import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ToggleButtonProps {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ tabs, activeTab, onTabClick }) => {
  const buttonRefs = useRef(new Map<string, HTMLButtonElement>());
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const activeTabButton = buttonRefs.current.get(activeTab);
      if (activeTabButton) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const buttonRect = activeTabButton.getBoundingClientRect();
        setIndicatorStyle({
          left: buttonRect.left - containerRect.left,
          width: buttonRect.width,
        });
      }
    }
  }, [activeTab, tabs]);

  return (
    <div
      role="tablist"
      ref={containerRef}
      className="relative flex justify-center p-1.5 bg-indigo-100/50 rounded-xl backdrop-blur-sm"
    >
      <motion.div
        layoutId="activeTab"
        className="absolute top-0 bottom-0 bg-indigo-600 rounded-lg shadow-lg"
        initial={false}
        animate={indicatorStyle}
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        style={{ zIndex: 0 }}
      />
      {tabs.map((tab) => (
        <motion.button
          key={tab}
          ref={(el) => {
            if (el) {
              buttonRefs.current.set(tab, el);
            } else {
              buttonRefs.current.delete(tab);
            }
          }}
          onClick={() => onTabClick(tab)}
          role="tab"
          aria-selected={activeTab === tab}
          aria-controls={`panel-${tab.toLowerCase()}`}
          id={`tab-${tab.toLowerCase()}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            relative py-2.5 px-6 sm:px-8 md:px-10
            text-sm sm:text-base font-semibold rounded-lg cursor-pointer
            transition-all duration-300 ease-in-out
            ${
              activeTab === tab
                ? 'text-white'
                : 'text-indigo-700 hover:text-indigo-900'
            }
          `}
        >
          <span className="relative z-10">{tab}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default ToggleButton;
