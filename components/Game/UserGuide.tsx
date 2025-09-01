import React from 'react';

const whiteKeyMappings = [
  { key: 'A', note: 'C4' },
  { key: 'S', note: 'D4' },
  { key: 'D', note: 'E4' },
  { key: 'F', note: 'F4' },
  { key: 'G', note: 'G4' },
  { key: 'H', note: 'A4' },
  { key: 'J', note: 'B4' },
  { key: 'K', note: 'C5' },
  { key: 'L', note: 'D5' },
  { key: ';', note: 'E5' },
  { key: `'`, note: 'F5' },
  { key: 'Z', note: 'G5' },
  { key: 'X', note: 'A5' },
  { key: 'C', note: 'B5' },
];

const blackKeyMappings = [
  { key: 'Q', note: 'Db4/C#4' },
  { key: 'W', note: 'Eb4/D#4' },
  { key: 'E', note: 'Gb4/F#4' },
  { key: 'R', note: 'Ab4/G#4' },
  { key: 'T', note: 'Bb4/A#4' },
  { key: 'Y', note: 'Db5/C#5' },
  { key: 'U', note: 'Eb5/D#5' },
  { key: 'I', note: 'Gb5/F#5' },
  { key: 'O', note: 'Ab5/G#5' },
  { key: 'P', note: 'Bb5/A#5' },
];

const UserGuide = () => {
  return (
    <div className="w-full flex justify-center px-4">
      <div className="bg-[#1e1e2f] p-6 rounded-lg shadow-xl border border-gray-700 w-full max-w-[650px]">
        <h2 className="text-2xl font-bold text-white mb-2 text-center">🎹 Keyboard to Piano Key Note Guide</h2>

        <h3 className="text-lg text-center font-semibold text-blue-50 mb-2">Try the Free Play mode to play your own Music!</h3>
        {/* White Keys */}
        <h3 className="text-lg font-semibold text-blue-300 mb-2">White Keys</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
          {whiteKeyMappings.map(({ key, note }) => (
            <div
              key={key}
              className="bg-white text-black rounded-md p-2 text-center font-mono shadow hover:scale-105 transition-transform duration-200"
            >
              <div className="font-bold">{key}</div>
              <div className="text-sm">{note}</div>
            </div>
          ))}
        </div>

        {/* Black Keys */}
        <h3 className="text-lg font-semibold text-purple-300 mb-2">Black Keys</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {blackKeyMappings.map(({ key, note }) => (
            <div
              key={key}
              className="bg-black text-white rounded-md p-2 text-center font-mono shadow hover:scale-105 transition-transform duration-200"
            >
              <div className="font-bold">{key}</div>
              <div className="text-sm">{note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserGuide;
