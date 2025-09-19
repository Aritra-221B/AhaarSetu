import React from 'react';

const steps = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-green-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
    title: '1. Create Your Account',
    description: 'Sign up effortlessly and create your personalized digital farm profile.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-green-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
    title: '2. Add Your Livestock',
    description: 'Easily add your animals and generate their unique digital passports.',
  },
  {
    // 🔹 Stethoscope icon for Record Medications
    icon: (
      <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth={1.5}
  className="w-20 h-20 text-green-500"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M6 4v6a6 6 0 0 0 12 0V4M6 4H4M18 4h2M12 20a3 3 0 1 0 0-6h-1v2h1a1 1 0 0 1 0 2h-1a3 3 0 1 0 0 6h1v-2h-1a1 1 0 0 1 0-2h1z"
  />
</svg>

    ),
    title: '3. Record Medications',
    description: 'Log all treatments and medications directly into the digital passport.',
  },
  {
    // 🔹 QR Code icon for Share & Sell
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-green-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5h4.5v4.5h-4.5V4.5zM15.75 4.5h4.5v4.5h-4.5V4.5zM3.75 15.75h4.5v4.5h-4.5v-4.5zM15.75 15.75h1.5V18h-1.5v1.5h3V15.75h-3zM12 12h.75v.75H12V12zM12 15.75h.75v.75H12v-.75zM9 12h.75v.75H9V12zM9 15.75h.75v.75H9v-.75z" />
      </svg>
    ),
    title: '4. Share & Sell',
    description: 'Share digital passports with buyers for transparent, confident sales.',
  },
];

const Tutorials: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-green-100 via-green-100 to-green-50 py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">Embark on a seamless journey with Ahaarsetu. Here's a simple guide to get you started.</p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center mb-20">
          {/* Line connecting steps */}
          <div className="hidden lg:block absolute inset-0 items-center justify-center">
            <div className="w-full h-1 bg-green-200 absolute top-1/2 -translate-y-1/2"></div>
          </div>

          {steps.map((step, index) => (
            <div key={index} className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center z-10">
              <div className="flex justify-center mb-6 text-green-600 bg-green-50 rounded-full p-5 shadow-md">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              {/* Dot for connecting line */}
              <div
                className="hidden lg:block absolute top-1/2 left-full -ml-3 w-6 h-6 bg-green-500 rounded-full border-4 border-white -translate-y-1/2 z-20"
                style={{ display: index === steps.length - 1 ? 'none' : 'block' }}
              ></div>
            </div>
          ))}
        </div>

        {/* Demo Video Section */}
        <div className="bg-green-700 rounded-3xl shadow-2xl p-12 flex flex-col items-center text-center relative overflow-hidden">
          {/* Background circles */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-green-600 rounded-full opacity-20"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-green-600 rounded-full opacity-20"></div>

          {/* Highlighted heading */}
          <div className="bg-white text-green-800 px-8 py-4 rounded-full shadow-lg mb-8 relative z-10">
            <h3 className="text-3xl font-bold">🎬 Watch Our Platform Demo</h3>
          </div>

          <p className="text-white mb-8 max-w-3xl text-lg relative z-10">
            Dive deeper into how Ahaarsetu works with our comprehensive video tutorial. Get a visual walkthrough
            of all features and best practices to maximize your farm's potential.
          </p>
          <div className="w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl border-4 border-green-300 relative z-10">
            <iframe
              className="w-full aspect-video"
              src="https://www.youtube.com/embed/6FV96NkS1Fs"
              title="Platform Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tutorials;