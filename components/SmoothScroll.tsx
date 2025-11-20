'use client';

import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
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

    // On mobile, use native scroll for better compatibility
    if (mobile) {
      // Refresh ScrollTrigger on mobile to ensure it works
      ScrollTrigger.refresh();
      
      // Force refresh on scroll for mobile
      const handleScroll = () => {
        ScrollTrigger.update();
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        window.removeEventListener('resize', checkMobile);
        window.removeEventListener('scroll', handleScroll);
      };
    }

    // Desktop: Use Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,
      touchMultiplier: 2,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    
    const ticker = gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      cancelAnimationFrame(rafId);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return <div className="skew-container">{children}</div>;
}

