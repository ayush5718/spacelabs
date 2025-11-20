'use client';

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface NavigationProps {
  onMenuClick: () => void;
}

export default function Navigation({ onMenuClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Detect when Services or Values sections are in view
    const servicesSection = document.getElementById('services');
    const valuesSection = document.getElementById('sectors');

    const checkLightSection = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      if (servicesSection && valuesSection) {
        const servicesTop = servicesSection.offsetTop;
        const servicesBottom = servicesTop + servicesSection.offsetHeight;
        const valuesTop = valuesSection.offsetTop;
        const valuesBottom = valuesTop + valuesSection.offsetHeight;
        
        // Check if we're in Services or Values section
        const inServices = scrollY + 100 >= servicesTop && scrollY <= servicesBottom;
        const inValues = scrollY + 100 >= valuesTop && scrollY <= valuesBottom;
        
        setIsLightSection(inServices || inValues);
      }
    };

    // Use ScrollTrigger for more accurate detection
    if (servicesSection) {
      ScrollTrigger.create({
        trigger: servicesSection,
        start: 'top 100px',
        end: 'bottom top',
        onEnter: () => setIsLightSection(true),
        onLeave: () => setIsLightSection(false),
        onEnterBack: () => setIsLightSection(true),
        onLeaveBack: () => setIsLightSection(false),
      });
    }

    if (valuesSection) {
      ScrollTrigger.create({
        trigger: valuesSection,
        start: 'top 100px',
        end: 'bottom top',
        onEnter: () => setIsLightSection(true),
        onLeave: () => setIsLightSection(false),
        onEnterBack: () => setIsLightSection(true),
        onLeaveBack: () => setIsLightSection(false),
      });
    }

    // Initial check
    checkLightSection();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === servicesSection || trigger.vars.trigger === valuesSection) {
          trigger.kill();
        }
      });
    };
  }, []);

  const textColor = isLightSection ? 'text-black' : 'text-white';
  const borderColor = isLightSection ? 'border-black/20' : 'border-white/20';
  const bgColor = isScrolled 
    ? (isLightSection ? 'bg-white/95' : 'bg-boulder-black/95')
    : (isLightSection ? 'bg-white/0' : 'bg-boulder-black/0');

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 ${textColor} px-4 md:px-10 py-6 border-b ${borderColor} transition-all duration-300 overflow-hidden ${
        isScrolled 
          ? `${bgColor} backdrop-blur-md mix-blend-normal` 
          : `mix-blend-difference backdrop-blur-[2px]`
      }`}
    >
      <div className="flex justify-between items-center max-w-[1920px] mx-auto w-full">
        <a href="#" className={`magnetic hover-trigger text-lg md:text-xl font-bold tracking-tighter uppercase flex items-center gap-3 whitespace-nowrap ${textColor}`}>
          <div className={`w-3 h-3 ${isLightSection ? 'bg-black' : 'bg-white'} flex-shrink-0`}></div> <span className="truncate">SpaceLabs</span>
        </a>

        <div className={`flex items-center gap-4 md:gap-6 lg:gap-12 text-xs font-mono uppercase tracking-widest flex-shrink-0 ${textColor}`}>
          <a href="#contact" className={`magnetic hover-trigger hidden md:block hover:opacity-70 transition-colors px-4 py-2 whitespace-nowrap ${textColor}`}>Contact</a>
          
          <button 
            onClick={onMenuClick}
            className={`magnetic hover-trigger group flex items-center gap-2 hover:opacity-70 transition-colors px-2 md:px-4 py-2 whitespace-nowrap ${textColor}`}
          >
            <span className="text-[10px]">&#8600;</span>
            <span className="scramble-text">Navigate</span>
          </button>
        </div>
      </div>
    </header>
  );
}

