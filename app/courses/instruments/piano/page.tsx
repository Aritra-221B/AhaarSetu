import { Metadata } from 'next';
import PianoCourse from '@/components/Course/Instruments/piano/PianoCourse';
import PianoAbout from "@/components/Course/Instruments/piano/PianoAbout";
import Reviews from "@/components/Course/Instruments/piano/PianoReviews/Reviews"
import PianoTeacher from "@/components/Course/Instruments/piano/PianoTeacher";
import FullPricingSection from '@/components/Course/Instruments/piano/FullPianoPricing';
import PricingSection from '@/components/Course/Instruments/piano/PianoPricing/PricingSection';
import Policy from '@/components/Policy/Policy';


export const metadata: Metadata = {
  title: "Chordscraft's Piano Page",
  description: 'Unlock your musical journey with our comprehensive piano course. Learn from expert instructors and master the piano at your own pace!',
};

export default function PianoCoursePage() {
  return (
    <div>
      <PianoCourse/> 
      <PianoAbout/>
      <Reviews/>
      <PianoTeacher/>
      <FullPricingSection/>
      <PricingSection/>
      <Policy/>
    </div>
  );
} 