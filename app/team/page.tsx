import CoreTeam from '@/components/Team/CoreTeam';
import Faculty from '@/components/Team/Faculty';
import { Metadata } from 'next'


export const metadata: Metadata = {
    title: "Chordscraft's Teams Page",
    description: "Meet the passionate and talented team behind Chordscraft. Learn more about our instructors, mentors, and staff dedicated to guiding you on your musical journey!"
  };

  export default function TeamPage() {
    return (
      <div>
        <CoreTeam/>
        <Faculty/>
      </div>
    );
  }
