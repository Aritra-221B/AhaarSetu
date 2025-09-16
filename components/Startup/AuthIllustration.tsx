import React from 'react';
import Image from 'next/image';

const AuthIllustration: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-white p-4">
      <div className="absolute inset-0 rounded-lg opacity-20"></div>
      <Image
        src="/images/login_illustration.png"
        alt="AhaarSetu Login Illustration"
        layout="fill"
        objectFit="contain"
        priority
        className="relative z-10 transform transition-transform duration-500 hover:scale-105"
      />
    </div>
  );
};

export default AuthIllustration;
