'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Service {
  title: string;
  description: string;
  image: string;
}

const services: Service[] = [
  {
    title: 'Branding & ID',
    description: 'Logo design, visual systems, and brand guidelines for the science sector.',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop'
  },
  {
    title: 'Digital Experience',
    description: 'Websites, apps, and interactive platforms that demystify complexity.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop'
  },
  {
    title: 'Motion & 3D',
    description: 'Explainer videos, 3D visualization of molecules, and kinetic type.',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop'
  },
  {
    title: 'Campaigns',
    description: 'Global marketing campaigns that drive measurable growth.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2000&auto=format&fit=crop'
  }
];

export default function Services() {
  const revealImgRef = useRef<HTMLImageElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate section on scroll
    gsap.from('.services-title', {
      opacity: 0,
      y: 80,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: '#services',
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Service items animation
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach((item, i) => {
      gsap.from(item, {
        opacity: 0,
        x: -50,
        duration: 1,
        delay: i * 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // Desktop hover reveal image effect (only on non-mobile)
    if (!isMobile) {
      const revealImg = revealImgRef.current;
      if (!revealImg) return;

      const cleanupFunctions: (() => void)[] = [];

      serviceItems.forEach((item) => {
        const handleMouseEnter = (e: Event) => {
          const imgUrl = item.getAttribute('data-img');
          if (imgUrl && revealImg) {
            revealImg.src = imgUrl;
            gsap.to(revealImg, {
              opacity: 1,
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        };

        const handleMouseLeave = () => {
          if (revealImg) {
            gsap.to(revealImg, {
              opacity: 0,
              scale: 0.8,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        };

        const handleMouseMove = (e: Event) => {
          const mouseEvent = e as MouseEvent;
          if (revealImg) {
            const x = mouseEvent.clientX;
            const y = mouseEvent.clientY;
            gsap.to(revealImg, {
              left: x,
              top: y,
              duration: 0.5,
              ease: "power2.out"
            });
          }
        };

        item.addEventListener('mouseenter', handleMouseEnter as EventListener);
        item.addEventListener('mouseleave', handleMouseLeave);
        item.addEventListener('mousemove', handleMouseMove as EventListener);

        cleanupFunctions.push(() => {
          item.removeEventListener('mouseenter', handleMouseEnter as EventListener);
          item.removeEventListener('mouseleave', handleMouseLeave);
          item.removeEventListener('mousemove', handleMouseMove as EventListener);
        });
      });

      return () => {
        cleanupFunctions.forEach(cleanup => cleanup());
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  const handleServiceClick = (index: number) => {
    if (isMobile) {
      setExpandedIndex(expandedIndex === index ? null : index);
    }
  };

  return (
    <section id="services" className="relative bg-white text-black py-32 px-4 md:px-10" data-theme="light">
      <div className="max-w-[1920px] mx-auto">
        <div className="services-container grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sticky Sidebar */}
          <div className="lg:col-span-4 h-fit lg:sticky lg:top-32">
            <h2 className="text-sm font-mono uppercase tracking-widest mb-4 text-gray-500">[ 02. Services ]</h2>
            <h3 className="services-title split-heading text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-8">
              Our<br />
              Expertise
            </h3>
            <p className="text-lg text-gray-600 max-w-xs">
              We combine PhD-level knowledge with world-class creative execution to solve complex problems.
            </p>
          </div>

          {/* Interactive List */}
          <div className="lg:col-span-8 flex flex-col">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-item group py-12 border-b border-black/10 hover:border-black/100 transition-colors cursor-none relative"
                data-img={service.image}
                onClick={() => handleServiceClick(index)}
              >
                <div className="flex justify-between items-center hover-trigger">
                  <h4 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter group-hover:translate-x-4 transition-transform duration-300">
                    {service.title}
                  </h4>
                  <span className="text-4xl group-hover:rotate-45 transition-transform duration-300">
                    <span className="font-mono">&#8599;</span>
                  </span>
                </div>
                <p className="mt-4 text-gray-500 max-w-md group-hover:text-black transition-colors">
                  {service.description}
                </p>
                
                {/* Mobile: Inline expandable image */}
                {isMobile && (
                  <div 
                    className={`service-mobile-image overflow-hidden transition-all duration-500 ease-out ${
                      expandedIndex === index ? 'max-h-[500px] mt-6 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: Reveal Image Container (hidden on mobile) */}
      {!isMobile && (
        <img
          ref={revealImgRef}
          id="service-reveal-img"
          className="reveal-img hidden lg:block"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          alt="Service Preview"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(0.8)',
            width: '400px',
            height: '500px',
            objectFit: 'cover',
            opacity: 0,
            pointerEvents: 'none',
            zIndex: 5,
            borderRadius: '8px',
            filter: 'brightness(0.8) contrast(1.2)'
          }}
        />
      )}
    </section>
  );
}

