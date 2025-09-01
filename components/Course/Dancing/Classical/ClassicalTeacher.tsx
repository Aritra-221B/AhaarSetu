"use client";
import React from 'react';
import Image from 'next/image';

import ClassicalTeachers from './ClassicalTeachers';


const ClassicalTeacher = () => {
  return (
    <div className="h-auto bg-gradient-to-br from-blue-50 via-white to-teal-50 py-20">
      <div className="max-w-full mx-auto px-3">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-semibold text-gray-800 mb-6">
            💃 Meet Our <span className="text-teal-600 font-bold">Classical Dance Teachers</span>
          </h2>
        </div>
        
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {/* First set of teachers */}
            {ClassicalTeachers.map((teacher: { name: string; instrument: string; image: string }, index: number) => (
              <div key={index} className="flex-shrink-0 w-80 mx-4">
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-blue-100 overflow-hidden group relative h-96">
                  <Image
                    src={teacher.image}
                    alt={teacher.name}
                    width={320}
                    height={384}
                    className="w-full h-full object-cover rounded-t-2xl"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-white bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{teacher.name}</h3>
                    <p className="text-teal-600 font-medium">{teacher.instrument}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {ClassicalTeachers.map((teacher: { name: string; instrument: string; image: string }, index: number) => (
              <div key={`duplicate-${index}`} className="flex-shrink-0 w-80 mx-4">
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-blue-100 overflow-hidden group relative h-96">
                  <Image
                    src={teacher.image}
                    alt={teacher.name}
                    width={320}
                    height={384}
                    className="w-full h-full object-cover rounded-t-2xl"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-white bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{teacher.name}</h3>
                    <p className="text-teal-600 font-medium">{teacher.instrument}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .animate-scroll {
          animation: scroll 18s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default ClassicalTeacher;
