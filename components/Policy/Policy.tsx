import React from 'react';
import { MessageCircle } from 'lucide-react';
import Image from 'next/image';

const Policy = () => {
  return (
    <div className="bg-gradient-to-br from-white to-indigo-50 border border-indigo-100 rounded-3xl p-4 sm:p-6 md:p-8 my-8 sm:my-12 md:my-16 mx-auto shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8 max-w-6xl px-3 sm:px-6 lg:px-8">
      {/* Illustration */}
      <div className="w-full md:w-1/3 flex justify-center transform hover:scale-105 transition-transform duration-300">
        <Image
          src="/images/Policy.png"
          alt="Policy Illustration"
          width={200}
          height={200}
          className="object-contain drop-shadow-lg w-[180px] sm:w-[200px] md:w-[250px]"
        />
      </div>

      {/* Policy Content */}
      <div className="w-full md:w-2/3">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-indigo-700 flex items-center gap-2 sm:gap-3">
          <span className="bg-indigo-100 p-1.5 sm:p-2 rounded-lg">📌</span>
          Policies & Information
        </h3>

        <ul className="space-y-3 sm:space-y-4">
          <li className="flex items-start gap-2 sm:gap-3 text-gray-700 hover:text-indigo-700 transition-colors duration-200 text-sm sm:text-base">
            <span className="text-indigo-500 mt-1">•</span>
            <span>
              All listed rates are <span className="font-semibold text-gray-900">exclusive of GST</span>.
            </span>
          </li>
          <li className="flex items-start gap-2 sm:gap-3 text-gray-700 hover:text-indigo-700 transition-colors duration-200 text-sm sm:text-base">
            <span className="text-indigo-500 mt-1">•</span>
            <span>
              <span className="font-semibold text-gray-900">Standard charges</span> may apply for highly qualified instructors' classes.
            </span>
          </li>
          <li className="flex items-start gap-2 sm:gap-3 text-gray-700 hover:text-indigo-700 transition-colors duration-200 text-sm sm:text-base">
            <span className="text-indigo-500 mt-1">•</span>
            <span>
              Flexible class schedules and session customization available — 
              <span className="font-semibold text-gray-900"> additional charges applicable</span>.
            </span>
          </li>
        </ul>

        <div className="mt-6 sm:mt-8 flex items-start gap-2 sm:gap-3 text-gray-800 bg-white rounded-xl p-3 sm:p-5 shadow-sm border border-indigo-100 hover:border-indigo-200 transition-colors duration-200">
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 mt-0.5 flex-shrink-0" />
          <span className="text-xs sm:text-sm leading-relaxed">
            For any queries, feel free to reach out via WhatsApp at{' '}
            <a
              href="https://wa.me/918902736800"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-700 font-medium hover:text-indigo-800 hover:underline transition-colors duration-200"
            >
              +91 89027 36800
            </a>
            .
          </span>
        </div>
      </div>
    </div>
  );
};

export default Policy;