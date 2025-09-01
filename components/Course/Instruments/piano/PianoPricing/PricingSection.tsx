'use client'
import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Music2, ArrowRight } from 'lucide-react';
import PricingCard from './PricingCard';
import ToggleButton from './ToggleButton';
import Link from 'next/link';

interface PricingPlan {
  id: string;
  title: string;
  originalPrice: string;
  discountedPrice: string;
  savePercentage: string;
  monthlyPrice: string;
  formatText: string;
  icon: string; // Using string for emoji or could be path/URL for actual image icons
  features: string[];
}

const pricingData: Record<string, PricingPlan[]> = {
  Beginner: [
    {
      id: 'beginner-group',
      title: 'Group (1:4)',
      originalPrice: '₹350',
      discountedPrice: '₹250',
      savePercentage: '29%',
      monthlyPrice: '₹2000 /month',
      formatText: '1:4 Group Class',
      icon: '👥',
      features: ["Experienced and certified faculties", "Fun, Engaging & Interactive live sessions", "Get your first certificate from prestigious colleges like Trinity, ABRSM, and RSL"],
    },
    {
      id: 'beginner-buddy',
      title: 'Buddy (1:2)',
      originalPrice: '₹600',
      discountedPrice: '₹400',
      savePercentage: '33%',
      monthlyPrice: '₹3200 /month',
      formatText: '1:2 Semi-Private Class',
      icon: '🤝',
      features: ["Experienced and certified faculties", "Fun, Engaging & Interactive live sessions", "Get your first certificate from prestigious colleges like Trinity, ABRSM, and RSL"],
    },
    {
      id: 'beginner-individual',
      title: 'Individual (1:1)',
      originalPrice: '₹800',
      discountedPrice: '₹650',
      savePercentage: '19%',
      monthlyPrice: '₹5200 /month',
      formatText: '1:1 Personal Coaching',
      icon: '👤',
      features: ["Experienced and certified faculties", "Fun, Engaging & Interactive live sessions", "Get your first certificate from prestigious colleges like Trinity, ABRSM, and RSL"],
    },
  ],
  Intermediate: [
    {
      id: 'intermediate-buddy',
      title: 'Buddy (1:2)',
      originalPrice: '₹800',
      discountedPrice: '₹600',
      savePercentage: '25%',
      monthlyPrice: '₹2400 /month', // Note: Data says 2400, not 4800 if it's per session price * sessions. Assuming 2400 is correct.
      formatText: '1:2 Semi-Private Class',
      icon: '🤝',
      features: ["Deeper Musical Techniques", "Expert Guidance & Support", "Trinity, ABRSM, RSL certified faculties to provide the best education"],
    },
    {
      id: 'intermediate-individual',
      title: 'Individual (1:1)',
      originalPrice: '₹900',
      discountedPrice: '₹750',
      savePercentage: '25%', // Note: Data says 25%, (900-750)/900 is ~16.7%. Using provided 25%.
      monthlyPrice: '₹3000 /month', // Note: Data says 3000.
      formatText: '1:1 Personal Coaching',
      icon: '👤',
      features: ["Deeper Musical Techniques", "Expert Guidance & Support", "Trinity, ABRSM, RSL certified faculties to provide the best education"],
    },
  ],
  Advanced: [
    {
      id: 'advanced-individual',
      title: 'Individual (1:1)',
      originalPrice: '₹1200',
      discountedPrice: '₹900',
      savePercentage: '25%',
      monthlyPrice: '₹3600 /month',
      formatText: '1:1 Personal Coaching',
      icon: '👤',
      features: [
        "Master impressive advanced techniques",
        "Build deeper music theory and expression",
        "Learn from Trinity, ABRSM & RSL–certified expert instructors",
        "Take your musicality to the next level and build the pathway to becoming the best and finest musician",
      ],
    },
  ],
};

const PricingSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Beginner');
  const tabLabels = ["Beginner", "Intermediate", "Advanced"];
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const currentPlans = pricingData[activeTab] || [];

  // Adjust grid columns based on number of plans for the active tab
  let gridColsClass = 'lg:grid-cols-3'; // Default for 3 cards (Beginner)
  if (currentPlans.length === 1) {
    gridColsClass = 'lg:grid-cols-1 lg:max-w-sm'; // For 1 card (Advanced) - center it
  } else if (currentPlans.length === 2) {
    gridColsClass = 'lg:grid-cols-2 lg:max-w-2xl'; // For 2 cards (Intermediate) - center them
  }

  return (
    <section className="py-24 bg-gradient-to-br from-indigo-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/music-pattern.png')] opacity-5"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-200 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full opacity-30 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full mb-4">
            <Music2 className="w-5 h-5" />
            <span className="font-semibold">Pricing Plans</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Choose Your <span className="text-indigo-600">Learning Path</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Select the perfect plan that matches your musical journey. All plans include expert guidance and certification opportunities.
          </p>
        </motion.div>

        {/* Toggle Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
        <ToggleButton tabs={tabLabels} activeTab={activeTab} onTabClick={setActiveTab} />
        </motion.div>

        {/* Pricing Cards */}
        {currentPlans.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6, delay: 0.4 }}
            role="tabpanel"
            id={`panel-${activeTab.toLowerCase()}`}
            aria-labelledby={`tab-${activeTab.toLowerCase()}`}
            className={`grid grid-cols-1 sm:grid-cols-2 ${gridColsClass} gap-8 mx-auto`}
          >
            {currentPlans.map((plan) => (
              <PricingCard
                key={plan.id}
                title={plan.title}
                originalPrice={plan.originalPrice}
                discountedPrice={plan.discountedPrice}
                savePercentage={plan.savePercentage}
                monthlyPrice={plan.monthlyPrice}
                formatText={plan.formatText}
                icon={plan.icon}
                features={plan.features}
              />
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-500">No plans available for this level.</p>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/music-pattern.png')] opacity-10"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Start Your Musical Journey?
              </h3>
              <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
                Join our community of music enthusiasts and take the first step towards mastering your instrument.
              </p>
              <Link href="/book-now">
                <button className="group inline-flex items-center gap-2 bg-white text-indigo-600 font-semibold px-8 py-3 rounded-xl hover:bg-indigo-50 transition-all duration-300">
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
