import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1a202c] text-gray-200 py-10">
      <div className="container mx-auto px-6 py-12">
        <div className="md:flex md:justify-between md:items-start space-y-8 md:space-y-0">
          <div className="mb-8 md:mb-0 max-w-sm">
            <h3 className="text-3xl font-bold text-white mb-2">AHAARSETU</h3>
            <p className="text-gray-400 text-lg">Modernizing agriculture, one farm at a time.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            <div>
              <h4 className="font-bold text-white text-xl mb-4">Platform</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/features" className="text-gray-400 hover:text-white transition-colors duration-300">Features</Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors duration-300">Pricing</Link>
                </li>
                <li>
                  <Link href="/tutorials" className="text-gray-400 hover:text-white transition-colors duration-300">Tutorials</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white text-xl mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-300">About Us</Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-white transition-colors duration-300">Blog</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white text-xl mb-4">Social</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Facebook</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Twitter</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">LinkedIn</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 text-center border-t border-gray-700">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} AHAARSETU. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
