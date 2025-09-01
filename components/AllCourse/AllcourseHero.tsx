'use client';
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
interface AllCourseHeroProps {
  category: string;
}

const heroContent = {
  Instruments: {
    title: "Master Musical Instruments — Anytime, Anywhere",
    description: "Learn to play your favorite instruments with our expert teachers and personalized lessons.",
    bgImage: "/images/hero/instruments-bg.jpg",
  },
  Singing: {
    title: "Find Your Voice — Express Through Music",
    description: "Develop your vocal talent with personalized training from expert vocal coaches.",
    bgImage: "/images/hero/singing-bg.jpg",
  },
  Dancing: {
    title: "Move with Grace — Dance with Confidence",
    description: "Learn various dance forms with our expert choreographers and personalized lessons.",
    bgImage: "/images/hero/dancing-bg.jpg",
  },
};

const AllCourseHero: React.FC<AllCourseHeroProps> = ({ category }) => {
  const content = heroContent[category as keyof typeof heroContent] || heroContent.Instruments;

  return (
    <section 
      className="relative flex items-center justify-center text-white pt-20 pb-15 px-6 md:px-12 min-h-[30rem] overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${content.bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Image src="/images/instruments_BG/BG MASTER.png" alt="Piano Background" layout="fill" objectFit="cover" className="absolute inset-0 z-0 object-cover opacity-40"/>
      {/* Animated Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative text-center max-w-4xl z-10"
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {content.title}
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl mb-8 text-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {content.description}
        </motion.p>
        <motion.div 
          className="flex justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link 
            href="/book-now" 
            className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start Learning
          </Link>
          
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AllCourseHero;