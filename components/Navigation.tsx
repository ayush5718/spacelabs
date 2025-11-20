'use client';

import { useState } from 'react';

interface NavigationProps {
  onMenuClick: () => void;
}

export default function Navigation({ onMenuClick }: NavigationProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 mix-blend-difference text-white px-4 py-4 md:py-6 md:px-10 border-b border-white/5 bg-boulder-black/5 backdrop-blur-[2px]">
      <div className="flex justify-between items-center max-w-[1920px] mx-auto">
        <a href="#" className="magnetic hover-trigger text-base md:text-lg font-bold tracking-tighter uppercase flex items-center gap-2 md:gap-3">
          <div className="w-2 h-2 md:w-3 md:h-3 bg-white"></div> SpaceLab
        </a>

        <div className="flex items-center gap-3 md:gap-6 lg:gap-12 text-[10px] md:text-xs font-mono uppercase tracking-widest">
          <a href="#contact" className="magnetic hover-trigger hidden md:block hover:text-gray-300 transition-colors px-2 md:px-4 py-2">Contact</a>
          
          <button 
            onClick={onMenuClick}
            className="magnetic hover-trigger group flex items-center gap-1 md:gap-2 hover:text-gray-300 transition-colors px-2 md:px-4 py-2"
          >
            <span className="text-[8px] md:text-[10px] font-mono">&#8600;</span>
            <span className="scramble-text text-[10px] md:text-xs">Navigate</span>
          </button>
        </div>
      </div>
    </header>
  );
}

