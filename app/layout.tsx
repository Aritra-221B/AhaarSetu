import type { Metadata } from "next";
import {Poppins} from 'next/font/google'
import "./globals.css";

import { Toaster } from 'react-hot-toast';

import LayoutWrapper from '@/components/Home/Navbar/LayoutWrapper';

const font = Poppins({
  weight:['100','200','300','400','500','600','700','800','900'],
  subsets:['latin']
})

export const metadata: Metadata = {
  title: "AhaarSetu - Digital Medical Passport",
  description: "Connecting Farms, Medicines & Market Digitally",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.ico" />
      </head>
      <body className={` ${font.className}`}>
        <Toaster position="bottom-center" />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
