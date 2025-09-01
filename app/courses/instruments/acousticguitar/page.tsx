import GuitarAbout from "@/components/Course/Instruments/acousticguitar/GuitarAbout";
import GuitarCourse from "@/components/Course/Instruments/acousticguitar/GuitarCourse";
import Reviews from "@/components/Course/Instruments/acousticguitar/GuitarReviews/Reviews";
import GuitarTeacher from "@/components/Course/Instruments/acousticguitar/GuitarTeacher";
import FullPricingSection from "@/components/Course/Instruments/acousticguitar/FullGuitarPricing";
import PricingSection from "@/components/Course/Instruments/acousticguitar/GuitarPricing/PricingSection";
import { Metadata } from "next";
import Policy from "@/components/Policy/Policy";

export const metadata: Metadata = {
    title: "Chordscraft's Acoustic Guitar Page",
    description: 'Unlock your musical journey with our comprehensive acoustic guitar course. Learn from expert instructors and master the acoustic guitar at your own pace!',
  };
  export default function GuitarCoursePage() {
    return (
      <div>
        <GuitarCourse/> 
        <GuitarAbout/>
        <Reviews/>
        <GuitarTeacher/>
        <FullPricingSection/>
        <PricingSection/>
        <Policy/>
      </div>
    );
  }   