'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


const faqs = [
  {
    question: "What is the right age to start learning music?",
    answer: "There is no fixed age to begin — music can be learned at any stage of life. Children as young as 4–5 years can start with basic rhythm and ear training, while teens and adults can directly explore instruments or vocals. At ChordsCraft, we design lessons suited to your age and learning pace.",
  },
  {
    question: "Are online lessons as effective as offline lessons?",
    answer: "Yes! With today's technology, online lessons are just as effective as offline. We provide live interactive classes, personalized feedback, and resources like backing tracks, sheet music, and recordings — ensuring you learn effectively from the comfort of your home.",
  },
  {
    question: "Do you provide Trinity & ABRSM certification?",
    answer: "Yes. We prepare students for Trinity, ABRSM, MTB, and RSL certifications with expert guidance from certified faculty. These globally recognized certifications add credibility to your skills and support professional opportunities.",
  },
  {
    question: "How much time do I need to invest to learn an instrument or singing?",
    answer: "It depends on your goals. With regular practice of 30–60 minutes daily, most beginners start playing simple songs within 3–6 months. For professional mastery, consistent learning over a few years is recommended.",
  },
  {
    question: "Can I learn music even if I have no prior experience?",
    answer: "Absolutely! Our programs are tailored for complete beginners to advanced learners. You don’t need any background — just interest and dedication.",
  },
  {
    question: "Do you offer flexible class timings?",
    answer: "Yes, we offer flexible scheduling options to suit students, working professionals, and hobby learners. You can choose weekday or weekend batches at timings convenient for you.",
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
    <section className="max-w-4xl mx-auto p-6">
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
