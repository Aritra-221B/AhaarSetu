import type { Metadata } from "next";
import {Poppins} from 'next/font/google'
import "./globals.css";
import ResponsiveNav from "@/components/Home/Navbar/ResponsiveNav";
import { Footer } from "@/components/Home";
import ScrollToTop from "@/components/Helper/ScrollToTop";

const font = Poppins({
  weight:['100','200','300','400','500','600','700','800','900'],
  subsets:['latin']
})

export const metadata: Metadata = {
  title: "ChordsCraft - Music Learning Platform",
  description: "Learn music instruments, singing, and dancing with expert instructors",
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
        <ResponsiveNav />
        {children}
        <Footer/>
        <ScrollToTop/>
      </body>
    </html>
  );
}
