'use client';

import { useEffect } from 'react';

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .then((_registration) => {
          // Service worker registered successfully
        })
        .catch((_error) => {
          // Service worker registration failed
        });
    }
  }, []);

  return null;
}