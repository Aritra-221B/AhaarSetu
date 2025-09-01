export type CategoryItem = {
  name: string;
  icon: string;
  href: string;
  image?: string;
};

export type Category = {
  name: string;
  items: CategoryItem[];
  description: string;
  bgColor: string;
};

export const categories: Category[] = [
  {
    name: 'Instruments',
    description: 'Master the art of playing beautiful music with our instrument courses.',
    bgColor: 'from-blue-400 to-indigo-500',
    items: [
      { name: 'Piano', icon: '🎹', href: '/courses/instruments/piano', image: '/images/instruments/piano.jpg' },
      { name: 'Acoustic Guitar', icon: '🎸', href: '/courses/instruments/acousticguitar', image: '/images/instruments/acoustic-guitar.jpg' },
      { name: 'Electric Guitar', icon: '🎸', href: '/courses/instruments/electricguitar', image: '/images/instruments/electric-guitar.jpg' },
      { name: 'Ukulele', icon: '🪕', href: '/courses/instruments/ukulele', image: '/images/instruments/ukulele.jpg' },
      { name: 'Drums', icon: '🥁', href: '/courses/instruments/drums', image: '/images/instruments/tabla.jpg' },
      { name: 'Violin', icon: '🎻', href: '/courses/instruments/violin', image: '/images/instruments/violin.jpg' },
      { name: 'Electronic Keyboard', icon: '🎹', href: '/courses/instruments/electronickeyboard', image: '/images/instruments/keyboard.jpg' },
      { name: 'Flute', icon: '🎵', href: '/courses/instruments/flute', image: '/images/instruments/flute.jpg' },
    ]
  },
  {
    name: 'Singing',
    description: 'Find your voice and develop your vocal talent with expert guidance.',
    bgColor: 'from-purple-400 to-pink-500',
    items: [
      { name: 'HINDUSTANI', icon: '🎵', href: '/courses/singing/hindustani', image: '/images/singing/classical.jpg' },
      { name: 'WESTERN', icon: '🎤', href: '/courses/singing/western', image: '/images/singing/western.jpg' },
      { name: 'Carnatic', icon: '🎤', href: '/courses/singing/carnatic', image: '/images/singing/western.jpg' },
    ]
  },
  {
    name: 'Dancing',
    description: 'Express yourself through movement with our diverse dance courses.',
    bgColor: 'from-yellow-400 to-orange-500',
    items: [
      { name: 'Classical', icon: '💃', href: '/courses/dancing/classical', image: '/images/dancing/classical.jpg' },
      { name: 'Contemporary', icon: '🕺', href: '/courses/dancing/contemporary', image: '/images/dancing/contemporary.jpg' },
      { name: 'Hip Hop', icon: '🕺', href: '/courses/dancing/hiphop', image: '/images/dancing/hiphop.jpg' },
    ]
  },
  {
    name: 'Certifications',
    description: 'Earn industry-recognized credentials to advance your music career.',
    bgColor: 'from-green-400 to-emerald-500',
    items: [
      { name: 'TRINITY', icon: '📜', href: '/arriving-soon', image: '/images/certifications/theory.jpg' },
      { name: 'ABRSM', icon: '🏆', href: '/arriving-soon', image: '/images/certifications/mastery.jpg' },
      { name: 'RSL', icon: '👨‍🏫', href: '/arriving-soon', image: '/images/certifications/teaching.jpg' },
      { name: 'ISTD', icon: '🏆', href: '/arriving-soon', image: '/images/certifications/mastery.jpg' },
      { name: 'ABGMVM', icon: '👨‍🏫', href: '/arriving-soon', image: '/images/certifications/teaching.jpg' },
    ]
  },
]; 