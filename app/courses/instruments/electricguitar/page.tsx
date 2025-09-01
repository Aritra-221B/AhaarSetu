import GuitarAbout from "@/components/Course/Instruments/electricguitar/GuitarAbout";
import GuitarCourse from "@/components/Course/Instruments/electricguitar/GuitarCourse";
import Reviews from "@/components/Course/Instruments/electricguitar/GuitarReviews/Reviews";
import GuitarTeacher from "@/components/Course/Instruments/electricguitar/GuitarTeacher";
import FullPricingSection from "@/components/Course/Instruments/electricguitar/FullGuitarPricing";
import PricingSection from "@/components/Course/Instruments/electricguitar/GuitarPricing/PricingSection";
import { Metadata } from "next";
import Policy from "@/components/Policy/Policy";

export const metadata: Metadata = {
    title: "Chordscraft's Electronic Guitar Page",
    description: 'Unlock your musical journey with our comprehensive electric guitar course. Learn from expert instructors and master the electric guitar at your own pace!',
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