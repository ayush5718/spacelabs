'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

interface SplitTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function SplitText({ children, className = '' }: SplitTextProps) {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const splitTypes = document.querySelectorAll('.split-heading');
    
    splitTypes.forEach((element) => {
      const split = new SplitType(element as HTMLElement, { types: 'chars' });
      
      gsap.from(split.chars, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.02,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });
  }, []);

  return (
    <span ref={textRef} className={className}>
      {children}
    </span>
  );
}

