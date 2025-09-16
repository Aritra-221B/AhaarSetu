'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { CgClose } from 'react-icons/cg';
import { navLinks } from '@/constant/constant';
import { categories } from './CourseMenuData';
import { useRouter } from 'next/navigation';
// ContactUsPopup is controlled from parent via setShowPopup


type Props = {
  showNav: boolean;
  closeNav: () => void;
  setShowPopup: (open: boolean) => void;
};

const MobileNav = ({ closeNav, showNav, setShowPopup }: Props) => {
  const navOpen = showNav ? "translate-x-0" : "translate-x-[-100%]";
  const [courseOpen, setCourseOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const router = useRouter();

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
        closeNav();
      }
    } else {
      router.push('/#about');
      closeNav(); // Close mobile nav after initiating navigation
    }
  };

  const toggleCategory = (categoryName: string) => {
    if (activeCategory === categoryName) {
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryName);
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[2000]">
      {/* Overlay */}
      <div 
        className={`fixed ${navOpen} inset-0 transform transition-all duration-500 bg-black opacity-70 w-full h-screen pointer-events-auto`} 
        onClick={closeNav}
      />

      {/* Mobile Navigation Panel */}
      <div className={`text-white ${navOpen} fixed left-0 top-0 bottom-0 justify-start flex flex-col h-full transform transition-all duration-500 w-[80%] sm:w-[60%] bg-green-950 space-y-6 z-[2001] overflow-y-auto py-10 px-6 pointer-events-auto`}>
        {/* Close button */}
        <CgClose onClick={closeNav} className="absolute top-[0.7rem] right-[1.4rem] sm:w-8 sm:h-8 w-6 h-6 cursor-pointer" />
        
        <div className="space-y-6 mt-6">
          {navLinks.map((link) => {
            if (link.label === "Courses") {
              return (
                <div key={link.id} className="w-full">
                  <button
                    onClick={() => setCourseOpen(!courseOpen)}
                    className="text-white text-[20px] sm:text-[24px] flex items-center justify-between w-full border-b-[1.5px] py-2 border-white/30 hover:text-orange-900 transition"
                  >
                    Courses
                    <span className={`transform transition-transform duration-300 ${courseOpen ? 'rotate-180' : 'rotate-0'}`}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>

                  {/* Collapsible Courses Menu */}
                  {courseOpen && (
                    <div className="mt-4 space-y-4 pl-2 text-[16px] sm:text-[18px] animate-fadeIn">
                      {categories.map((category) => (
                        <div key={category.name} className="border-l-2 border-white/20 pl-4">
                          <button 
                            onClick={() => toggleCategory(category.name)}
                            className="font-medium text-orange-900 flex items-center justify-between w-full hover:text-orange-900 transition py-1"
                          >
                            {category.name}
                            <span className={`transform transition-transform duration-300 ${activeCategory === category.name ? 'rotate-180' : 'rotate-0'}`}>
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </span>
                          </button>
                          
                          {activeCategory === category.name && (
                            <ul className="ml-3 space-y-2 mt-2 animate-slideDown">
                              {category.items.map((item) => (
                                <li key={item.name}>
                                  <Link 
                                    href={item.href} 
                                    prefetch={true}
                                    onClick={closeNav}
                                    className="flex items-center text-white/90 hover:text-white transition"
                                  >
                                    <span className="mr-2">{item.icon}</span>
                                    <span className="hover:underline">{item.name}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            

            // Regular nav links
            if (link.label === 'Contact') {
              return (
                <Link key={link.id} href="#" onClick={(e) => {
                  e.preventDefault();
                  closeNav();
                  setShowPopup(true);
                }}>
                  <p className="text-white text-[20px] sm:text-[24px] w-full border-b-[1.5px] py-2 border-white/30 hover:text-orange-900 transition">
                    {link.label}
                  </p>
                </Link>
              );
            }

            if (link.label === 'About') {
              return (
                <Link key={link.id} href="#about" onClick={(e) => handleScroll(e, 'about')}>
                  <p className="text-white text-[20px] sm:text-[24px] w-full border-b-[1.5px] py-2 border-white/30 hover:text-orange-900 transition">
                    {link.label}
                  </p>
                </Link>
              );
            }
            
            return (
              <Link key={link.id} href={link.url} onClick={closeNav}>
                <p className="text-white text-[20px] sm:text-[24px] w-full border-b-[1.5px] py-2 border-white/30 hover:text-orange-900 transition">
                  {link.label}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
      
    </div>
  );
};

export default MobileNav;