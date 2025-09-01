import React from 'react';
import { Piano, GraduationCap, ClipboardCheck, Sheet, Mic, Music, Globe } from "lucide-react";


const DrumsAbout = () => {
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
            About Drums Course
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </div>
        {/* Main Content */}
        <div className="max-w-9xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
            <div className="text-lg md:text-xl text-gray-200 leading-relaxed space-y-6">
              <p className="text-2xl md:text-3xl font-semibold text-white mb-8">
                Transform Your Musical Journey
              </p>
              
              <p>
                At <span className="text-purple-300 font-bold">ChordsCraft Institute of Music</span>, our online Drums program is designed by expert musicians to support learners of all ages—whether you're just starting out or aiming to level up your skills.
              </p>
              
              <p>
                Our curriculum is tailored for both hobby learners and students aiming for certification. Whether you're preparing for <span className="text-pink-300 font-semibold">Trinity or ABRSM</span> exams or simply wish to explore <span className="text-purple-300 font-semibold">Bollywood, Western Pop, or Classical music</span>, our sessions adapt to your needs and pace.
              </p>
              
              <p>
                We offer full support for students appearing for <span className="text-pink-300 font-semibold">Trinity</span> and <span className="text-purple-300 font-semibold">ABRSM</span> exams — from registration and video submissions to personal exam guidance. Once you complete the exam, your <span className="text-yellow-300 font-semibold">certificate will be delivered to your home</span>, anywhere in the world.
              </p>
            </div>
          </div>
        </div>
        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
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
            <p className="text-gray-300">Learn from trained, experienced musicians with real industry and teaching backgrounds.</p>
          </div>

          {/* Exam & Certification Support */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-full mb-4">
              <ClipboardCheck className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Exam & Certification</h3>
            <p className="text-gray-300">Trinity & ABRSM exam support including registration and video submissions.</p>
          </div>

          {/* Sheet Music & Learning Paths */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-full mb-4">
              <Sheet className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Sheet Music & Learning Paths</h3>
            <p className="text-gray-300">Curated library for all levels — Bollywood, Pop, Movie Themes, Trinity Grades & more.</p>
          </div>

          {/* Global Accessibility */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-full mb-4">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Global Accessibility</h3>
            <p className="text-gray-300">Join from anywhere in the world — all you need is a device and an internet connection.</p>
          </div>

          {/* Performance Opportunities */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-full mb-4">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Performance Opportunities</h3>
            <p className="text-gray-300">Participate in student recitals, YouTube showcases, and studio recordings.</p>
          </div>
        </div>


        {/* Call to Action */}
        <div className="text-center mt-16">
        </div>
      </div>
    </section>
  );
};

export default DrumsAbout;