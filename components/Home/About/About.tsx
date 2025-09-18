import React from "react";

const About: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-green-50 via-green-100 to-green-100 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-800 mb-6">
          Uniquely at <span className="text-green-600">Our Platform</span>
        </h2>

        {/* Highlight Box */}
        <div className="bg-green-100 p-6 md:p-10 rounded-2xl shadow-md mb-8">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-800 mb-2">
            Digital Livestock Management
          </h3>
          <p className="text-gray-700 text-base md:text-lg">
            Smarter record keeping, transparent health tracking, and tools to help you
            manage your animals with confidence.
          </p>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
          <span className="px-4 py-2 sm:px-5 sm:py-2.5 bg-green-200 text-green-900 rounded-full text-sm sm:text-base font-medium">
            Digital Records
          </span>
          <span className="px-4 py-2 sm:px-5 sm:py-2.5 bg-green-200 text-green-900 rounded-full text-sm sm:text-base font-medium">
            Smart Dashboard
          </span>
          <span className="px-4 py-2 sm:px-5 sm:py-2.5 bg-green-200 text-green-900 rounded-full text-sm sm:text-base font-medium">
            Trusted Marketplace
          </span>
        </div>

        {/* List Points */}
        <ul className="space-y-4 sm:space-y-5 text-left sm:text-center text-gray-700 text-base md:text-lg px-2">
          <li>
            ✅ Every animal gets its own <b>digital passport</b> with health &
            medicine history.
          </li>
          <li>
            ✅ <b>Interactive dashboard</b> to track compliance and spot trends.
          </li>
          <li>
            ✅ Build <b>trust with buyers</b> through verified records and transparency.
          </li>
          <li>
            ✅ Designed for <b>all farmers</b> — easy to use, anytime, anywhere.
          </li>
        </ul>

        {/* CTA Button */}
        <button className="mt-10 sm:mt-12 px-7 py-3.5 sm:px-8 sm:py-4 bg-green-600 text-white text-base md:text-lg font-semibold rounded-lg shadow-lg hover:bg-green-700 transition">
          Explore Features →
        </button>
      </div>
    </section>
  );
};

export default About;