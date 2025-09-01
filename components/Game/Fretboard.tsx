import React from 'react';

interface FretboardProps {
  highlightedNotes: { string: number; fret: number }[];
  showNotation: boolean;
}

const stringLabels = ['E₄', 'B₃', 'G₃', 'D₃', 'A₂', 'E₂'];

const Fretboard: React.FC<FretboardProps> = ({ highlightedNotes, showNotation }) => {
  const numStrings = 6;
  const numFrets = 6;
  const labelWidth = 75; // Width of the area for string labels in px
  const nutWidth = 10; // Width of the nut in px

  // Vertical spacing constants
  const topBlackBarHeight = 15; // height of the black bar at the top
  const bottomFretNumbersBarHeight = 22; // height of the fret numbers bar at the bottom
  const totalFretboardHeight = 320; // total height of the Fretboard component container

  // Playable area for strings (vertical space inside the fretboard wood part)
  const playableVerticalSpace = totalFretboardHeight - topBlackBarHeight - bottomFretNumbersBarHeight - 1;
  const stringVerticalPaddingTop = 30; // Padding from top edge of playable vertical space
  const stringVerticalPaddingBottom = 30; // Padding from bottom edge of playable vertical space
  const usableHeightForStrings = playableVerticalSpace - stringVerticalPaddingTop - stringVerticalPaddingBottom;
  const stringSpacing = usableHeightForStrings / (numStrings - 1); // Space between centers of strings

  // Horizontal spacing constants
  const totalFretboardWidthPx = 1024; // max-w-5xl is 1024px
  const playingAreaStartPx = labelWidth + nutWidth; // Where the fretboard playing area starts horizontally
  const playingAreaWidthPx = totalFretboardWidthPx - playingAreaStartPx; // Width of the actual playing area (frets)

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-xl shadow-2xl overflow-hidden" style={{ height: `${totalFretboardHeight}px`, background: 'linear-gradient(180deg, #ffe9b3 0%, #a86b1c 100%)' }}>
      {/* Black bar at the top with shadow */}
      <div className="absolute top-0 left-20 w-full bg-gray-800 z-30 shadow-md" style={{ height: `${topBlackBarHeight}px`, borderTopLeftRadius: '0px', borderTopRightRadius: '12px', boxShadow: '0 4px 12px 0 rgba(0,0,0,0.4)' }} />

      {/* Fretboard background (starts after black bar, extends under labels) */}
      <div
        className="absolute left-0 w-full z-0"
        style={{
          top: `${topBlackBarHeight}px`,
          height: `${playableVerticalSpace}px`,
        }}
      />

      {/* Nut (first fret, visually distinct, starts after labelWidth) */}
      <div
        className="absolute bottom-12 bg-[#aaa6ad] z-30"
        style={{
          top: `${topBlackBarHeight}px`,
          left: `${labelWidth}px`,
          width: `${nutWidth}px`,
          height: `${playableVerticalSpace}px`,
          boxShadow: '2px 0 12px rgba(255,255,255,0.5)', // Adjusted shadow
          borderRadius: '2px',
          filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))',
        }}
      />

      {/* Frets (vertical lines, starts after nut) */}
      {Array.from({ length: numFrets }).map((_, fretIndex) => (
        <div
          key={`fret-${fretIndex + 1}`}
          className="absolute bottom-10 bg-yellow-600 z-20"
          style={{
            top: `${topBlackBarHeight}px`,
            left: `calc(${playingAreaStartPx}px + ${((fretIndex + 1) / numFrets) * playingAreaWidthPx}px)`,
            width: '3px',
            height: `${playableVerticalSpace}px`,
            boxShadow: '2px 0 8px rgba(184,134,11,0.25)', // Adjusted shadow
            borderRadius: '2px',
            filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))',
          }}
        />
      ))}

      {/* Strings (horizontal lines) and labels */}
      {Array.from({ length: numStrings }).map((_, stringIndex) => (
        <React.Fragment key={`string-${stringIndex}`}>
          {/* String label (positioned to the left of the nut) */}
          <div
            className="absolute flex items-center z-40"
            style={{
              top: `calc(${topBlackBarHeight}px + ${stringVerticalPaddingTop}px + ${stringIndex * stringSpacing}px - 18px)`,
              left: 0,
              width: `${labelWidth}px`,
              height: '36px',
              justifyContent: 'flex-end',
              paddingRight: '10px', // Space between label and nut
            }}
          >
            <span className="bg-white border border-gray-300 shadow-lg rounded-full px-4 py-1 text-gray-800 font-bold text-base" style={{ fontFamily: 'sans-serif', letterSpacing: '0.05em', boxShadow: '0 2px 8px rgba(0,0,0,0.05), 0 1px 0 #fff', minWidth: '48px', textAlign: 'center' }}>
              {showNotation ? stringLabels[stringIndex] : ''}
            </span>
          </div>

          {/* String line (starts after label area and nut) */}
          <div
            className="absolute z-20"
            style={{
              left: `20px`,
              right: 0,
              top: `calc(${topBlackBarHeight}px + ${stringVerticalPaddingTop}px + ${stringIndex * stringSpacing}px - 1px)`,
              height: '2px',
              background: 'linear-gradient(90deg, #e0e0e0 0%, #fff 50%, #bdbdbd 100%)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05), 0 1px 0 #fff',
              borderRadius: '2px',
              filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))',
            }}
          />
        </React.Fragment>
      ))}

      {/* Fret numbers bar (aligned with frets below playable area) */}
      <div
        className="absolute left-0 right-0 h-6 bg-gray-800 flex flex-row items-center z-52"
        style={{
          left:`-5px`,
          bottom: 0,
          borderBottomLeftRadius: '0px',
          borderBottomRightRadius: '12px',
          marginLeft: `${playingAreaStartPx}px`,
        }}
      >
        <div className="flex flex-row justify-between w-full px-8">
          {Array.from({ length: numFrets }).map((_, i) => (
            // Center the fret numbers between the frets
            <span
              key={`fretnum-${i + 1}`}
              className="text-gray-100 text-lg font-bold opacity-90"
              style={{
                // Distribute numbers evenly across the fret sections
                width: `${100 / numFrets}%`,
                textAlign: 'center',
                letterSpacing: '0.05em',
              }}
            >
              {i + 1}
            </span>
          ))}
        </div>
      </div>

      {/* Notes (dots) - centered between frets and on strings */}
      {highlightedNotes.map(({ string, fret }, index) => {
        // Calculate horizontal position (centered between frets)
        const dotLeftPx = playingAreaStartPx + (fret - 0.5) * (playingAreaWidthPx / numFrets);
        // Calculate vertical position (centered on string)
        const dotTopPx = topBlackBarHeight + stringVerticalPaddingTop + string * stringSpacing;

        return (
          <div
            key={`note-${index}`}
            className="absolute w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-base shadow-lg animate-pulse z-60"
            style={{
              top: `${dotTopPx}px`,
              left: `${dotLeftPx + labelWidth +85}px`,
              transform: 'translate(-50%, -50%)', // Center the div itself
              border: '2px solid #fff',
              background: 'radial-gradient(circle at 60% 30%, #60a5fa 70%, #2563eb 100%)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.4)', // Adjusted shadow
            }}
          >
            {fret + 1}
          </div>
        );
      })}
    </div>
  );
};

export default Fretboard;
