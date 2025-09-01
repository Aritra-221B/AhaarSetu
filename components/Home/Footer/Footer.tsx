"use client";

import * as React from 'react';
import dynamic from 'next/dynamic';
import { memo } from 'react';

// Lazy load icon components
const FaYoutube = dynamic(() => import('react-icons/fa').then(mod => mod.FaYoutube), { ssr: false, loading: () => <div className="w-4 h-4" /> });
const FaFacebookF = dynamic(() => import('react-icons/fa').then(mod => mod.FaFacebookF), { ssr: false, loading: () => <div className="w-4 h-4" /> });
const FaInstagram = dynamic(() => import('react-icons/fa').then(mod => mod.FaInstagram), { ssr: false, loading: () => <div className="w-4 h-4" /> });
const FaLinkedinIn = dynamic(() => import('react-icons/fa').then(mod => mod.FaLinkedinIn), { ssr: false, loading: () => <div className="w-4 h-4" /> });
const FaTiktok = dynamic(() => import('react-icons/fa').then(mod => mod.FaTiktok), { ssr: false, loading: () => <div className="w-4 h-4" /> });
// Removed unused SiAppstore/SiGoogleplay to satisfy linter

// Define types for components
interface SocialIconProps {
  href?: string;
  ariaLabel: string;
  hoverColor: string;
  activeColor: string;
  Icon: React.ComponentType<{ className?: string }>;
}

interface ResourceLinkProps {
  href?: string;
  ariaLabel: string;
  children: React.ReactNode;
}

// Memoized social link component for better performance
const SocialIcon = memo(({ href, ariaLabel, hoverColor, activeColor, Icon }: SocialIconProps) => (
  <a 
    href={href || ""} 
    className={`group w-10 h-10 flex items-center justify-center rounded-full border border-gray-600 text-gray-400 hover:border-[${hoverColor}] active:bg-[${activeColor}]/10 transform hover:scale-110 active:scale-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[${hoverColor}] focus:ring-offset-2 focus:ring-offset-[#121a24] overflow-hidden relative`}
    aria-label={ariaLabel}
  >
    <div className={`absolute inset-0 bg-[${hoverColor}]/0 group-hover:bg-[${hoverColor}]/10 transition-all duration-300 rounded-full`}></div>
    <Icon className={`text-xl group-hover:text-[${hoverColor}] transition-colors duration-200 relative z-10`} />
  </a>
));
SocialIcon.displayName = 'SocialIcon';

