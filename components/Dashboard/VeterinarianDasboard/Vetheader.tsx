"use client";
import React from "react";
import Link from "next/link";
import { Home, Stethoscope, PawPrint, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function VetHeader() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center justify-between px-8 py-4 bg-white shadow-lg rounded-b-xl border-b border-gray-200"
    >
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-600 font-bold text-xl shadow-sm">
          AS
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900">AhaarSetu</h1>
      </div>

      {/* Navigation */}
      <nav className="flex space-x-6">
        <Link href="/" passHref legacyBehavior>
          <motion.a
            whileHover={{ scale: 1.05, color: "#22C55E" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-base font-medium text-gray-600 hover:text-green-600 transition-colors duration-200"
          >
            <Home size={18} />
            Home
          </motion.a>
        </Link>
        <Link href="/vetdashboard" passHref legacyBehavior>
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: "0 4px 10px rgba(34,197,94,0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-base font-semibold text-white px-4 py-2 rounded-lg bg-green-600 shadow-md hover:bg-green-700 transition-all duration-200"
          >
            <Stethoscope size={18} />
            Veterinarian Portal
          </motion.a>
        </Link>
        <Link href="/animal-verification" passHref legacyBehavior>
          <motion.a
            whileHover={{ scale: 1.05, color: "#22C55E" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-base font-medium text-gray-600 hover:text-green-600 transition-colors duration-200"
          >
            <PawPrint size={18} />
            Animal Verification
          </motion.a>
        </Link>
        <Link href="/training-hub" passHref legacyBehavior>
          <motion.a
            whileHover={{ scale: 1.05, color: "#22C55E" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-base font-medium text-gray-600 hover:text-green-600 transition-colors duration-200"
          >
            <BookOpen size={18} />
            Training Hub
          </motion.a>
        </Link>
      </nav>
    </motion.header>
  );
}
