"use client";
import React, { useState } from 'react';
import { Users, Star, Sparkles, Music } from 'lucide-react';
import teamMembers from './teamMember';
// Mock team members data - replace with your actual data


interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
}

const TeamCard = ({ name, role, image }: TeamCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating background glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-700"></div>
      
      {/* Main card */}
      <div className="relative w-full max-w-[320px] h-[400px] mx-auto">
        {/* Gradient border */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 p-[2px] group-hover:from-purple-400 group-hover:via-pink-400 group-hover:to-indigo-400 transition-all duration-500">
          <div className="w-full h-full rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/20 overflow-hidden transition-all duration-500 group-hover:bg-white/10 group-hover:backdrop-blur-3xl">
            
            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-1 h-1 bg-white/40 rounded-full animate-pulse ${
                    isHovered ? 'animate-bounce' : ''
                  }`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: '3s'
                  }}
                />
              ))}
            </div>

            {/* Image Section */}
            <div className="relative w-full h-[300px] overflow-hidden">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Floating icon */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                <Star className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Content Section */}
            <div className="relative p-1 text-center space-y-4">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-b-3xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2 transform transition-transform duration-300 group-hover:scale-105">
                  {name}
                </h3>
                <p className="text-purple-200 text-sm font-medium mb-3 transform transition-transform duration-300 group-hover:scale-105">
                  {role}
                </p>
                
                {/* Animated underline */}
                <div className="w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto transition-all duration-500 group-hover:w-16"></div>
                
                {/* Sparkle effect */}
                <div className="flex justify-center mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Sparkles className="w-5 h-5 text-purple-300 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CoreTeam = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black py-20 px-6 overflow-hidden">
      {/* Animated background */}
      
      {/* Header Section */}
      <div className="relative z-10 text-center mb-20">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-10 mb-8 shadow-2xl">
          <Users className="w-10 h-10 text-white" />
        </div>
        
        <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
          Meet Our{' '}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
            Core Team
          </span>
        </h2>
        
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          The passionate minds behind ChordsCraft — guiding, managing, and inspiring our musical community with expertise and dedication.
        </p>
        
        {/* Decorative elements */}
        <div className="flex justify-center items-center mt-8 space-x-4">
          <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-purple-400"></div>
          <Music className="w-6 h-6 text-purple-400" />
          <div className="w-8 h-0.5 bg-gradient-to-r from-purple-400 to-transparent"></div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {teamMembers.map((member: TeamMember, index: number) => (
          <TeamCard
            key={`${member.name}-${index}`}
            name={member.name}
            role={member.role}
            image={member.image}
          />
        ))}
      </div>

      {/* Bottom decoration */}
      <div className="relative z-10 text-center mt-20">
        <div className="inline-flex items-center space-x-2 text-purple-300">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Inspiring Excellence in Music Education</span>
          <Sparkles className="w-4 h-4" />
        </div>
      </div>
    </section>
  );
};

export default CoreTeam;