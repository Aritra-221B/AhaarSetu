"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { chords, Chord } from './chords';
import { AudioEngine } from './AudioEngine';
import { soundMapPiano, soundMapGuitarChords } from './sounds';
import Keyboard from './PianoBoard';
import Fretboard from './Fretboard';
import Quiz from './Quiz';
import Score from './Score';
import UserGuide from './UserGuide';
import { AnimatePresence, motion } from 'framer-motion';


const getRandomChord = (level: number): Chord => {
  const filteredChords = chords.filter((chord) => chord.level === level);
  const randomIndex = Math.floor(Math.random() * filteredChords.length);
  return filteredChords[randomIndex];
};

const getQuizOptions = (correctChord: Chord, level: number): string[] => {
  const options = [correctChord.name];
  const incorrectChords = chords.filter(
    (chord) => chord.level === level && chord.name !== correctChord.name
  );

  while (options.length < 4 && incorrectChords.length > 0) {
    const randomIndex = Math.floor(Math.random() * incorrectChords.length);
    const incorrectChord = incorrectChords.splice(randomIndex, 1)[0];
    options.push(incorrectChord.name);
  }

  return options.sort(() => Math.random() - 0.5); // Shuffle the options
};

type Instrument = 'piano' | 'guitar';

const ChordMasterGame: React.FC = () => {
  console.log('ChordMasterGame component rendering');
  const [instrument, setInstrument] = useState<Instrument>('piano');
  const [currentChord, setCurrentChord] = useState<Chord | null>(null);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [level] = useState(1);
  const [showNotation, setShowNotation] = useState(true);
  const [audioUnlocked, setAudioUnlocked] = useState(true);
  const [mode, setMode] = useState<'quiz' | 'freeplay'>('quiz');
  const audioEngineRef = useRef<AudioEngine | null>(null);

  // Check AudioContext state on mount
  useEffect(() => {
    console.log('AudioEngine initialization useEffect running');
    audioEngineRef.current = new AudioEngine();
    audioEngineRef.current.loadSounds(soundMapPiano);
    audioEngineRef.current.loadSounds(soundMapGuitarChords);
    // Check if context is suspended
    setTimeout(() => {
      if (audioEngineRef.current?.getAudioContext()?.state === 'suspended') {
        setAudioUnlocked(false);
      }
    }, 500);
  }, []);

  // Handler to unlock audio
  const handleUnlockAudio = async () => {
    if (audioEngineRef.current) {
      await audioEngineRef.current.resume();
      setAudioUnlocked(true);
    }
  };

  const [showGuide, setShowGuide] = useState(true);

  const nextRound = useCallback(() => {
    const newChord = getRandomChord(level);
    setCurrentChord(newChord);
    setQuizOptions(getQuizOptions(newChord, level));
    if (instrument === 'guitar' && newChord.chordSoundFileName) {
      audioEngineRef.current?.playChordFile(newChord.chordSoundFileName);
    } else {
      audioEngineRef.current?.playChord(newChord.notes);
    }
  }, [level, instrument, audioEngineRef]);

  useEffect(() => {
    nextRound();
  }, [level, instrument, nextRound]);

  useEffect(() => {
    if (instrument === 'guitar' && mode === 'freeplay') {
      setMode('quiz');
    }
  }, [instrument, mode]);

  const handleAnswer = (answer: string) => {
    if (answer === currentChord?.name) {
      setScore((prev) => prev + 10 * (streak + 1));
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
    nextRound();
  };

  if (!currentChord) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white p-4">
      {/* Audio unlock overlay */}
      {!audioUnlocked && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex flex-col items-center justify-center">
          <button
            onClick={handleUnlockAudio}
            className="px-8 py-4 bg-green-500 hover:bg-green-700 text-white text-2xl font-bold rounded-2xl shadow-2xl animate-pulse"
          >
            Enable Sound
          </button>
          <p className="mt-6 text-lg text-white">Click to enable sound. This is required by your browser.</p>
        </div>
      )}
      <h2 className="text-5xl md:text-6xl font-extrabold mt-20 mb-10 text-center bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
          ChordsMaster{' '}
          <span className="text-white mb-10">
            Challenge
          </span>
      </h2>
      {/* Instrument Tab Switch */}
      <div className="flex flex-row gap-4 items-center justify-center w-full max-w-lg mx-auto mb-10 bg-white rounded-xl p-1">
        <button
          onClick={() => setInstrument('piano')}
          className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none ${instrument === 'piano' ? 'bg-blue-100 text-blue-800 shadow-sm' : 'bg-transparent text-gray-800'}`}
        >
          Piano
        </button>
        <button
          onClick={() => setInstrument('guitar')}
          className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none ${instrument === 'guitar' ? 'bg-blue-100 text-blue-800 shadow-sm' : 'bg-transparent text-gray-800'}`}
        >
          Guitar
        </button>
      </div>
      {/* Mode Toggle */}
      <div className="flex flex-row gap-2 items-center mb-6">
        <button
          onClick={() => setMode('quiz')}
          className={`px-4 py-2 rounded-lg font-bold transition-all duration-200 ${mode === 'quiz' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'}`}
        >
          Quiz Mode
        </button>
        {instrument === 'piano' && (
          <button
            onClick={() => setMode('freeplay')}
            className={`px-4 py-2 rounded-lg font-bold transition-all duration-200 ${mode === 'freeplay' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'}`}
          >
            Free Play
          </button>
        )}
        {/* Custom Key Notations Toggle */}
        <div className="ml-6 flex items-center cursor-pointer select-none" onClick={() => setShowNotation((prev) => !prev)}>
          <div
            className={`relative w-20 h-9 flex items-center rounded-full transition-colors duration-200 ${showNotation ? 'bg-sky-600 border-2 border-gray-300' : 'bg-indigo-800 border-2 border-gray-300'}`}
            style={{ minWidth: '80px' }}
          >
            <span className={`absolute left-2 text-base font-bold transition-colors duration-200 ${showNotation ? 'text-gray-200' : 'text-indigo-700'}`}>ON</span>
            <span className={`absolute right-2 text-base font-bold transition-colors duration-200 ${!showNotation ? 'text-gray-200' : 'text-sky-600'}`}>OFF</span>
            <span
              className={`absolute left-1 w-7 h-7 rounded-full bg-gray-200 shadow-md transition-transform duration-200`}
              style={{ transform: showNotation ? 'translateX(40px)' : 'translateX(0)' }}
            />
          </div>
          <span className="ml-2 text-lg text-center font-semibold">Key Notations</span>
        </div>
      </div>
      {instrument === 'piano' ? (
      <Keyboard
        highlightedNotes={mode === 'quiz' ? currentChord.notes : []}
        showNotation={showNotation}
        freePlay={mode === 'freeplay'}
        audioEngine={audioEngineRef.current}
      />
      ) : (
      <Fretboard highlightedNotes={currentChord.guitarVoicing || []} showNotation={showNotation}/>
      )}

      {mode === 'quiz' && (
      <>
      <button
        onClick={() => {
          if (instrument === 'guitar' && currentChord.chordSoundFileName) {
            audioEngineRef.current?.playChordFile(currentChord.chordSoundFileName);
          } else {
            audioEngineRef.current?.playChord(currentChord.notes);
          }
        }}
        className="my-4 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-200 ease-in-out hover:scale-105"
      > Play Chord Again </button>

      {/* Score moved here */}
      <div className="my-2">
        <Score score={score} streak={streak} />
      </div>
        <Quiz options={quizOptions} onAnswer={handleAnswer} />
      </>
    )}


    {instrument === 'piano' && (
      <button
        onClick={() => setShowGuide((prev) => !prev)}
        className="flex items-center gap-2 px-4 py-2 my-4 bg-teal-500 text-white font-bold rounded-lg shadow-md hover:scale-105 hover:bg-teal-600 transition-transform duration-200"
      >
      {showGuide ? 'Hide User Guide' : 'Show User Guide'}
      </button>
    )}

    <AnimatePresence>
      {instrument === 'piano' && showGuide && (
      <motion.div
        key="user-guide"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      ><UserGuide />
      </motion.div>
      )}
    </AnimatePresence>
  </div>
  );
};

export default ChordMasterGame;
   