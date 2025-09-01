// components/FoundersDesk.tsx
'use client';
import React from 'react';
import { motion } from "framer-motion";

export default function FoundersDesk() {
  return (
    <section className="bg-white py-16 px-4 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl mx-auto"
      >
        <div className="grid md:grid-cols-2 gap-10 items-center rounded-2xl shadow-2xl p-6 bg-gray-50">
          {/* Video Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative rounded-2xl overflow-hidden shadow-md"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/images/fallback.jpg"
              className="w-full h-full object-cover rounded-2xl"
            >
              <source src="/images/founder-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>

          {/* Text */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
              From the Founder's Desk
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mb-4">
              Our journey is driven by passion and purpose. Every challenge we
              face is an opportunity to build better, smarter, and more
              human-centered solutions.
            </p>
            <p className="text-gray-600 text-base sm:text-lg mb-6">
              I'm deeply grateful for your trust and support as we continue
              pushing boundaries together.
            </p>
            <div>
              <p className="text-lg font-semibold text-gray-800">Jane Doe</p>
              <p className="text-gray-500">Founder & CEO</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}