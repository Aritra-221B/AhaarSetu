import { Metadata } from 'next';
import ElectronicKeyboardCourse from '@/components/Course/Instruments/electronickeyboard/ElectronicKeyboardCourse';
import ElectronicKeyboardTeacher from '@/components/Course/Instruments/electronickeyboard/ElectronicKeyboardTeacher';
import Reviews from '@/components/Course/Instruments/electronickeyboard/ElectronicKeyboardReviews/Reviews';
import FullPricingSection from '@/components/Course/Instruments/electronickeyboard/FullElectronicKeyboardPricing';
import PricingSection from '@/components/Course/Instruments/electronickeyboard/ElectronicKeyboardPricing/PricingSection';
import Policy from '@/components/Policy/Policy';
import ElectronicKeyboardAbout from '@/components/Course/Instruments/electronickeyboard/ElectronicKeyboardAbout';

export const metadata: Metadata = {
  title: "Chordscraft's Electronic Keyboard Page",
  description: 'Unlock your musical journey with our comprehensive electronic keyboard course. Learn from expert instructors and master the electronic keyboard at your own pace!',
};

export default function ElectronicKeyboardPage() {
  return (
    <div>
        <ElectronicKeyboardCourse/>
        <ElectronicKeyboardAbout/>
        <Reviews/>
        <ElectronicKeyboardTeacher/>
        <FullPricingSection/>
        <PricingSection/>
        <Policy/>
    </div>
  );
} 