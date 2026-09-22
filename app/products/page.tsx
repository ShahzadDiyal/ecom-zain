'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Search, ShoppingBag } from 'lucide-react';

export default function ProductsPage() {
  const { addToCart, formatPrice } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-black text-white min-h-screen font-inter py-12 px-6 lg:px-10 max-w-[1440px] mx-auto space-y-20">
      
      {/* Title & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/20 pb-8">
        <div>
          <h1 className="font-serif-display text-4xl sm:text-6xl font-bold uppercase tracking-tight">
            TARZ COLLECTION
          </h1>
          <p className="font-lexend text-xs tracking-widest text-zinc-400 mt-2 uppercase">
            Built for cold days. Designed for everywhere.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="SEARCH HOODIES & JACKETS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-zinc-950 border border-white/30 text-xs font-lexend tracking-wider text-white placeholder-zinc-500 focus:outline-none focus:border-white uppercase"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-3 font-lexend text-xs tracking-widest uppercase transition-all whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-white text-black font-bold'
                : 'bg-zinc-950 border border-white/20 text-zinc-400 hover:text-white hover:border-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group border border-white/30 bg-black overflow-hidden flex flex-col hover:border-white transition-all relative"
          >
            <Link href={`/products/${product.id}`} className="relative block aspect-3/4 overflow-hidden bg-zinc-900">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-black/80 border border-white/30 text-white font-lexend text-[10px] tracking-widest px-3 py-1 uppercase">
                {product.category}
              </span>
            </Link>

            <div className="p-5 bg-[#111111] flex flex-col justify-between flex-1 space-y-4">
              <Link href={`/products/${product.id}`} className="block space-y-2">
                <h3 className="font-inter text-sm font-bold uppercase tracking-wider text-white group-hover:underline">
                  {product.name}
                </h3>
                <p className="font-inter text-xs text-zinc-400 line-clamp-2 uppercase">
                  {product.description}
                </p>
              </Link>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <Link href={`/products/${product.id}`}>
                  <span className="font-inter text-sm font-extrabold text-white hover:underline">
                    {formatPrice(product.price)}
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className="px-4 py-2 border border-white font-lexend text-[11px] font-semibold tracking-widest uppercase text-white hover:bg-white hover:text-black transition-all flex items-center gap-2 relative z-10"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> ADD
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
