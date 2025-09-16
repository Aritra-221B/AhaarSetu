'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import ResponsiveNav from './ResponsiveNav';
import { Footer } from '@/components/Home';
import ScrollToTop from '@/components/Helper/ScrollToTop';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const pathname = usePathname();
  const hideNavAndFooter = pathname === '/startup';

  return (
    <>
      {!hideNavAndFooter && <ResponsiveNav />}
      {children}
      {!hideNavAndFooter && <Footer />}
      {!hideNavAndFooter && <ScrollToTop />}
    </>
  );
};

export default LayoutWrapper;
