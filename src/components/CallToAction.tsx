'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Link from 'next/link';

export const CallToAction: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);

  return (
    <section ref={containerRef} className="py-40 px-4 relative overflow-hidden min-h-[80vh] flex items-center justify-center">
      {/* Perspective Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
           style={{
             backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
             backgroundSize: '80px 80px',
             transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
           }}
      />

      <motion.div 
        className="relative z-10 text-center w-full max-w-4xl mx-auto"
        style={{ scale, opacity, y }}
      >
        <h2 className="text-4xl md:text-[80px] font-semibold tracking-[-0.04em] mb-10 leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
          Ship Faster. <br />
          <span className="bg-gradient-to-r from-zap-orange via-zap-deep-orange to-zap-red bg-clip-text text-transparent mt-2 block">Settle Instantly.</span>
        </h2>
        
        <p className="text-lg text-white/50 mb-12 max-w-xl mx-auto font-normal">
          Clone the Starknet Foundation's Top Builder project today. Fully open-source UI templates ready for your Next.js application.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => window.open('https://github.com/starknet', '_blank')} className="interactive group relative px-8 py-4 rounded-xl font-semibold text-sm uppercase tracking-wider overflow-hidden w-full sm:w-auto shadow-[0_0_30px_rgba(255,101,0,0.3)] hover:shadow-[0_0_50px_rgba(255,101,0,0.5)] transition-all">
            <div className="absolute inset-0 bg-gradient-to-r from-zap-orange to-zap-red transition-transform duration-300 group-hover:scale-[1.02]" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/20 transition-opacity duration-300 mix-blend-overlay" />
            <span className="relative z-10 text-white shadow-sm">Fork Commerce Kit</span>
          </button>
          
          <Link href="/dashboard" className="flex items-center justify-center interactive group px-8 py-4 rounded-xl font-semibold text-sm uppercase tracking-wider border border-white/10 hover:border-white/30 hover:bg-white/[0.05] transition-all duration-300 w-full sm:w-auto bg-white/[0.02] backdrop-blur-sm relative overflow-hidden">
            <span className="relative z-10 text-white/80 group-hover:text-white transition-colors duration-300">Launch ZapLink</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};
