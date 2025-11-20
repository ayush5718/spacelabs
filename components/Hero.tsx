'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handlePreloaderComplete = () => {
      const tl = gsap.timeline();

      // Enhanced text reveal with rotation and scale
      tl.to('.reveal-text', {
        y: 0,
        rotationX: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.15,
        ease: "power4.out"
      })
      .from('.fade-in', {
        opacity: 0,
        y: 30,
        scale: 0.9,
        duration: 1.2,
        stagger: 0.15,
        ease: "back.out(1.7)"
      }, "-=1")
      .from('.hero-icon', {
        scale: 0,
        rotation: -180,
        opacity: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)"
      }, "-=0.5")
      .to('.floating-bg', {
        scale: 1.2,
        opacity: 0.3,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      }, "-=2");
    };

    // Split text into characters for advanced animation
    const splitTextElements = document.querySelectorAll('.split-chars');
    splitTextElements.forEach((element) => {
      const text = element.textContent || '';
      const chars = text.split('').map(char => 
        char === ' ' ? '\u00A0' : char
      );
      element.innerHTML = chars.map(char => 
        `<span class="char" style="display: inline-block;">${char}</span>`
      ).join('');
    });

    // Animate characters on scroll
    gsap.utils.toArray('.char').forEach((char: any, i) => {
      gsap.from(char, {
        opacity: 0,
        y: 50,
        rotationX: -90,
        duration: 0.5,
        delay: i * 0.02,
        scrollTrigger: {
          trigger: char,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });

    window.addEventListener('preloader-complete', handlePreloaderComplete);
    
    // If preloader is already done, run immediately
    const preloader = document.querySelector('.preloader');
    if (preloader && (preloader as HTMLElement).style.display === 'none') {
      handlePreloaderComplete();
    }

    return () => {
      window.removeEventListener('preloader-complete', handlePreloaderComplete);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-4 md:px-10 pt-32 pb-20 overflow-hidden" data-theme="dark">
      <div className="max-w-[1920px] mx-auto w-full z-10">
        <div className="max-w-7xl perspective-text mix-blend-luminosity">
          <h1 className="text-6xl md:text-8xl lg:text-[11rem] font-bold leading-[0.8] tracking-tighter uppercase mb-12 split-heading">
            <div className="overflow-hidden">
              <span className="reveal-text block translate-y-full">
                The Creative <span className="hero-icon font-mono text-4xl md:text-7xl align-middle mx-2 text-gray-600 inline-block">&#8600;</span>
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="reveal-text block translate-y-full">
                Studio For <span className="inline-block w-4 h-4 md:w-12 md:h-12 bg-white align-middle mx-2 animate-pulse"></span>
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="reveal-text block translate-y-full text-transparent text-stroke hover:text-white transition-colors duration-500 cursor-default">
                Science + Tech
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="reveal-text block translate-y-full text-gray-500">
                Brands<span className="font-mono text-4xl md:text-7xl align-super ml-2">&#9643;</span>
              </span>
            </div>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12 md:mt-32 border-t border-white/10 pt-12">
          <div className="md:col-span-4 font-mono text-xs text-gray-500 uppercase tracking-widest mb-4 md:mb-0 fade-in flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
            [ System Online ]
          </div>
          <div className="md:col-span-8 text-xl md:text-3xl font-light leading-snug text-gray-300 fade-in">
            <p className="split-lines">
              The companies we work with push the boundaries in <strong className="text-white split-chars">Science + Technology</strong>. In us, they find a partner who pushes the boundaries in creativity.
            </p>
          </div>
        </div>
      </div>
      
      {/* Dynamic Background Elements */}
      <div className="floating-bg absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="floating-bg-2 absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-purple-900/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              '--i': i
            } as React.CSSProperties}
          />
        ))}
      </div>
    </section>
  );
}

