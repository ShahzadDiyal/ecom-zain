'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { CATEGORIES as STATIC_CATEGORIES, PRODUCTS as STATIC_PRODUCTS } from '@/data/products';
import { getProducts } from '@/lib/services/productService';
import { getCategories } from '@/lib/services/categoryService';
import { Product } from '@/types/ecommerce';
import { useCart } from '@/context/CartContext';
import { Search, ShoppingBag, Heart } from 'lucide-react';

export default function ProductsPage() {
  const { addToCart, formatPrice, toggleWishlist, isInWishlist } = useCart();
  const [products, setProducts] = useState<Product[]>(STATIC_PRODUCTS);
  const [categoryPills, setCategoryPills] = useState<string[]>(STATIC_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    async function loadData() {
      try {
        const [fetchedProducts, fetchedCategories] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        if (fetchedProducts && fetchedProducts.length > 0) {
          setProducts(fetchedProducts);
        }
        if (fetchedCategories && fetchedCategories.length > 0) {
          const names = ["All", ...fetchedCategories.map((c) => c.name)];
          // Unique category names
          const uniqueNames = Array.from(new Set(names));
          setCategoryPills(uniqueNames);
        }
      } catch (e) {
        console.error("Failed to load catalog from Firestore:", e);
      }
    }
    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (product.description || "").toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="bg-black text-white min-h-screen font-inter py-10 px-6 lg:px-10 max-w-[1440px] mx-auto space-y-12">
      
      {/* Title & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/20 pb-6 mt-10">
        <div>
          <h1 className="font-serif-display text-3xl sm:text-5xl font-bold uppercase tracking-tight">
            TARZ COLLECTION
          </h1>
          <p className="font-lexend text-[11px] tracking-widest text-zinc-400 mt-1 uppercase">
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
            className="w-full pl-11 pr-4 py-2.5 bg-zinc-950 border border-white/30 text-xs font-lexend tracking-wider text-white placeholder-zinc-500 focus:outline-none focus:border-white uppercase"
          />
        </div>
      </div>

      {/* Dynamic Category Pills */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        {categoryPills.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2.5 font-lexend text-xs tracking-widest uppercase transition-all whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-white text-black font-bold'
                : 'bg-zinc-950 border border-white/20 text-zinc-400 hover:text-white hover:border-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Compact Product Grid (2 products per row on mobile) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {filteredProducts.map((product) => {
          const wished = isInWishlist(product.id);
          return (
            <div
              key={product.id}
              className="group border border-white/20 bg-black overflow-hidden flex flex-col hover:border-white transition-all relative"
            >
              {/* Image Box with reduced height */}
              <div className="relative w-full h-60 bg-zinc-950 overflow-hidden">
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

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(product);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-full border transition-all z-20 ${
                    wished
                      ? 'bg-red-600 border-red-600 text-white fill-white'
                      : 'bg-black/70 border-white/30 text-white hover:bg-white hover:text-black'
                  }`}
                  title={wished ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-3.5 h-3.5 ${wished ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* Compact Body Content */}
              <div className="p-4 bg-[#111111] flex flex-col justify-between flex-1 space-y-3">
                <Link href={`/products/${product.id}`} className="block space-y-1">
                  <h3 className="font-inter text-xs font-bold uppercase tracking-wider text-white group-hover:underline truncate">
                    {product.name}
                  </h3>
                  <p className="font-inter text-[11px] text-zinc-400 line-clamp-1 uppercase">
                    {product.description}
                  </p>
                </Link>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-white/10">
                  <Link href={`/products/${product.id}`}>
                    <span className="font-inter text-xs font-extrabold text-white hover:underline">
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
                    className="w-full sm:w-auto px-3 py-1.5 border border-white font-lexend text-[10px] font-semibold tracking-widest uppercase text-white hover:bg-white hover:text-black transition-all flex items-center justify-center gap-1.5 relative z-10"
                  >
                    <ShoppingBag className="w-3 h-3" /> ADD
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
