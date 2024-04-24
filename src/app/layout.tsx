"use client";
import { ThemeProvider } from 'next-themes';
import "./globals.css";
import Navbar from "@/components/Header/Navbar";
import Footer from "@/components/Footer/Footer";
import { AppProvider } from './AppContext';
import { GeistProvider } from "@geist-ui/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GeistProvider>
      <html suppressHydrationWarning lang="en" className="antialiased">
        {/*
          <head /> will contain the components returned by the nearest parent
          head.js. Find out more at https://nextjs.org/docs/api-reference/file-conventions/head
        */}
        <head />

        <body className="bg-white dark:bg-dark">
        <AppProvider>
          <Providers>
            <Navbar />
            {children}
            <Footer />
          </Providers>
          </AppProvider>
        </body>
      </html>
    </GeistProvider>
  );
}

import { Providers } from "./providers";

