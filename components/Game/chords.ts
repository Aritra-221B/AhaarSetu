export interface Chord {
    name: string;
    notes: string[];
    level: number;
    guitarVoicing?: { string: number; fret: number }[];
    chordSoundFileName?: string; // Add this line
  }
  
  export const chords: Chord[] = [
    // Level 1: Major and Minor Triads
    { 
      name: 'C Major', 
      notes: ['C4', 'E4', 'G4'], 
      level: 1,
      guitarVoicing: [
        { string: 1, fret: 1 },
        { string: 3, fret: 2 },
        { string: 4, fret: 3 },
      ],
      chordSoundFileName: 'C Major'
    },
    { 
      name: 'C Minor', 
      notes: ['C4', 'Eb4', 'G4'], 
      level: 1,
      guitarVoicing: [
        { string: 0, fret: 4 },
        { string: 1, fret: 4 },
        { string: 2, fret: 5 },
        { string: 3, fret: 5 },
        { string: 4, fret: 3 },
      ],
      chordSoundFileName: 'C Minor'
    },
    { 
      name: 'D Major', 
      notes: ['D4', 'Gb4', 'A4'], 
      level: 1,
      guitarVoicing: [
        { string: 0, fret: 2 },
        { string: 1, fret: 3 },
        { string: 2, fret: 2 },
      ],
      chordSoundFileName: 'D Major'
    },
    { 
      name: 'D Minor', 
      notes: ['D4', 'F4', 'A4'], 
      level: 1,
      guitarVoicing: [
        { string: 0, fret: 1 },
        { string: 1, fret: 3 },
        { string: 2, fret: 2 },
      ],
      chordSoundFileName: 'D Minor'
    },
    { 
      name: 'E Major', 
      notes: ['E4', 'Ab4', 'B4'], 
      level: 1,
      guitarVoicing: [
        { string: 3, fret: 2 },
        { string: 4, fret: 2 },
      ],
      chordSoundFileName: 'E Major'
    },
    { 
      name: 'E Minor', 
      notes: ['E4', 'G4', 'B4'], 
      level: 1,
      guitarVoicing: [
        { string: 3, fret: 2 },
        { string: 4, fret: 2 },
      ],
      chordSoundFileName: 'E Minor'
    },
    { 
      name: 'F Major', 
      notes: ['F4', 'A4', 'C5'], 
      level: 1,
      guitarVoicing: [
        { string: 0, fret: 1 },
        { string: 1, fret: 1 },
        { string: 2, fret: 2 },
        { string: 3, fret: 3 },
      ],
      chordSoundFileName: 'F Major'
    },
    { 
      name: 'F Minor', 
      notes: ['F4', 'Ab4', 'C5'], 
      level: 1,
      guitarVoicing: [
        { string: 0, fret: 1 },
        { string: 1, fret: 1 },
        { string: 2, fret: 1 },
        { string: 3, fret: 3 },
        { string: 4, fret: 1 },
        { string: 5, fret: 1 },
      ],
      chordSoundFileName: 'F Minor'
    },
    { 
      name: 'G Major', 
      notes: ['G4', 'B4', 'D5'], 
      level: 1,
      guitarVoicing: [
        { string: 0, fret: 3 },
        { string: 4, fret: 2 },
        { string: 5, fret: 3 },
      ],
      chordSoundFileName: 'G Major'
    },
    { 
      name: 'G Minor', 
      notes: ['G4', 'Bb4', 'D5'], 
      level: 1,
      guitarVoicing: [
        { string: 0, fret: 3 },
        { string: 1, fret: 3 },
        { string: 2, fret: 3 },
        { string: 3, fret: 5 },
        { string: 4, fret: 5 },
        { string: 5, fret: 3 },
      ],
      chordSoundFileName: 'G Minor'
    },
    { 
      name: 'A Major', 
      notes: ['A4', 'Db5', 'E5'], 
      level: 1,
      guitarVoicing: [
        { string: 1, fret: 2 },
        { string: 2, fret: 2 },
        { string: 3, fret: 2 },
      ],
      chordSoundFileName: 'A Major'
    },
    { 
      name: 'A Minor', 
      notes: ['A4', 'C5', 'E5'], 
      level: 1,
      guitarVoicing: [
        { string: 1, fret: 1 },
        { string: 2, fret: 2 },
        { string: 3, fret: 2 },
      ],
      chordSoundFileName: 'A Minor'
    },
    { 
      name: 'B Major', 
      notes: ['B4', 'Eb5', 'Gb5'], 
      level: 1,
      guitarVoicing: [
        { string: 0, fret: 2 },
        { string: 1, fret: 4 },
        { string: 2, fret: 4 },
        { string: 3, fret: 4 },
        { string: 4, fret: 2 },
      ],
      chordSoundFileName: 'B Major'
    },
    { 
      name: 'B Minor', 
      notes: ['B4', 'D5', 'Gb5'], 
      level: 1,
      guitarVoicing: [
        { string: 0, fret: 2 },
        { string: 1, fret: 3 },
        { string: 2, fret: 4 },
        { string: 3, fret: 4 },
        { string: 4, fret: 2 },
      ],
      chordSoundFileName: 'B Minor'
    },
  ];
  