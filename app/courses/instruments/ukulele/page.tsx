import FullPricingSection from '@/components/Course/Instruments/ukulele/FullUkulelePricing';
import UkuleleAbout from '@/components/Course/Instruments/ukulele/UkuleleAbout';
import UkuleleCourse from '@/components/Course/Instruments/ukulele/UkuleleCourse';
import PricingSection from '@/components/Course/Instruments/ukulele/UkulelePricing/PricingSection';
import Reviews from '@/components/Course/Instruments/ukulele/UkuleleReviews/Reviews';
import UkuleleTeacher from '@/components/Course/Instruments/ukulele/UkuleleTeacher';
import Policy from '@/components/Policy/Policy';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: "Chordscraft's Ukulele Page",
  description: 'Unlock your musical journey with our comprehensive ukulele course. Learn from expert instructors and master the ukulele at your own pace!',
};

export default function UkuleleCoursePage() {
  return (
    <div>
      <UkuleleCourse/>
      <UkuleleAbout/>
      <Reviews/>
      <UkuleleTeacher/>
      <FullPricingSection/>
      <PricingSection/>
      <Policy/>
    </div>
  );
} 