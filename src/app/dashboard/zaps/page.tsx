'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, MoreHorizontal, ExternalLink, Copy, CheckCircle2 } from 'lucide-react';

const zapsData = [
  { id: 'INV-88X9A1', amount: '1,200.00', status: 'pending', date: 'Today, 14:32', description: '3D Asset Bundle' },
  { id: 'INV-34B2Z9', amount: '500.00', status: 'paid', date: 'Yesterday, 09:12', description: 'Frontend Codebase' },
  { id: 'INV-77C1L4', amount: '2,400.00', status: 'paid', date: 'Apr 12, 16:45', description: 'UI/UX Design Master File' },
  { id: 'INV-11M8P2', amount: '150.00', status: 'cancelled', date: 'Apr 10, 11:00', description: 'Consultation Recording' },
  { id: 'INV-99Y4K4', amount: '8,000.00', status: 'pending', date: 'Apr 08, 10:20', description: 'Full Stack App Deployment' },
];

export default function ZapsPage() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'paid' | 'cancelled'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredZaps = zapsData.filter(zap => filter === 'all' || zap.status === filter);

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(`zaplink.xyz/pay/${id}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white mb-1">Active Zaps</h2>
          <p className="text-sm text-white/50">Manage your generated escrow links.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/[0.02] border border-white/5 p-1 rounded-xl">
            {['all', 'pending', 'paid', 'cancelled'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab as any)}
                className={`text-xs capitalize font-medium px-4 py-2 rounded-lg transition-all ${
                  filter === tab ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 bg-white/[0.02] px-3 py-2 rounded-xl border border-white/5 focus-within:border-white/20 transition-colors">
            <Search className="w-4 h-4 text-white/40" />
            <input type="text" placeholder="Search ID..." className="bg-transparent text-sm w-32 outline-none placeholder-white/30 text-white" />
          </div>
        </div>
      </div>

      {/* Main Grid/Table */}
      <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-white/40 border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-medium">Link ID</th>
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium">Amount (USDC)</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Created Activity</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence>
                {filteredZaps.map((zap) => (
                  <motion.tr 
                    key={zap.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="hover:bg-white/[0.03] transition-colors group text-white/70"
                  >
                    <td className="px-6 py-5 font-mono text-white flex items-center gap-2">
                      {zap.id}
                      <button onClick={() => handleCopy(zap.id)} className="text-white/20 hover:text-white transition-colors cursor-pointer">
                        {copiedId === zap.id ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </td>
                    <td className="px-6 py-5">{zap.description}</td>
                    <td className="px-6 py-5 font-medium text-white">${zap.amount}</td>
                    <td className="px-6 py-5">
                      {zap.status === 'pending' && <span className="text-zap-gold bg-zap-gold/10 border border-zap-gold/20 px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider">Pending</span>}
                      {zap.status === 'paid' && <span className="text-green-400 bg-green-400/10 border border-green-400/20 px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider">Paid</span>}
                      {zap.status === 'cancelled' && <span className="text-white/40 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider">Cancelled</span>}
                    </td>
                    <td className="px-6 py-5 text-xs text-white/40">{zap.date}</td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5"><ExternalLink className="w-4 h-4 text-white/70" /></button>
                        <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5"><MoreHorizontal className="w-4 h-4 text-white/70" /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {filteredZaps.length === 0 && (
            <div className="py-20 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                <Search className="w-8 h-8 text-white/20" />
              </div>
              <p className="text-white/50 text-sm font-medium">No zaps found for this criteria.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
