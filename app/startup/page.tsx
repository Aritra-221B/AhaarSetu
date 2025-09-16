'use client';
import React, { useState } from 'react';
import LoginAuthForm from '@/components/Startup/Login/LoginAuthForm';
import SignUpAuthForm from '@/components/Startup/SignUp/SignUpAuthForm';
import ForgotPassword from '@/components/Startup/ForgotPassword/ForgotPasswordAuth';
import AuthIllustration from '@/components/Startup/AuthIllustration';
import LanguageSwitcher from '@/components/Startup/LanguageSwitcher';
import FooterLinks from '@/components/Startup/FooterLinks';
import Image from 'next/image';

const StartupPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);

  const toggleForm = (showLogin: boolean) => {
    setIsLogin(showLogin);
    setShowForgotPasswordForm(false); // Ensure forgot password is hidden when toggling login/signup
  };

  const handleShowForgotPassword = (show: boolean) => {
    setShowForgotPasswordForm(show);
    setIsLogin(false); // Hide login/signup when forgot password is shown
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center justify-center p-4 relative">
      {/* Top Left Logo and Tagline - Positioned relative to the viewport */}
      <div className="absolute top-6 left-6 flex items-center z-10">
        <Image src="/images/logo.png" alt="AhaarSetu Logo" width={40} height={40} className="mr-2" />
        <div>
          <h1 className="text-xl font-bold text-gray-800">AhaarSetu</h1>
          <p className="text-gray-600 text-sm">Connecting Farms, Medicines & Market Digitally</p>
        </div>
      </div>

      {/* Top Right Language Switcher - Positioned relative to the viewport */}
      <div className="absolute top-6 right-6 z-10">
        <LanguageSwitcher />
      </div>

      {/* Central Card Container */}
      <div className="bg-white mt-16 mb-16 rounded-2xl shadow-2xl flex flex-col md:flex-row max-w-5xl w-full overflow-hidden my-auto transform transition-all duration-500 hover:scale-[1.01]">
        {/* Left Section: Illustration */}
        <div className="w-full md:w-1/2 h-96 md:h-auto relative flex items-center justify-center bg-white p-6">
          <AuthIllustration />
        </div>

        {/* Right Section: Auth Form */}
        <div className="w-full md:w-1/2 p-10 flex items-center justify-center bg-white">
          {showForgotPasswordForm ? (
            <ForgotPassword toggleForm={toggleForm} showForgotPassword={handleShowForgotPassword} />
          ) : isLogin ? (
            <LoginAuthForm toggleForm={toggleForm} showForgotPassword={handleShowForgotPassword} />
          ) : (
            <SignUpAuthForm toggleForm={toggleForm} />
          )}
        </div>
      </div>

      {/* Bottom Footer Links - Positioned relative to the viewport */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-3xl flex justify-between items-center z-10 px-6 md:px-0">
        <FooterLinks />
      </div>
    </div>
  );
};

export default StartupPage;