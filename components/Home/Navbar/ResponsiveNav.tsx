'use client';
import React, { useState } from 'react'
import Nav from './Nav'
import MobileNav from './MobileNav'
import ContactUsPopup from './ContactUsPopup';


const ResponsiveNav = () => {
  const [showNav, setShowNav] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const handNavShow = () => setShowNav(true);
  const handleCloseNav = () => setShowNav(false);

  return (
    <div>
      <Nav openNav={handNavShow} setShowPopup={setShowPopup} />
      <MobileNav showNav={showNav} closeNav={handleCloseNav} setShowPopup={setShowPopup} />
      <ContactUsPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
};

export default ResponsiveNav;