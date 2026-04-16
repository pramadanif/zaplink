'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import { LiquidSphere } from './LiquidSphere';
import { ArrowRight, Terminal, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden pt-24">
      {/* 3D Canvas Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, opacity, scale }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-zap-bg/40 via-transparent to-zap-bg pointer-events-none z-10" />
        <Canvas camera={{ position: [0, 0, 6.5], fov: 40 }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={0.6} />
          <LiquidSphere />
        </Canvas>
      </motion.div>

      {/* Typography Overlay */}
      <div className="relative z-10 text-center px-4 flex flex-col items-center w-full max-w-5xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl mb-8 flex items-center gap-3 shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
        >
          <div className="flex items-center justify-center w-4 h-4 rounded-full bg-zap-orange/20 relative">
            <div className="w-1.5 h-1.5 rounded-full bg-zap-orange animate-ping absolute"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-zap-orange relative z-10"></div>
          </div>
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-white/80">Starkzap Commerce Kit v2.1.0</span>
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-[96px] font-bold tracking-[-0.04em] leading-[0.95] text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] to-[#A0A0A0]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          End The Hostage Phase.<br />
          <span className="block mt-1 bg-clip-text text-transparent bg-gradient-to-r from-zap-orange via-[#FF9040] to-zap-gold select-none">
            Instant Micro-Escrow.
          </span>
        </motion.h1>
        
        <motion.p
          className="mt-8 text-lg md:text-xl font-normal tracking-tight text-white/50 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Digital creators lose thousands chasing final invoices. ZapLink turns your deliverables into trustless payment links. Seamless for you, zero-friction for your clients.
        </motion.p>
        
        <motion.div 
          className="mt-12 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Link href="/dashboard" className="interactive group w-full sm:w-auto px-8 py-4 bg-white text-zap-bg rounded-xl font-semibold text-sm transition-all hover:bg-white/90 flex items-center justify-center gap-2 hover:gap-3">
            Launch Platform <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/commerce-kit" className="interactive group w-full sm:w-auto px-8 py-4 bg-white/[0.03] border border-white/10 text-white rounded-xl font-semibold text-sm backdrop-blur-md transition-all hover:bg-white/[0.08] hover:border-white/20 flex items-center justify-center gap-2">
            <Terminal className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" /> Integrate SDK
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/30 text-[9px] tracking-[0.4em] uppercase font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <span>Scroll to Explore</span>
        <motion.div 
          className="w-[1px] h-12 bg-gradient-to-b from-zap-orange/60 to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </section>
  );
};
