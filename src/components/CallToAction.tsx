'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const CallToAction: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <section ref={containerRef} className="py-40 px-4 relative overflow-hidden min-h-screen flex items-center justify-center">
      {/* Perspective Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
           style={{
             backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
             backgroundSize: '50px 50px',
             transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
           }}
      />

      <motion.div 
        className="relative z-10 text-center w-full max-w-4xl mx-auto"
        style={{ scale, opacity, y }}
      >
        <h2 className="text-6xl md:text-[112px] font-black tracking-[-0.04em] uppercase mb-12 leading-[0.85] mix-blend-plus-lighter">
          Ready to <br />
          <span className="bg-gradient-to-r from-zap-red via-zap-orange to-zap-gold bg-clip-text text-transparent text-[1.25em] -mt-4 block">Zap?</span>
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="interactive group relative px-8 py-4 rounded-full font-bold text-lg uppercase tracking-wider overflow-hidden w-full sm:w-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-zap-red to-zap-orange transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/20 transition-opacity duration-300 mix-blend-overlay" />
            <span className="relative z-10 text-white">Create Link</span>
          </button>
          
          <button className="interactive group px-8 py-4 rounded-full font-bold text-lg uppercase tracking-wider border border-white/20 hover:border-zap-gold transition-colors duration-300 w-full sm:w-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-zap-gold/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 text-white group-hover:text-zap-gold transition-colors duration-300">Explore API</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
};
