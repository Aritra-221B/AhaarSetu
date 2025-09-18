import React from 'react';
import { 
  Wallet, 
  BellRing, 
  CheckCircle, 
  Brain, 
  ScrollText, 
  LayoutDashboard 
} from 'lucide-react';

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: <Wallet className="w-7 h-7 text-green-600" />,
    title: 'Digital Medicine Passport',
    description: 'A complete digital record of all medications administered to your livestock.',
  },
  {
    icon: <BellRing className="w-7 h-7 text-green-600" />,
    title: 'Smart Alerts',
    description: 'Get timely reminders for vaccinations, treatments, and other important events(verified by Veterinarian).',
  },
  {
    icon: <CheckCircle className="w-7 h-7 text-green-600" />,
    title: 'Compliance Score',
    description: 'Monitor your compliance with industry regulations and standards in real-time.',
  },
  {
    icon: <Brain className="w-7 h-7 text-green-600" />,
    title: 'AI Suggestions',
    description: 'Receive AI-powered recommendations for improving herd health and productivity(verified by Veterinarian).',
  },
  {
    icon: <ScrollText className="w-7 h-7 text-green-600" />,
    title: 'Traceability Reports',
    description: 'Generate detailed reports for buyers to trace the origin and history of your products.',
  },
  {
    icon: <LayoutDashboard className="w-7 h-7 text-green-600" />,
    title: 'Dashboards',
    description: 'Visualize your farm data with interactive charts and graphs.',
  },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="bg-gradient-to-b from-green-100 via-green-100 to-gray-150 py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            Our Features
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage your farm digitally, ensuring safety, compliance, and efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 sm:p-8 text-center border border-gray-100 flex flex-col items-center transform hover:-translate-y-1"
            >
              <div className="flex justify-center mb-5 p-3 rounded-full bg-green-50 ring-2 ring-green-100">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-[15px] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;