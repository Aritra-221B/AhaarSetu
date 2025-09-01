import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface PricingCardProps {
  title: string;
  originalPrice: string;
  discountedPrice: string;
  savePercentage: string;
  monthlyPrice: string;
  formatText: string;
  icon: string; // This will be a URL or path to an image/SVG
  features: string[];
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  originalPrice,
  discountedPrice,
  savePercentage,
  monthlyPrice,
  formatText,
  icon,
  features,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-100 rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
      <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-100 rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>

      <div className="relative p-8 flex flex-col items-center text-center">
        {/* Icon and Title */}
        <div className="mb-6">
          <span className="text-4xl mb-4 block">{icon}</span>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>

        {/* Pricing */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-2">
            <span className="text-4xl font-bold text-indigo-600">{discountedPrice}</span>
            <span className="text-xl text-gray-400 line-through">{originalPrice}</span>
          </div>
      {savePercentage && (
            <span className="inline-block mt-2 bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
          Save {savePercentage}
        </span>
      )}
        </div>

        {/* Format and Monthly Price */}
        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-700 mb-2">{formatText}</p>
          <p className="text-xl font-bold text-indigo-600">{monthlyPrice}</p>
      </div>

        {/* Features */}
        <ul className="w-full space-y-3 mb-8">
        {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-2 text-gray-600"
            >
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </motion.li>
        ))}
      </ul>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
        Enroll Now
        </motion.button>
    </div>
    </motion.div>
  );
};

export default PricingCard;
