'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Key, Zap, Bitcoin, Code2 } from 'lucide-react';

interface BentoCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const BentoCard: React.FC<BentoCardProps> = ({ title, description, icon, className = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-[16px] bg-white/[0.02] border border-white/[0.05] p-5 flex flex-col justify-between group interactive hover:border-zap-deep-orange transition-colors duration-300 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Dynamic Radial Gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(204, 86, 30, 0.15), transparent 40%)`,
        }}
      />

      <div className="relative z-10">
        <div className="absolute -top-2 -right-2 opacity-20 transform rotate-12 text-white/80 group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
        <div className="mt-8">
          <h3 className="text-[10px] uppercase tracking-[0.1em] font-bold text-white/80 mb-2">{title}</h3>
          <p className="text-[11px] leading-[1.4] text-white/40">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const BentoFeatures: React.FC = () => {
  return (
    <section className="py-32 px-4 max-w-7xl mx-auto">
      <div className="mb-20">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
          The Alchemy Lab
        </h2>
        <p className="text-xl text-white/50 max-w-2xl">
          We've abstracted away the complexity of blockchain. What remains is pure utility.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 auto-rows-[160px]">
        <BentoCard
          title="Invisible Wallets"
          description="No Seed Phrase. Social Login. Users don't even know they are using crypto."
          icon={<Key className="w-10 h-10 text-zap-gold" />}
          className="md:col-span-2"
        />
        <BentoCard
          title="Zero Gas"
          description="Starkzap Paymaster sponsors every transaction automatically."
          icon={
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            >
              <Zap className="w-10 h-10 text-zap-orange fill-zap-orange/20" />
            </motion.div>
          }
        />
        <BentoCard
          title="Bitcoin Native"
          description="Fund directly with native BTC. No bridging required."
          icon={<Bitcoin className="w-10 h-10 text-zap-gold" />}
        />
        <BentoCard
          title="Open Source"
          description="Forkable public good. Build your own payment experiences."
          icon={<Code2 className="w-10 h-10 text-zap-red" />}
          className="md:col-span-2"
        />
      </div>
    </section>
  );
};
