
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

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

interface CourseListingSectionProps {
  categories: Category[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const CourseListingSection: React.FC<CourseListingSectionProps> = ({
  categories,
  activeTab,
  setActiveTab,
}) => {
  const activeCategory = categories.find(
    (cat) => cat.name.toLowerCase() === activeTab.toLowerCase()
  );

  return (
    <section className="py-20 sm:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden" id="courses">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/music-pattern.png')] opacity-5"></div>
      <div className="absolute -top-40 -left-40 w-72 h-72 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-72 h-72 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="container mx-auto px-4 relative">
        {/* Course Cards Container */}
        <div className="flex flex-wrap justify-center gap-8 max-w-8xl mx-auto">
          {activeCategory?.items.map((course) => (
            <motion.div
              key={course.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group w-[300px]"
            >
              <div className="relative h-48">
                <Image
                  src={course.image}
                  alt={course.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-md">
                  <span className="text-2xl">{course.icon}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  {course.name}
                </h3>
                <Link
                  href={course.href}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-5 py-2.5 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-800 transition-all duration-300 w-full justify-center group transform hover:scale-105"
                >
                  View Course Details
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseListingSection;
