import { Metadata } from 'next'
import ViolinCourse from '@/components/Course/Instruments/violin/ViolinCourse';
import ViolinAbout from '@/components/Course/Instruments/violin/ViolinAbout';
import Reviews from '@/components/Course/Instruments/violin/ViolinReviews/Reviews';
import ViolinTeacher from '@/components/Course/Instruments/violin/ViolinTeacher';
import FullPricingSection from '@/components/Course/Instruments/violin/FullViolinPricing';
import PricingSection from '@/components/Course/Instruments/violin/ViolinPricing/PricingSection';
import Policy from '@/components/Policy/Policy';

export const metadata: Metadata = {
  title: "Chordscraft's Violin Page",
  description: 'Unlock your musical journey with our comprehensive piano course. Learn from expert instructors and master the piano at your own pace!',
};
export default function ViolinCoursePage() {
  return (
    <div>
      <ViolinCourse/>
      <ViolinAbout/>
      <Reviews/>
      <ViolinTeacher/>
      <FullPricingSection/>
      <PricingSection/>
      <Policy/>
  </div>
  );
}
  


