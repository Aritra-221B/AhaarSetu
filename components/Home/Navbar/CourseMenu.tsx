'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from './CourseMenuData';

const CourseMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Instruments');
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  // Handle click outside to close the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const currentCategory = categories.find(cat => cat.name === selectedCategory) || categories[0];

  return (
    <div className="relative" ref={menuRef}>
      {/* Courses link with underline animation on hover */}
      <div onClick={toggleMenu} className="cursor-pointer">
        <p className="relative text-white text-lg font-medium w-fit block after:block after:content-[''] 
                  after:absolute after:h-[3px] after:bg-yellow-300 after:w-full after:scale-x-0 
                  after:hover:scale-x-100 after:transition duration-300 after:origin-center">
          Courses
        </p>
      </div>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-5 w-[725px] max-w-screen-xl bg-white rounded-xl shadow-2xl overflow-hidden z-50"
            onClick={(e: React.MouseEvent) => e.stopPropagation()} // Prevent clicks inside from closing the menu
          >
            {/* Category header with gradient */}
            <div className={`bg-gradient-to-r ${currentCategory.bgColor} p-2.5 px-5 text-white`}>
              <h3 className="text-2xl font-bold">{currentCategory.name}</h3>
              <p className="text-white/90 mt-1">{currentCategory.description}</p>
            </div>

            <div className="flex">
              {/* Sidebar Categories */}
              <div className="w-40 bg-[#f5f7fa] py-1">
                <ul className="space-y-1">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <button
                        className={`w-full text-left px-5 py-4 flex items-center justify-between transition-colors duration-200 
                        ${selectedCategory === category.name 
                          ? `text-white bg-gradient-to-r ${category.bgColor}` 
                          : 'text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => handleCategorySelect(category.name)}
                      >
                        <span className="font-medium">{category.name}</span>
                        <svg
                          className={`h-5 w-5 ${selectedCategory === category.name ? 'text-white' : 'text-gray-400'}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Items Grid */}
              <div className="flex-1 p-2 bg-white">
                <div className="grid grid-cols-2 gap-2">
                  {currentCategory.items.map((item) => (
                    <Link 
                      key={item.name}
                      href={item.href}
                      prefetch={true}
                      className="flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-md group border border-transparent hover:border-gray-200"
                    >
                      <div className="flex items-center space-x-2 w-full">
                        <div className="w-12 h-12 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center text-2xl group-hover:scale-105 transition-transform duration-200">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="text-gray-800 font-medium group-hover:text-blue-600">{item.name}</h4>
                          <p className="text-gray-500 text-sm">Start learning today</p>
                        </div>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                
                <div className="mt-5 pt-5 mb-5 border-t border-gray-200 flex justify-between items-center">
                  <Link 
                    href="/courses"
                    prefetch={true}
                    className="text-blue-600 hover:text-blue-800 font-semibold flex items-center transition-colors duration-200"
                  >
                    See all {currentCategory.name} courses
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                  
                  <div className="flex space-x-1">
                    {categories.map((category, index) => (
                      <button 
                        key={index}
                        onClick={() => handleCategorySelect(category.name)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          selectedCategory === category.name 
                            ? `bg-gradient-to-r ${category.bgColor} w-4`
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Switch to ${category.name}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseMenu; 