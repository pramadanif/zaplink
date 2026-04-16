'use client';

import React from 'react';
import { motion } from 'motion/react';

const LOGOS = [
  'STARKNET', 'CARTRIDGE', 'AVNU', 'PRAGMA', 'HERODOTUS', 'EKUBO'
];

export const TrustedBy: React.FC = () => {
  return (
    <section className="py-12 border-y border-white/[0.05] bg-white/[0.01] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-semibold shrink-0">
          Integrated Within The Ecosystem
        </p>
        
        {/* Infinite Scroll Marquee */}
        <div className="flex-1 overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-zap-bg to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-zap-bg to-transparent z-10" />
          
          <motion.div 
            className="flex gap-16 items-center whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
          >
            {[...LOGOS, ...LOGOS].map((logo, idx) => (
              <span key={idx} className="text-xl md:text-2xl font-black tracking-widest text-white/20 select-none">
                {logo}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
