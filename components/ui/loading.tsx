"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const LoadingSpinner = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} border-2 border-blue-200 border-t-blue-600 rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
};

// Skeleton loader for better perceived performance
export const SkeletonLoader = () => {
  return (
    <div className="animate-pulse space-y-4 p-4">
      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
      </div>
      <div className="h-32 bg-gray-700 rounded"></div>
    </div>
  );
};

export const PageLoading = ({ timeout = 10000 }: { timeout?: number } = {}) => {
  const [showTimeout, setShowTimeout] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar simulation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 300);

    // Timeout warning
    const timeoutTimer = setTimeout(() => {
      setShowTimeout(true);
    }, timeout);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timeoutTimer);
    };
  }, [timeout]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center max-w-sm w-full px-4">
        <LoadingSpinner size="lg" />
        <motion.p 
          className="mt-4 text-white/70 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading...
        </motion.p>
        
        {/* Progress bar */}
        <div className="mt-4 w-full bg-gray-800 rounded-full h-1">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        {showTimeout && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg"
          >
            <p className="text-yellow-400 text-xs">
              Taking longer than expected...
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export const ComponentLoading = ({ text = "Loading..." }: { text?: string }) => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="text-center">
        <LoadingSpinner />
        <p className="mt-2 text-white/70 text-sm">{text}</p>
      </div>
    </div>
  );
};