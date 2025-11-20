'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handlePreloaderComplete = () => {
      const tl = gsap.timeline();

      // Enhanced text reveal - no rotation on mobile to prevent tilted appearance
      const isMobile = window.innerWidth < 1024 || 'ontouchstart' in window;
      tl.to('.reveal-text', {
        y: 0,
        rotationX: 0, // Always 0 to prevent tilted appearance
        rotationY: 0,
        rotationZ: 0,
        opacity: 1,
        duration: isMobile ? 0.5 : 1.5, // Faster on mobile
        stagger: isMobile ? 0.05 : 0.15,
        ease: "power4.out",
        transform: 'translateY(0)',
        transformStyle: 'flat'
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

    // Split text into characters for advanced animation (desktop only)
    const isMobile = window.innerWidth < 1024 || 'ontouchstart' in window;
    if (!isMobile) {
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

      // Animate characters on scroll (desktop only)
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
    } else {
      // On mobile, ensure split-chars text is immediately visible
      const splitChars = document.querySelectorAll('.split-chars');
      splitChars.forEach((el) => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'none';
      });
    }

    window.addEventListener('preloader-complete', handlePreloaderComplete);
    
    // If preloader is already done, run immediately
    const preloader = document.querySelector('.preloader');
    if (preloader && (preloader as HTMLElement).style.display === 'none') {
      handlePreloaderComplete();
    }

    // Mobile fallback: ensure content is visible even if animations don't run
    if (isMobile) {
      // Immediately reset transforms on mobile to prevent tilted state
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        const revealTexts = document.querySelectorAll('.reveal-text');
        revealTexts.forEach((el) => {
          // Set initial state without any 3D transforms on mobile
          (el as HTMLElement).style.transform = 'translateY(0)';
          (el as HTMLElement).style.opacity = '1';
          gsap.set(el, { 
            opacity: 1, 
            y: 0, 
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            transform: 'translateY(0)',
            transformStyle: 'flat'
          });
        });

        // Ensure split-chars are immediately visible on mobile (no animation)
        const splitChars = document.querySelectorAll('.split-chars');
        splitChars.forEach((el) => {
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.transform = 'none';
          (el as HTMLElement).style.display = 'inline';
          gsap.set(el, { opacity: 1, transform: 'none' });
        });

        // Ensure fade-in elements are visible
        const fadeIns = document.querySelectorAll('.fade-in');
        fadeIns.forEach((el) => {
          (el as HTMLElement).style.opacity = '1';
          gsap.set(el, { opacity: 1, y: 0, scale: 1 });
        });
      });

      const fallbackTimeout = setTimeout(() => {
        const revealTexts = document.querySelectorAll('.reveal-text');
        revealTexts.forEach((el) => {
          (el as HTMLElement).style.transform = 'translateY(0)';
          (el as HTMLElement).style.opacity = '1';
          gsap.set(el, { 
            opacity: 1, 
            y: 0, 
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            transform: 'translateY(0)',
            transformStyle: 'flat'
          });
        });
        
        const splitChars = document.querySelectorAll('.split-chars');
        splitChars.forEach((el) => {
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.transform = 'none';
        });
        
        const fadeIns = document.querySelectorAll('.fade-in');
        fadeIns.forEach((el) => {
          gsap.set(el, { opacity: 1, y: 0, scale: 1 });
        });
      }, 2000);

      return () => {
        window.removeEventListener('preloader-complete', handlePreloaderComplete);
        clearTimeout(fallbackTimeout);
      };
    }

    return () => {
      window.removeEventListener('preloader-complete', handlePreloaderComplete);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-4 md:px-10 pt-28 pb-20 overflow-hidden" data-theme="dark">
      <div className="max-w-[1920px] mx-auto w-full z-10">
        <div className="max-w-7xl mix-blend-luminosity">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[11rem] font-bold leading-[0.9] md:leading-[0.8] tracking-tighter uppercase mb-12 split-heading">
            <div className="overflow-hidden">
              <span className="reveal-text block translate-y-full">
                The Creative <span className="font-mono text-2xl md:text-7xl align-middle mx-1 md:mx-2 text-gray-600">&#8600;</span>
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="reveal-text block translate-y-full">
                Studio For <span className="inline-block w-3 h-3 md:w-12 md:h-12 bg-white align-middle mx-1 md:mx-2 animate-pulse"></span>
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="reveal-text block translate-y-full text-transparent text-stroke hover:text-white transition-colors duration-500 cursor-default">
                Science + Tech
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="reveal-text block translate-y-full text-gray-500">
                Brands<span className="font-mono text-2xl md:text-7xl align-super ml-1 md:ml-2">&#9643;</span>
              </span>
            </div>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8 md:mt-32 border-t border-white/10 pt-8 md:pt-12">
          <div className="md:col-span-4 font-mono text-xs text-gray-500 uppercase tracking-widest mb-2 md:mb-0 fade-in flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
            [ System Online ]
          </div>
          <div className="md:col-span-8 text-lg md:text-3xl font-light leading-relaxed text-gray-300 fade-in">
            <p className="split-lines">
              The companies we work with push the boundaries in <strong className="text-white split-chars">Science + Technology</strong>. In us, they find a partner who pushes the boundaries in creativity.
            </p>
          </div>
        </div>
      </div>
      
      {/* Dynamic Background Elements */}
      <div className="floating-bg absolute top-1/4 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-blue-900/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none animate-pulse"></div>
      
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