// Memoized resource link component
const ResourceLink = memo(({ href, ariaLabel, children }: ResourceLinkProps) => (
  <li>
    <a 
      href={href || "#"} 
      aria-label={ariaLabel}
      className="hover:text-[#ff4d4d] transition-colors duration-200 relative group focus:outline-none focus:text-[#ff4d4d] focus:ring-2 focus:ring-[#ff4d4d] focus:ring-offset-1 focus:ring-offset-[#121a24] rounded px-1 block w-fit"
    >
      {children}
      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#ff4d4d] group-hover:w-full group-focus:w-full transition-all duration-300"></span>
    </a>
  </li>
));
ResourceLink.displayName = 'ResourceLink';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  // Memoize validation function
  const validateEmail = React.useCallback((email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }, []);

  // Memoize form handler
  const handleSubmit = React.useCallback((e: React.FormEvent): void => {
    e.preventDefault();
    setEmailError('');

    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    // Here you would typically call an API to handle the subscription
    console.log('Subscribing with email:', email);
    setIsSubscribed(true);
    setEmail('');
  }, [email, validateEmail]);

  // Memoize resource links for each section
  const resourceLinks = React.useMemo(() => [
    { id: 1, href: "#", label: "The ChordsCraft Note", ariaLabel: "The ChordsCraft Note" },
    { id: 2, href: "#", label: "Chord Hacks", ariaLabel: "Chord Hacks" },
    { id: 3, href: "#", label: "Getting Started Guide", ariaLabel: "Getting Started Guide" },
    { id: 4, href: "#", label: "5 Days To Playing Music", ariaLabel: "5 Days To Playing Music" },
    { id: 5, href: "#", label: "Learn 3 Songs Fast", ariaLabel: "Learn 3 Songs Fast" },
  ], []);

  const shopLinks = React.useMemo(() => [
    { id: 1, href: "#", label: "ChordsCraft Membership", ariaLabel: "ChordsCraft Membership" },
    { id: 2, href: "#", label: "Playing Beautiful Music", ariaLabel: "Playing Beautiful Music" },
    { id: 3, href: "#", label: "Chords & Scales Book", ariaLabel: "Chords & Scales Book" },
    { id: 4, href: "#", label: "Practice Planner", ariaLabel: "Practice Planner" },
  ], []);

  const otherSiteLinks = React.useMemo(() => [
    { id: 1, href: "#", label: "Musora", ariaLabel: "Visit Musora" },
    { id: 2, href: "#", label: "Drumeo", ariaLabel: "Visit Drumeo" },
    { id: 3, href: "#", label: "Guitareo", ariaLabel: "Visit Guitareo" },
    { id: 4, href: "#", label: "Singeo", ariaLabel: "Visit Singeo" },
  ], []);

  // Memoize social media links
  const socialIcons = React.useMemo(() => [
    { id: 1, href: "https://www.youtube.com/@ChordsCraftInstituteofMusic" , Icon: FaYoutube, ariaLabel: "Visit our YouTube channel", hoverColor: "#FF0000", activeColor: "#FF0000" },
    { id: 2, href: "#" , Icon: FaFacebookF, ariaLabel: "Visit our Facebook page", hoverColor: "#1877F2", activeColor: "#1877F2" },
    { id: 3, href: "https://www.instagram.com/chordscraftinstituteofmusic" , Icon: FaInstagram, ariaLabel: "Visit our Instagram profile", hoverColor: "#E1306C", activeColor: "#E1306C" },     
    { id: 4, href: "https://www.linkedin.com/company/chordscraft-institue-of-music-llp/about/" , Icon: FaLinkedinIn, ariaLabel: "Visit our Linkedin profile", hoverColor: "#00F2EA", activeColor: "#00F2EA" },
    { id: 5, href: "#" , Icon: FaTiktok, ariaLabel: "Visit our Tiktok profile", hoverColor: "#00F2EA", activeColor: "#00F2EA" },
  ], []);

  // Memoize legal links
  const legalLinks = React.useMemo(() => [
    { id: 1, href: "#", label: "Terms", ariaLabel: "Terms of Service" },
    { id: 2, href: "#", label: "Privacy", ariaLabel: "Privacy Policy" },
    { id: 3, href: "#", label: "Careers", ariaLabel: "Career Opportunities" },
    { id: 4, href: "#", label: "Brand Guide", ariaLabel: "Brand Guidelines" },
  ], []);

  return (
    <footer className="bg-[#121a24] dark:bg-[#0a1018] text-white font-poppins">
      {/* Main sections grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 py-16 text-white">
        {/* STAY CONNECTED */}
        <div className="space-y-6 items-center text-center">
          <h3 className="text-lg font-semibold border-b border-gray-800 pb-2">
            STAY CONNECTED
          </h3>
          <p className="text-sm">
            Join over 100,000 music enthusiasts who get free lessons twice a week.
          </p>
          
          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="flex">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address..." 
                  aria-label="Email address for newsletter"
                  className={`flex-grow p-2 text-sm rounded-l-md bg-[#1e2530] dark:bg-[#161c24] border ${emailError ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:ring-2 focus:ring-[#ff4d4d] text-white transition-all`}
                />
                <button 
                  type="submit"
                  aria-label="Sign up for newsletter"
                  className="text-sm px-2 py-2 bg-[#ff4d4d] text-white font-semibold rounded-r-md hover:bg-[#ff3333] active:bg-[#e63939] transition-all"
                >
                  SIGN UP 
                </button>
              </div>
              {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
            </form>
          ) : (
            <div className="bg-green-900/30 text-green-400 p-3 rounded-md text-sm">
              Thanks for subscribing! Check your inbox soon.
            </div>
          )}
        </div>

        {/* RESOURCES */}
        <div className="space-y-6 items-center text-center">
          <h3 className="text-lg font-semibold border-b border-gray-800 pb-2">RESOURCES</h3>
          <ul className="flex flex-col space-y-3 text-sm items-center text-center">
            {resourceLinks.map(link => (
              <ResourceLink key={link.id} href={link.href} ariaLabel={link.ariaLabel}>
                {link.label}
              </ResourceLink>
            ))}
          </ul>
        </div>

        {/* SHOP */}
        <div className="space-y-6 items-center text-center">
          <h3 className="text-lg font-semibold border-b border-gray-800 pb-2">CHORDSCRAFT SHOP</h3>
          <ul className="flex flex-col space-y-3 text-sm items-center text-center">
            {shopLinks.map(link => (
              <ResourceLink key={link.id} href={link.href} ariaLabel={link.ariaLabel}>
                {link.label}
              </ResourceLink>
            ))}
          </ul>
        </div>

        {/* OTHER SITES */}
        <div className="space-y-6 items-center text-center">
          <h3 className="text-lg font-semibold border-b border-gray-800 pb-2">OTHER SITES</h3>
          <ul className="flex flex-col space-y-3 text-sm items-center text-center">
            {otherSiteLinks.map(link => (
              <ResourceLink key={link.id} href={link.href} ariaLabel={link.ariaLabel}>
                {link.label}
              </ResourceLink>
            ))}
          </ul>
        </div>
      </div>


      {/* Logo and Address */}
      <div className="max-w-7xl mx-auto px-6 pb-12 pt-12 flex flex-col items-center border-t border-gray-800">
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-3xl font-bold text-white uppercase">chordsCraft institute of music</h2>
          </div>
          <p className="text-sm text-gray-400 max-w-xl">
            Inspiring musicians worldwide with innovative learning tools and resources.
          </p>
        </div>

        <div className="text-center text-sm text-gray-400 mb-8">
          <p>107-31265 Wheel Ave. Abbotsford, BC, V2T 6H2 Canada</p>
          <p className="mt-2">
            Toll Free: 1-800-439-8921 / Direct: 1-604-855-7605 / 
            <a 
              href="#" 
              aria-label="Contact Us"
              className="text-[#ff4d4d] hover:text-white hover:underline ml-1 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff4d4d] focus:ring-offset-1 focus:ring-offset-[#121a24] rounded px-1"
            >
              Contact Us
            </a>
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {socialIcons.map(({id, href, Icon, ariaLabel, hoverColor, activeColor}) => (
            <SocialIcon 
              key={id}
              href={href}
              Icon={Icon}
              ariaLabel={ariaLabel}
              hoverColor={hoverColor}
              activeColor={activeColor}
            />
          ))}
        </div>

        {/* Copyright and links */}
        <div className="text-xs text-gray-500 mt-4">
          <p className="flex flex-wrap justify-center gap-x-1">
            <span>Musora Media, Inc. © {currentYear} -</span>
            {legalLinks.map((link, index) => (
              <React.Fragment key={link.id}>
                <a 
                  href={link.href} 
                  aria-label={link.ariaLabel}
                  className="hover:text-[#ff4d4d] transition-colors duration-200 focus:outline-none focus:text-[#ff4d4d] focus:ring-2 focus:ring-[#ff4d4d] focus:ring-offset-1 focus:ring-offset-[#121a24] rounded px-1"
                >
                  {link.label}
                </a>
                {index < legalLinks.length - 1 && " / "}
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);