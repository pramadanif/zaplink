'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { CustomCursor } from '@/components/CustomCursor';
import { DynamicBackground } from '@/components/DynamicBackground';
import { HeroSection } from '@/components/HeroSection';
import { InteractiveDemo } from '@/components/InteractiveDemo';
import { BentoFeatures } from '@/components/BentoFeatures';
import { CallToAction } from '@/components/CallToAction';

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative w-full min-h-screen">
      <CustomCursor />
      <DynamicBackground />
      
      {/* Rail Text */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[10px] tracking-[0.8em] uppercase text-white/20 z-50 pointer-events-none hidden lg:block whitespace-nowrap">
        LIQUID UTILITY • STARKNET NATIVE
      </div>

      {/* Status Bar */}
      <div className="fixed bottom-8 right-12 text-[9px] uppercase text-white/30 flex gap-5 z-50 pointer-events-none hidden lg:flex">
        <div>TPS: <span className="text-zap-gold">4,291</span></div>
        <div>Protocol: <span className="text-zap-gold">v1.0.4-beta</span></div>
        <div>Uptime: <span className="text-zap-gold">99.99%</span></div>
      </div>

      {/* Top Nav */}
      <nav className="absolute top-0 left-0 w-full p-10 lg:px-16 flex justify-between items-center z-[100] pointer-events-none">
        <div className="text-[14px] tracking-[0.4em] font-extrabold text-zap-gold uppercase">
          ZAPLINK_PROTO
        </div>
        <ul className="hidden md:flex gap-10 list-none text-[10px] uppercase tracking-[0.2em] text-white/50">
          <li>Network</li>
          <li>Ecosystem</li>
          <li>Documentation</li>
          <li>Launch App</li>
        </ul>
      </nav>

      <div className="relative z-10">
        <HeroSection />
        <InteractiveDemo />
        <BentoFeatures />
        <CallToAction />
      </div>
    </main>
  );
}
