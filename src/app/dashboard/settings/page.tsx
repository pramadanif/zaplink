'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Wallet, Cog, BellRing, Smartphone, Globe, Shield, User, ArrowRight, Terminal, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-8 max-w-4xl pb-16">
      
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white mb-1">Account & Preferences</h2>
        <p className="text-sm text-white/50">Manage your creator profile and protocol payment settings.</p>
      </div>

      <div className="space-y-6">
        
        {/* Creator Identity */}
        <section className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 relative overflow-hidden shadow-inner">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-white/60" />
            </div>
            <div>
              <h3 className="text-lg font-medium tracking-tight">Public Profile</h3>
              <p className="text-sm text-white/50 leading-relaxed max-w-lg mt-1">
                This information will be visible on your public ZapLink payment pages.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Display Name</label>
                <input type="text" defaultValue="Design Studio XYZ" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-zap-orange/50 outline-none transition-colors" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Store Handle</label>
                <div className="flex items-center bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm group focus-within:border-zap-orange/50 transition-colors">
                  <span className="text-white/30 mr-2">zaplink.xyz/store/</span>
                  <input type="text" defaultValue="design_studio" className="bg-transparent w-full outline-none" />
                  <Link href="/store/design_studio" className="text-zap-gold hover:text-white transition-colors ml-2"><ExternalLink className="w-4 h-4" /></Link>
                </div>
             </div>
          </div>
        </section>

        {/* Wallet & Payouts */}
        <section className="bg-gradient-to-br from-[#0A0A0A] to-[#050505] border border-white/10 rounded-3xl p-8 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-zap-orange/5 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-zap-orange/10 border border-zap-orange/20 flex items-center justify-center shrink-0">
                <Wallet className="w-4 h-4 text-zap-orange" />
              </div>
              <div>
                <h3 className="text-lg font-medium tracking-tight">Settlement Wallet</h3>
                <p className="text-sm text-white/50 leading-relaxed max-w-lg mt-1">
                  Your funds are settled directly into this Starknet address upon client payment.
                </p>
              </div>
            </div>
            
            <div className="bg-[#050505] border border-white/10 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Smartphone className="w-5 h-5 text-white/40" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-white/40">Connected Identity</p>
                  <p className="text-sm font-mono text-white/80">0x048F...91A2 <span className="text-[10px] text-zap-gold bg-zap-gold/10 px-2 py-0.5 rounded ml-2">MAINNET</span></p>
                </div>
              </div>
              <button className="text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg transition-colors">Switch Account</button>
            </div>
          </div>
        </section>

        {/* Global Preferences */}
        <section className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 shadow-inner">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <Cog className="w-4 h-4 text-white/60" />
            </div>
            <div>
              <h3 className="text-lg font-medium tracking-tight">Protocol Preferences</h3>
              <p className="text-sm text-white/50 leading-relaxed max-w-lg mt-1">
                Configure how the Starknet smart contracts should handle your automated payouts.
              </p>
            </div>
          </div>

          <div className="space-y-1 divide-y divide-white/5 border border-white/10 rounded-xl overflow-hidden">
            
            <div className="p-4 bg-[#050505] flex items-center justify-between group">
              <div>
                <p className="text-sm font-medium text-white/90">Default Payout Token</p>
                <p className="text-xs text-white/50 mt-1">Preferred token for escrow settlement.</p>
              </div>
              <select className="bg-white/5 border border-white/10 text-xs rounded-lg outline-none px-3 py-2 text-white/80 cursor-pointer group-hover:bg-white/10 transition-colors">
                <option value="usdc">USDC (Stable)</option>
                <option value="strk">STRK Token</option>
                <option value="eth">Ethereum (ETH)</option>
              </select>
            </div>

            <div className="p-4 bg-[#050505] flex items-center justify-between group">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white/90">Real-time Notifications</p>
                  <BellRing className="w-3.5 h-3.5 text-zap-gold" />
                </div>
                <p className="text-xs text-white/50 mt-1">Get an alert when a client pays your ZapLink.</p>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`w-10 h-6 flex items-center rounded-full border transition-all duration-300 px-1 ${
                  notifications ? 'bg-zap-orange border-zap-orange justify-end' : 'bg-white/5 border-white/10 justify-start'
                }`}
              >
                <div className="w-4 h-4 bg-white rounded-full shadow-lg" />
              </button>
            </div>

            <div className="p-4 bg-[#050505] flex items-center justify-between group">
              <div>
                <p className="text-sm font-medium text-white/90">Regional Settlement</p>
                <p className="text-xs text-white/50 mt-1">Optimize transactions for local timezones.</p>
              </div>
              <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase font-bold tracking-widest">
                <Globe className="w-3 h-3" /> Auto-Detect
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
