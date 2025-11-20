'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Project {
  id: number;
  title: string;
  titleIcon?: string;
  subtitle: string;
  image: string;
  overlayText: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Sciex ▀',
    subtitle: 'Demand Proof',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop',
    overlayText: 'SCIEX'
  },
  {
    id: 2,
    title: 'Audible',
    titleIcon: '▫',
    subtitle: 'Social Campaign',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop',
    overlayText: '1984'
  },
  {
    id: 3,
    title: 'IDT █',
    subtitle: 'Discover what\'s possible',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2670&auto=format&fit=crop',
    overlayText: 'IDT'
  },
  {
    id: 4,
    title: 'YOUGOV ▲',
    subtitle: 'Research Reality',
    image: 'https://images.unsplash.com/photo-1614935151651-0bea6508db6b?q=80&w=2525&auto=format&fit=crop',
    overlayText: 'GOV'
  }
];

export default function Work() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth < 1024 || 'ontouchstart' in window;

    // Animate section title on scroll
    const workTitle = document.querySelector('.work-title');
    if (workTitle) {
      gsap.from(workTitle, {
        opacity: 0,
        y: isMobile ? 30 : 100,
        rotationX: isMobile ? 0 : -15,
        duration: isMobile ? 0.8 : 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: '#work',
          start: isMobile ? "top 90%" : "top 80%",
          toggleActions: "play none none reverse",
          once: true
        },
        onComplete: () => {
          if (isMobile) gsap.set(workTitle, { opacity: 1, y: 0, rotationX: 0 });
        }
      });

      // Mobile fallback
      if (isMobile) {
        setTimeout(() => {
          gsap.set(workTitle, { opacity: 1, y: 0, rotationX: 0 });
        }, 1500);
      }
    }

    // Image Parallax with enhanced effect (desktop only on mobile)
    document.querySelectorAll('.parallax-container').forEach((container, index) => {
      const img = container.querySelector('.parallax-img');
      const card = container.closest('.tilt-card');
      
      if (img && !isMobile) {
        gsap.to(img, {
          y: '20%',
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      }

      // Fade in cards on scroll
      if (card) {
        gsap.from(card, {
          opacity: 0,
          y: isMobile ? 30 : 80,
          scale: isMobile ? 0.95 : 0.8,
          rotationY: isMobile ? 0 : -20,
          duration: isMobile ? 0.6 : 1.2,
          delay: index * (isMobile ? 0.1 : 0.2),
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: isMobile ? "top 90%" : "top 85%",
            toggleActions: "play none none reverse",
            once: true
          },
          onComplete: () => {
            if (isMobile) gsap.set(card, { opacity: 1, y: 0, scale: 1, rotationY: 0 });
          }
        });

        // Mobile fallback
        if (isMobile) {
          setTimeout(() => {
            gsap.set(card, { opacity: 1, y: 0, scale: 1, rotationY: 0 });
          }, 2000 + index * 200);
        }
      }
    });

    // Animate overlay text
    document.querySelectorAll('.overlay-text').forEach((text) => {
      gsap.from(text, {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: text,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // 3D Card Tilt + Spotlight + Liquid Hover (Desktop only)
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) {
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }

    const tiltCards = document.querySelectorAll('.tilt-card');
    const turbulence = document.querySelector('#liquid feTurbulence');

    const cleanupFunctions: (() => void)[] = [];

    tiltCards.forEach(card => {
      const handleMouseMove = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = card.getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left;
        const y = mouseEvent.clientY - rect.top;
        
        // Update CSS variables for Spotlight
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        gsap.to(card, {
          rotationX: rotateX,
          rotationY: rotateY,
          duration: 0.5,
          ease: "power2.out"
        });
      };

      const handleMouseEnter = () => {
        if (turbulence) {
          gsap.to(turbulence, {
            attr: { baseFrequency: 0.02 },
            duration: 0.4,
            ease: "power2.out"
          });
        }

        // Animate project info on hover
        const projectInfo = card.querySelector('.project-info');
        const projectArrow = card.querySelector('.project-arrow');
        
        if (projectInfo) {
          gsap.to(projectInfo, {
            x: 10,
            duration: 0.5,
            ease: "power2.out"
          });
        }
        
        if (projectArrow) {
          gsap.to(projectArrow, {
            scale: 1.2,
            rotation: 45,
            duration: 0.5,
            ease: "back.out(1.7)"
          });
        }
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: "power2.out"
        });
        
        if (turbulence) {
          gsap.to(turbulence, {
            attr: { baseFrequency: 0 },
            duration: 0.4,
            ease: "power2.in"
          });
        }

        // Reset project info
        const projectInfo = card.querySelector('.project-info');
        const projectArrow = card.querySelector('.project-arrow');
        
        if (projectInfo) {
          gsap.to(projectInfo, {
            x: 0,
            duration: 0.5,
            ease: "power2.out"
          });
        }
        
        if (projectArrow) {
          gsap.to(projectArrow, {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      };

      card.addEventListener('mousemove', handleMouseMove as EventListener);
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      cleanupFunctions.push(() => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    });

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="work" className="px-4 md:px-10 py-20 md:py-40 bg-boulder-black relative z-10" data-theme="dark">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-32 border-b border-white/20 pb-10">
          <h2 className="work-title text-4xl md:text-8xl font-bold uppercase tracking-tighter max-w-3xl leading-[0.9] split-heading">
            Complex <span className="font-mono">&#9654;</span><br />
            <span className="bg-white text-black px-2 italic">Made</span> <span className="font-mono">&#9643;</span> <span className="font-mono">&#8600;</span><br />
            Compelling
          </h2>
          <a href="#" className="magnetic hover-trigger mt-8 md:mt-0 font-mono text-xs uppercase border border-white/30 px-8 py-4 md:px-10 md:py-5 hover:bg-white hover:text-black transition-all tracking-widest rounded-full">
            View All Work
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20 md:gap-y-40">
          {projects.map((project, index) => (
            <article 
              key={project.id} 
              className={`tilt-card group cursor-none relative ${index === 1 || index === 3 ? 'md:mt-32' : ''}`}
            >
              <div className="spotlight-overlay"></div>
              <div className="parallax-container w-full aspect-[4/3] bg-neutral-900 relative mb-6 md:mb-8 overflow-hidden rounded-sm">
                <div 
                  className="liquid-img parallax-img bg-cover bg-center w-full h-[130%] absolute top-[-15%] opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
                  style={{ backgroundImage: `url(${project.image})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="tilt-content absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="overlay-text text-[15vw] md:text-[8vw] font-bold tracking-tighter text-white mix-blend-overlay opacity-50 group-hover:opacity-100 transition-opacity">
                    {project.overlayText}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-start border-t border-white/20 pt-4 md:pt-6 tilt-content relative z-10">
                <div className="project-info">
                  <h3 className="text-2xl md:text-3xl font-bold uppercase mb-2 group-hover:text-gray-300 transition-colors">
                    {project.title} {project.titleIcon && <span className="font-mono">{project.titleIcon}</span>}
                  </h3>
                  <p className="font-mono text-xs text-gray-500 uppercase tracking-wider project-subtitle">
                    {project.subtitle}
                  </p>
                </div>
                <span className="project-arrow text-2xl md:text-3xl group-hover:-translate-y-2 group-hover:translate-x-2 transition-transform duration-500 text-gray-500 group-hover:text-white">
                  <span className="font-mono">&#8599;</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

