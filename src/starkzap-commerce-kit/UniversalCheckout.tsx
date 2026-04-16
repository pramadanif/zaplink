'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Fingerprint, CheckCircle2, ShieldCheck, Download, Lock } from 'lucide-react';
import { ConfettiPayoff } from './ConfettiPayoff';

interface CheckoutDetails {
  amount: string;
  currency: string;
  description: string;
  vendor: string;
}

interface UniversalCheckoutProps {
  details: CheckoutDetails;
  onSuccess?: () => void;
}

export const UniversalCheckout: React.FC<UniversalCheckoutProps> = ({ details, onSuccess }) => {
  const [step, setStep] = useState<'login' | 'pay' | 'processing' | 'success'>('login');

  const handleLogin = () => {
    setStep('login'); 
    setTimeout(() => setStep('pay'), 1000);
  };

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      if (onSuccess) onSuccess();
    }, 2500);
  };

  return (
    <div className="w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
      {/* Aesthetic Glow */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-zap-orange/20 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative z-10 text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 mb-4">
          <Lock className="w-5 h-5 text-zap-gold" />
        </div>
        <h1 className="text-sm uppercase tracking-widest text-white/50 mb-1">{details.vendor}</h1>
        <p className="text-xl font-medium tracking-tight">{details.description}</p>
      </div>

      <div className="relative min-h-[300px] flex flex-col">
        <AnimatePresence mode="wait">
          
          {/* Step 1: Secure Auth */}
          {step === 'login' && (
            <motion.div 
              key="login" 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} 
              className="flex flex-col flex-1 items-center justify-center text-center py-4"
            >
              <div className="w-16 h-16 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center mb-6">
                <Fingerprint className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg mb-2 font-semibold font-sans">Verify Identity</h3>
              <p className="text-sm text-white/40 mb-8 max-w-xs">One-click secure authentication. No setup required.</p>
              <button 
                onClick={handleLogin}
                className="w-full bg-white text-black font-semibold py-4 rounded-xl flex items-center justify-center gap-3 active:scale-95 transition-transform"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="G" />
                Continue with Google
              </button>
            </motion.div>
          )}

          {/* Step 2: Payment Confirmation */}
          {step === 'pay' && (
            <motion.div 
              key="pay" 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} 
              className="flex flex-col flex-1"
            >
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-6">
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Total Amount</div>
                <div className="text-4xl font-bold tracking-tight">
                  ${details.amount} <span className="text-sm text-white/30 font-medium">{details.currency}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/40 font-sans">Processing Fee</span>
                  <span className="text-zap-gold bg-zap-gold/10 px-2 py-0.5 rounded text-[10px] font-bold">FREE</span>
                </div>
                <div className="flex justify-between items-center text-sm font-sans">
                  <span className="text-white/40">Secure Delivery</span>
                  <span className="text-zap-gold bg-zap-gold/10 px-2 py-0.5 rounded text-[10px] font-bold">INSTANT</span>
                </div>
              </div>

              <button 
                onClick={handlePay}
                className="w-full mt-auto bg-gradient-to-r from-zap-orange to-zap-red text-white font-bold py-4 rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all"
              >
                Complete Purchase
              </button>
            </motion.div>
          )}

          {/* Step 3: Processing */}
          {step === 'processing' && (
            <motion.div 
              key="processing" 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} 
              className="flex flex-col flex-1 items-center justify-center text-center"
            >
              <div className="w-16 h-16 relative flex items-center justify-center mb-6">
                <div className="absolute inset-0 border-2 border-zap-orange/20 border-t-zap-orange rounded-full animate-spin" />
                <ShieldCheck className="w-6 h-6 text-zap-orange" />
              </div>
              <h3 className="text-lg font-medium mb-2 font-sans">Securing Delivery...</h3>
              <p className="text-sm text-white/40 font-sans">Finalizing the protection layer.</p>
            </motion.div>
          )}

          {/* Step 4: Success */}
          {step === 'success' && (
            <motion.div 
              key="success" 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} 
              className="flex flex-col flex-1 items-center justify-center text-center relative"
            >
              <ConfettiPayoff />
              <div className="w-20 h-20 bg-gradient-to-tr from-zap-gold to-zap-red rounded-full flex items-center justify-center mb-6 shadow-2xl relative z-10">
                <Download className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Access Granted</h3>
              <p className="text-sm text-white/50 mb-8 max-w-[220px] font-sans">Funds verified. Your protected files are now available.</p>
              
              <button className="w-full py-4 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold hover:bg-white/10 transition-colors">
                Download Deliverable
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <div className="mt-8 pt-4 border-t border-white/5 text-center">
        <p className="text-[10px] uppercase tracking-widest text-white/20 flex items-center justify-center gap-2 font-bold">
          <CheckCircle2 className="w-3 h-3 text-zap-gold" /> Secured via ZapLink Infrastructure
        </p>
      </div>
    </div>
  );
};
