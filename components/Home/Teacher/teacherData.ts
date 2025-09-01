export interface TeacherInterface {
  name: string;
  instrument: string;
  image: string;
  qualification: string;
  rating: string;
  experience: string;
}

const teacherData: TeacherInterface[] = [
  // PIANO (7)
  {
    name: 'Gourab Nandi',
    instrument: 'PIANO',
    image: '/images/FacultyImage/Gourab.jpg',
    qualification: 'Trinity Grade 5',
    rating: '5.0',
    experience: '10+ Years',
  },
  {
    name: 'Jayita Goswami',
    instrument: 'PIANO',
    image: '/images/FacultyImage/Jayita.jpg',
    qualification: 'ABRSM Grade 8',
    rating: '5.0',
    experience: '20+ Years',
  },
  {
    name: 'Akash Sarkar',
    instrument: 'PIANO',
    image: '/images/FacultyImage/Akash.jpg',
    qualification: 'ABRSM Grade 8',
    rating: '5.0',
    experience: '10+ Years',
  },
  {
    name: 'Raj Kishor Chakraborty',
    instrument: 'PIANO',
    image: '/images/FacultyImage/Raj Kishor Chakraborty.jpg',
    qualification: ' ',
    rating: '4.0',
    experience: '15+ Years',
  },
  {
    name: 'Spandan Lodh',
    instrument: 'PIANO',
    image: '/images/FacultyImage/.jpg',
    qualification: 'ABRSM Grade 5',
    rating: '5.0',
    experience: '12+ Years',
  },
  {
    name: 'Surya Sundar Mukherjee',
    instrument: 'PIANO',
    image: '/images/FacultyImage/Surya.jpg',
    qualification: 'Trinity Grade 5',
    rating: '4.5',
    experience: '10+ Years',
  },
  {
    name: 'Abhijeet Bhave',
    instrument: 'PIANO',
    image: '/images/FacultyImage/AbhijeetPiano.jpg',
    qualification: 'Trinity Grade 5',
    rating: '4.0',
    experience: '8+ Years',
  },
  // GUITAR (3)
  {
    name: 'Sambhaditya Nath',
    instrument: 'GUITAR',
    image: '/images/FacultyImage/Shambaditya.jpg',
    qualification: 'ABRSM Grade 5',
    rating: '5.0',
    experience: '6+ Years',
  },
  {
    name: 'Daraj Mandal',
    instrument: 'GUITAR',
    image: '/images/FacultyImage/DarajPiano.jpg',
    qualification: 'Trinity Grade 5',
    rating: '5.0',
    experience: '10+ Years',
  },
  {
    name: 'Abhijeet Bhave',
    instrument: 'GUITAR',
    image: '/images/FacultyImage/AbhijeetGuitar.jpg',
    qualification: 'Trinity Grade 8',
    rating: '4.0',
    experience: '8+ Years',
  },
  
  // UKULELE (2)
  {
    name: 'Daraj Mondal',
    instrument: 'UKULELE',
    image: '/images/FacultyImage/DarajGuitar.jpg',
    qualification: 'Trinity Grade 6',
    rating: '4.5',
    experience: '7+ Years',
  },
  {
    name: 'Abhijeet Bhave',
    instrument: 'UKULELE',
    image: '/images/FacultyImage/AbhijeetGuitar.jpg',
    qualification: 'Trinity Grade 7',
    rating: '4.6',
    experience: '8+ Years',
  },
  // VIOLIN (1)
  {
    name: 'Jyotiprakash Chakraborty',
    instrument: 'VIOLIN',
    image: '/images/FacultyImage/Jyotiprakash.jpg',
    qualification: 'Trinity Grade 8',
    rating: '4.9',
    experience: '10+ Years',
  },
  // DRUMS (1)
  {
    name: '',
    instrument: 'DRUMS',
    image: '/images/FacultyImage/Drums.jpg',
    qualification: 'Trinity Grade 7',
    rating: '4.8',
    experience: '9+ Years',
  },
  // WESTERN VOCALS (3)
  {
    name: 'Debosmita Chakraborty',
    instrument: 'WESTERN VOCALS',
    image: '/images/FacultyImage/Debosmita.jpg',
    qualification: 'Trinity Grade 8',
    rating: '4.9',
    experience: '11+ Years',
  },
  {
    name: 'Jayita Goswami',
    instrument: 'WESTERN VOCALS',
    image: '/images/FacultyImage/Jayita.jpg',
    qualification: 'Trinity Grade 7',
    rating: '4.7',
    experience: '8+ Years',
  },
  // HINDUSTANI VOCALS (2)
  {
    name: 'Sarthak Ghosh',
    instrument: 'HINDUSTANI VOCALS',
    image: '/images/FacultyImage/.jpg',
    qualification: 'Visharad Part 2',
    rating: '4.8',
    experience: '9+ Years',
  },
  {
    name: 'Daraj Mondal',
    instrument: 'HINDUSTANI VOCALS',
    image: '/images/FacultyImage/DarajGuitar.jpg',
    qualification: 'Visharad Part 1',
    rating: '4.6',
    experience: '7+ Years',
  },
  
  // MUSIC PRODUCTION (1)
  {
    name: 'Soumyajit Chakraborty',
    instrument: 'MUSIC PRODUCTION',
    image: '/images/FacultyImage/Soumyajit Chakraborty.jpg',
    qualification: ' ',
    rating: '5.0',
    experience: '10+ Years',
  },
  ];
  
export default teacherData;
