import React from 'react';

interface ScoreProps {
  score: number;
  streak: number;
}

const Score: React.FC<ScoreProps> = ({ score, streak }) => {
  return (
    <div className="text-center w-full max-w-lg mx-auto flex flex-row justify-around items-center gap-6 transition-transform duration-300">
      {/* Score Block */}
      <div className="text-center">
        <h3 className="text-xl md:text-2xl font-bold text-cyan-300 drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] mb-1">
          🎯 Score
        </h3>
        <div className="text-4xl font-extrabold text-white">
          {score}
        </div>
      </div>

      {/* Streak Block */}
      <div className="text-center">
        <h3 className="text-xl md:text-2xl font-bold text-yellow-300 drop-shadow-[0_0_8px_rgba(255,255,0,0.6)] mb-1">
          🔥 Streak
        </h3>
        <div className="text-4xl font-bold text-white">
          {streak}x
        </div>
      </div>
    </div>
  );
};

export default Score;