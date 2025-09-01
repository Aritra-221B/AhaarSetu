import React from 'react';

type Props = {
  heading: string;
  subheading: string;
};

const SectionHeading = ({ heading, subheading }: Props) => {
  return (
    <div className="mb-12 w-[90%] max-w-5xl mx-auto">
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 sm:gap-x-8 gap-y-2 text-center sm:text-left">
        <h1 className="text-4xl sm:text-5xl text-blue-950 font-extrabold tracking-tight">
          {heading}
        </h1>
        <p className="text-3xl sm:text-4xl text-gray-800 font-semibold">
          {subheading}
        </p>
      </div>
    </div>
  );
};

export default SectionHeading;
