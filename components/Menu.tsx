'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Menu({ isOpen, onClose }: MenuProps) {
  useEffect(() => {
    const menuOverlay = document.getElementById('menuOverlay');
    if (!menuOverlay) return;

    if (isOpen) {
      menuOverlay.classList.remove('translate-x-full');
      document.body.classList.add('overflow-hidden', 'menu-open');
      
      gsap.fromTo('.menu-link', 
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.3 }
      );
    } else {
      menuOverlay.classList.add('translate-x-full');
      document.body.classList.remove('overflow-hidden', 'menu-open');
    }
  }, [isOpen]);

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div 
      id="menuOverlay" 
      className="fixed inset-0 bg-boulder-black text-white z-[60] transform translate-x-full transition-transform duration-[800ms] cubic-bezier(0.76, 0, 0.24, 1) pt-20 md:pt-24 px-4 md:px-8 flex flex-col overflow-y-auto"
      style={{ backgroundColor: '#050505' }}
    >
      <div className="flex flex-col min-h-full justify-between pb-6 md:pb-10 relative z-10 max-w-[1920px] mx-auto w-full">
        {/* Close button - Mobile: Top right, Desktop: Bottom */}
        <button 
          onClick={onClose}
          className="md:hidden fixed top-4 right-4 z-20 magnetic hover-trigger text-sm font-mono uppercase border border-white px-4 py-2 hover:bg-white hover:text-black transition-colors rounded-full text-white"
        >
          Close
        </button>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2 md:gap-4 text-3xl sm:text-4xl md:text-5xl lg:text-8xl font-bold uppercase tracking-tighter text-white mt-8 md:mt-0">
          <a href="#about" onClick={handleLinkClick} className="menu-link hover-trigger group flex items-center gap-2 md:gap-4 w-fit text-white">
            <span className="text-xs md:text-sm font-mono text-gray-500 mt-1 md:mt-2">01</span>
            <span className="scramble-text group-hover:translate-x-2 md:group-hover:translate-x-4 transition-transform duration-300 text-white">About</span>
          </a>
          <a href="#services" onClick={handleLinkClick} className="menu-link hover-trigger group flex items-center gap-2 md:gap-4 w-fit text-white">
            <span className="text-xs md:text-sm font-mono text-gray-500 mt-1 md:mt-2">02</span>
            <span className="scramble-text group-hover:translate-x-2 md:group-hover:translate-x-4 transition-transform duration-300 text-white">Services</span>
          </a>
          <a href="#work" onClick={handleLinkClick} className="menu-link hover-trigger group flex items-center gap-2 md:gap-4 w-fit text-white">
            <span className="text-xs md:text-sm font-mono text-gray-500 mt-1 md:mt-2">03</span>
            <span className="scramble-text group-hover:translate-x-2 md:group-hover:translate-x-4 transition-transform duration-300 text-white">Work</span>
          </a>
          <a href="#sectors" onClick={handleLinkClick} className="menu-link hover-trigger group flex items-center gap-2 md:gap-4 w-fit text-white">
            <span className="text-xs md:text-sm font-mono text-gray-500 mt-1 md:mt-2">04</span>
            <span className="scramble-text group-hover:translate-x-2 md:group-hover:translate-x-4 transition-transform duration-300 text-white">Sectors</span>
          </a>
        </nav>
        
        {/* Footer Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/20 pt-6 md:pt-8 mt-auto gap-6 md:gap-0">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 text-xs md:text-sm font-mono text-white">
            <a href="#" className="magnetic hover-trigger hover:underline px-2 text-white hover:text-gray-300">IG</a>
            <a href="#" className="magnetic hover-trigger hover:underline px-2 text-white hover:text-gray-300">TW</a>
            <a href="#" className="magnetic hover-trigger hover:underline px-2 text-white hover:text-gray-300">LN</a>
          </div>
          {/* Desktop Close Button */}
          <button 
            onClick={onClose}
            className="hidden md:block magnetic hover-trigger text-sm font-mono uppercase border border-white px-6 md:px-8 py-3 md:py-4 hover:bg-white hover:text-black transition-colors rounded-full text-white"
          >
            Close
          </button>
        </div>
      </div>
      <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none hidden md:block"></div>
    </div>
  );
}

