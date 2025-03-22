'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode } from 'react';

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="light"
      forcedTheme={undefined}
      enableSystem={false}
      storageKey="job-board-theme"
    >
      {children}
    </NextThemesProvider>
  );
} 