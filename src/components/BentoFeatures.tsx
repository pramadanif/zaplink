'use client';

import React, { useRef, useState } from 'react';
import { motion, Variants } from 'motion/react';
import { Fingerprint, MonitorPlay, ShieldX, Blocks } from 'lucide-react';

interface BentoCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  gradient?: string;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
};

const BentoCard: React.FC<BentoCardProps> = ({ title, description, icon, className = '', gradient = 'rgba(204, 86, 30, 0.15)' }) => {
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
      variants={itemVariants}
      ref={cardRef}
      className={`relative overflow-hidden rounded-[16px] bg-white/[0.02] border border-white/[0.05] p-6 flex flex-col justify-between group interactive hover:border-white/20 transition-colors duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {/* Dynamic Radial Gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, ${gradient}, transparent 30%)`,
        }}
      />

      <div className="relative z-10 h-full flex flex-col">
        <div className="mb-auto transform transition-transform duration-500 group-hover:scale-110 origin-top-left">
          {icon}
        </div>
        <div className="mt-12">
          <h3 className="text-sm font-semibold text-white/90 mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all">{title}</h3>
          <p className="text-[13px] leading-relaxed text-white/50 group-hover:text-white/70 transition-colors duration-300">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const BentoFeatures: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section className="py-24 px-4 max-w-6xl mx-auto">
      <motion.div 
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.04em] mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/50">
          Production-Ready Infrastructure.
        </h2>
        <p className="text-lg text-white/50 max-w-2xl font-normal leading-relaxed">
          ZapLink is built strictly on the Starkzap Commerce Kit. A suite of premium tools designed for developers to build state-of-the-art payment experiences.
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[220px]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <BentoCard
          title="Frictionless Onboarding"
          description="Your clients log in securely with Google or Apple. Starkzap silently generates a session-key smart wallet in the background."
          icon={<Fingerprint className="w-8 h-8 text-zap-orange" />}
          className="md:col-span-2"
          gradient="rgba(255, 101, 0, 0.15)"
        />
        <BentoCard
          title="Zero Platform Fees"
          description="Integrated Paymaster abstracts network costs. Transactions are sponsored seamlessly."
          icon={<ShieldX className="w-8 h-8 text-zap-red" />}
          gradient="rgba(196, 12, 12, 0.15)"
        />
        <BentoCard
          title="Global Settlement"
          description="Direct routing allows clients to pay with USD analogues or native Bitcoin without bridging friction."
          icon={<MonitorPlay className="w-8 h-8 text-zap-gold" />}
          gradient="rgba(246, 206, 113, 0.15)"
        />
        <BentoCard
          title="Starkzap Commerce Kit"
          description="This entire UI is completely open-source. Drop these high-converting components straight into your Next.js application."
          icon={<Blocks className="w-8 h-8 text-white" />}
          className="md:col-span-2"
          gradient="rgba(255, 255, 255, 0.08)"
        />
      </motion.div>
    </section>
  );
};
