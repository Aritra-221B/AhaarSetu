// components/Faculty.tsx
import React from 'react';
import facultyMembers from './facultyMembers';
import FacultyCard from './FacultyCard';
import { Users, Music, Sparkles } from 'lucide-react';

const instrumentSections = [
  'PIANO',
  'GUITAR',
  'UKULELE',
  'VIOLIN',
  'DRUMS',
  'WESTERN VOCALS',
  'HINDUSTANI VOCALS',
  'MUSIC PRODUCTION',
];

const Faculty = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-tr from-gray-800 via-gray-900 to-black py-20 px-6 overflow-hidden">
      {/* Animated Background */}
      
      {/* Section Header */}
      <div className="relative z-10 text-center mb-20">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full mb-8 shadow-2xl">
          <Users className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
          Meet Our{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Faculty
          </span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Learn from highly experienced instructors across a range of instruments and disciplines.
        </p>
        <div className="flex justify-center items-center mt-8 space-x-4">
          <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-indigo-400"></div>
          <Music className="w-6 h-6 text-indigo-400" />
          <div className="w-8 h-0.5 bg-gradient-to-r from-indigo-400 to-transparent"></div>
        </div>
      </div>

      {/* Faculty Groups */}
      <div className="relative z-10">
        {instrumentSections.map((section) => {
          const filtered = facultyMembers.filter((m) => m.instrument === section);
          if (filtered.length === 0) return null;

          return (
            <div key={section} className="mb-20">
              <h3 className="text-2xl font-bold text-indigo-200 mb-8 text-center uppercase tracking-widest">
                {section}
              </h3>
              <div className="flex flex-wrap justify-center gap-x-12 gap-y-16 max-w-7xl mx-auto">
                {filtered.map((member, index) => (
                  <FacultyCard
                    key={index}
                    name={member.name}
                    image={member.image}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Sparkle */}
      <div className="relative z-10 text-center mt-20">
        <div className="inline-flex items-center space-x-2 text-indigo-300">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Inspiring Excellence in Music Education</span>
          <Sparkles className="w-4 h-4" />
        </div>
      </div>
    </section>
  );
};

export default Faculty;