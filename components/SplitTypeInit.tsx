'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

export default function SplitTypeInit() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const initSplitType = () => {
      const splitElements = document.querySelectorAll('.split-heading');
      
      splitElements.forEach((element) => {
        // Skip if already split
        if (element.querySelector('.char')) return;

        try {
          const split = new SplitType(element as HTMLElement, { types: 'chars' });
          
          if (split.chars && split.chars.length > 0) {
            gsap.set(split.chars, { opacity: 0, y: 20 });
            
            gsap.to(split.chars, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.02,
              ease: "power2.out",
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            });
          }
        } catch (error) {
          console.warn('SplitType error:', error);
        }
      });
    };

    // Initialize after preloader
    const handlePreloaderComplete = () => {
      setTimeout(initSplitType, 100);
    };

    window.addEventListener('preloader-complete', handlePreloaderComplete);
    
    // Also try immediately in case preloader is already done
    const preloader = document.querySelector('.preloader');
    if (preloader && (preloader as HTMLElement).style.display === 'none') {
      setTimeout(initSplitType, 100);
    }

    return () => {
      window.removeEventListener('preloader-complete', handlePreloaderComplete);
    };
  }, []);

  return null;
}

