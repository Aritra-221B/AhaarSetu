import { Metadata } from 'next';
import ArrivingSoon from '@/components/Course/arrivingSoon';
import FluteCourse from '@/components/Course/Instruments/flute/FluteCourse';

export const metadata: Metadata = {
  title: "Chordscraft's Flute Page",
  description: 'Unlock your musical journey with our comprehensive flute course. Learn from expert instructors and master the flute at your own pace!',
};

export default function FluteCoursePage() {
  return (
    <div>
      <FluteCourse/>
      <ArrivingSoon/>
    </div>
  );
} 