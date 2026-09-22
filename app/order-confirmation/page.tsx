'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Check } from 'lucide-react';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const { lastOrder } = useCart();
  const queryOrderId = searchParams.get('orderId');
  const orderId = queryOrderId
    ? (queryOrderId.startsWith('#') ? queryOrderId : `#${queryOrderId}`)
    : (lastOrder?.orderId ? `#${lastOrder.orderId}` : '#TZ10284');

  return (
    <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-10 py-16 md:mt-10 flex-1 flex flex-col items-center justify-center text-center space-y-12">
      
      {/* HEADINGS & CHECKMARK */}
      <div className="space-y-10 flex flex-col items-center max-w-xl mx-auto">
        
        <div className="space-y-3">
          <h1 className="font-inter text-3xl sm:text-5xl font-medium tracking-tight uppercase text-white">
            ORDER CONFIRMED.
          </h1>
          <p className="font-inter text-xs sm:text-sm tracking-[0.15em] uppercase text-zinc-300">
            THANK YOU FOR CHOOSING TARZ.
          </p>
        </div>

        {/* Large White Circular Checkmark (160px) */}
        <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full border-4 border-white flex items-center justify-center my-4 shadow-2xl">
          <Check className="w-20 h-20 sm:w-24 sm:h-24 stroke-[3] text-white" />
        </div>

      </div>


      {/* ORDER NUMBER BAR WITH DIVIDER LINE */}
      <div className="w-full max-w-5xl mx-auto border-t border-white/50 pt-8 mt-12 flex justify-between items-center font-inter text-lg sm:text-xl text-white">
        <span className="font-medium">Order number</span>
        <span className="font-medium tracking-wider text-right">{orderId}</span>
      </div>

      {/* RETURN HOME BUTTON */}
      <div className="pt-6">
        <Link
          href="/"
          className="px-10 py-4 border border-white bg-white text-black font-lexend text-xs font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-all shadow-xl"
        >
          CONTINUE SHOPPING
        </Link>
      </div>

    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <div className="bg-black text-white min-h-[85vh] font-inter flex flex-col justify-between selection:bg-white selection:text-black">
      <Suspense fallback={<div className="text-center py-20 text-xs uppercase tracking-widest text-zinc-500">Loading Order Confirmation...</div>}>
        <ConfirmationContent />
      </Suspense>
    </div>
  );
}
