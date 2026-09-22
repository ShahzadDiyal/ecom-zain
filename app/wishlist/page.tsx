'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Trash2, Heart, ArrowLeft } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart, formatPrice } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="bg-black text-white min-h-[75vh] flex flex-col items-center justify-center text-center px-6 space-y-6 font-inter pt-28">
        <div className="w-16 h-16 rounded-full border border-neutral-800 flex items-center justify-center text-red-500 bg-neutral-950">
          <Heart className="w-8 h-8 stroke-[1.5]" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif-display text-3xl sm:text-4xl uppercase tracking-wider">YOUR WISHLIST IS EMPTY</h1>
          <p className="font-lexend text-xs text-neutral-400 tracking-widest uppercase">
            SAVE YOUR FAVORITE TARZ HOODIES & JACKETS HERE
          </p>
        </div>
        <Link
          href="/products"
          className="px-8 py-4 border border-white bg-white text-black font-lexend text-xs font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-all"
        >
          EXPLORE CATALOG
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen font-inter py-12 px-6 lg:px-10 max-w-[1440px] mx-auto space-y-10 pt-28">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/20 pb-6">
        <div className="flex items-center gap-6">
          <Link
            href="/products"
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
            title="Back to Products"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-serif-display text-3xl sm:text-4xl font-bold uppercase tracking-tight">
              MY WISHLIST ({wishlist.length})
            </h1>
            <p className="font-lexend text-[11px] tracking-widest text-zinc-400 mt-1 uppercase">
              SAVED ITEMS READY FOR YOUR CART
            </p>
          </div>
        </div>

        <Link
          href="/products"
          className="font-inter text-xs tracking-wider uppercase text-white hover:underline hidden sm:flex items-center gap-2"
        >
          Continue Shopping <span className="w-5 h-[1.5px] bg-white" />
        </Link>
      </div>

      {/* Wishlist Grid (2 products per row on mobile) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="group border border-white/20 bg-black overflow-hidden flex flex-col hover:border-white transition-all relative"
          >
            <div className="relative w-full h-64 bg-zinc-950 overflow-hidden">
              <Link href={`/products/${product.id}`} className="block w-full h-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <span className="absolute top-3 left-3 bg-black/80 border border-white/30 text-white font-lexend text-[9px] tracking-widest px-2.5 py-0.5 uppercase">
                {product.category}
              </span>

              {/* Remove button */}
              <button
                type="button"
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/80 border border-neutral-800 text-neutral-400 hover:text-red-400 hover:border-red-600 transition-colors z-20"
                title="Remove item"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-4 bg-[#111111] flex flex-col justify-between flex-1 space-y-4">
              <Link href={`/products/${product.id}`} className="block space-y-1">
                <h3 className="font-inter text-xs font-bold uppercase tracking-wider text-white group-hover:underline truncate">
                  {product.name}
                </h3>
                <p className="font-mono text-xs font-extrabold text-white">
                  {formatPrice(product.price)}
                </p>
              </Link>

              <div className="pt-2 border-t border-white/10 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className="w-full py-2.5 border border-white bg-white text-black font-lexend text-[10px] font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> ADD TO BAG
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
