'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  useEffect(() => {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const hoverTriggers = document.querySelectorAll('.hover-trigger');

    const handleMouseMove = (e: MouseEvent) => {
      const posX = e.clientX;
      const posY = e.clientY;

      if (cursorDot) {
        (cursorDot as HTMLElement).style.left = `${posX}px`;
        (cursorDot as HTMLElement).style.top = `${posY}px`;
      }

      if (cursorOutline) {
        gsap.to(cursorOutline, {
          x: posX,
          y: posY,
          duration: 0.15,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const hoverHandlers: Array<{ element: Element; enter: () => void; leave: () => void }> = [];

    hoverTriggers.forEach(trigger => {
      const enterHandler = () => document.body.classList.add('hovering');
      const leaveHandler = () => document.body.classList.remove('hovering');
      
      trigger.addEventListener('mouseenter', enterHandler);
      trigger.addEventListener('mouseleave', leaveHandler);
      
      hoverHandlers.push({ element: trigger, enter: enterHandler, leave: leaveHandler });
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      hoverHandlers.forEach(({ element, enter, leave }) => {
        element.removeEventListener('mouseenter', enter);
        element.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor-dot"></div>
      <div className="cursor-outline"></div>
    </>
  );
}

