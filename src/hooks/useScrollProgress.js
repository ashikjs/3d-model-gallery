'use client';

import { useState, useEffect } from 'react';

export default function useScrollProgress(containerHeight = 400) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Get the scroll position
      const scrollTop = window.scrollY;
      
      // Calculate the total scrollable height (container height - viewport height)
      const viewportHeight = window.innerHeight;
      const totalScrollHeight = (containerHeight * viewportHeight) - viewportHeight;
      
      // Calculate progress (0 to 1)
      const progress = Math.min(Math.max(scrollTop / totalScrollHeight, 0), 1);
      
      setScrollProgress(progress);
    };

    // Initial calculation
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [containerHeight]);

  return scrollProgress;
}
