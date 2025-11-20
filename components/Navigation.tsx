'use client';

import { useState } from 'react';

interface NavigationProps {
  onMenuClick: () => void;
}

export default function Navigation({ onMenuClick }: NavigationProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 mix-blend-difference text-white px-4 md:px-10 py-6 border-b border-white/5 bg-boulder-black/0 backdrop-blur-[2px] overflow-hidden">
      <div className="flex justify-between items-center max-w-[1920px] mx-auto w-full">
        <a href="#" className="magnetic hover-trigger text-lg md:text-xl font-bold tracking-tighter uppercase flex items-center gap-3 whitespace-nowrap">
          <div className="w-3 h-3 bg-white flex-shrink-0"></div> <span className="truncate">SpaceLabs</span>
        </a>

        <div className="flex items-center gap-4 md:gap-6 lg:gap-12 text-xs font-mono uppercase tracking-widest flex-shrink-0">
          <a href="#contact" className="magnetic hover-trigger hidden md:block hover:text-gray-300 transition-colors px-4 py-2 whitespace-nowrap">Contact</a>
          
          <button 
            onClick={onMenuClick}
            className="magnetic hover-trigger group flex items-center gap-2 hover:text-gray-300 transition-colors px-2 md:px-4 py-2 whitespace-nowrap"
          >
            <span className="text-[10px]">&#8600;</span>
            <span className="scramble-text">Navigate</span>
          </button>
        </div>
      </div>
    </header>
  );
}

