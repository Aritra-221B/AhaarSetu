'use client';
import { navLinks } from '@/constant/constant';
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { HiBars3BottomRight } from 'react-icons/hi2';
import CourseMenu from './CourseMenu';
import { useRouter } from 'next/navigation';


type NavOpener = {
  openNav: () => void;
  setShowPopup: (open: boolean) => void;
};

const Nav = ({ openNav, setShowPopup }: NavOpener) => {
  const [navBg, setNavBg] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= 90) setNavBg(true);
      if (window.scrollY < 90) setNavBg(false);
    };
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const currentPath = window.location.pathname;
    if (currentPath === '/') {
      const element = document.getElementById(id);
      if (element) {
        const offset = 100; // Offset by 100px to account for navbar height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      router.push('/#about');
    }
  };

  return (
    <>
      {/* ✅ Actual Navbar */}
      <div
        className={`${
          navBg ? 'bg-blue-950 shadow-md' : 'fixed'
        } transition-all duration-200 h-[12vh] z-[1000] fixed w-full`}
      >
        <div className="flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto">
          
          {/* Logo */}
          <div className="flex items-center space-x-3.5">
            <Link href="/" className="flex items-center space-x-3.5">
              <div className="w-12 h-12 relative">
                <Image
                  src="/images/logo.png"
                  alt="ChordsCraft Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col items-center">
                <h1 className="text-lg md:text-xl text-white uppercase font-bold">
                  chordscraft
                </h1>
                <span className="text-white font-semibold">
                  Institute Of Music
                </span>
              </div>
            </Link>
          </div>
          {/* Middle Section */}
          <div className="hidden lg:flex items-center space-x-10 justify-end flex-1 mr-4">
            <CourseMenu />

            {navLinks
              .filter((link) => link.label !== 'Courses')
              .map((link) => (
                link.label === 'Contact' ? (
                  <button
                    key={link.id}
                    onClick={() => setShowPopup(true)}
                    className="relative text-white text-lg font-medium w-fit block after:block after:content-[''] 
                    after:absolute after:h-[3px] after:bg-yellow-300 after:w-full after:scale-x-0 
                    after:hover:scale-x-100 after:transition duration-300 after:origin-center"
                  >
                    {link.label}
                  </button>
                ) : link.label === 'About' ? (
                  <Link href="#about" key={link.id} onClick={(e) => handleScroll(e, 'about')}>
                    <p
                      className="relative text-white text-lg font-medium w-fit block after:block after:content-[''] 
                    after:absolute after:h-[3px] after:bg-yellow-300 after:w-full after:scale-x-0 
                    after:hover:scale-x-100 after:transition duration-300 after:origin-center"
                    >
                      {link.label}
                    </p>
                  </Link>
                )  : (
                  <Link href={link.url} key={link.id}>
                    <p
                      className="relative text-white text-lg font-medium w-fit block after:block after:content-[''] 
                    after:absolute after:h-[3px] after:bg-yellow-300 after:w-full after:scale-x-0 
                    after:hover:scale-x-100 after:transition duration-300 after:origin-center"
                    >
                      {link.label}
                    </p>
                  </Link>
                )
              ))}
          </div>

          {/* Right Side: Book Now + Hamburger */}
          <div className="flex items-center space-x-4">
            <Link href="/book-now" className="ml-3 md:px-4 md:py-2 px-2 py-1.5 text-gray-900 text-xs md:text-base bg-white hover:bg-gray-200 transition-all duration-200 rounded-lg">
              Book Now
            </Link>
            <HiBars3BottomRight
              onClick={openNav}
              className="w-8 h-8 cursor-pointer text-white lg:hidden"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;