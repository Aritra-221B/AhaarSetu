// components/StepProgressBar.tsx
'use client';
import React from 'react';
import clsx from 'clsx';

interface StepProgressBarProps {
  currentStep: number;
  steps: string[]; // Added new prop to make steps dynamic
  onStepClick?: (step: number) => void; // Added new prop for click handler
}

const StepProgressBar: React.FC<StepProgressBarProps> = ({ currentStep, steps, onStepClick }) => { // Destructure steps prop
  return (
    <div className="flex justify-center items-center mb-1 sm:mb-2 md:mb-3 lg:mb-4 w-full max-w-[800px] overflow-visible">
      {/* Outer container for the entire progress bar, providing overall rounded corners and shadow */}
      <div className="flex rounded-xl overflow-visible shadow-2xl bg-white border-2 border-purple-100"> {/* Changed overflow to visible */}
        {steps.map((label, index) => {
          const step = index + 1;
          const isCompleted = step < currentStep;
          const isActive = step === currentStep;
          const isLast = step === steps.length;

          // Calculate z-index to ensure active steps are on top, then completed, then inactive
          const zIndex = isActive ? 3 : (isCompleted ? 2 : 1);

          return (
            <div
              key={step}
              className={clsx(
                'relative flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 lg:px-12 lg:py-4 text-xs sm:text-sm md:text-lg font-bold transition-all duration-300 ease-in-out min-w-[80px] sm:min-w-[100px]', // Responsive padding, text sizes, and minWidth
                {
                  // Colors matching the latest image inspiration
                  'text-white': isActive || isCompleted, // Text color for active and completed steps
                  'text-gray-800': !isActive && !isCompleted, // Text color for inactive steps
                  'bg-white': !isActive && !isCompleted, // Inactive step background
                  'rounded-l-xl': step === 1, // Apply rounded-l-xl to the first step
                  'rounded-r-xl': isLast, // Apply rounded-r-xl to the last step
                  // Removed hover:brightness-90 and cursor-pointer as not indicated in the new image and for simpler design
                  'cursor-pointer': onStepClick, // Add cursor-pointer if onStepClick is provided
                }
              )}
              style={{
                background: isActive // Apply gradient for active step
                  ? 'linear-gradient(to right, #9333ea, #db2777)' // Purple to pink gradient
                  : isCompleted // Apply solid purple for completed step
                    ? '#9333ea'
                    : undefined, // No background style for inactive steps (handled by className)
                // Arrow shape should only be present for the active step (and disappear for completed ones)
                clipPath: isActive && !isLast
                  ? 'polygon(0 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 0 100%)' // Prominent arrow depth at 15px
                  : 'none', // No clip-path for completed or inactive steps, or the last step

                // Overlap effect: negative margin only for the active step
                marginLeft: isActive && step > 1 ? '-15px' : '0', // Prominent overlap at -15px

                // Ensure proper layering for overlapping elements
                zIndex: zIndex,

                // Removed padding from style as it's now in className
              }}
              onClick={() => onStepClick?.(step)} // Attach onClick handler
            >
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepProgressBar;
