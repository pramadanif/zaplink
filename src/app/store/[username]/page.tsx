'use client';

import React, { useState, use } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowLeft, ExternalLink, X } from 'lucide-react';
import { CustomCursor } from '@/components/CustomCursor';
import { DynamicBackground } from '@/components/DynamicBackground';
import { UniversalCheckout } from '@/starkzap-commerce-kit/UniversalCheckout';

const MOCK_ZAPS = [
  { id: '1', title: '3D Asset Bundle', price: '1,200', type: 'Design', description: 'High-poly source files for Architectural visualization.' },
  { id: '2', title: 'Frontend Codebase', price: '500', type: 'Code', description: 'Production-ready React & Next.js dashboard template.' },
  { id: '3', title: 'UI/UX Design Master', price: '2,400', type: 'Design', description: 'Full Figma project with 50+ unique screens.' },
  { id: '4', title: 'Consultation Recording', price: '150', type: 'Video', description: '1-hour deep dive into Starknet scaling solutions.' },
];

export default function StorePage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = use(params);
  const [selectedZap, setSelectedZap] = useState<typeof MOCK_ZAPS[0] | null>(null);

  return (
    <main className="relative w-full min-h-screen bg-[#050505] text-white p-6 md:p-12 overflow-x-hidden">
      <CustomCursor />
      <DynamicBackground />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-zap-orange to-zap-red p-0.5">
               <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-bold text-lg">
                 {resolvedParams.username[0].toUpperCase()}
               </div>
             </div>
             <div>
               <h1 className="text-xl font-bold tracking-tight capitalize">{resolvedParams.username.replace('_', ' ')}</h1>
               <p className="text-xs text-white/40 font-medium">Digital Creator • ZapLink Verified</p>
             </div>
          </div>
          <button className="text-xs font-semibold px-4 py-2 border border-white/10 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-2">
            <ExternalLink className="w-3 h-3" /> Share Store
          </button>
        </header>

        {/* Hero */}
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.04em] mb-6 leading-tight">
            Premium Assets. <br/>
            <span className="text-zap-gold">Escrow-Protected Delivery.</span>
          </h2>
          <p className="text-white/50 text-sm md:text-base leading-relaxed">
            All purchases are secured via Starknet smart contracts. Access is granted instantly upon payment verification.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_ZAPS.map((zap) => (
            <motion.div 
              key={zap.id}
              whileHover={{ y: -5 }}
              className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-all flex flex-col group"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] uppercase font-bold tracking-widest text-zap-gold bg-zap-gold/10 px-2 py-1 rounded">
                  {zap.type}
                </span>
                <span className="text-lg font-bold tracking-tight">${zap.price}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-zap-orange transition-colors">{zap.title}</h3>
              <p className="text-xs text-white/40 leading-relaxed flex-1 mb-8">{zap.description}</p>
              
              <button 
                onClick={() => setSelectedZap(zap)}
                className="w-full py-4 bg-white/[0.05] border border-white/10 hover:bg-white text-black font-bold text-sm rounded-2xl transition-all flex items-center justify-center gap-2"
              >
                Buy Now <ShoppingBag className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Checkout Modal Overlay */}
        <AnimatePresence>
          {selectedZap && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedZap(null)}
                className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] cursor-pointer"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed inset-0 m-auto w-fit h-fit z-[110] p-4"
              >
                 <button 
                   onClick={() => setSelectedZap(null)}
                   className="absolute -top-12 right-0 p-2 text-white/40 hover:text-white transition-colors"
                 >
                   <X className="w-8 h-8" />
                 </button>
                 <UniversalCheckout 
                   details={{
                     amount: selectedZap.price,
                     currency: 'USDC',
                     description: selectedZap.title,
                     vendor: resolvedParams.username.replace('_', ' ').toUpperCase()
                   }} 
                 />
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}
