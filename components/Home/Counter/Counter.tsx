'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

interface CounterItemProps {
  target: number;
  label: string;
  isLast?: boolean;
}

const CounterItem = ({ target, label, isLast = false }: CounterItemProps) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const animateCounter = useCallback(() => {
    const duration = 2000; // ms
    const frameRate = 15; // ms per frame
    const totalSteps = duration / frameRate;
    const increment = target / totalSteps;

    let current = 0;
    let timer: ReturnType<typeof setTimeout>;

    const update = () => {
      current += increment;
      if (current < target) {
        setCount(Math.ceil(current));
        timer = setTimeout(update, frameRate);
      } else {
        setCount(target);
      }
    };

    update();

    return () => clearTimeout(timer);
  }, [target]);

  useEffect(() => {
    if (hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          const stop = animateCounter();
          const node = entry.target as Element;
          observer.unobserve(node);
          hasAnimated.current = true;
          // Cleanup animation timeout on unmount
          return stop;
        }
      },
      { threshold: 0.1 }
    );

    const node = counterRef.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [animateCounter]);

  return (
    <div
      ref={counterRef}
      className={`stat-box px-6 md:px-10 transition-all duration-300 transform ${
        !isLast ? 'border-r border-yellow-400' : ''
      }`}
    >
      <h2 className="text-3xl font-bold text-gray-800">
        {count}+
      </h2>
      <p className="text-gray-700 mt-1">{label}</p>
    </div>
  );
};

const AnimatedCounters = () => {
  const stats = [
    { target: 500, label: 'Online learners' },
    { target: 20, label: 'Countries' },
    { target: 30, label: 'Teachers' },
  ];

  return (
    <div className="bg-[#F2F7FD]">
      <div className="py-10">
        <div className="bg-yellow-400 rounded-xl w-[90%] md:w-[60%] max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-around text-center p-8 md:py-10 shadow-lg space-y-6 md:space-y-0 transition-all duration-300">
          {stats.map((stat, index) => (
            <CounterItem
              key={index}
              target={stat.target}
              label={stat.label}
              isLast={index === stats.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedCounters;