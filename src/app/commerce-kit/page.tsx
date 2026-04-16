'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Code2, Cpu, Zap, Copy, ExternalLink, ArrowRight } from 'lucide-react';
import { CustomCursor } from '@/components/CustomCursor';
import { DynamicBackground } from '@/components/DynamicBackground';
import { UniversalCheckout } from '@/starkzap-commerce-kit/UniversalCheckout';

export default function CommerceKitPage() {
  return (
    <main className="relative w-full min-h-screen bg-[#050505] text-white p-6 md:p-12 pb-32 overflow-x-hidden">
      <CustomCursor />
      <DynamicBackground />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-24">
           <span className="text-[14px] tracking-[0.4em] font-extrabold uppercase">STARKZAP KIT</span>
           <div className="flex gap-4">
             <button className="text-xs font-semibold px-4 py-2 border border-white/10 rounded-full hover:bg-white/5 transition-colors">Documentation</button>
             <button className="text-xs font-semibold px-4 py-2 bg-white text-black rounded-full hover:bg-white/90 transition-colors">Get Started</button>
           </div>
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zap-orange/10 border border-zap-orange/20 rounded-full text-zap-orange text-[10px] uppercase tracking-widest font-bold mb-6">
               Developer Infrastructure v1.0
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-[-0.04em] mb-8 leading-[0.9]">
              The Starknet <br/>
              <span className="text-zap-gold">Commerce Kit.</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed max-w-lg mb-10">
              A high-performance UI library for digital deliverables, micro-escrow, and gasless checkout flows on Starknet. Built by ZapLink. 
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex items-center justify-between group">
                <code className="text-sm font-mono text-white/80">npm install @starkzap/kit</code>
                <Copy className="w-4 h-4 text-white/20 group-hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-zap-gold/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="scale-90 md:scale-100 rotate-2 hover:rotate-0 transition-transform duration-700">
               <UniversalCheckout 
                 details={{
                   amount: '29.00',
                   currency: 'USDC',
                   description: 'Protocol Access Key',
                   vendor: 'STARKZAP DEMO'
                 }} 
               />
            </div>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
           <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
              <Terminal className="w-8 h-8 text-zap-gold mb-6" />
              <h3 className="text-xl font-bold mb-4">Plug & Play UI</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Zero-config payment modals including authentication, status tracking, and escrow settlement triggers.
              </p>
           </div>
           <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
              <Code2 className="w-8 h-8 text-zap-orange mb-6" />
              <h3 className="text-xl font-bold mb-4">Framework Agnostic</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Optimized for Next.js 15 and React 19. Ready to be dropped into any Starknet-enabled codebase.
              </p>
           </div>
           <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
              <Cpu className="w-8 h-8 text-zap-red mb-6" />
              <h3 className="text-xl font-bold mb-4">Gasless Ready</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Internal support for Starkzap Paymasters, allowing your clients to pay with $0 in gas fees.
              </p>
           </div>
        </div>

        {/* Code Example */}
        <section className="bg-black border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
           <div className="px-6 py-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-500/50" />
                 <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                 <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold font-mono">checkout-integration.tsx</span>
           </div>
           <div className="p-8 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre">
              <span className="text-zap-orange">import</span> <span className="text-white">{` { UniversalCheckout } `}</span> <span className="text-zap-orange">from</span> <span className="text-zap-gold">'@starkzap/kit'</span><span className="text-white">;</span><br/><br/>
              <span className="text-zap-orange">export default function</span> <span className="text-white">PaymentPage() {` {`}</span><br/>
              <span className="text-white">  </span><span className="text-zap-orange">return</span><span className="text-white"> (</span><br/>
              <span className="text-white">    &lt;</span><span className="text-zap-gold">UniversalCheckout</span><br/>
              <span className="text-white">      details={`{{`}</span><br/>
              <span className="text-white">        vendor: </span><span className="text-zap-gold">'MY_DAPP'</span><span className="text-white">,</span><br/>
              <span className="text-white">        amount: </span><span className="text-zap-gold">'499.00'</span><span className="text-white">,</span><br/>
              <span className="text-white">        currency: </span><span className="text-zap-gold">'USDC'</span><span className="text-white">,</span><br/>
              <span className="text-white">        description: </span><span className="text-zap-gold">'Premium Feature Access'</span><br/>
              <span className="text-white">      {`}}`}</span><br/>
              <span className="text-white">    /&gt;</span><br/>
              <span className="text-white">  );</span><br/>
              <span className="text-white">{`}`}</span>
           </div>
        </section>

      </div>
    </main>
  );
}
