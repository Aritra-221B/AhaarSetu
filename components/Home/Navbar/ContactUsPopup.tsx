'use client';

import React, { useState } from 'react';
import { X, PhoneCall, Mail } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const ContactUsPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [selected, setSelected] = useState<'call' | 'email'>('call');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4 sm:px-6">
      <div className="bg-white rounded-xl p-5 sm:p-6 md:p-8 shadow-xl w-full max-w-md sm:max-w-lg md:max-w-xl relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Heading */}
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 text-center">Need help?</h3>
        <p className="text-sm sm:text-base text-gray-600 mb-5 text-center">
          Contact our <span className="font-medium text-gray-800">Customer Support Team</span>
        </p>

        {/* Responsive Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={() => setSelected('call')}
            className={`flex-1 text-center p-4 rounded-lg transition ${
              selected === 'call'
                ? 'bg-blue-100 shadow-md'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <PhoneCall className="mx-auto mb-2 text-indigo-600 w-6 h-6" />
            <p className="font-semibold text-gray-800">Call</p>
          </button>

          <button
            onClick={() => setSelected('email')}
            className={`flex-1 text-center p-4 rounded-lg transition ${
              selected === 'email'
                ? 'bg-blue-100 shadow-md'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <Mail className="mx-auto mb-2 text-red-600 w-6 h-6" />
            <p className="font-semibold text-red-600">Email</p>
          </button>
        </div>

        {/* Animated Contact Detail */}
        <div className="text-center min-h-[60px] sm:min-h-[70px]">
          <AnimatePresence mode="wait">
            {selected === 'call' ? (
              <motion.div
                key="call"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-1">Contact Us</h4>
                <p className="text-red-600 text-lg sm:text-xl font-semibold">+91 1234567890</p>
              </motion.div>
            ) : (
              <motion.div
                key="email"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-1">Email Us</h4>
                <p className="text-red-600 text-sm sm:text-base font-semibold">info@chordscraftinstituteofmusic.com</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPopup;