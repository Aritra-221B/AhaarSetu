import React from 'react';

const ArrivingSoon = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-800 via-gray-900 to-black relative overflow-hidden">
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 z-10"></div>

      {/* Text Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center text-white px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-fadeIn opacity-90">
            ARRIVING SOON
          </h1>
        </div>
      </div>
    </section>
  );
};

export default ArrivingSoon;
