import React from 'react';
import Link from 'next/link';
import { FiPhone } from 'react-icons/fi';

const FooterLinks: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-gray-600 md:text-base md:gap-x-8">
      <div className="flex items-center space-x-1">
        <FiPhone className="text-lg text-green-600" />
        <span className="font-semibold">Help & Support:</span>
        <span className="font-medium text-gray-700">+91-1234-567-890</span>
      </div>
      <Link href="#" className="text-gray-600 hover:text-green-600 transition-colors duration-200">Privacy Policy</Link>
      <Link href="#" className="text-gray-600 hover:text-green-600 transition-colors duration-200">Terms & Conditions</Link>
    </div>
  );
};

export default FooterLinks;
