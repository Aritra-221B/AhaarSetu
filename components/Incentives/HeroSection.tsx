import React from "react";

type HeroSectionProps = {
  title: string;
  subtitle: string;
  buttonText?: string;
  backgroundImage?: string;
};

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  backgroundImage,
}) => {
  return (
    <section
      className="relative w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-48 lg:py-64 text-center">
        <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight text-green-50 drop-shadow-md">
          {title}
        </h1>
        <p className="mt-4 text-lg text-white max-w-2xl mx-auto">{subtitle}</p>

      </div>
    </section>
  );
};

export default HeroSection;