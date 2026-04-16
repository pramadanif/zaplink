'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Link2, Wallet, Settings, LogOut } from 'lucide-react';
import { motion } from 'motion/react';
import { CustomCursor } from '@/components/CustomCursor';
import { DynamicBackground } from '@/components/DynamicBackground';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Active Zaps', href: '/dashboard/zaps', icon: Link2 },
    { name: 'Earnings', href: '/dashboard/earnings', icon: Wallet },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-zap-bg text-white selection:bg-zap-orange selection:text-white flex overflow-hidden">
      <CustomCursor />
      <DynamicBackground />

      {/* Sidebar Navigation */}
      <nav className="w-64 border-r border-white/5 bg-black/40 backdrop-blur-xl relative z-20 flex flex-col hidden md:flex">
        <div className="p-8">
          <Link href="/" className="text-[14px] tracking-[0.4em] font-extrabold text-[#FFFFFF] uppercase">
            ZAPLINK
          </Link>
        </div>

        <div className="flex-1 px-4 py-8 space-y-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-zap-orange' : ''}`} />
                {link.name}
              </Link>
            );
          })}
        </div>
        
        <div className="p-4 border-t border-white/5">
          <button className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <LogOut className="w-4 h-4" /> Disconnect
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 overflow-y-auto">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-black/20 backdrop-blur-sm sticky top-0 z-30">
          <h1 className="text-sm font-semibold tracking-widest uppercase text-white/80">Creator Dashboard</h1>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-widest text-white/40">Status</div>
              <div className="text-xs font-medium text-zap-gold flex items-center gap-1.5 line-clamp-1">
                <span className="w-1.5 h-1.5 rounded-full bg-zap-gold animate-pulse"></span>
                Connected
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-zap-orange to-zap-red p-0.5">
              <div className="w-full h-full rounded-full bg-[#0A0A0A]" />
            </div>
          </div>
        </header>

        <motion.div 
          className="p-8 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
