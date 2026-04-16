'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const DynamicBackground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-zap-bg pointer-events-none">
      {/* SVG Noise Filter */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] mix-blend-overlay pointer-events-none">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* Dynamic Heatmap Glow */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #CC561E 0%, transparent 70%)',
        }}
        animate={{
          x: mousePosition.x - 400,
          y: mousePosition.y - 400,
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0.2 }}
      />
      
      {/* Ambient static glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-zap-red rounded-full blur-[150px] opacity-10" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-zap-orange rounded-full blur-[150px] opacity-10" />
    </div>
  );
};
