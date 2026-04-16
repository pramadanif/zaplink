'use client';

import React, { useState, useEffect, use } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Fingerprint, CheckCircle2, ShieldCheck, Download, Lock } from 'lucide-react';
import { CustomCursor } from '@/components/CustomCursor';
import { DynamicBackground } from '@/components/DynamicBackground';

// Simulating database lookup for the invoice
const getInvoiceDetails = (id: string) => {
  return {
    amount: '1,200.00',
    currency: 'USDC',
    description: '3D Asset Bundle & Source Files',
    vendor: 'Design Studio XYZ',
  };
};

export default function PayPage({ params }: { params: Promise<{ id: string }> }) {
  // Use React.use to unwrap params correctly for Next.js 15+ App Router
  const resolvedParams = use(params);
  
  const [step, setStep] = useState<'login' | 'pay' | 'processing' | 'success'>('login');
  const details = getInvoiceDetails(resolvedParams.id);

  const handleLogin = () => {
    // Simulate background wallet generation
    setStep('login'); 
    setTimeout(() => {
      setStep('pay');
    }, 1200);
  };

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 2800);
  };

  return (
    <main className="relative w-full min-h-screen bg-zap-bg text-white flex items-center justify-center p-4">
      <CustomCursor />
      <DynamicBackground />

      <div className="absolute top-8 left-8 text-[14px] tracking-[0.4em] font-extrabold text-zap-gold uppercase">
        ZAPLINK
      </div>

      {/* Main Glassmorphic Panel */}
      <motion.div 
        className="w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-10"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Aesthetic Glow */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-zap-orange/20 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10 text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 mb-4">
            <Lock className="w-5 h-5 text-zap-gold" />
          </div>
          <h1 className="text-sm uppercase tracking-widest text-white/50 mb-1">{details.vendor}</h1>
          <p className="text-xl font-medium tracking-tight">{details.description}</p>
        </div>

        <div className="relative h-[300px]">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Login */}
            {step === 'login' && (
              <motion.div 
                key="login" 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }} 
                className="flex flex-col h-full items-center justify-center"
              >
                <div className="w-20 h-20 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center mb-6">
                  <Fingerprint className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-lg mb-2 font-semibold tracking-tight">Secure Authentication</h3>
                <p className="text-sm text-white/40 text-center px-4 mb-8 leading-relaxed">
                  To securely unlock this payload, please verify your identity. No setup required.
                </p>
                <button 
                  onClick={handleLogin}
                  className="w-full interactive bg-white text-black hover:bg-white/90 font-semibold py-4 rounded-xl flex items-center justify-center gap-3 transition-colors"
                >
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                  Continue with Google
                </button>
              </motion.div>
            )}

            {/* Step 2: Payment Confirmation */}
            {step === 'pay' && (
              <motion.div 
                key="pay" 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }} 
                className="flex flex-col h-full"
              >
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6 mb-6">
                  <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Total Due</div>
                  <div className="text-4xl font-semibold tracking-[-0.02em] flex items-baseline gap-2">
                    ${details.amount} <span className="text-sm text-white/40 font-normal">{details.currency}</span>
                  </div>
                </div>

                <div className="space-y-4 flex-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/50">Platform Fee</span>
                    <span className="text-zap-gold bg-zap-gold/10 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold">Sponsored</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/50">Network Processing</span>
                    <span className="text-zap-gold bg-zap-gold/10 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold">Zero Fee</span>
                  </div>
                </div>

                <button 
                  onClick={handlePay}
                  className="w-full mt-auto interactive bg-gradient-to-r from-zap-orange to-zap-red text-white font-semibold py-4 rounded-xl shadow-[0_4px_24px_rgba(255,101,0,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                  Confirm & Unlock
                </button>
              </motion.div>
            )}

            {/* Step 3: Processing (Starkzap Paymaster wrapping) */}
            {step === 'processing' && (
              <motion.div 
                key="processing" 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.95 }} 
                className="flex flex-col h-full items-center justify-center text-center"
              >
                <div className="w-16 h-16 relative flex items-center justify-center mb-6">
                  <div className="absolute inset-0 border-2 border-zap-orange/20 border-t-zap-orange rounded-full animate-spin" />
                  <ShieldCheck className="w-6 h-6 text-zap-orange absolute" />
                </div>
                <h3 className="text-lg font-medium mb-2">Securing Escrow...</h3>
                <p className="text-sm text-white/40 max-w-[200px] leading-relaxed">
                  Executing gasless settlement via Starkzap network.
                </p>
              </motion.div>
            )}

            {/* Step 4: Success & Payoff */}
            {step === 'success' && (
              <motion.div 
                key="success" 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.95 }} 
                className="flex flex-col h-full items-center justify-center text-center"
              >
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }} 
                  animate={{ scale: 1, rotate: 0 }} 
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="w-20 h-20 bg-gradient-to-tr from-zap-gold via-[#FF9040] to-zap-red rounded-full flex items-center justify-center mb-6 shadow-[0_0_60px_rgba(246,206,113,0.5)]"
                >
                  <Download className="w-8 h-8 text-black" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2 tracking-tight">Access Granted</h3>
                <p className="text-sm text-white/50 mb-8 max-w-[220px]">
                  Funds locked in escrow. Your source files are now available.
                </p>
                
                <button className="w-full py-4 bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                  Download Archive <span className="text-[10px] text-white/40 uppercase tracking-widest bg-black/50 px-2 py-0.5 rounded ml-2">2.4 GB</span>
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        <div className="mt-8 pt-4 border-t border-white/[0.05] text-center">
          <p className="text-[10px] uppercase tracking-widest text-white/30 flex items-center justify-center gap-2">
            <ShieldCheck className="w-3 h-3" /> Powered by ZapLink & Starkzap
          </p>
        </div>
      </motion.div>
    </main>
  );
}
