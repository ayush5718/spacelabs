'use client';

import { useState } from 'react';
import Preloader from '@/components/Preloader';
import Navigation from '@/components/Navigation';
import Menu from '@/components/Menu';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Work from '@/components/Work';
import Values from '@/components/Values';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import NoiseOverlay from '@/components/NoiseOverlay';
import SVGFilter from '@/components/SVGFilter';
import InteractiveEffects from '@/components/InteractiveEffects';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollProgress from '@/components/ScrollProgress';
import About from '@/components/About';
import Services from '@/components/Services';
import ThemeProvider from '@/components/ThemeProvider';
import SplitTypeInit from '@/components/SplitTypeInit';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Preloader />
      <SVGFilter />
      <NoiseOverlay />
      <CustomCursor />
      <ScrollProgress />
      <Navigation onMenuClick={() => setIsMenuOpen(true)} />
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <InteractiveEffects />
      
      <ThemeProvider />
      <SplitTypeInit />
      <SmoothScroll>
        <main>
          <Hero />
          <Marquee />
          <About />
          <Services />
          <Work />
          <Values />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
