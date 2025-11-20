'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollProgress() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const progressBar = document.querySelector('.scroll-progress-bar');
    if (!progressBar) return;

    gsap.to(progressBar, {
      scaleX: 1,
      transformOrigin: 'left',
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3
      }
    });
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-[10001]">
      <div className="scroll-progress-bar h-full bg-white origin-left scale-x-0"></div>
    </div>
  );
}

