'use client';

import { useEffect } from 'react';

const ConsoleMessage = () => {
  useEffect(() => {
    console.clear();
 
  }, []);

  return null;
};

export default ConsoleMessage; 