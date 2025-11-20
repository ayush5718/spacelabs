'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

export default function SplitTypeInit() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024 || 'ontouchstart' in window;
      setIsMobile(mobile);
      return mobile;
    };
    
    const mobile = checkMobile();
    window.addEventListener('resize', checkMobile);

    gsap.registerPlugin(ScrollTrigger);

    const initSplitType = () => {
      const splitElements = document.querySelectorAll('.split-heading');
      
      splitElements.forEach((element) => {
        // Skip if already split
        if (element.querySelector('.char')) return;

        try {
          const split = new SplitType(element as HTMLElement, { types: 'chars' });
          
          if (split.chars && split.chars.length > 0) {
            // On mobile, make visible immediately with a simple fade
            if (mobile) {
              gsap.set(split.chars, { opacity: 0, y: 10 });
              gsap.to(split.chars, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.01,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 90%",
                  toggleActions: "play none none reverse",
                  once: true
                },
                // Fallback: if ScrollTrigger doesn't fire, show after delay
                onComplete: () => {
                  gsap.set(split.chars, { opacity: 1, y: 0 });
                }
              });
              
              // Fallback timeout for mobile
              setTimeout(() => {
                gsap.set(split.chars, { opacity: 1, y: 0 });
              }, 1000);
            } else {
              // Desktop: original animation
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
          }
        } catch (error) {
          console.warn('SplitType error:', error);
          // Fallback: ensure text is visible
          (element as HTMLElement).style.opacity = '1';
        }
      });
      
      // Refresh ScrollTrigger after initialization
      ScrollTrigger.refresh();
    };

    // Initialize after preloader
    const handlePreloaderComplete = () => {
      setTimeout(() => {
        initSplitType();
        // Force refresh on mobile
        if (mobile) {
          setTimeout(() => ScrollTrigger.refresh(), 200);
        }
      }, 100);
    };

    window.addEventListener('preloader-complete', handlePreloaderComplete);
    
    // Also try immediately in case preloader is already done
    const preloader = document.querySelector('.preloader');
    if (preloader && (preloader as HTMLElement).style.display === 'none') {
      setTimeout(() => {
        initSplitType();
        if (mobile) {
          setTimeout(() => ScrollTrigger.refresh(), 200);
        }
      }, 100);
    }

    return () => {
      window.removeEventListener('preloader-complete', handlePreloaderComplete);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return null;
}

