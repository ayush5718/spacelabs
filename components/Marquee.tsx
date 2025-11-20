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

    const animation = gsap.to(marquee, {
      xPercent: -50,
      repeat: -1,
      duration: 20,
      ease: "linear"
    });

    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        const timeScale = 1 + (velocity / 100);
        animation.timeScale(timeScale);
      }
    });

    return () => {
      animation.kill();
    };
  }, []);

  return (
    <section className="border-y border-white/10 bg-boulder-gray py-12 relative z-20 overflow-hidden" data-theme="dark">
      <div ref={marqueeRef} className="marquee-wrapper flex overflow-hidden whitespace-nowrap -rotate-1 scale-105">
        <div className="marquee-content flex items-center gap-20 text-5xl md:text-8xl font-bold uppercase tracking-tighter text-white/80 pr-20">
          <span>Strategy</span>
          <span className="text-stroke">Branding</span>
          <span>Digital</span>
          <span className="text-stroke">Content</span>
          <span>Motion</span>
        </div>
        <div className="marquee-content flex items-center gap-20 text-5xl md:text-8xl font-bold uppercase tracking-tighter text-white/80 pr-20">
          <span>Strategy</span>
          <span className="text-stroke">Branding</span>
          <span>Digital</span>
          <span className="text-stroke">Content</span>
          <span>Motion</span>
        </div>
      </div>
    </section>
  );
}

