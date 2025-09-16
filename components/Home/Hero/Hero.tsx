import React from 'react';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="/images/hero.png"
        alt="Farm background"
        layout="fill"
        objectFit="cover"
        priority
        className="z-[-2]"
      />
      <div className="absolute inset-0 bg-black opacity-40 z-[-1]"></div> {/* Overlay */}
      <div className="container mx-auto px-6 text-center text-white z-10 py-20 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-lg mb-4">
          Revolutionizing Farm Management
        </h1>
        <p className="mt-4 text-xl md:text-2xl drop-shadow-md max-w-3xl mx-auto mb-8">
          A Digital Medicine Passport for your livestock, ensuring safety and traceability.
        </p>
        <div>
          <a
            href="/dashboard"
            className="inline-block bg-green-500 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-green-600 transform hover:scale-105 transition duration-300 ease-in-out"
          >
            HELLO FARMER!
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
