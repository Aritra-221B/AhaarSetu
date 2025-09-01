import React from 'react'
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative w-full h-screen bg-black text-white overflow-hidden flex items-center justify-center">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        src="/images/hero2.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h3 className="text-lg font-semibold tracking-wide mb-2">
          AWAKEN THE <span className="text-red-500">MUSICIAN WITHIN YOURSELF</span>
        </h3>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
          YOUR MUSIC JOURNEY <br className="hidden sm:block" />
          IS JUST A STEP AWAY
        </h1>

        {/* Value Propositions */}
        <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-white/90 mt-4 mb-6">
          
          <span className="flex items-center gap-1">✔ LEARN WITH US</span>
          <span className="flex items-center gap-1">✔ PLAY YOUR MUSIC</span>
          <span className="flex items-center gap-1">✔ GROW THE COMMUNITY</span>
        </div>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4 mt-4 flex-wrap">
          <Link
            href="/courses"
            className="bg-white text-black px-6 py-3 text-sm font-semibold rounded-full hover:bg-gray-200 transition"
          >
            OUR COURSES
          </Link>
          <Link
            href="#"
            className="bg-red-600 text-white px-6 py-3 text-sm font-semibold rounded-full hover:bg-red-700 transition"
          >
            BOOK YOUR FREE TRIAL NOW→
          </Link>
        </div>

        {/* ✅ Trust Badge */}
        <div className="mt-5">
          <p className="text-sm text-white/80 italic">
            Trusted by learners all over the globe.
          </p>
        </div>

        {/* New Student Special -> For special Offers
        <p className="text-yellow-400 text-sm font-medium mt-4">
          LEARN, PLAY, GROW. Dedicated Customer Support.
        </p> */}
      </div>
    </section>
  );
};

export default Hero;