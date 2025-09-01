"use client";
import React from 'react';

import teacherData from './teacherData';


const Teacher = () => {
  // Filter and take the first 10 teachers for the top row
  const topTeachers = teacherData.slice(0, 10);
  // Filter and take the next 10 teachers for the bottom row
  const bottomTeachers = teacherData.slice(10, 20);

  return (
    <div className="h-auto bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20">
      <div className="max-w-full mx-auto px-3">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-semibold text-gray-800 mb-6">
            🎹 Meet Our <span className="text-teal-600 font-bold">Faculty Members</span>
          </h2>
        </div>
        
        <div className="relative overflow-hidden mb-8">
          <div className="flex animate-scroll-top">
            {/* Top row of teachers */}
            {topTeachers.map((teacher: { name: string; instrument: string; image: string; qualification: string; rating: string; experience: string }, index: number) => (
              <div key={index} className="flex-shrink-0 w-80 mx-4">
                <div className="bg-white rounded-2xl shadow-lg border border-indigo-200 overflow-hidden relative h-auto group transform transition-transform duration-300 hover:-translate-y-2">
                  <div className="h-60 w-full overflow-hidden relative">
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                  </div>
                  <div className="p-5 text-center bg-white">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 leading-tight">{teacher.name}</h3>
                    <p className="text-blue-600 font-semibold text-lg mb-3">{teacher.instrument}</p>
                    <div className="text-gray-700 text-base space-y-1.5">
                      <p><span className="font-medium">Qualification:</span> <span className="font-normal text-gray-900">{teacher.qualification}</span></p>
                      <p className="flex items-center justify-center"><span className="font-medium mr-1">Rating:</span> <span className="font-normal text-gray-900">{teacher.rating}</span> <span className="text-yellow-500 ml-1">⭐</span></p>
                      <p><span className="font-medium">Experience:</span> <span className="font-normal text-gray-900">{teacher.experience}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Duplicate top row for seamless loop */}
            {topTeachers.map((teacher: { name: string; instrument: string; image: string; qualification: string; rating: string; experience: string }, index: number) => (
              <div key={`duplicate-top-${index}`} className="flex-shrink-0 w-80 mx-4">
                <div className="bg-white rounded-2xl shadow-lg border border-indigo-200 overflow-hidden relative h-auto group transform transition-transform duration-300 hover:-translate-y-2">
                  <div className="h-60 w-full overflow-hidden relative">
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                  </div>
                  <div className="p-5 text-center bg-white">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 leading-tight">{teacher.name}</h3>
                    <p className="text-blue-600 font-semibold text-lg mb-3">{teacher.instrument}</p>
                    <div className="text-gray-700 text-base space-y-1.5">
                      <p><span className="font-medium">Qualification:</span> <span className="font-normal text-gray-900">{teacher.qualification}</span></p>
                      <p className="flex items-center justify-center"><span className="font-medium mr-1">Rating:</span> <span className="font-normal text-gray-900">{teacher.rating}</span> <span className="text-yellow-500 ml-1">⭐</span></p>
                      <p><span className="font-medium">Experience:</span> <span className="font-normal text-gray-900">{teacher.experience}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden mt-8">
          <div className="flex animate-scroll-bottom">
            {/* Bottom row of teachers */}
            {bottomTeachers.map((teacher: { name: string; instrument: string; image: string; qualification: string; rating: string; experience: string }, index: number) => (
              <div key={`bottom-${index}`} className="flex-shrink-0 w-80 mx-4">
                <div className="bg-white rounded-2xl shadow-lg border border-indigo-200 overflow-hidden relative h-auto group transform transition-transform duration-300 hover:-translate-y-2">
                  <div className="h-60 w-full overflow-hidden relative">
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                  </div>
                  <div className="p-5 text-center bg-white">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 leading-tight">{teacher.name}</h3>
                    <p className="text-blue-600 font-semibold text-lg mb-3">{teacher.instrument}</p>
                    <div className="text-gray-700 text-base space-y-1.5">
                      <p><span className="font-medium">Qualification:</span> <span className="font-normal text-gray-900">{teacher.qualification}</span></p>
                      <p className="flex items-center justify-center"><span className="font-medium mr-1">Rating:</span> <span className="font-normal text-gray-900">{teacher.rating}</span> <span className="text-yellow-500 ml-1">⭐</span></p>
                      <p><span className="font-medium">Experience:</span> <span className="font-normal text-gray-900">{teacher.experience}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Duplicate bottom row for seamless loop */}
            {bottomTeachers.map((teacher: { name: string; instrument: string; image: string; qualification: string; rating: string; experience: string }, index: number) => (
              <div key={`duplicate-bottom-${index}`} className="flex-shrink-0 w-80 mx-4">
                <div className="bg-white rounded-2xl shadow-lg border border-indigo-200 overflow-hidden relative h-auto group transform transition-transform duration-300 hover:-translate-y-2">
                  <div className="h-60 w-full overflow-hidden relative">
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                  </div>
                  <div className="p-5 text-center bg-white">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 leading-tight">{teacher.name}</h3>
                    <p className="text-blue-600 font-semibold text-lg mb-3">{teacher.instrument}</p>
                    <div className="text-gray-700 text-base space-y-1.5">
                      <p><span className="font-medium">Qualification:</span> <span className="font-normal text-gray-900">{teacher.qualification}</span></p>
                      <p className="flex items-center justify-center"><span className="font-medium mr-1">Rating:</span> <span className="font-normal text-gray-900">{teacher.rating}</span> <span className="text-yellow-500 ml-1">⭐</span></p>
                      <p><span className="font-medium">Experience:</span> <span className="font-normal text-gray-900">{teacher.experience}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        .animate-scroll-top {
          animation: scroll-top 35s linear infinite;
        }
        .animate-scroll-bottom {
          animation: scroll-bottom 35s linear infinite;
        }
        
        .animate-scroll-top:hover, .animate-scroll-bottom:hover {
          animation-play-state: paused;
        }
        
        @keyframes scroll-top {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-160%); /* Adjust as needed based on content width */
          }
        }

        @keyframes scroll-bottom {
          0% {
            transform: translateX(-160%); /* Adjust as needed based on content width */
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Teacher;