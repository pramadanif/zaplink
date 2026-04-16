'use client';

import React, { use } from 'react';
import { CustomCursor } from '@/components/CustomCursor';
import { DynamicBackground } from '@/components/DynamicBackground';
import { UniversalCheckout } from '@/starkzap-commerce-kit/UniversalCheckout';

const getInvoiceDetails = (id: string) => {
  return {
    amount: '1,200.00',
    currency: 'USDC',
    description: '3D Asset Bundle & Source Files',
    vendor: 'Design Studio XYZ',
  };
};

export default function PayPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const details = getInvoiceDetails(resolvedParams.id);

  return (
    <main className="relative w-full min-h-screen bg-zap-bg text-white flex items-center justify-center p-4 overflow-hidden">
      <CustomCursor />
      <DynamicBackground />

      <div className="absolute top-8 left-8 text-[14px] tracking-[0.4em] font-extrabold text-zap-gold uppercase z-20">
        ZAPLINK
      </div>

      <div className="relative z-10 w-full flex justify-center">
        <UniversalCheckout details={details} />
      </div>

      <div className="absolute bottom-8 text-[10px] uppercase tracking-widest text-white/20 z-20 font-bold">
        Secure Escrow Settlement • Starknet Mainnet
      </div>
    </main>
  );
}
