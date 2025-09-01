import React from 'react';
import { Piano, GraduationCap, ClipboardCheck, Sheet, Mic, Music, Globe } from "lucide-react";

const WesternAbout = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-800 via-gray-900 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20"></div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 shadow-lg">
            <Music className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            About Western Singing Course
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </div>
        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {/* Live Personalized Classes */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-full mb-4">
              <Piano className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Live Personalized Classes</h3>
            <p className="text-gray-300">Every session is tailored to your pace, interests, and skill level — no one-size-fits-all lessons.</p>
          </div>
          {/* Expert Faculty */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-full mb-4">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Expert Faculty</h3>
            <p className="text-gray-300">Learn from trained, experienced vocalists with real industry and teaching backgrounds.</p>
          </div>
          {/* Vocal Training & Learning Paths */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-full mb-4">
              <Sheet className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Vocal Training & Learning Paths</h3>
            <p className="text-gray-300">Curated training for all levels — Pop, Jazz, Musical Theatre, and Contemporary styles.</p>
          </div>
          {/* Global Accessibility */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-full mb-4">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Global Accessibility</h3>
            <p className="text-gray-300">Join from anywhere in the world — all you need is a device and an internet connection.</p>
          </div>
          
        </div>
        {/* Call to Action */}
        <div className="text-center mt-16">
        </div>
      </div>
    </section>
  );
};

export default WesternAbout;