'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function InteractiveEffects() {
  useEffect(() => {
    // Magnetic Buttons
    const magnetics = document.querySelectorAll('.magnetic');
    const magneticCleanups: (() => void)[] = [];

    magnetics.forEach(magnetic => {
      const handleMouseMove = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = magnetic.getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left - rect.width / 2;
        const y = mouseEvent.clientY - rect.top - rect.height / 2;
        
        gsap.to(magnetic, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.2,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(magnetic, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        });
      };

      magnetic.addEventListener('mousemove', handleMouseMove as EventListener);
      magnetic.addEventListener('mouseleave', handleMouseLeave);

      magneticCleanups.push(() => {
        magnetic.removeEventListener('mousemove', handleMouseMove);
        magnetic.removeEventListener('mouseleave', handleMouseLeave);
      });
    });

    // Scramble Text Effect
    const chars = "ABCDEFGHIJK1234567890!@#$%^&*()_+";
    const scrambleTexts = document.querySelectorAll('.scramble-text');
    const scrambleIntervals: NodeJS.Timeout[] = [];
    
    scrambleTexts.forEach(element => {
      const originalText = element.textContent || '';
      
      const handleMouseEnter = () => {
        let iterations = 0;
        const interval = setInterval(() => {
          if (element.textContent) {
            element.textContent = element.textContent.split('')
              .map((letter, index) => {
                if (index < iterations) return originalText[index];
                return chars[Math.floor(Math.random() * chars.length)];
              })
              .join('');
          }
          
          if (iterations >= originalText.length) {
            clearInterval(interval);
            const index = scrambleIntervals.indexOf(interval);
            if (index > -1) scrambleIntervals.splice(index, 1);
          }
          iterations += 1 / 3;
        }, 30);
        scrambleIntervals.push(interval);
      };

      element.addEventListener('mouseenter', handleMouseEnter);
    });

    return () => {
      magneticCleanups.forEach(cleanup => cleanup());
      scrambleIntervals.forEach(interval => clearInterval(interval));
    };
  }, []);

  return null;
}

