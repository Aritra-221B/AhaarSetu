import { Metadata } from 'next';
import WesternCourse from '@/components/Course/Singing/Western/WesternCourse';
import WesternAbout from '@/components/Course/Singing/Western/WesternAbout';
import WesternTeacher from '@/components/Course/Singing/Western/WesternTeacher';
import Reviews from '@/components/Course/Singing/Western/WesternReviews/Reviews';
import FullWesternPricing from '@/components/Course/Singing/Western/FullWesternPricing';
import PricingSection from '@/components/Course/Singing/Western/WesternPricing/PricingSection';
export const metadata: Metadata = {
  title: "Chordscraft's Western Singing Page",
  description: 'Unlock your musical journey with our comprehensive Western Singing course. Learn from expert instructors and master the Western Singing at your own pace!',
};

export default function PianoCoursePage() {
  return (
    <div>
      <WesternCourse/> 
      <WesternAbout/>
      <Reviews/>
      <WesternTeacher/>
      <FullWesternPricing/>
      <PricingSection/>
    </div>
  );
} 