'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Link as LinkIcon, DollarSign, FileType2, Search, ArrowRight, Copy, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, Tooltip as RechartsTooltip, XAxis } from 'recharts';

const dummyData = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 900 },
  { name: 'Thu', value: 1200 },
  { name: 'Fri', value: 800 },
  { name: 'Sat', value: 2400 },
  { name: 'Sun', value: 2100 },
];

export default function DashboardPage() {
  const [file, setFile] = useState<File | null>(null);
  const [amount, setAmount] = useState('500.00');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setGeneratedLink('');
    setIsCopied(false);

    // Simulate link generation referencing Starknet logic
    setTimeout(() => {
      setGeneratedLink('zaplink.xyz/pay/INV-77X9A2');
      setIsGenerating(false);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Left Column: Metrics & Graph */}
      <div className="xl:col-span-2 space-y-8">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/[0.02] border border-white/[0.05] p-5 rounded-2xl relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-zap-orange/10 rounded-full blur-2xl pointer-events-none" />
            <div className="text-xs uppercase tracking-widest text-white/40 mb-3">Total Volume</div>
            <div className="text-3xl font-semibold">$14,250.00</div>
          </div>
          <div className="bg-white/[0.02] border border-white/[0.05] p-5 rounded-2xl relative overflow-hidden">
            <div className="text-xs uppercase tracking-widest text-white/40 mb-3">Active Escrows</div>
            <div className="text-3xl font-semibold text-zap-gold">3</div>
          </div>
          <div className="bg-white/[0.02] border border-white/[0.05] p-5 rounded-2xl relative overflow-hidden">
            <div className="text-xs uppercase tracking-widest text-white/40 mb-3">Success Rate</div>
            <div className="text-3xl font-semibold text-green-400">100%</div>
          </div>
        </div>

        {/* Volume Chart */}
        <div className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-semibold tracking-widest uppercase text-white/80">30-Day Revenue</h3>
            <select className="bg-white/5 border border-white/10 text-xs rounded outline-none p-1.5 text-white/70">
              <option>USDC</option>
              <option>STRK</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dummyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6500" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#FF6500" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.1)" fontSize={10} tickMargin={10} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }} 
                  itemStyle={{ color: '#F6CE71' }} 
                />
                <Area type="monotone" dataKey="value" stroke="#FF6500" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Zaps Table */}
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-sm font-semibold tracking-widest uppercase text-white/80">Recent Links</h3>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              <Search className="w-3.5 h-3.5 text-white/40" />
              <input type="text" placeholder="Search ID..." className="bg-transparent text-xs w-24 outline-none placeholder-white/30 text-white" />
            </div>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.02] text-xs uppercase tracking-widest text-white/40">
              <tr>
                <th className="px-6 py-4 font-medium">Link ID</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="hover:bg-white/5 transition-colors group cursor-pointer text-white/70">
                <td className="px-6 py-4 font-mono text-white">INV-88X9A1</td>
                <td className="px-6 py-4">$1,200.00</td>
                <td className="px-6 py-4"><span className="text-zap-gold bg-zap-gold/10 px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider">Pending</span></td>
                <td className="px-6 py-4">Today</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors group cursor-pointer text-white/70">
                <td className="px-6 py-4 font-mono text-white">INV-34B2Z9</td>
                <td className="px-6 py-4">$500.00</td>
                <td className="px-6 py-4"><span className="text-green-400 bg-green-400/10 px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider">Paid</span></td>
                <td className="px-6 py-4">Yesterday</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Column: Creation Form */}
      <div className="xl:col-span-1">
        <div className="bg-[#0A0A0A] border border-white/[0.08] rounded-2xl p-6 shadow-2xl sticky top-28">
          <h2 className="text-lg font-semibold tracking-[-0.02em] mb-2">Create ZapLink</h2>
          <p className="text-xs text-white/50 mb-8 leading-relaxed">
            Upload your deliverable. We'll encrypt it on IPFS and lock the decryption key in the Starknet escrow contract.
          </p>

          <form onSubmit={handleGenerate} className="space-y-6">
            
            {/* File Upload Region */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-semibold text-white/60 mb-2">Deliverable</label>
              <div 
                className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:bg-white/[0.02] hover:border-zap-orange/30 transition-colors cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5 text-zap-orange" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">Click to upload or drag & drop</p>
                  <p className="text-xs text-white/40 mt-1">ZIP, MP4, FIG, PDF (Max 5GB)</p>
                </div>
              </div>
            </div>

            {/* Price Region */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-semibold text-white/60 mb-2">Escrow Price</label>
              <div className="flex items-center justify-between bg-black/60 border border-white/10 rounded-xl p-3 focus-within:border-zap-orange/50 transition-colors">
                <div className="flex items-center gap-2 flex-1">
                  <DollarSign className="w-4 h-4 text-white/40" />
                  <input 
                    type="number" 
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-transparent font-medium text-lg w-full outline-none" 
                    placeholder="0.00"
                  />
                </div>
                <div className="pl-3 border-l border-white/10">
                  <span className="text-xs font-semibold text-zap-gold tracking-widest uppercase">USDC</span>
                </div>
              </div>
            </div>

            {/* Action */}
            <AnimatePresence mode="wait">
              {!generatedLink && !isGenerating ? (
                <motion.button
                  key="generate"
                  type="submit"
                  className="w-full interactive bg-gradient-to-r from-zap-orange to-zap-red text-white py-4 rounded-xl font-semibold text-sm shadow-[0_4px_24px_rgba(255,101,0,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  Encrypt & Lock <ArrowRight className="w-4 h-4" />
                </motion.button>
              ) : isGenerating ? (
                <motion.div
                  key="loading"
                  className="w-full bg-white/5 border border-white/10 py-4 rounded-xl flex items-center justify-center gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="w-4 h-4 border-2 border-zap-orange/30 border-t-zap-orange rounded-full animate-spin" />
                  <span className="text-sm font-medium text-white/70">Deploying to Escrow...</span>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  className="w-full bg-[#050505] border border-green-500/30 py-3 px-4 rounded-xl flex items-center justify-between gap-3 cursor-pointer group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleCopy}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <LinkIcon className="w-4 h-4 text-green-400 shrink-0" />
                    <span className="text-xs font-mono text-white/70 truncate">{generatedLink}</span>
                  </div>
                  {isCopied ? (
                    <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  ) : (
                    <Copy className="w-4 h-4 text-white/40 group-hover:text-white transition-colors shrink-0" />
                  )}
                </motion.div>
              )}
            </AnimatePresence>

          </form>
        </div>
      </div>

    </div>
  );
}
