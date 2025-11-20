'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Footer() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth < 1024 || 'ontouchstart' in window;

    // Animate footer title
    const footerTitle = document.querySelector('.footer-title');
    if (footerTitle) {
      gsap.from(footerTitle, {
        opacity: 0,
        scale: isMobile ? 0.95 : 0.8,
        rotationY: isMobile ? 0 : -90,
        duration: isMobile ? 0.8 : 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: '#contact',
          start: isMobile ? "top 90%" : "top 80%",
          toggleActions: "play none none reverse",
          once: true
        },
        onComplete: () => {
          if (isMobile) gsap.set(footerTitle, { opacity: 1, scale: 1, rotationY: 0 });
        }
      });

      // Mobile fallback
      if (isMobile) {
        setTimeout(() => {
          gsap.set(footerTitle, { opacity: 1, scale: 1, rotationY: 0 });
        }, 1500);
      }
    }

    // Animate footer sections
    const footerSections = document.querySelectorAll('.footer-section');
    footerSections.forEach((section, i) => {
      gsap.from(section, {
        opacity: 0,
        y: isMobile ? 20 : 40,
        duration: isMobile ? 0.6 : 1,
        delay: i * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: isMobile ? "top 90%" : "top 85%",
          toggleActions: "play none none reverse",
          once: true
        },
        onComplete: () => {
          if (isMobile) gsap.set(section, { opacity: 1, y: 0 });
        }
      });

      // Mobile fallback
      if (isMobile) {
        setTimeout(() => {
          gsap.set(section, { opacity: 1, y: 0 });
        }, 2000 + i * 150);
      }
    });

    // Animate footer links on hover
    const footerLinks = document.querySelectorAll('#contact a');
    footerLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, {
          x: 5,
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      link.addEventListener('mouseleave', () => {
        gsap.to(link, {
          x: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }, []);

  return (
    <footer id="contact" className="px-4 md:px-10 pt-20 md:pt-40 pb-12 bg-boulder-black text-white relative z-0" data-theme="dark">
      <div className="absolute inset-0 bg-boulder-gray/10 -z-10"></div>

      <div className="max-w-[1920px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-20 md:mb-32">
          <div>
            <h2 className="footer-title hover-trigger text-[15vw] md:text-[13vw] leading-[0.8] font-bold uppercase tracking-tighter transition-all cursor-none relative mix-blend-screen">
              Let's Talk <span className="text-[8vw] align-super absolute -top-4 -right-12 font-mono">&#9643;</span>
            </h2>
          </div>
          <div className="mt-12 md:mt-16 md:mb-8 flex gap-4">
            <a href="#" className="magnetic hover-trigger w-16 h-16 md:w-24 md:h-24 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all group">
              <span className="text-2xl md:text-3xl font-mono group-hover:-rotate-45 transition-transform duration-300">&#8594;</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 border-t border-white/10 pt-12 md:pt-16">
          <div className="footer-section opacity-60 hover:opacity-100 transition-opacity duration-500">
            <h4 className="font-bold uppercase mb-4 md:mb-6 flex items-center gap-3 text-xs md:text-sm tracking-widest">
              <div className="w-2 h-2 bg-white"></div> SpaceLabs Creative Studios
            </h4>
            <address className="not-italic text-gray-400 text-xs md:text-sm leading-relaxed font-mono">
              Floor 4, 141-145<br />
              Curtain Road<br />
              London, EC2A 3BX
            </address>
          </div>

          <div className="opacity-60 hover:opacity-100 transition-opacity duration-500">
            <h4 className="font-bold uppercase mb-4 md:mb-6 text-xs md:text-sm tracking-widest">Contact</h4>
            <a href="mailto:aayush.designbyte@gmail.com" className="magnetic hover-trigger block text-gray-400 text-xs md:text-sm hover:text-white mb-2 font-mono w-fit">
              aayush.designbyte@gmail.com
            </a>
            <a href="tel:+4402070000000" className="magnetic hover-trigger block text-gray-400 text-xs md:text-sm hover:text-white font-mono w-fit">
              +44 (0) 20 7000 0000
            </a>
          </div>

          <div className="opacity-60 hover:opacity-100 transition-opacity duration-500">
            <h4 className="font-bold uppercase mb-4 md:mb-6 text-xs md:text-sm tracking-widest">Follow Us <span className="font-mono">&#8600;</span></h4>
            <div className="flex flex-col gap-3 font-mono">
              <a href="#" className="magnetic hover-trigger text-gray-400 text-xs md:text-sm hover:text-white w-fit">Facebook</a>
              <a href="#" className="magnetic hover-trigger text-gray-400 text-xs md:text-sm hover:text-white w-fit">Instagram</a>
              <a href="#" className="magnetic hover-trigger text-gray-400 text-xs md:text-sm hover:text-white w-fit">LinkedIn</a>
            </div>
          </div>

          <div className="footer-section opacity-60 hover:opacity-100 transition-opacity duration-500">
            <h4 className="font-bold uppercase mb-4 md:mb-6 text-xs md:text-sm tracking-widest">Built By</h4>
            <div className="flex flex-col gap-3 font-mono">
              <a 
                href="https://github.com/ayush5718" 
                target="_blank" 
                rel="noopener noreferrer"
                className="magnetic hover-trigger text-gray-400 text-xs md:text-sm hover:text-white w-fit"
              >
                GitHub
              </a>
              <a 
                href="https://instagram.com/ayushbhardwaj.2602" 
                target="_blank" 
                rel="noopener noreferrer"
                className="magnetic hover-trigger text-gray-400 text-xs md:text-sm hover:text-white w-fit"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 md:mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between text-[10px] md:text-xs text-gray-600 uppercase tracking-widest font-mono">
          <p>&copy; 2024 SpaceLabs Group. All Rights Reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover-trigger hover:text-white">Privacy Policy</a>
            <a href="#" className="hover-trigger hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

