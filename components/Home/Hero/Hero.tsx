import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-b from-green-900 via-green-700 to-green-300 text-gray-900 overflow-hidden min-h-screen flex items-center">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-500/20 rounded-full blur-3xl -translate-x-40 -translate-y-40" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-3xl translate-x-40 translate-y-20" />

      {/* Hero content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center z-10">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-50/80 font-medium">
            #Farm management platform
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight bg-gradient-to-b from-gray-100 via-gray-200 to-gray-100 text-transparent bg-clip-text" style={{ lineHeight: '1.15' }}>
            Digital Farm<br /> Management<br /> & Medicine Passport
          </h1>
          <p className="mt-5 text-base md:text-lg lg:text-xl text-gray-100 max-w-md leading-relaxed">
            Ensuring livestock products are safe, residue-free, and traceable through
            innovative QR-based digital medicine passport and real-time monitoring.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/startup"
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 shadow-md hover:shadow-lg transition"
            >
              Get Started
            </Link>
            <Link
              href="/traininghub"
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg rounded-lg border bg-green-50 text-green-700 font-semibold hover:text-white hover:bg-green-700/10 transition"
            >
              Explore Training
            </Link>
          </div>

          
        </div>

        {/* Illustration */}
        <div className="relative w-full h-[280px] sm:h-[360px] md:h-[450px] lg:h-[600px] flex items-center justify-center">
          {/* Decorative glow */}
          <div className="absolute -z-10 w-72 h-72 rounded-full bg-gradient-to-b from-green-700 via-green-500 to-green-300/20 blur-3xl translate-x-10 translate-y-8" />
          <div className="relative w-[92%] h-[95%] bg-gradient-to-b from-green-700 via-green-500 to-green-300 rounded-2xl shadow-xl ring-1 ring-green-500/30 overflow-hidden">
            <Image
              src="/images/Hero.png"
              alt="Illustration of Ahaarsetu"
              fill
              className="object-contain p-2 sm:p-4 md:p-6"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;