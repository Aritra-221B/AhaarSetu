'use client';
import React from 'react';

// Type for pricing plan
type PricingPlan = {
  id: string;
  title: string;
  originalPrice: string;
  discountedPrice: string;
  savePercentage: string;
  monthlyPrice: string;
  formatText: string;
  icon: string;
  features: string[];
};

// Section Heading
const SectionHeading = ({ heading, subheading }: { heading: string; subheading: string }) => (
  <div className="mb-16 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 text-center lg:text-left">
    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">{heading}</h1>
    <p className="text-4xl md:text-5xl font-extrabold text-teal-600 tracking-tight">{subheading}</p>
  </div>
);

// Pricing Card
const PricingCard = (plan: PricingPlan) => (
  <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
    <div className="absolute -top-3 -right-3 w-12 h-12 bg-indigo-100 rounded-full blur-xl opacity-30"></div>
    <div className="absolute -bottom-3 -left-3 w-16 h-16 bg-purple-100 rounded-full blur-xl opacity-30"></div>

    <div className="p-8 flex flex-col items-center text-center">
      <span className="text-5xl mb-4">{plan.icon}</span>
      <h2 className="text-2xl font-bold text-gray-800">{plan.title}</h2>

      {plan.discountedPrice && (
        <div className="my-4 flex items-center gap-2 justify-center">
          <span className="text-3xl font-bold text-indigo-600">{plan.discountedPrice}</span>
          {plan.originalPrice && (
            <span className="text-lg text-gray-400 line-through">{plan.originalPrice}</span>
          )}
        </div>
      )}

      {plan.savePercentage && (
        <div className="mb-2 text-sm text-green-600 font-medium bg-green-100 rounded-full px-3 py-1">
          Save {plan.savePercentage}
        </div>
      )}

      <p className="text-sm text-indigo-700 font-medium">{plan.formatText}</p>
      <p className="text-lg font-bold text-indigo-500 mt-1 mb-4">{plan.monthlyPrice}</p>

      <ul className="text-left text-sm text-gray-700 space-y-2 mb-6 w-full">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex gap-2 items-start">
            <span className="text-indigo-500 text-lg leading-5">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// Main Component
const FullViolinPricing = () => {
  // Gather all plans from all categories, flatten, and take first 6
  const pricingData: Record<string, PricingPlan[]> = {
    Foundation: [
      {
        id: 'foundation',
        title: 'Foundation to Early Beginner',
        originalPrice: '',
        discountedPrice: '',
        savePercentage: '',
        monthlyPrice: '6–8 months | Initial Grade',
        formatText: 'Beginner Onboarding',
        icon: '🟢',
        features: [
          'Introduced to basics of music and violin through simple songs and fun activities.',
          'Begin learning staff notation, basic sight reading, and hand coordination.',
          '\ud83d\udce5 Download Foundation Curriculum',
          '\u2705 Prepares for Trinity/ABRSM Initial Grade',
        ],
      },
    ],
    Beginner: [
      {
        id: 'beginner',
        title: 'Beginner',
        originalPrice: '',
        discountedPrice: '',
        savePercentage: '',
        monthlyPrice: '8–12 months | Grade 1',
        formatText: 'Level 2 Learning',
        icon: '🟢',
        features: [
          'Explore rhythm patterns and music flow.',
          'Build playing confidence through short two-hand violin pieces.',
          'Introduction to scales for strength and control.',
          '\ud83d\udce5 Download Level 2 Curriculum',
          '\u2705 Supports Grade 1 practical & theory exams',
        ],
      },
    ],
    EarlyIntermediate: [
      {
        id: 'early-intermediate',
        title: 'Early Intermediate',
        originalPrice: '',
        discountedPrice: '',
        savePercentage: '',
        monthlyPrice: '8–12 months | Grades 2–3',
        formatText: 'Stylistic Exploration',
        icon: '🟢',
        features: [
          'Play longer pieces with better flow and expression.',
          'Focus on control and favorite styles like Bollywood or Western.',
          '\u2705 Optional Grade 2\u20133 exam prep',
        ],
      },
    ],
    Intermediate: [
      {
        id: 'intermediate',
        title: 'Intermediate',
        originalPrice: '',
        discountedPrice: '',
        savePercentage: '',
        monthlyPrice: '8–12 months | Grades 4–5',
        formatText: 'Stage Readiness',
        icon: '🟡',
        features: [
          'Build fluency, musical expression, and performance confidence.',
          'Great for public showcases and mid-level exam prep.',
          '\u2705 Grade 4\u20135 certification support',
        ],
      },
    ],
    EarlyAdvanced: [
      {
        id: 'early-advanced',
        title: 'Early Advanced',
        originalPrice: '',
        discountedPrice: '',
        savePercentage: '',
        monthlyPrice: '6–8 months | Grade 6',
        formatText: 'Solo Performance Development',
        icon: '🟠',
        features: [
          'Play advanced pieces with control and emotion.',
          'Ideal for solo performance and higher-grade preparation.',
          '\u2705 Grade 6 practical exam support',
        ],
      },
    ],
    Advanced: [
      {
        id: 'advanced',
        title: 'Advanced',
        originalPrice: '',
        discountedPrice: '',
        savePercentage: '',
        monthlyPrice: '10–12 months | Grades 7–8',
        formatText: 'Artistic Mastery',
        icon: '🔴',
        features: [
          'Confident, artistic performance with deep musical understanding.',
          'Perfect for recitals, grade exams, and content creation.',
          '\u2705 Grade 8 & pre-diploma readiness',
        ],
      },
    ],
  };

  // Flatten all plans and take first 6
  const allPlans = Object.values(pricingData).flat().slice(0, 6);

  return (
    <section className="relative w-full py-24 px-4 sm:px-8 bg-gradient-to-br from-indigo-50 via-white to-purple-100 overflow-hidden">
      {/* Blurry background orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-200 opacity-20 blur-3xl rounded-full -z-10 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 opacity-20 blur-3xl rounded-full -z-10 translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto">
        <SectionHeading heading="Chordscraft's" subheading="Violin Journey" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {allPlans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FullViolinPricing;
