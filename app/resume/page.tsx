"use client";
import { motion } from "framer-motion";
import PDFViewer from "@/components/resume/pdf-viewer";
import { useEffect, useState } from "react";

export default function ResumePage() {
  const [mounted, setMounted] = useState(false);
  const nameLetters = "Nandha Kumar Resume ".split("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 800); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen text-white overflow-hidden relative">
      {/* Background gradient - always visible */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 z-0" />

      {/* Animated background elements - always visible */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full filter blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/5 rounded-full filter blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Loading state */}
      {!mounted ? (
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="mt-8 text-center w-full max-w-sm">
            <div className="flex justify-center space-x-1 overflow-hidden h-8">
              {nameLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: index * 0.02,
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  className={letter === " " ? "w-2" : "text-lg font-medium"}
                >
                  {letter === " " ? "" : letter}
                </motion.span>
              ))}
            </div>
            <p className="text-neutral-500 text-sm mt-2">Loading Resume...</p>

            {/* Animated dots */}
            <div className="flex justify-center mt-2 space-x-1">
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: "0s" }}
              ></div>
              <div
                className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Header - removed navigation buttons */}
          <header className="relative z-10 px-6 py-6 backdrop-blur-sm border-b border-white/5">
            <div className="container mx-auto">
              {/* All buttons removed from header */}
            </div>
          </header>

          {/* Main content */}
          <div className="relative z-10 container mx-auto px-4 sm:px-6 py-28 sm:py-12">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-4 sm:mb-8"
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent inline-block">
                  Resume
                </h1>
                <p className="text-neutral-400 mt-2 max-w-2xl">
                  My qualifications, experience, and skills presented in a
                  comprehensive document.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="bg-neutral-900/40 backdrop-blur-md border border-neutral-800/50 rounded-xl overflow-hidden shadow-2xl"
              >
                {/* Main PDF viewer - full width */}
                <div className="w-full h-auto lg:min-h-[calc(100vh-220px)]">
                  <PDFViewer />
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
