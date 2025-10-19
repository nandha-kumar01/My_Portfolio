import { Metadata } from "next";
import { defaultMetadata } from "./metadata";
import { Footer } from "../components/common/footer";
import { Navbar } from "../components/common/navbar";
import { ImageStructuredData } from "@/components/seo/image-structured-data";
import { ServiceWorkerRegistration } from "@/components/utils/service-worker-registration";
import { PerformanceMonitor } from "@/components/performance/performance-monitor";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { geistSans, geistMono } from "@/lib/font-loader";

// Conditionally import analytics only in production
const Analytics = process.env.NODE_ENV === 'production' 
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  ? require("@vercel/analytics/react").Analytics 
  : () => null;

const SpeedInsights = process.env.NODE_ENV === 'production' 
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  ? require("@vercel/speed-insights/next").SpeedInsights 
  : () => null;

import "./globals.css";

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://nandhaportfolio-03.vercel.app/" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
        <meta name="robots" content="index, follow" />
        
        {/* Additional OG tags for better sharing */}
        <meta property="og:image" content="https://nandhaportfolio-03.vercel.app/nandha-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://nandhaportfolio-03.vercel.app/nandha-og.jpg" />
        <meta name="twitter:image:alt" content="Nandha Kumar - Front-End Developer Portfolio" />
        
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Nandha Kumar" />
        <link rel="manifest" href="/site.webmanifest" />
        <ImageStructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <PerformanceMonitor />
        <ServiceWorkerRegistration />
        <ErrorBoundary>
          <Navbar />
          <div className="relative z-10 bg-black flex-grow flex flex-col">
            {children}
            <SpeedInsights />
            <Footer />
          </div>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  );
}
