import Reviews from '@/components/Course/Dancing/Classical/ClassicalReviews/Reviews';
import FullHindustaniPricing from '@/components/Course/Singing/Hindustani/FullHindustaniPricing';
import HindustaniAbout from '@/components/Course/Singing/Hindustani/HindustaniAbout';
import HindustaniCourse from '@/components/Course/Singing/Hindustani/HindustaniCourse';
import HindustaniTeacher from '@/components/Course/Singing/Hindustani/HindustaniTeacher';
import PricingSection from '@/components/Course/Singing/Hindustani/HindustaniPricing/PricingSection';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Chordscraft's Hindustani Singing Page",
  description: 'Unlock your musical journey with our comprehensive Hindustani Singing course. Learn from expert instructors and master the Hindustani Singing at your own pace!',
};

export default function PianoCoursePage() {
  return (
    <div>
      <HindustaniCourse/> 
      <HindustaniAbout/>
      <Reviews/>
      <HindustaniTeacher/>
      <FullHindustaniPricing/>
      <PricingSection/>
    </div>
  );
} 