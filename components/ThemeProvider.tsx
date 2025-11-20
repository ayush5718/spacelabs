'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ThemeProvider() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Select all sections with data-theme attribute
    const sections = document.querySelectorAll('[data-theme]');

    sections.forEach(section => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => {
          if (section.getAttribute('data-theme') === 'light') {
            document.body.classList.add('theme-light');
          } else {
            document.body.classList.remove('theme-light');
          }
        },
        onEnterBack: () => {
          if (section.getAttribute('data-theme') === 'light') {
            document.body.classList.add('theme-light');
          } else {
            document.body.classList.remove('theme-light');
          }
        }
      });
    });
  }, []);

  return null;
}

