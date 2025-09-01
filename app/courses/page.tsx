import React from 'react';
import AllCourse from '@/components/AllCourse/AllCourse';
import PricingSection from '@/components/Pricing/PricingSection';
import Policy from '@/components/Policy/Policy';

export const metadata = {
  title: 'All Courses | ChordsCraft',
  description: 'Explore our wide range of music courses including instruments, singing, and dancing.',
};

const CoursesPage = () => {
  return (
    <main>
      <AllCourse />
      <PricingSection/>
      <Policy/>
    </main>
  );
};

export default CoursesPage; 