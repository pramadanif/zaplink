'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link as LinkIcon, ArrowRight, CheckCircle2 } from 'lucide-react';

export const InteractiveDemo: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedLink('');
    setIsCopied(false);

    // Simulate link generation
    setTimeout(() => {
      const link = 'zaplink.xyz/claim?key=0x7f...a1b2';
      let currentText = '';
      let i = 0;
      
      const interval = setInterval(() => {
        currentText += link[i];
        setGeneratedLink(currentText);
        i++;
        if (i === link.length) {
          clearInterval(interval);
          setIsGenerating(false);
        }
      }, 50);
    }, 800);
  };

  const handleCopy = () => {
    if (generatedLink && !isGenerating) {
      navigator.clipboard.writeText(generatedLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <section className="py-32 px-4 relative flex items-center justify-center min-h-[80vh]">
      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">The Zap</h2>
          <p className="text-white/60">Generate a payment link in seconds.</p>
        </div>

        {/* Glassmorphic Widget */}
        <motion.div 
          className="bg-white/[0.03] border border-white/10 backdrop-blur-[40px] rounded-[24px] p-8 shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Ambient glow inside widget */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-zap-orange/10 blur-[60px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            <div className="mb-8">
              <label className="block text-[9px] font-bold text-zap-deep-orange uppercase tracking-[0.2em] mb-5">Amount to Send</label>
              <div className="flex items-center justify-between bg-black/40 border border-zap-orange/20 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 w-full">
                  <span className="text-lg font-light text-white/40">$</span>
                  <input 
                    type="text" 
                    defaultValue="10.00" 
                    className="bg-transparent font-mono text-[18px] text-zap-gold outline-none w-full placeholder-white/20"
                    readOnly
                  />
                </div>
                <span className="text-[10px] opacity-50 uppercase">USDC</span>
              </div>
            </div>

            <div className="relative h-[60px] mb-6">
              <AnimatePresence mode="wait">
                {!generatedLink && !isGenerating ? (
                  <motion.button
                    key="generate-btn"
                    className="interactive w-full h-full bg-gradient-to-tr from-zap-red to-zap-orange rounded-xl font-bold text-[12px] uppercase tracking-[0.1em] text-white flex items-center justify-center gap-2 group relative overflow-hidden shadow-[0_0_30px_rgba(196,12,12,0.4)]"
                    onClick={handleGenerate}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      GENERATE ZAPLINK <ArrowRight className="w-4 h-4" />
                    </span>
                  </motion.button>
                ) : (
                  <motion.div
                    key="link-display"
                    className={`w-full h-full border rounded-xl flex items-center px-4 gap-3 cursor-pointer transition-colors duration-300 bg-black/40 ${isCopied ? 'border-green-500/50' : 'border-zap-orange/20'}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={handleCopy}
                  >
                    {isCopied ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <LinkIcon className="w-5 h-5 text-zap-orange" />}
                    <span className="font-mono text-[11px] text-white/40 truncate flex-1">
                      {generatedLink}
                      {isGenerating && <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>|</motion.span>}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <p className="text-center text-xs text-white/40">
              Powered by Starkzap SDK. Zero gas fees.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
