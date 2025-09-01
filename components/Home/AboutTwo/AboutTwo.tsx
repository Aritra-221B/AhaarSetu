"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import dynamic from "next/dynamic";
import { MusicIcon, Award, BookOpen, Users, ArrowRight, Music2, Quote } from "lucide-react";
import Link from "next/link";

import { features, animationStyles as baseAnimationStyles } from "./Feature";

// Dynamic import of Player to avoid SSR issues
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    )
  }
);

// Enhanced animation styles with keyframes
const animationStyles = baseAnimationStyles.map(style => ({
  ...style,
  container: {
    ...style.container,
    filter: "drop-shadow(0 0 8px rgba(79, 70, 229, 0.4))",
    animation: "pulse 2s infinite alternate",
  },
  keyframes: `
    @keyframes pulse {
      0% { transform: scale(1); }
      100% { transform: scale(1.05); }
    }
  `
}));

const AboutTwo = () => {
  // Animation control hooks
  const aboutControls = useAnimation();
  const quoteControls = useAnimation();
  const featureControls = useAnimation();
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [quoteRef, quoteInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [featureRef, featureInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  // Animation state management
  const [isMounted, setIsMounted] = useState(false);
  const [loadError, setLoadError] = useState<Record<number, boolean>>({});
  const [isLoading, setIsLoading] = useState<Record<number, boolean>>({});

  // Start animations when sections come into view
  useEffect(() => {
    if (aboutInView) {
      aboutControls.start("visible");
    }
    if (quoteInView) {
      quoteControls.start("visible");
    }
    if (featureInView) {
      featureControls.start("visible");
    }
  }, [aboutControls, quoteControls, featureControls, aboutInView, quoteInView, featureInView]);

  // Setup animations and loading states
  useEffect(() => {
    setIsMounted(true);
    
    // Initialize loading state for all animations
    const initialLoadingState: Record<number, boolean> = {};
    features.forEach((_, index) => {
      initialLoadingState[index] = true;
    });
    setIsLoading(initialLoadingState);

    // Add keyframes to document only on client side
    if (typeof document !== 'undefined') {
      const styleSheet = document.createElement("style");
      let keyframesCSS = "";
      
      animationStyles.forEach(style => {
        keyframesCSS += style.keyframes || '';
      });
      
      styleSheet.textContent = keyframesCSS;
      document.head.appendChild(styleSheet);
      
      return () => {
        if (document.head.contains(styleSheet)) {
          document.head.removeChild(styleSheet);
        }
      };
    }
  }, []);

  // Event handlers for animation loading
  const handleLottieError = (index: number) => {
    setLoadError(prev => ({ ...prev, [index]: true }));
    setIsLoading(prev => ({ ...prev, [index]: false }));
    console.error(`Failed to load animation for ${features[index].title}`);
  };

  const handleLottieLoad = (index: number) => {
    setIsLoading(prev => ({ ...prev, [index]: false }));
  };

  return (
    <section className="relative scroll-mt-24" id="about">
      {/* ABOUT INFO BLOCK */}
      <div className="py-24 bg-gradient-to-br from-indigo-50 to-white">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            ref={aboutRef}
            initial="hidden"
            animate={aboutControls}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left Side - Text Content */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.5 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="absolute -top-10 -left-10 w-20 h-20 bg-indigo-100 rounded-full opacity-50" 
                />
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-tight relative"
                >
                  Uniquely at <span className="text-indigo-600">ChordsCraft</span>
                </motion.h2>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="relative bg-gradient-to-r from-indigo-600 to-indigo-800 p-8 rounded-2xl shadow-xl mb-8 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/music-pattern.png')] opacity-10"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white rounded-full opacity-10"></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-white rounded-full opacity-10"></div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-3 rounded-full">
                    <Music2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 relative">
                    <p className="text-white text-xl md:text-3xl font-bold leading-tight">
                      <span className="text-amber-300">Chordscraft</span> Institute of Music
                    </p>
                    <p className="text-indigo-100 text-sm md:text-base font-semibold mt-1">
                      Premium Online Music Classes for All Ages
                    </p>
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-amber-300 rounded-full animate-ping"></div>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-4">
                  <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs rounded-full">Professional Instructors</span>
                  <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs rounded-full">Global Reach</span>
                  <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs rounded-full">All Levels</span>
                </div>
              </motion.div>
              
              <div className="space-y-6 text-gray-700">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex items-start gap-4"
                >
                  <div className="mt-1 bg-indigo-100 p-2 rounded-full">
                    <MusicIcon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <p className="text-justify">
                    Whether you’re beginning your musical journey or looking to refine your skills, 
                    <span className="font-bold text-indigo-700"> Chordscraft Institute of Music </span>
                    offers a <span className="italic font-semibold">structured, immersive, and inspiring</span> platform. Our curriculum blends traditional and modern teaching methods to keep you inspired. You can even choose your favorite songs from our song.
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="flex items-start gap-4"
                >
                  <div className="mt-1 bg-indigo-100 p-2 rounded-full">
                    <Users className="w-5 h-5 text-indigo-600" />
                  </div>
                  <p className="text-justify">
                  We offer certification programs with 
                  <span className="font-bold text-indigo-700"> Trinity, ABRSM, MTB, and RSM</span> exams to validate your musical progress — whether you’re pursuing personal growth.
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex items-start gap-4"
                >
                  <div className="mt-1 bg-indigo-100 p-2 rounded-full">
                    <BookOpen className="w-5 h-5 text-indigo-600" />
                  </div>
                  <p className="text-justify">
                    Learn from <span className="font-bold text-indigo-700">Trinity & ABRSM London Board-certified faculty</span>, 
                    trained to guide students of different age groups with expertise and care.
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="flex items-start gap-4"
                >
                  <div className="mt-1 bg-indigo-100 p-2 rounded-full">
                    <Award className="w-5 h-5 text-indigo-600" />
                  </div>
                  <p className="text-justify">
                    Our programs are designed for <span className="font-bold text-indigo-700">learners of all ages and skill levels</span>. Whether you’re a working professional or a student, our affordable fees and flexible online timings make it easy to accelerate your musical journey.
                  </p>
                </motion.div>
              </div>
            </div>
            
            {/* Right Side - Image/Animation */}
            <div className="order-1 lg:order-2 flex flex-col items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="relative w-full max-w-md"
              >
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.7 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-200 rounded-full opacity-70" 
                />
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-100 rounded-full opacity-50" 
                />
                <div className="relative bg-white p-4 rounded-2xl shadow-xl overflow-hidden">
                  <Player
                    src="/animations/mentorshipAnimation.json"
                    loop
                    autoplay
                    style={{ height: '400px', width: '100%' }}
                  />
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9 }}
                whileHover={{ scale: 1.05 }}
                className="mt-12"
              >
                <Link 
                  href="/courses" 
                  className="group relative inline-flex items-center overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-10 py-5 text-white shadow-lg transition-all duration-300 hover:shadow-indigo-500/25 hover:shadow-xl"
                >
                  <span className="absolute right-0 translate-x-full transition-transform duration-300 group-hover:-translate-x-4">
                    <ArrowRight className="h-6 w-6" />
                  </span>
                  <span className="font-bold text-xl transition-all duration-300 group-hover:mr-6">
                    Explore Courses
                  </span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* QUOTE SECTION */}
      <div className="py-20 bg-gradient-to-t from-indigo-50 to-white">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            ref={quoteRef}
            initial="hidden"
            animate={quoteControls}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto relative"
          >
            <motion.div 
              initial={{ opacity: 0, rotate: -10 }}
              animate={{ opacity: 10, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -top-10 -left-16 text-indigo-300 opacity-50"
            >
              <Quote className="w-20 h-20 transform rotate-180" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, rotate: 10 }}
              animate={{ opacity: 10, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-10 -right-16 text-indigo-300 opacity-50"
            >
              <Quote className="w-20 h-20" />
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 p-8 md:p-12 pt-10 pb-10 rounded-xl shadow-2xl overflow-hidden z-10"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-400 rounded-full filter blur-3xl opacity-20 -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-400 rounded-full filter blur-3xl opacity-20 -ml-20 -mb-20"></div>
              <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-blue-300 rounded-full filter blur-3xl opacity-10"></div>
              <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-indigo-300 rounded-full filter blur-3xl opacity-10"></div>
              
              <div className="md:max-w-4xl mx-auto">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-xl md:text-2xl lg:text-3xl font-medium italic text-white leading-relaxed relative z-10 text-center px-4"
                >
                  <span className="text-amber-300 text-3xl md:text-4xl font-serif">"</span>
                  At <span className="font-bold text-amber-300">Chordscraft</span>, music is not just a subject — it's the language of the soul. Perform, compose, or simply enjoy — we help you find your rhythm and grow with confidence.
                  <span className="text-amber-300 text-3xl md:text-4xl font-serif">"</span>
                </motion.p>
                
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "8rem" }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="h-1 bg-gradient-to-r from-amber-300 to-amber-100 mt-8 mx-auto"
                />
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="text-center text-indigo-100 mt-4 font-light"
                >
                  Founder's Vision
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* FEATURES BLOCK */}
      <div className="bg-gradient-to-b from-white to-indigo-50 py-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-gray-800 mb-12"
          >
            Our Features
          </motion.h2>
          <motion.div 
            ref={featureRef}
            initial="hidden"
            animate={featureControls}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition duration-300 flex flex-col items-center justify-center text-center cursor-pointer h-full"
              >
                <div className="mb-6 w-24 h-24 flex items-center justify-center relative">
                  {isLoading[index] && isMounted && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-full">
                      <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                    </div>
                  )}
                  
                  {isMounted && !loadError[index] ? (
                    <div style={animationStyles[index].container}>
                      <Player
                        src={feature.animation}
                        className="player"
                        loop={true}
                        autoplay={true}
                        style={animationStyles[index].size}
                        onEvent={(event: string) => {
                          if (event === 'error') {
                            handleLottieError(index);
                          }
                          if (event === 'ready' || event === 'play') {
                            handleLottieLoad(index);
                          }
                        }}
                      />
                    </div>
                  ) : loadError[index] ? (
                    // Fallback content if animation fails to load
                    <div className="bg-indigo-100 h-full w-full rounded-full flex items-center justify-center">
                      <span className="text-indigo-700 text-xl font-bold">{feature.title[0]}</span>
                    </div>
                  ) : null}
                </div>
                <div className="flex flex-col items-center justify-center flex-1">
                  <h3 className="text-lg font-semibold text-indigo-700 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm text-center mx-auto max-w-[220px]">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutTwo;