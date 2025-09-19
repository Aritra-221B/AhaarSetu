"use client";

import React from 'react';
import { QrCode } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function ScanQRPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-700 via-green-600 to-green-500 flex flex-col items-center justify-center p-4">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-extrabold text-white mb-10 drop-shadow-lg"
      >
        QR Code Scanner
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 text-center max-w-lg w-full transform hover:scale-105 transition-transform duration-300"
      >
        <div className="flex justify-center mb-8">
          <QrCode className="text-green-600 w-24 h-24 sm:w-32 sm:h-32" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Scan?</h2>
        <p className="text-gray-600 mb-6">Click the button below to start scanning QR codes with your device camera.</p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/scan-qr/start')}
          className="w-full text-xl font-bold py-4 px-6 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:from-purple-700 hover:to-blue-700 transition duration-300"
        >
          Start Scanning
        </motion.button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 text-white text-sm opacity-80"
      >
        © 2024 QR Scanner App. Built with React and TypeScript.
      </motion.p>
    </div>
  );
}