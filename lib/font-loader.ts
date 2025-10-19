/**
 * Font loader utility with fallbacks
 * This ensures the app works even when Google Fonts fail to load
 */

import { Geist, Geist_Mono } from "next/font/google";

// Configure Geist Sans with Next.js optimized settings
export const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  preload: true,
  fallback: [
    "system-ui",
    "-apple-system", 
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif"
  ],
  adjustFontFallback: true,
});

// Configure Geist Mono with Next.js optimized settings
export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap", 
  preload: true,
  fallback: [
    "ui-monospace",
    "SFMono-Regular",
    "SF Mono",
    "Menlo",
    "Monaco",
    "Consolas",
    "Liberation Mono",
    "Courier New",
    "monospace"
  ],
  adjustFontFallback: true,
});

// Font loading error handler
export const handleFontError = (fontName: string) => {
};

// Check if fonts are available
export const checkFontAvailability = () => {
  if (typeof window !== 'undefined') {
    const testElement = document.createElement('span');
    testElement.style.fontFamily = 'Geist';
    testElement.style.position = 'absolute';
    testElement.style.visibility = 'hidden';
    testElement.textContent = 'Font Test';
    document.body.appendChild(testElement);
    
    const computedStyle = window.getComputedStyle(testElement);
    const isGeistLoaded = computedStyle.fontFamily.includes('Geist');
    
    document.body.removeChild(testElement);
    
    if (!isGeistLoaded) {
      handleFontError('Geist');
    }
    
    return isGeistLoaded;
  }
  return true;
};

// Font CSS variables with fallbacks
export const fontVariables = {
  '--font-geist-sans': geistSans.style.fontFamily,
  '--font-geist-mono': geistMono.style.fontFamily,
} as const;