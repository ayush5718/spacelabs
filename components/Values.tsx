'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const values: Value[] = [
  {
    icon: <div className="w-10 h-10 bg-black"></div>,
    title: 'Deep Sector Expertise',
    description: 'We\'ve done the hard hours in the lab, the long days checking on experiments and the long nights before a pitch.'
  },
  {
    icon: <div className="w-10 h-10 border-2 border-black rounded-full"></div>,
    title: 'World-Class Creative Judgement',
    description: 'Average marketing is wasteful. Only outstanding work will avoid the heap.'
  },
  {
    icon: <div className="text-5xl font-mono">TM</div>,
    title: 'Move Fast + Make Things™',
    description: 'Gone are the days of strategic navel gazing. A world of immediacy demands immediate results.'
  },
  {
    icon: <div className="font-mono text-4xl">$</div>,
    title: 'Every $ Counts',
    description: 'We believe the work should be outstanding to a specific, detailed, pre-agreed cost.'
  }
];

export default function Values() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth < 1024 || 'ontouchstart' in window;

    // Animate section title
    const valuesTitle = document.querySelector('.values-title');
    if (valuesTitle) {
      gsap.from(valuesTitle, {
        opacity: 0,
        y: isMobile ? 30 : 80,
        rotationX: isMobile ? 0 : -15,
        duration: isMobile ? 0.8 : 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "#sectors",
          start: isMobile ? "top 90%" : "top 80%",
          toggleActions: "play none none reverse",
          once: true
        },
        onComplete: () => {
          if (isMobile) gsap.set(valuesTitle, { opacity: 1, y: 0, rotationX: 0 });
        }
      });

      // Mobile fallback
      if (isMobile) {
        setTimeout(() => {
          gsap.set(valuesTitle, { opacity: 1, y: 0, rotationX: 0 });
        }, 1500);
      }
    }

    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach((item, i) => {
      const icon = item.querySelector('div');
      const title = item.querySelector('h3');
      const description = item.querySelector('p');

      // Animate item container
      gsap.to(item, {
        scrollTrigger: {
          trigger: item,
          start: isMobile ? "top 90%" : "top 85%",
          once: true
        },
        y: 0,
        opacity: 1,
        duration: isMobile ? 0.6 : 1,
        ease: "power3.out",
        delay: i * 0.1,
        onComplete: () => {
          if (isMobile) gsap.set(item, { opacity: 1, y: 0 });
        }
      });

      // Mobile fallback - ensure items are visible
      if (isMobile) {
        setTimeout(() => {
          gsap.set(item, { opacity: 1, y: 0 });
          if (icon) gsap.set(icon, { opacity: 1, scale: 1, rotation: 0 });
          if (title) gsap.set(title, { opacity: 1, x: 0 });
          if (description) gsap.set(description, { opacity: 1, y: 0 });
        }, 2000 + i * 200);
      }

      // Animate icon with rotation
      if (icon) {
        gsap.from(icon, {
          scale: 0,
          rotation: isMobile ? 0 : -180,
          opacity: 0,
          duration: isMobile ? 0.5 : 0.8,
          delay: i * 0.1 + 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: item,
            start: isMobile ? "top 90%" : "top 85%",
            once: true
          },
          onComplete: () => {
            if (isMobile) gsap.set(icon, { opacity: 1, scale: 1, rotation: 0 });
          }
        });
      }

      // Animate title
      if (title) {
        gsap.from(title, {
          x: isMobile ? -10 : -30,
          opacity: 0,
          duration: isMobile ? 0.5 : 0.8,
          delay: i * 0.1 + 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: isMobile ? "top 90%" : "top 85%",
            once: true
          },
          onComplete: () => {
            if (isMobile) gsap.set(title, { opacity: 1, x: 0 });
          }
        });
      }

      // Animate description
      if (description) {
        gsap.from(description, {
          y: isMobile ? 10 : 20,
          opacity: 0,
          duration: isMobile ? 0.5 : 0.8,
          delay: i * 0.1 + 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: isMobile ? "top 90%" : "top 85%",
            once: true
          },
          onComplete: () => {
            if (isMobile) gsap.set(description, { opacity: 1, y: 0 });
          }
        });
      }

      // Hover animation
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          scale: 1.02,
          y: -5,
          duration: 0.3,
          ease: "power2.out"
        });
        if (icon) {
          gsap.to(icon, {
            rotation: 360,
            scale: 1.1,
            duration: 0.5,
            ease: "back.out(1.7)"
          });
        }
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
        if (icon) {
          gsap.to(icon, {
            rotation: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      });
    });
  }, []);

  return (
    <section id="sectors" className="bg-white text-black px-4 md:px-10 py-20 md:py-32 relative z-10 rounded-t-[2rem] md:rounded-t-[3rem] -mt-8 md:-mt-16" data-theme="light">
      <div className="max-w-[1920px] mx-auto">
        <div className="mb-16 md:mb-24 border-b border-black/10 pb-8 md:pb-12">
          <h2 className="values-title text-4xl md:text-8xl font-bold uppercase tracking-tighter leading-[0.9] split-heading">
            <span className="font-mono">&#9600;</span> A Model For The <span className="font-mono">&#8600;</span><br />
            Intelligence Age
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
          {values.map((value, index) => (
            <div 
              key={index}
              className="value-item flex flex-col gap-4 md:gap-6 hover:translate-x-2 transition-transform duration-300"
              style={{ opacity: 0, transform: 'translateY(10px)' }}
            >
              <div className="w-8 h-8 md:w-10 md:h-10">{value.icon}</div>
              <h3 className="font-bold text-xl md:text-2xl uppercase tracking-tight">{value.title}</h3>
              <p className="text-sm md:text-base leading-relaxed text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

