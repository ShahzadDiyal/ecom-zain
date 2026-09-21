'use client';

import React from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Heart, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full bg-transparent border-none">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
        
        {/* Left Icons */}
        <div className="flex items-center gap-6">
          <Link href="/products" className="text-white hover:opacity-80 transition-opacity" title="Search">
            <Search className="w-5 h-5 stroke-[1.75]" />
          </Link>
          <Link href="/checkout" className="text-white hover:opacity-80 transition-opacity" title="Account">
            <User className="w-5 h-5 stroke-[1.75]" />
          </Link>
        </div>

        {/* Center TARZ Logo */}
        <Link href="/" className="group flex flex-col items-center">
          <span className="font-serif-display text-3xl sm:text-4xl font-extrabold tracking-[0.25em] text-white uppercase group-hover:opacity-90 transition-opacity">
            TARZ
          </span>
        </Link>

        {/* Right Action Icons */}
        <div className="flex items-center gap-6">
          <Link href="/cart" className="relative text-white hover:opacity-80 transition-opacity" title="Cart">
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-white text-black font-lexend text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <Link href="/products" className="text-white hover:opacity-80 transition-opacity" title="Wishlist">
            <Heart className="w-5 h-5 stroke-[1.75]" />
          </Link>
        </div>

      </div>
    </header>
  );
}
