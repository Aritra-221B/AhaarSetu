'use client';
import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
  const pathname = usePathname();
  
  return (
    <header className="sticky top-0 z-[900] bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-green-100 text-green-700 font-semibold">AS</span>
          <span className="text-lg font-semibold text-gray-800">AhaarSetu</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/" className="text-gray-700 hover:text-green-700 transition-colors">
            Home
          </Link>
          <Link href="/animal-verification" className="text-gray-700 hover:text-green-700 transition-colors">
            Animal Verification
          </Link>
          <Link
            href="/traininghub"
            className={`px-3 py-1 rounded-md transition-colors ${
              pathname === '/traininghub'
                ? "bg-green-100 text-green-800"
                : "text-gray-700 hover:text-green-700"
            }`}
          >
            Training Hub
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
