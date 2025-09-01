'use client';
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import AllCourseHero from './AllcourseHero';
import ToggleButton from './ToggleButton';
import CourseListingSection from './CourseListingSection';

interface CategoryItem {
  name: string;
  icon: string;
  href: string;
  image: string;
}

interface Category {
  name: string;
  description: string;
  bgColor: string;
  items: CategoryItem[];
}

export const categories: Category[] = [
    {
      name: 'Instruments',
      description: 'Master the art of playing beautiful music with our instrument courses.',
      bgColor: 'from-blue-400 to-indigo-500',
      items: [
        { name: 'Piano', icon: '🎹', href: '/courses/instruments/piano', image: '/images/instruments_CARD/piano.jpg' },
        { name: 'Acoustic Guitar', icon: '🎸', href: '/courses/instruments/acousticguitar', image: '/images/instruments_CARD/acousticguitar.jpg' },
        { name: 'Electric Guitar', icon: '🎸', href: '/courses/instruments/electricguitar', image: '/images/instruments_CARD/electricguitar.jpg' },
        { name: 'Ukulele', icon: '🪕', href: '/courses/instruments/ukulele', image: '/images/instruments_CARD/ukulele.jpg' },
        { name: 'Drums', icon: '🥁', href: '/courses/instruments/drums', image: '/images/instruments_CARD/drums.jpg' },
        { name: 'Violin', icon: '🎻', href: '/courses/instruments/violin', image: '/images/instruments_CARD/violin.jpg' },
        { name: 'Electronic Keyboard', icon: '🎹', href: '/courses/instruments/electronickeyboard', image: '/images/instruments_CARD/electronickeyboard.jpg' },
        { name: 'Flute', icon: '🎵', href: '/courses/instruments/flute', image: '/images/instruments_CARD/flute.jpg' },
      ]
    },
    {
      name: 'Singing',
      description: 'Find your voice and develop your vocal talent with expert guidance.',
      bgColor: 'from-purple-400 to-pink-500',
      items: [
        { name: 'HINDUSTANI', icon: '🎵', href: '/courses/singing/hindustani', image: '/images/singing/hindustani.png' },
        { name: 'WESTERN', icon: '🎤', href: '/courses/singing/western', image: '/images/singing/western.png' },
        { name: 'Carnatic', icon: '🎤', href: '/courses/singing/carnatic', image: '/images/singing/carnatic.png' },
      ]
    },
    {
      name: 'Dancing',
      description: 'Express yourself through movement with our diverse dance courses.',
      bgColor: 'from-yellow-400 to-orange-500',
      items: [
        { name: 'Classical', icon: '💃', href: '/courses/dancing/classical', image: '/images/dancing/classical.jpg' },
        { name: 'Contemporary', icon: '🕺', href: '/courses/dancing/contemporary', image: '/images/dancing/contemporary.jpg' },
        { name: 'Hip Hop', icon: '🕺', href: '/courses/dancing/hiphop', image: '/images/dancing/hiphop.jpg' },
      ]
    },
];

const AllCourse = () => {
  const [activeTab, setActiveTab] = useState<string>('Instruments');
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const tabLabels = categories.map(category => category.name);
  const activeCategory = categories.find(
    (cat) => cat.name.toLowerCase() === activeTab.toLowerCase()
  );

  return (
    <>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }}
        transition={{ duration: 0.6 }}
      >
        <AllCourseHero category={activeCategory?.name || 'Instrument'} />
      </motion.div>
      
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex justify-center mb-12 py-4 px-6 bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-md max-w-fit mx-auto">
          <ToggleButton tabs={tabLabels} activeTab={activeTab} onTabClick={setActiveTab} />
        </div>
        <CourseListingSection
          categories={categories}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </motion.div>
    </>
  );
};

export default AllCourse;
