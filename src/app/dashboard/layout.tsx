'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Link2, Wallet, Settings, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CustomCursor } from '@/components/CustomCursor';
import { DynamicBackground } from '@/components/DynamicBackground';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

      {/* Sidebar Navigation - Desktop */}
      <nav className="w-64 border-r border-white/5 bg-black/40 backdrop-blur-xl relative z-40 flex flex-col hidden md:flex">
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

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] md:hidden"
            />
            <motion.nav 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-[#050505] border-r border-white/10 z-[70] md:hidden flex flex-col p-8"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-[14px] tracking-[0.4em] font-extrabold text-[#FFFFFF] uppercase">ZAPLINK</span>
                <button onClick={() => setIsMobileMenuOpen(false)}><X className="w-6 h-6" /></button>
              </div>
              <div className="space-y-4">
                {links.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-4 px-4 py-4 rounded-xl text-lg font-medium transition-colors ${pathname === link.href ? 'bg-white/10 text-white' : 'text-white/50'}`}
                  >
                    <link.icon className={`w-5 h-5 ${pathname === link.href ? 'text-zap-orange' : ''}`} />
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 overflow-y-auto">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-6 md:px-8 bg-black/20 backdrop-blur-sm sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 -ml-2 hover:bg-white/5 rounded-lg" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xs font-semibold tracking-widest uppercase text-white/80 line-clamp-1">Creator Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-[10px] uppercase tracking-widest text-white/40">Status</div>
              <div className="text-xs font-medium text-zap-gold flex items-center gap-1.5">
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
          className="p-6 md:p-8 max-w-5xl mx-auto"
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
