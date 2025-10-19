'use client';

import Image from 'next/image';
import { useState } from 'react';
import { SafeImageProps } from '@/types';

export function SafeImage({ 
  src, 
  alt, 
  fill = false, 
  className = "", 
  priority = false, 
  sizes,
  fallbackSrc = "/projects/placeholder.png",
  onError
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isError, setIsError] = useState(false);

  const handleError = () => {
    setIsError(true);
    setImgSrc(fallbackSrc);
    onError?.();
  };

  return (
    <>
      {isError && (
        <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center">
          <div className="text-center text-neutral-400">
            <svg 
              className="w-12 h-12 mx-auto mb-2 opacity-50" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <p className="text-sm">Image not found</p>
          </div>
        </div>
      )}
      
      <Image
        src={imgSrc}
        alt={alt}
        fill={fill}
        className={className}
        priority={priority}
        sizes={sizes}
        onError={handleError}
      />
    </>
  );
}