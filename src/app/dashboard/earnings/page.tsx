'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Wallet, History, ArrowDownToLine, Clock, ShieldCheck } from 'lucide-react';

export default function EarningsPage() {
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawn, setWithdrawn] = useState(false);

  const handleWithdraw = () => {
    setIsWithdrawing(true);
    setTimeout(() => {
      setIsWithdrawing(false);
      setWithdrawn(true);
    }, 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white mb-1">Earnings & Withdrawals</h2>
        <p className="text-sm text-white/50">Manage your settled funds directly on Starknet.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-[#0A0A0A] to-[#050505] border border-white/10 rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-zap-orange/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-zap-orange/10 transition-colors duration-1000" />
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-12">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-2">Available for Withdrawal</p>
                <div className="text-5xl font-bold tracking-[-0.04em] flex items-baseline gap-2">
                  <span className="text-white/50 text-3xl">$</span>
                  {withdrawn ? '0.00' : '2,900.00'}
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-zap-gold" />
              </div>
            </div>

            <button 
              onClick={handleWithdraw}
              disabled={withdrawn || isWithdrawing}
              className={`w-full py-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                withdrawn 
                  ? 'bg-white/[0.02] border border-white/5 text-white/30 cursor-not-allowed' 
                  : 'bg-white text-black hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {isWithdrawing ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  Routing via Paymaster...
                </>
              ) : withdrawn ? (
                <>Withdrawal Complete</>
              ) : (
                <>
                  Withdraw to Wallet <ArrowUpRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-6">
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl flex-1 flex flex-col justify-center relative overflow-hidden">
             <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-2">Lifetime Volume</p>
             <p className="text-3xl font-semibold tracking-tight">$14,250.00</p>
             <div className="mt-4 flex items-center gap-2 text-xs font-medium text-green-400 bg-green-400/10 w-fit px-2 py-1 rounded">
               <ArrowUpRight className="w-3 h-3" /> +12.5% this month
             </div>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl flex-1 flex justify-between items-center relative overflow-hidden">
             <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">Network Saved</p>
                <p className="text-xl font-medium tracking-tight text-white/80">$420.55 in Gas</p>
             </div>
             <ShieldCheck className="w-8 h-8 text-zap-orange/20" />
          </div>
        </div>

      </div>

      {/* Transaction History */}
      <div>
        <h3 className="text-sm font-semibold tracking-widest uppercase text-white/80 mb-4 flex items-center gap-2">
          <History className="w-4 h-4 text-white/40" /> Withdrawal History
        </h3>
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden shadow-inner">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-white/40 border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-medium">Transaction Hash</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              
              {withdrawn && (
                <motion.tr 
                  initial={{ opacity: 0, backgroundColor: 'rgba(255,101,0,0.1)' }} animate={{ opacity: 1, backgroundColor: 'transparent' }} 
                  className="hover:bg-white/[0.03] transition-colors text-white/70"
                >
                  <td className="px-6 py-5 font-mono text-zap-gold flex items-center gap-2"><ArrowDownToLine className="w-3.5 h-3.5" /> 0x48f...92a</td>
                  <td className="px-6 py-5 font-medium text-white">$2,900.00</td>
                  <td className="px-6 py-5"><span className="text-green-400 bg-green-400/10 border border-green-400/20 px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider">Settled</span></td>
                  <td className="px-6 py-5 text-xs text-white/40 flex items-center gap-1.5"><Clock className="w-3 h-3" /> Just now</td>
                </motion.tr>
              )}

              <tr className="hover:bg-white/[0.03] transition-colors text-white/70">
                <td className="px-6 py-5 font-mono text-white/80 flex items-center gap-2"><ArrowDownToLine className="w-3.5 h-3.5 text-white/40" /> 0x82a...11b</td>
                <td className="px-6 py-5 font-medium text-white">$1,500.00</td>
                <td className="px-6 py-5"><span className="text-green-400 bg-green-400/10 border border-green-400/20 px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider">Settled</span></td>
                <td className="px-6 py-5 text-xs text-white/40">Apr 02, 2026</td>
              </tr>
              <tr className="hover:bg-white/[0.03] transition-colors text-white/70">
                <td className="px-6 py-5 font-mono text-white/80 flex items-center gap-2"><ArrowDownToLine className="w-3.5 h-3.5 text-white/40" /> 0x11c...74e</td>
                <td className="px-6 py-5 font-medium text-white">$4,000.00</td>
                <td className="px-6 py-5"><span className="text-green-400 bg-green-400/10 border border-green-400/20 px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider">Settled</span></td>
                <td className="px-6 py-5 text-xs text-white/40">Mar 28, 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
