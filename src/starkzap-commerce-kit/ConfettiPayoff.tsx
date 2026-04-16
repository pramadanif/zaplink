'use client';

import React from 'react';
import { motion } from 'motion/react';

export const ConfettiPayoff: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(16)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full"
          style={{ 
            backgroundColor: i % 2 === 0 ? '#F6CE71' : '#FF6500',
            boxShadow: '0 0 10px rgba(246,206,113,0.5)'
          }}
          initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
          animate={{ 
            opacity: 0, 
            scale: [0, 1.5, 0.5], 
            x: (Math.random() - 0.5) * 400, 
            y: (Math.random() - 0.5) * 400,
            rotate: Math.random() * 360
          }}
          transition={{ 
            duration: 2, 
            ease: [0.16, 1, 0.3, 1],
            delay: Math.random() * 0.2
          }}
        />
      ))}
    </div>
  );
};
