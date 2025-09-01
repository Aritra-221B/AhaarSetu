import React from "react";
import Image from "next/image";
const FluteCourse = () => {
  return (
    <div>
      <section className="relative flex items-center justify-center bg-black text-white py-20 px-6 md:px-12 min-h-[40rem] opacity-90">
        <Image src="/images/instruments_BG/BG FLUTE.png" alt="Piano Background" layout="fill" objectFit="cover" className="absolute inset-0 z-0 object-cover opacity-30"/>
        <div className="relative z-10 text-center max-w-8xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 mt-40">
            Master the Flute — Anytime, Anywhere
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Learn to play the flute with our expert teachers and personalized lessons.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
              Get Started
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FluteCourse;
