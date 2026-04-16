'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Check, Copy, Code2 } from 'lucide-react';

export const CodeSnippetDemo: React.FC = () => {
  const [copied, setCopied] = React.useState(false);
  const codeString = `import { StarkzapProvider, Paymaster } from '@starkzap/commerce';
import { EscrowComponent } from '@/components/commerce';

export default function Checkout() {
  return (
    <StarkzapProvider
      apiKey={process.env.STARKZAP_API}
      paymaster={Paymaster.SPONSORED}
      wallets={['google', 'apple']}
    >
      <EscrowComponent 
        amount="500" 
        currency="USDC" 
        onSettlement={(id) => unlockFile(id)} 
      />
    </StarkzapProvider>
  );
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 px-4 bg-black/40 relative">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        
        <div className="flex-1 w-full order-2 md:order-1">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-white/10 bg-[#0A0A0A] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative group"
          >
            {/* Syntax Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02] backdrop-blur-md">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-white/20 group-hover:bg-[#FF5F56] transition-colors"></div>
                <div className="w-3 h-3 rounded-full bg-white/20 group-hover:bg-[#FFBD2E] transition-colors delay-75"></div>
                <div className="w-3 h-3 rounded-full bg-white/20 group-hover:bg-[#27C93F] transition-colors delay-100"></div>
              </div>
              <div className="text-[10px] uppercase tracking-widest text-white/40 font-mono">checkout.tsx</div>
              <button onClick={handleCopy} className="text-white/40 hover:text-white transition-colors">
                {copied ? <Check className="w-4 h-4 text-zap-gold" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            
            {/* Syntax Body */}
            <div className="p-6 overflow-x-auto text-sm font-mono leading-relaxed bg-[#050505] selection:bg-white/10">
              <pre className="text-white/70">
                <span className="text-pink-400">import</span> {'{ StarkzapProvider, Paymaster }'} <span className="text-pink-400">from</span> <span className="text-zap-gold">'@starkzap/commerce'</span>;{'\n'}
                <span className="text-pink-400">import</span> {'{ EscrowComponent }'} <span className="text-pink-400">from</span> <span className="text-zap-gold">'@/components/commerce'</span>;{'\n\n'}
                <span className="text-pink-400">export default function</span> <span className="text-blue-400">Checkout</span>() {'{\n'}
                {'  '}<span className="text-pink-400">return</span> ({'\n'}
                {'    '}<span className="text-zinc-300">&lt;</span><span className="text-zap-orange">StarkzapProvider</span>{'\n'}
                {'      '}apiKey=<span className="text-zinc-300">{'{'}</span>process.env.STARKZAP_API<span className="text-zinc-300">{'}'}</span>{'\n'}
                {'      '}paymaster=<span className="text-zinc-300">{'{'}</span>Paymaster.SPONSORED<span className="text-zinc-300">{'}'}</span>{'\n'}
                {'      '}wallets=<span className="text-zinc-300">{'{['}</span><span className="text-zap-gold">'google'</span>, <span className="text-zap-gold">'apple'</span><span className="text-zinc-300">{']}'}</span>{'\n'}
                {'    '}<span className="text-zinc-300">&gt;</span>{'\n'}
                {'      '}<span className="text-zinc-300">&lt;</span><span className="text-zap-orange">EscrowComponent</span>{'\n'}
                {'        '}amount=<span className="text-zap-gold">"500"</span>{'\n'}
                {'        '}currency=<span className="text-zap-gold">"USDC"</span>{'\n'}
                {'        '}onSettlement=<span className="text-zinc-300">{'{'}</span>(id) <span className="text-blue-400">=&gt;</span> unlockFile(id)<span className="text-zinc-300">{'}'}</span>{'\n'}
                {'      '}<span className="text-zinc-300">/&gt;</span>{'\n'}
                {'    '}<span className="text-zinc-300">&lt;/</span><span className="text-zap-orange">StarkzapProvider</span><span className="text-zinc-300">&gt;</span>{'\n'}
                {'  '});{'\n'}
                {'}'}
              </pre>
            </div>
            {/* Glow line at bottom */}
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-zap-orange via-zap-deep-orange to-zap-red opacity-60" />
          </motion.div>
        </div>

        <div className="flex-1 w-full order-1 md:order-2">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zap-red/10 border border-zap-red/20 rounded-full text-zap-red text-xs uppercase tracking-widest font-bold mb-6">
              <Code2 className="w-4 h-4 ml-1" /> The Commerce Kit
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.04em] mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60">
              Ten Lines of Code.<br/>
              <span className="bg-gradient-to-r from-zap-gold via-zap-orange to-zap-red bg-clip-text text-transparent transform scale-105 origin-left inline-block mt-1">Infinite Capabilities.</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8 font-normal">
              Stop building payment infrastructure from scratch. The Starkzap SDK gives you completely gasless checkout, invisible wallets, and social login straight out of the box. 
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-white/5 rounded-xl bg-white/[0.01] hover:bg-white/[0.03] transition-colors shadow-inner">
                <div className="text-2xl font-bold mb-1">0 <span className="text-sm font-medium text-white/40">lines</span></div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Of Cairo needed</div>
              </div>
              <div className="p-4 border border-white/5 rounded-xl bg-zap-gold/5 border-zap-gold/20 hover:bg-zap-gold/10 transition-colors shadow-inner relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-zap-gold/0 to-zap-gold/5 group-hover:to-zap-gold/10 transition-colors" />
                <div className="relative z-10 flex flex-col items-start justify-center h-full">
                  <div className="text-2xl font-bold text-zap-gold mb-1">100%</div>
                  <div className="text-[10px] text-zap-gold/60 uppercase tracking-widest font-bold">Sponsored Gas</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
};
