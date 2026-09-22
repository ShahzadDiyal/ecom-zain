'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, subtotal, shippingFee, total, formatPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="bg-black text-white mt-10  min-h-[70vh] mt-10 flex flex-col items-center justify-center text-center px-6 space-y-6 font-inter">
        <h2 className="font-serif-display text-4xl font-extrabold uppercase">YOUR BAG IS EMPTY</h2>
        <p className="font-lexend text-xs tracking-widest text-zinc-400 uppercase">
          Explore our winter hoodies & essential jacket collection.
        </p>
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
    <div className="bg-black mt-10  text-white min-h-screen font-inter selection:bg-white selection:text-black">

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10 space-y-12 mt-10 ">

        {/* HEADER ROW */}
        <div className="flex justify-between items-center border-b border-white/10 pb-6">
          <div className="flex items-center gap-6">
            <Link
              href="/products"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
              title="Back"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2]" />
            </Link>
            <h1 className="font-inter text-2xl sm:text-3xl font-medium tracking-tight uppercase text-white">
              YOUR BAG
            </h1>
          </div>

          <Link
            href="/products"
            className="font-inter text-xs tracking-wider uppercase text-white hover:underline flex items-center gap-2"
          >
            View All <span className="w-5 h-[1.5px] bg-white" />
          </Link>
        </div>


        {/* BAG ITEMS LIST */}
        <div className="space-y-0 divide-y divide-white/20">
          {cart.map(({ product, quantity, selectedColor, selectedSize }) => (
            <div
              key={`${product.id}-${selectedSize || 'M'}-${selectedColor || 'Burgundy'}`}
              className="py-10 grid grid-cols-1 sm:grid-cols-12 gap-8 items-center"
            >

              {/* Product Thumbnail (3 Cols) */}
              <div className="sm:col-span-3 lg:col-span-2">
                <div className="aspect-[217/240] w-full max-w-[217px] bg-zinc-950 border border-white/10 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              {/* Details & Controls (9 Cols) */}
              <div className="sm:col-span-9 lg:col-span-10 flex flex-col justify-between space-y-8">

                {/* Title & Price */}
                <div className="flex justify-between items-start">
                  <div className="space-y-4">
                    <h3 className="font-inter text-lg sm:text-xl font-medium uppercase text-white tracking-wider">
                      {product.name}
                    </h3>

                    <div className="space-y-2 font-inter text-sm text-zinc-300">
                      <div className="flex items-center gap-3">
                        <span className="text-white/70">Color</span>
                        <span className="font-medium text-white">{selectedColor || 'Burgundy'}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-white/70">Size</span>
                        <span className="font-medium text-white">{selectedSize || 'M'}</span>
                      </div>
                    </div>
                  </div>

                  <p className="font-inter text-lg sm:text-xl font-medium uppercase text-white tracking-wider">
                    {formatPrice(product.price)}
                  </p>
                </div>

                {/* Quantity & Remove Row */}
                <div className="flex justify-between items-center pt-2">

                  {/* Quantity Control Circles */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="w-8 h-8 rounded-full border border-white flex items-center justify-center font-inter text-lg text-white hover:bg-white hover:text-black transition-colors"
                      title="Decrease"
                    >
                      -
                    </button>

                    <span className="w-8 h-8 rounded-full bg-white text-black font-inter text-sm font-bold flex items-center justify-center">
                      {quantity}
                    </span>

                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="w-8 h-8 rounded-full border border-white flex items-center justify-center font-inter text-lg text-white hover:bg-white hover:text-black transition-colors"
                      title="Increase"
                    >
                      +
                    </button>
                  </div>

                  {/* Red REMOVE Button */}
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="font-inter text-sm font-semibold uppercase text-[#FF0000] hover:underline tracking-wider"
                  >
                    REMOVE
                  </button>

                </div>

              </div>

            </div>
          ))}
        </div>


        {/* ORDER SUMMARY SECTION */}
        <div className="pt-12 border-t border-white/20 space-y-8">

          <div className="space-y-2">
            <h2 className="font-inter text-2xl font-semibold capitalize text-white">
              Order summary
            </h2>
            <h3 className="font-inter text-2xl font-medium capitalize text-white">
              YOUR ORDER
            </h3>
          </div>

          <div className="max-w-[1440px] space-y-4 font-inter text-base text-white">
            <div className="flex justify-between items-center py-1">
              <span>Subtotal</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span>Shipping</span>
              <span className="font-medium">
                {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
              </span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span>Total</span>
              <span className="font-medium">{formatPrice(total)}</span>
            </div>
          </div>

          <div className="pt-4">
            <Link
              href="/checkout"
              className="w-full border border-white py-5 px-8 flex items-center justify-center gap-4 font-lexend text-sm sm:text-base font-normal uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all"
            >
              PROCEED TO CHECKOUT <span className="w-6 h-[2px] bg-current" />
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
