'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function About() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax image animation
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

    // Text animations
    gsap.from('.about-title', {
      opacity: 0,
      y: 80,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: '#about',
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    gsap.from('.about-button', {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: '#about',
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  }, []);

  return (
    <section id="about" className="relative py-32 px-4 md:px-10 overflow-hidden" data-theme="dark">
      <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8 relative z-10">
          <h2 className="about-title split-heading text-4xl md:text-7xl font-bold uppercase tracking-tighter leading-none">
            We don't believe the work should be outstanding at any cost.<br />
            <span className="text-gray-500">We believe it should be outstanding to a specific, pre-agreed cost.</span>
          </h2>
          <div className="mt-12 flex gap-4">
            <a 
              href="#contact" 
              className="about-button magnetic hover-trigger px-8 py-4 border border-white/30 rounded-full uppercase text-xs font-mono tracking-widest hover:bg-white hover:text-black transition-colors"
            >
              Read Our Philosophy
            </a>
          </div>
        </div>
        <div className="lg:col-span-4 relative h-[600px] w-full hidden lg:block">
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

