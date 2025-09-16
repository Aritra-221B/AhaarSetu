import React from 'react';

const About: React.FC = () => {
  return (
    <section className="bg-gray-150 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">The Problem & Our Solution</h2>
          <p className="text-gray-600">Making livestock management simpler and more transparent.</p>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 px-4 mb-8">
            <div className="bg-red-100 rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-red-800 mb-4">The Problem</h3>
              <p className="text-gray-700">
                Keeping track of livestock medication is a hassle. It's easy to lose records, which can lead to problems with compliance and affect the sale of your products. Buyers are increasingly demanding proof of responsible medication use.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-8">
            <div className="bg-green-100 rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-green-800 mb-4">Our Solution</h3>
              <p className="text-gray-700">
                Our platform provides a Digital Medicine Passport for each animal. All records are stored securely online, accessible anytime. This makes it easy to prove compliance, build trust with buyers, and ensure the health of your herd.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
