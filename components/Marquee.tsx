'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Marquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const marquee = marqueeRef.current;
    
    // Animate marquee section on scroll
    gsap.from(marquee.parentElement, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: marquee.parentElement,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate individual text elements
    const textElements = marquee.querySelectorAll('span');
    textElements.forEach((text, i) => {
      gsap.from(text, {
        opacity: 0,
        scale: 0.5,
        rotation: -10,
        duration: 0.8,
        delay: i * 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: marquee.parentElement,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // Get the width of the first marquee content block
    const firstContent = marquee.querySelector('.marquee-content') as HTMLElement;
    if (!firstContent) return;
    
    const contentWidth = firstContent.offsetWidth;
    
    // Create seamless infinite loop animation
    const animation = gsap.to(marquee, {
      x: -contentWidth,
      duration: 15,
      ease: "none",
      repeat: -1
    });

    // Velocity-based speed adjustment for scroll
    const scrollTrigger = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        const timeScale = 1 + (velocity / 300);
        animation.timeScale(Math.max(0.8, Math.min(1.5, timeScale)));
      }
    });

    return () => {
      animation.kill();
      scrollTrigger?.kill();
    };
  }, []);

  const marqueeItems = [
    <span key="1">Strategy</span>,
    <span key="2" className="text-stroke">Branding</span>,
    <span key="3">Digital</span>,
    <span key="4" className="text-stroke">Content</span>,
    <span key="5">Motion</span>,
  ];

  return (
    <section className="border-y border-white/10 bg-boulder-gray py-12 relative z-20 overflow-hidden" data-theme="dark">
      <div className="marquee-container overflow-hidden -rotate-1 scale-105">
        <div ref={marqueeRef} className="marquee-wrapper flex whitespace-nowrap will-change-transform">
          <div className="marquee-content flex items-center gap-20 text-5xl md:text-8xl font-bold uppercase tracking-tighter text-white/80 pr-20">
            {marqueeItems}
          </div>
          <div className="marquee-content flex items-center gap-20 text-5xl md:text-8xl font-bold uppercase tracking-tighter text-white/80 pr-20">
            {marqueeItems}
          </div>
          <div className="marquee-content flex items-center gap-20 text-5xl md:text-8xl font-bold uppercase tracking-tighter text-white/80 pr-20">
            {marqueeItems}
          </div>
        </div>
      </div>
    </section>
  );
}

