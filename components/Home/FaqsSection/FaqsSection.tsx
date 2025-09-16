'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


const faqs = [
{
  question: 'Is my data secure?',
  answer:
    'Yes, we use state-of-the-art security measures to protect your data. All information is encrypted and stored securely in the cloud.',
},
{
  question: 'Can I access the platform on my phone?',
  answer:
    'Absolutely! Our platform is fully responsive and works on all devices, including desktops, tablets, and smartphones.',
},
{
  question: 'What if I have a lot of animals?',
  answer:
    'Our platform is designed to handle farms of all sizes, from small family farms to large commercial operations. You can easily manage thousands of animals.',
},
{
  question: 'How do I share the medicine passport with buyers?',
  answer:
    'You can generate a unique, shareable link for each animal\'s medicine passport. You can also print a QR code that buyers can scan to view the passport.',
},
];

export default function FaqsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Open "What is Chordscraft?" by default

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className=" max-w-4xl mx-auto p-6">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-center mb-8 p-5"
      >
        Frequently Asked Questions
      </motion.h2>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            variants={item}
            className="border rounded-xl p-6 transition-all duration-300 shadow-sm hover:shadow-md bg-white"
            whileHover={{ scale: 1.01 }}
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center text-left"
            >
              <span className="text-lg font-semibold">{faq.question}</span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {openIndex === index ? (
                  <X className="text-red-500 w-6 h-6" />
                ) : (
                  <Plus className="text-red-500 w-6 h-6" />
                )}
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  key={`answer-${index}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="mt-4 text-gray-700 leading-relaxed overflow-hidden"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
