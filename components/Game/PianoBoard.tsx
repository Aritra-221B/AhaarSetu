import React, { useState, useEffect, useRef } from 'react';

interface KeyboardProps {
  highlightedNotes: string[];
  showNotation?: boolean;
  freePlay?: boolean;
  audioEngine?: any;
}

const KEYBOARD_MAP: { [key: string]: string } = {
  // White keys (A S D F G H J K L ; ' Z X)
  a: 'C4', s: 'D4', d: 'E4', f: 'F4', g: 'G4', h: 'A4', j: 'B4',
  k: 'C5', l: 'D5', ';': 'E5', "'": 'F5', z: 'G5', x: 'A5', c: 'B5',
  // Black keys (W E T Y U O P)
  q: 'Db4', w: 'Eb4', e: 'Gb4', r: 'Ab4', t: 'Bb4', y: 'Db5', u: 'Eb5', i: 'Gb5', o: 'Ab5', p: 'Bb5',
};

const Keyboard: React.FC<KeyboardProps> = ({ highlightedNotes, showNotation = false, freePlay = false, audioEngine }) => {
  const whiteKeys = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5'];
  const blackKeys = [
    { note: 'Db4', position: 1 },
    { note: 'Eb4', position: 2 },
    { note: 'Gb4', position: 4 },
    { note: 'Ab4', position: 5 },
    { note: 'Bb4', position: 6 },
    { note: 'Db5', position: 8 },
    { note: 'Eb5', position: 9 },
    { note: 'Gb5', position: 11 },
    { note: 'Ab5', position: 12 },
    { note: 'Bb5', position: 13 },
  ];
  const whiteKeyWidth = 100 / whiteKeys.length;
  const blackKeyWidthPercent = whiteKeyWidth * 0.75; // wider than before
  const [activeNotes, setActiveNotes] = useState<string[]>([]);
  const keyDownRef = useRef<{ [note: string]: boolean }>({});

  // Keyboard event handlers for desktop
  useEffect(() => {
    if (!freePlay) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const note = KEYBOARD_MAP[e.key.toLowerCase()];
      if (note && !keyDownRef.current[note]) {
        keyDownRef.current[note] = true;
        setActiveNotes((prev) => [...prev, note]);
        audioEngine?.playSound(note);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      const note = KEYBOARD_MAP[e.key.toLowerCase()];
      if (note) {
        keyDownRef.current[note] = false;
        setActiveNotes((prev) => prev.filter((n) => n !== note));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [freePlay, audioEngine]);

  // Helper for touch/mouse
  const handleKeyDownUI = (note: string) => {
    setActiveNotes((prev) => [...prev, note]);
    audioEngine?.playSound(note);
  };
  const handleKeyUpUI = (note: string) => {
    setActiveNotes((prev) => prev.filter((n) => n !== note));
  };

  return (
    <div className="relative flex flex-col justify-center w-full max-w-4xl mx-auto shadow-2xl rounded-b-lg bg-gray-900 overflow-hidden select-none">
      {/* Black bar above the keys, always on top */}
      <div className="absolute top-0 left-0 w-full h-8 bg-black z-30 pointer-events-none" style={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }} />
      <div className="flex w-full h-64 relative z-10 overflow-hidden pt-8">
        {/* White Keys */}
        {whiteKeys.map((note, index) => {
          const isHighlighted = highlightedNotes.includes(note) || activeNotes.includes(note);
            return (
                <div
                    key={`white-${note}-${index}`}
              className={`relative flex-grow border-r border-gray-200 last:border-r-0 transition-all duration-75 ${isHighlighted ? 'bg-yellow-200 scale-105 shadow-2xl' : 'bg-white'} ${freePlay ? 'cursor-pointer active:scale-105' : ''}`}
              style={{
                width: `${whiteKeyWidth}%`,
                height: '100%',
                borderBottomLeftRadius: index === 0 ? '12px' : '0',
                borderBottomRightRadius: index === whiteKeys.length - 1 ? '12px' : '0',
                background: isHighlighted
                  ? 'linear-gradient(180deg, #fffbe7 0%, #facc15 60%, #eab308 100%)'
                  : 'linear-gradient(180deg, #f9f9f9 0%, #e5e5e5 80%, #d1d5db 100%)',
                boxShadow: isHighlighted
                  ? '0 6px 18px 0 rgba(0,0,0,0.18), 0 1px 0 0 #facc15, inset 0 -10px 18px 0 rgba(0,0,0,0.10)'
                  : '0 6px 18px 0 rgba(0,0,0,0.13), 0 1px 0 0 #e5e7eb, inset 0 -10px 18px 0 rgba(0,0,0,0.08)',
                zIndex: 1,
                borderLeft: index === 0 ? '1.5px solid #e5e7eb' : undefined,
                borderRight: index === whiteKeys.length - 1 ? '1.5px solid #e5e7eb' : undefined,
                transition: 'transform 0.07s',
              }}
              onMouseDown={freePlay ? () => handleKeyDownUI(note) : undefined}
              onMouseUp={freePlay ? () => handleKeyUpUI(note) : undefined}
              onMouseLeave={freePlay ? () => handleKeyUpUI(note) : undefined}
              onTouchStart={freePlay ? () => handleKeyDownUI(note) : undefined}
              onTouchEnd={freePlay ? () => handleKeyUpUI(note) : undefined}
            >
              {/* Glossy highlight */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '30%',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 100%)',
                borderTopLeftRadius: index === 0 ? '12px' : '0',
                borderTopRightRadius: index === whiteKeys.length - 1 ? '12px' : '0',
                pointerEvents: 'none',
              }} />
              {showNotation && (
                <span style={{
                  position: 'absolute',
                  bottom: 8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: isHighlighted ? '#b45309' : '#222',
                  textShadow: '0 1px 2px #fff',
                  userSelect: 'none',
                }}>{note.replace(/[0-9]/g, '')}</span>
              )}
                </div>
          );
        })}
      </div>

      {/* Black Keys */}
      {blackKeys.map(({ note, position }) => {
        const isHighlighted = highlightedNotes.includes(note) || activeNotes.includes(note);
        return (
          <div
            key={`black-${note}`}
            className={`absolute z-30 transition-all duration-75 ${isHighlighted ? 'bg-yellow-700 scale-110 shadow-2xl' : 'bg-black'} ${freePlay ? 'cursor-pointer active:scale-110' : ''}`}
            style={{
              left: `calc(${position * whiteKeyWidth}% - ${blackKeyWidthPercent / 2}%)`,
              top: '40px',
              width: `calc(${blackKeyWidthPercent}% )`,
              height: '62%',
              borderBottomLeftRadius: '10px',
              borderBottomRightRadius: '10px',
              boxShadow: isHighlighted
                ? '0 10px 24px 2px rgba(0,0,0,0.38), 0 2px 0 0 #eab308'
                : '0 12px 28px 4px rgba(0,0,0,0.65)',
              background: isHighlighted
                ? 'linear-gradient(180deg, #fffbe7 0%, #facc15 60%, #b45309 100%)'
                : 'linear-gradient(180deg, #444 0%, #111 60%, #000 100%)',
              borderTopLeftRadius: '4px',
              borderTopRightRadius: '4px',
              border: isHighlighted ? '1.5px solid #eab308' : '1.5px solid #222',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              overflow: 'hidden',
              transition: 'transform 0.07s',
            }}
            onMouseDown={freePlay ? () => handleKeyDownUI(note) : undefined}
            onMouseUp={freePlay ? () => handleKeyUpUI(note) : undefined}
            onMouseLeave={freePlay ? () => handleKeyUpUI(note) : undefined}
            onTouchStart={freePlay ? () => handleKeyDownUI(note) : undefined}
            onTouchEnd={freePlay ? () => handleKeyUpUI(note) : undefined}
          >
            {/* Glossy highlight for black key */}
            <div style={{
              width: '80%',
              height: '18%',
              marginTop: '2px',
              borderRadius: '0 0 8px 8px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.05) 100%)',
              opacity: 0.7,
              pointerEvents: 'none',
            }} />
            {showNotation && (
              <span style={{
                position: 'absolute',
                top: '8px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: 'clamp(0.7rem, 2vw, 1.1rem)',
                fontWeight: 700,
                color: isHighlighted ? '#b45309' : '#fff',
                textShadow: '0 2px 6px #000, 0 1px 2px #fff',
                userSelect: 'none',
                zIndex: 40,
                width: '90%',
                textAlign: 'center',
                lineHeight: 1.1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>{note.replace(/[0-9]/g, '')}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Keyboard;
