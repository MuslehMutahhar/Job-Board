'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <SessionProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
      </div>
    </SessionProvider>
  );
} 