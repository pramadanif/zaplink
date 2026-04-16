'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link as LinkIcon, ArrowRight, ShieldCheck, Download, Fingerprint } from 'lucide-react';

export const InteractiveDemo: React.FC = () => {
  const [step, setStep] = useState<'creator' | 'link' | 'client-login' | 'client-pay' | 'success'>('creator');
  const [generatedLink, setGeneratedLink] = useState('');
  
  const handleGenerate = () => {
    setStep('link');
    setTimeout(() => {
      setGeneratedLink('zaplink.xyz/pay/invoice_77x9a');
      setTimeout(() => setStep('client-login'), 2000);
    }, 1500);
  };

  const handleLogin = () => {
    setStep('client-pay');
  };

  const handlePay = () => {
    setStep('success');
    setTimeout(() => {
      setStep('creator');
      setGeneratedLink('');
    }, 4000);
  };

  return (
    <section className="py-24 px-4 relative flex items-center justify-center min-h-screen">
      <div className="max-w-6xl mx-auto w-full relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div 
          className="order-2 md:order-1"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zap-gold/10 border border-zap-gold/20 rounded-full text-zap-gold text-xs uppercase tracking-widest font-bold mb-6">
             The Web2 Illusion
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.04em] mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60">
            Flawless UX.<br/>
            <span className="bg-gradient-to-r from-zap-gold via-zap-orange to-zap-red bg-clip-text text-transparent inline-block mt-1">Powered by Web3 rails.</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed mb-8 font-normal">
            Your clients shouldn't need to know what a blockchain is. Starkzap abstract away technical complexity, extra fees, and processing delays. They just log in and pay.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-4 text-sm font-medium text-white/80 group">
              <div className="w-8 h-8 rounded-full bg-zap-gold/10 flex items-center justify-center group-hover:scale-110 transition-transform"><ShieldCheck className="text-zap-gold w-4 h-4" /></div> 
              Instant Social Login (No Setup Required)
            </li>
            <li className="flex items-center gap-4 text-sm font-medium text-white/80 group">
              <div className="w-8 h-8 rounded-full bg-zap-orange/10 flex items-center justify-center group-hover:scale-110 transition-transform"><ShieldCheck className="text-zap-orange w-4 h-4" /></div> 
              Zero Hidden Processing Fees
            </li>
            <li className="flex items-center gap-4 text-sm font-medium text-white/80 group">
              <div className="w-8 h-8 rounded-full bg-zap-red/10 flex items-center justify-center group-hover:scale-110 transition-transform"><ShieldCheck className="text-zap-red w-4 h-4" /></div> 
              Instant Delivery upon Verification
            </li>
          </ul>
        </motion.div>

        {/* Glassmorphic Demo Widget - Order 1 on Mobile, 2 on Desktop */}
        <div className="order-1 md:order-2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#050505] border border-white/10 backdrop-blur-[40px] rounded-[24px] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.8)] relative overflow-hidden hidden md:block group"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-zap-orange/15 blur-[100px] rounded-full pointer-events-none transition-opacity duration-1000" />

            <div className="relative z-10 h-[300px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                
                {/* Step 1: Creator generates link */}
                {step === 'creator' && (
                  <motion.div key="creator" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full justify-center">
                    <div className="mb-6">
                      <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-3">Invoice Amount</label>
                      <div className="flex items-center justify-between bg-[#0A0A0A] border border-white/10 rounded-xl p-4 focus-within:border-zap-orange/50 transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="text-white/40">$</span>
                          <input type="text" defaultValue="500.00" className="bg-transparent font-semibold text-2xl w-full outline-none" readOnly />
                        </div>
                        <span className="text-xs uppercase text-zap-gold font-bold tracking-widest bg-zap-gold/10 px-2 py-1 rounded">USDC</span>
                      </div>
                    </div>
                    <button onClick={handleGenerate} className="w-full interactive bg-gradient-to-r from-zap-orange to-zap-red text-white text-sm font-semibold py-4 rounded-xl shadow-[0_4px_24px_rgba(255,101,0,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
                      Create Payment Link <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                {/* Step 2: Link generation loading */}
                {step === 'link' && (
                  <motion.div key="link" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex flex-col items-center justify-center h-full gap-6 text-center">
                    <div className="w-12 h-12 border-2 border-zap-orange/30 border-t-zap-orange rounded-full animate-spin" />
                    <div>
                      <p className="text-lg font-medium mb-1 tracking-tight">Securing Escrow...</p>
                      <p className="text-xs text-white/40 font-mono bg-white/5 px-3 py-1 rounded mt-2">{generatedLink || 'Locking file to contract...'}</p>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Client perspective - Social Login */}
                {step === 'client-login' && (
                  <motion.div key="client-login" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full justify-center text-center">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-white/[0.02] shadow-inner mx-auto rounded-full flex items-center justify-center mb-4 border border-white/10">
                        <Fingerprint className="w-8 h-8 text-zap-gold" />
                      </div>
                      <h3 className="text-xl font-semibold tracking-tight mb-2">Secure Login Required</h3>
                      <p className="text-xs text-white/50 px-4 leading-relaxed">To unlock this file, please verify your identity. No setup required.</p>
                    </div>
                    <button onClick={handleLogin} className="interactive w-full bg-white text-black hover:bg-white/90 text-sm font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-3">
                       <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                       Continue with Google
                    </button>
                  </motion.div>
                )}

                {/* Step 4: Client perspective - Pay */}
                {step === 'client-pay' && (
                  <motion.div key="client-pay" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full justify-center">
                    <div className="text-center mb-6">
                      <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2">Payment Due</p>
                      <p className="text-5xl font-bold tracking-[-0.04em]">$500.00</p>
                    </div>
                    <div className="bg-[#0A0A0A] rounded-xl p-5 mb-6 border border-white/10 space-y-4">
                      <div className="flex justify-between items-center text-xs font-medium">
                        <span className="text-white/50">Transaction Fee</span>
                        <span className="text-zap-gold bg-zap-gold/10 px-2 py-0.5 rounded text-[10px] uppercase tracking-widest">Sponsored</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-medium border-t border-white/5 pt-3">
                        <span className="text-white/50">Settlement Code</span>
                        <span className="text-white/80 font-mono">0x74a...91f</span>
                      </div>
                    </div>
                    <button onClick={handlePay} className="interactive w-full relative overflow-hidden bg-gradient-to-r from-zap-orange to-zap-red text-white text-sm font-semibold py-4 rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_24px_rgba(255,101,0,0.3)] flex items-center justify-center gap-2">
                      <span className="relative z-10">Pay & Unlock</span>
                    </button>
                  </motion.div>
                )}

                {/* Step 5: Success & Download */}
                {step === 'success' && (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex flex-col items-center justify-center h-full text-center">
                    <motion.div 
                      initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', bounce: 0.5, duration: 1 }}
                      className="w-20 h-20 bg-gradient-to-tr from-zap-gold via-[#FF9040] to-zap-red rounded-full flex items-center justify-center mb-6 shadow-[0_0_60px_rgba(246,206,113,0.5)]"
                    >
                      <Download className="w-8 h-8 text-black" />
                    </motion.div>
                    <h3 className="text-2xl font-bold tracking-tight mb-2 text-white">Access Granted</h3>
                    <p className="text-sm text-white/50 bg-[#0A0A0A] border border-white/5 px-4 py-2 rounded-lg">Funds locked. Source files ready.</p>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
            
            <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center text-[10px] text-white/30 font-bold uppercase tracking-widest">
              <span>Starkzap Kit</span>
              {step === 'creator' ? <span className="text-zap-orange">Creator Stage</span> : <span className="text-zap-gold">Client Stage</span>}
            </div>
          </motion.div>
          
          {/* Mobile warning message for demo widget */}
          <div className="block md:hidden border border-white/10 rounded-xl p-6 text-center bg-white/[0.02]">
            <p className="text-sm text-white/60">View this on a desktop monitor to experience the interactive Starkzap Commerce demo.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
