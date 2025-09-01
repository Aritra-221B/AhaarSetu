"use client";
// components/FacultyCard.tsx
import React, { useState } from 'react';
import Image from 'next/image';


interface FacultyCardProps {
  name: string;
  image: string;
  className?: string;
}

const FacultyCard = ({ name, image, className }: FacultyCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`group relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating background glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-700"></div>
      {/* Main card */}
      <div className="relative w-[280px] sm:w-[300px] lg:w-[320px] h-[400px]">
        {/* Gradient border */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px] group-hover:from-indigo-400 group-hover:via-purple-400 group-hover:to-pink-400 transition-all duration-500">
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
              <Image
                src={image}
                alt={name}
                fill
                className="rounded-t-3xl object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            {/* Content Section */}
            <div className="relative p-1 text-center space-y-4">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-pink-500/10 rounded-b-3xl"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2 transform transition-transform duration-300 group-hover:scale-105">
                  {name}
                </h3>
                {/* Animated underline */}
                <div className="w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-pink-400 mx-auto transition-all duration-500 group-hover:w-16"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyCard;