import DrumsAbout from '@/components/Course/Instruments/drums/DrumsAbout';
import DrumsCourse from '@/components/Course/Instruments/drums/DrumsCourse';
import Reviews from '@/components/Course/Instruments/drums/DrumsReviews/Reviews';
import DrumsTeacher from '@/components/Course/Instruments/drums/DrumsTeacher';
import PricingSection from '@/components/Course/Instruments/drums/DurmsPricing/PricingSection';
import FullPricingSection from '@/components/Course/Instruments/drums/FullDrumsPricing';
import Policy from '@/components/Policy/Policy';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: "Chordscraft's Drums Page",
  description: 'Unlock your musical journey with our comprehensive piano course. Learn from expert instructors and master the piano at your own pace!',
};

export default function DrumsCoursePage() {
  return (
    <div>
      <DrumsCourse/> 
      <DrumsAbout/>
      <Reviews/>
      <DrumsTeacher/>
      <FullPricingSection/>
      <PricingSection/>
      <Policy/>
    </div>
  );
} 