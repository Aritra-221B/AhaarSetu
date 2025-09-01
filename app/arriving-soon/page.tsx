import { Metadata } from 'next';
import ArrivingSoon from '@/components/Course/arrivingSoon';

export const metadata: Metadata = {
  title: 'Coming Soon - Chordscraft',
  description: 'This course is coming soon. Stay tuned for amazing learning content!',
};

export default function ArrivingSoonPage() {
  return <ArrivingSoon />;
} 