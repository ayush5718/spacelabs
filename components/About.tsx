'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function About() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth < 1024 || 'ontouchstart' in window;

    // Parallax image animation (desktop only)
    if (!isMobile) {
      const parallaxImg = document.querySelector('.about-parallax-img');
      if (parallaxImg) {
        gsap.to(parallaxImg, {
          y: '20%',
          ease: "none",
          scrollTrigger: {
            trigger: parallaxImg.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
    }

    // Text animations with mobile fallback
    const aboutTitle = document.querySelector('.about-title');
    if (aboutTitle) {
      gsap.from(aboutTitle, {
        opacity: 0,
        y: isMobile ? 30 : 80,
        duration: isMobile ? 0.8 : 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: '#about',
          start: isMobile ? "top 90%" : "top 80%",
          toggleActions: "play none none reverse",
          once: true
        },
        // Mobile fallback
        onComplete: () => {
          if (isMobile) gsap.set(aboutTitle, { opacity: 1, y: 0 });
        }
      });

      // Mobile fallback timeout
      if (isMobile) {
        setTimeout(() => {
          gsap.set(aboutTitle, { opacity: 1, y: 0 });
        }, 1500);
      }
    }

    const aboutButton = document.querySelector('.about-button');
    if (aboutButton) {
      gsap.from(aboutButton, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '#about',
          start: isMobile ? "top 90%" : "top 80%",
          toggleActions: "play none none reverse",
          once: true
        },
        onComplete: () => {
          if (isMobile) gsap.set(aboutButton, { opacity: 1, y: 0 });
        }
      });

      if (isMobile) {
        setTimeout(() => {
          gsap.set(aboutButton, { opacity: 1, y: 0 });
        }, 2000);
      }
    }

    // Refresh ScrollTrigger on mobile
    if (isMobile) {
      setTimeout(() => ScrollTrigger.refresh(), 300);
    }
  }, []);

  return (
    <section id="about" className="relative py-20 md:py-32 px-4 md:px-10 overflow-hidden" data-theme="dark">
      <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
        <div className="lg:col-span-8 relative z-10 order-2 lg:order-1">
          <h2 className="about-title split-heading text-3xl md:text-7xl font-bold uppercase tracking-tighter leading-tight">
            We don't believe the work should be outstanding at any cost.<br />
            <span className="text-gray-500">We believe it should be outstanding to a specific, pre-agreed cost.</span>
          </h2>
          <div className="mt-8 md:mt-12 flex gap-4">
            <a 
              href="#contact" 
              className="about-button magnetic hover-trigger px-6 py-3 md:px-8 md:py-4 border border-white/30 rounded-full uppercase text-[10px] md:text-xs font-mono tracking-widest hover:bg-white hover:text-black transition-colors"
            >
              Read Our Philosophy
            </a>
          </div>
        </div>
        <div className="lg:col-span-4 relative h-[300px] lg:h-[600px] w-full order-1 lg:order-2 mb-8 lg:mb-0">
          <div className="parallax-img-wrapper absolute inset-0 overflow-hidden rounded-sm">
            <img 
              src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2000&auto=format&fit=crop" 
              alt="Lab" 
              className="about-parallax-img w-full h-[120%] object-cover object-center opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

