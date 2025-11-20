'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preloader = preloaderRef.current;
    const counter = counterRef.current;
    if (!preloader || !counter) return;

    let count = 0;

    const updateCounter = () => {
      count += Math.floor(Math.random() * 10) + 1;
      if (count > 100) count = 100;
      if (counter) {
        counter.textContent = count + '%';
      }

      if (count < 100) {
        requestAnimationFrame(updateCounter);
      } else {
        gsap.to(preloader, {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
          delay: 0.5,
          onComplete: () => {
            if (preloader) {
              preloader.style.display = 'none';
            }
            // Dispatch custom event to signal preloader is done
            window.dispatchEvent(new Event('preloader-complete'));
          }
        });
      }
    };

    requestAnimationFrame(updateCounter);
  }, []);

  return (
    <div ref={preloaderRef} className="preloader">
      <div className="text-center">
        <div className="text-xs uppercase tracking-[0.5em] text-gray-500 mb-4">SpaceLab</div>
        <div ref={counterRef} className="counter text-6xl font-bold">0%</div>
      </div>
    </div>
  );
}

