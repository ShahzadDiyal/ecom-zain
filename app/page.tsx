'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { getProducts } from '@/lib/services/productService';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types/ecommerce';
import { ShoppingBag, ShieldCheck, Truck, RotateCcw, Award, Lock, Sparkles, Heart } from 'lucide-react';

export default function HomePage() {
  const { addToCart, formatPrice, toggleWishlist, isInWishlist } = useCart();
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [currentFeaturedSlide, setCurrentFeaturedSlide] = useState(0);
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);

  React.useEffect(() => {
    async function loadData() {
      try {
        const fetched = await getProducts();
        if (fetched && fetched.length > 0) {
          setProductsList(fetched);
        }
      } catch (e) {
        console.error("Failed to fetch home products:", e);
      }
    }
    loadData();
  }, []);

  const featuredSlides = React.useMemo(() => {
    const featuredProds = productsList.filter((p) => p.isFeatured);
    const list = [...featuredProds];
    for (const p of productsList) {
      if (list.length >= 3) break;
      if (!list.some((item) => item.id === p.id)) {
        list.push(p);
      }
    }
    const items = list.slice(0, 3);
    return items.map((prod, index) => ({
      number: `0${index + 1}`,
      title: prod.name,
      subtitle: prod.tagline || prod.description || 'THE MOUNTAIN + MOON EMBROIDERY MAKES “ALPINE” A STRONG FIT.',
      price: prod.price,
      auraColor: index === 0 ? '#B88884' : index === 1 ? '#1C0C0E' : '#4A2E2B',
      image: prod.image || '/images/featured-img.png',
      product: prod,
    }));
  }, [productsList]);

  const activeIndex = currentFeaturedSlide < featuredSlides.length ? currentFeaturedSlide : 0;
  const activeSlide = featuredSlides[activeIndex] || {
    number: '01',
    title: 'TARZ Alpine Hoodie',
    subtitle: 'THE MOUNTAIN + MOON EMBROIDERY MAKES “ALPINE” A STRONG FIT.',
    price: 6490,
    auraColor: '#B88884',
    image: '/images/featured-img.png',
    product: PRODUCTS[0],
  };

  const bestSellers = productsList.slice(0, 4);
  const newArrivals = productsList.slice(0, 4);

  const instagramImages = [
    'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80',
    'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80',
    'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&q=80'
  ];

  return (
    <div className="bg-black text-white min-h-screen font-inter selection:bg-white selection:text-black overflow-x-hidden">

      {/* 1. HERO BANNER - FULLSCREEN OVERLAY WITH TRANSPARENT NAVBAR */}
      <section className="relative w-full h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">

        {/* Fullscreen Hero Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/hero-img.png"
            alt="TARZ 77C3 Winter Collection"
            className="w-full h-full object-cover object-center brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/80" />
        </div>

        {/* Hero Center Overlay Content */}
        <div className="relative z-10 max-w-5xl mx-auto space-y-4 sm:space-y-6 pt-16">

          {/* Badge: —— 77C3 COLLECTION —— */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 md:mb-20">
            <div className="w-8 sm:w-16 h-[1.5px] bg-white" />
            <span className="font-lexend text-[11px] sm:text-[16px] tracking-[0.2em] sm:tracking-[0.25em] font-medium text-white uppercase">
              77C3 COLLECTION
            </span>
            <div className="w-8 sm:w-16 h-[1.5px] bg-white" />
          </div>

          {/* Headline: WINTER, REDEFINED. */}
          <h1 className="font-kumar text-[30px] sm:text-[60px] lg:text-[80px] tracking-tight leading-none text-white drop-shadow-2xl">
            WINTER, REDEFINED.
          </h1>

          {/* Subtitle: BUILT FOR COLD DAYS. DESIGNED FOR EVERYWHERE. */}
          <div className="font-lexend text-[13px] sm:text-[24px] uppercase text-white leading-relaxed max-w-xl mx-auto font-normal space-y-1">
            <p>BUILT FOR COLD DAYS.</p>
            <p>DESIGNED FOR EVERYWHERE.</p>
          </div>

          {/* CTA Button: SHOP HOODIES ——> */}
          <div className="pt-2 sm:pt-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 border border-white bg-black/30 backdrop-blur-xs text-white font-lexend text-[11px] sm:text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all group shadow-2xl"
            >
              SHOP HOODIES
              <span className="w-5 h-[1.5px] bg-current transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>

      </section>


      {/* 2. PERKS BAR (2 products/items per row on mobile) */}
      <section className="border-b border-white/50 bg-black py-8 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">

          <div className="flex items-center gap-3 sm:gap-6">
            <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[1.5] shrink-0" />
            <div className="space-y-0.5">
              <h4 className="font-inter text-xs sm:text-base font-normal tracking-wide text-white uppercase">PREMIUM QUALITY</h4>
              <p className="font-inter text-[11px] sm:text-base text-zinc-400 font-normal">Top-tier materials</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[1.5] shrink-0" />
            <div className="space-y-0.5">
              <h4 className="font-inter text-xs sm:text-base font-normal tracking-wide text-white uppercase">WORLDWIDE SHIPPING</h4>
              <p className="font-inter text-[11px] sm:text-base text-zinc-400 font-normal">Fast & secure delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[1.5] shrink-0" />
            <div className="space-y-0.5">
              <h4 className="font-inter text-xs sm:text-base font-normal tracking-wide text-white uppercase">SECURE PAYMENT</h4>
              <p className="font-inter text-[11px] sm:text-base text-zinc-400 font-normal">100% protected</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[1.5] shrink-0" />
            <div className="space-y-0.5">
              <h4 className="font-inter text-xs sm:text-base font-normal tracking-wide text-white uppercase">EASY RETURN</h4>
              <p className="font-inter text-[11px] sm:text-base text-zinc-400 font-normal">14-day returns</p>
            </div>
          </div>

        </div>
      </section>


      {/* 3. FEATURED COLLECTION SECTION */}
      <section className="relative py-12 sm:py-20 overflow-hidden">

        {/* Thin Diagonal Gradient Beam */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-40%] left-[45%] w-[330px] h-[180%] rotate-[-120deg] bg-gradient-to-r from-transparent via-white to-transparent blur-[18px] opacity-10" />
        </div>

        {/* Dynamic Header Row */}
        <div className="relative z-10 flex justify-between items-center pb-6 px-6 lg:px-10 max-w-[1440px] mx-auto">
          <h2 className="font-inter text-xl sm:text-3xl font-medium tracking-tight uppercase text-white">
            FEATURED COLLECTION
          </h2>
          <Link href="/products" className="font-inter text-xs tracking-wider uppercase text-white hover:underline flex items-center gap-2">
            View All <span className="w-5 h-[1.5px] bg-white" />
          </Link>
        </div>

        {/* Diamond Carousel Indicators */}
        <div className="relative z-10 flex justify-center items-center gap-3 mt-2 sm:mt-4">
          {featuredSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentFeaturedSlide(idx)}
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rotate-45 transition-all ${activeIndex === idx ? 'bg-white shadow-lg scale-110' : 'bg-white/50 hover:bg-white'
                }`}
              title={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Showcase Area */}
        <div className="relative min-h-[520px] sm:min-h-[660px] mt-6 sm:mt-12">

          {/* Watermark + Top Number Indicator */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
            <div className="absolute top-0 right-0 z-20 flex items-center gap-4 px-6 lg:px-10">
              <div className="w-8 sm:w-12 h-[1.5px] bg-white" />
              <span className="font-lexend text-xs tracking-widest text-white font-medium">
                {activeSlide.number}
              </span>
              <div className="w-24 sm:w-56 h-[1.5px] bg-white" />
            </div>

            <div className="absolute top-12 sm:top-16 left-1/2 -translate-x-1/2 w-screen flex justify-center overflow-hidden">
              <span className="font-serif-display text-[60px] sm:text-[140px] lg:text-[190px] xl:text-[170px] font-bold whitespace-nowrap leading-none text-white opacity-5">
                {activeSlide.title}
              </span>
            </div>
          </div>

          {/* Main Grid: Left Image, Right Specs */}
          <div className="relative z-10 w-full min-h-[520px] sm:min-h-[660px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center px-6 lg:px-10 max-w-[1440px] mx-auto">

            {/* Left Model Image Container */}
            <div className="lg:col-span-7 relative flex justify-center">
              <div className="relative w-[280px] sm:w-[430px] lg:w-[580px] h-[360px] sm:h-[520px] lg:h-[700px]">
                <img
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[360px] sm:h-[560px] lg:h-[680px] object-cover object-top filter brightness-95 transition-all duration-500 z-10"
                />
              </div>
            </div>

            {/* Right Product Details */}
            <div className="lg:col-span-5 mt-4 sm:mt-6 lg:mt-[200px] z-10">
              <div className="space-y-3 sm:space-y-4">
                <h3 className="font-inter text-2xl sm:text-[32px] font-semibold uppercase tracking-tight text-white underline underline-offset-8">
                  {activeSlide.title}
                </h3>

                <p className="font-inter text-xs sm:text-[16px] font-medium uppercase tracking-wider text-white leading-relaxed max-w-md">
                  {activeSlide.subtitle}
                </p>

                <p className="font-inter text-2xl sm:text-[40px] font-bold uppercase tracking-tight text-white pt-2">
                  {formatPrice(activeSlide.price)}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => addToCart(activeSlide.product)}
                  className="w-full sm:w-[225px] py-3.5 sm:py-4 border border-white text-white font-lexend text-xs font-normal tracking-[0.15em] uppercase hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 bg-black/40 backdrop-blur-xs"
                >
                  Add To Cart
                  <span className="w-6 h-[1.5px] bg-current" />
                </button>

                <Link
                  href={`/products/${activeSlide.product.id}`}
                  className="w-full sm:w-[202px] py-3.5 sm:py-4 border border-white text-white font-lexend text-xs font-normal tracking-[0.15em] uppercase hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 bg-black/40 backdrop-blur-xs"
                >
                  Shop Now
                  <span className="w-6 h-[1.5px] bg-current" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* 4. BEST SELLERS (2 PRODUCTS PER ROW ON MOBILE) */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto space-y-6 sm:space-y-8">
        <div className="flex justify-between items-center border-b border-white/10 pb-4 sm:pb-6">
          <h2 className="font-inter text-xl sm:text-3xl font-medium tracking-tight uppercase text-white">
            BEST SELLERS
          </h2>
          <Link href="/products" className="font-inter text-xs tracking-wider uppercase text-white hover:underline flex items-center gap-2">
            View All <span className="w-5 h-[1.5px] bg-white" />
          </Link>
        </div>

        {/* 2 PRODUCTS PER ROW ON MOBILE */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {bestSellers.map((product) => {
            const wished = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="group border border-white/30 bg-black overflow-hidden flex flex-col hover:border-white transition-all relative"
              >
                <div className="relative aspect-3/4 overflow-hidden bg-zinc-900 block">
                  <Link href={`/products/${product.id}`} className="block w-full h-full">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    className={`absolute top-2.5 right-2.5 p-1.5 rounded-full border transition-all z-20 ${wished
                      ? 'bg-red-600 border-red-600 text-white fill-white'
                      : 'bg-black/70 border-white/30 text-white hover:bg-white hover:text-black'
                      }`}
                    title={wished ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`w-3.5 h-3.5 ${wished ? 'fill-white' : ''}`} />
                  </button>
                </div>

                <div className="p-3 sm:p-4 bg-[#111111]/90 flex flex-col justify-between space-y-3 flex-1">
                  <Link href={`/products/${product.id}`} className="block">
                    <h4 className="font-inter text-xs font-bold uppercase tracking-wider text-white line-clamp-1 group-hover:underline">
                      {product.name}
                    </h4>
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
                      <ShoppingBag className="w-3 h-3" />
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* 5. TARZ ESSENTIAL JACKET PROMO */}
      <section className="relative w-full min-h-[500px] sm:min-h-[700px] flex items-center overflow-hidden my-12 sm:my-16 bg-zinc-950 border-y border-white/20">

        <img
          src="/images/tarz-section.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover scale-100"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_45%)]" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 w-full min-h-[500px] sm:min-h-[700px] py-12 sm:py-0 flex flex-col justify-between sm:block">

          <div className="relative sm:absolute top-0 sm:top-16 right-0 sm:right-6 lg:right-10 w-full max-w-lg text-left sm:text-right z-30">
            <p className="font-inter text-sm sm:text-xl font-medium tracking-wide uppercase text-white leading-relaxed ml-auto">
              TARZ IS BUILT AROUND WINTER ESSENTIALS THAT BALANCE COMFORT, CHARACTER AND EVERYDAY WEAR.
            </p>
          </div>

          <div className="relative sm:absolute bottom-0 sm:bottom-16 left-0 sm:left-6 lg:left-10 mt-8 sm:mt-0 z-30">
            <div className="space-y-4 sm:space-y-5">
              <p className="font-inter text-xs font-semibold tracking-widest uppercase text-white">
                LAUNCHING SOON
              </p>

              {waitlistSubmitted ? (
                <div className="p-4 bg-white/10 border border-white text-white text-xs font-lexend tracking-wider uppercase">
                  ✓ You are on the waitlist! We will notify you first.
                </div>
              ) : (
                <button
                  onClick={() => setWaitlistSubmitted(true)}
                  className="px-6 sm:px-8 py-3.5 sm:py-4 border-2 border-white bg-white text-black font-lexend text-xs font-bold tracking-wider uppercase hover:bg-black hover:text-white transition-all flex items-center gap-4 shadow-2xl"
                >
                  JOIN THE WAITLIST
                  <span className="w-6 h-[2px] bg-current" />
                </button>
              )}
            </div>
          </div>

        </div>
      </section>


      {/* 6. NEW ARRIVALS (2 PRODUCTS PER ROW ON MOBILE) */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto space-y-6 sm:space-y-8">
        <div className="flex justify-between items-center border-b border-white/10 pb-4 sm:pb-6">
          <h2 className="font-inter text-xl sm:text-3xl font-medium tracking-tight uppercase text-white">
            NEW ARRIVALS
          </h2>
          <Link href="/products" className="font-inter text-xs tracking-wider uppercase text-white hover:underline flex items-center gap-2">
            View All <span className="w-5 h-[1.5px] bg-white" />
          </Link>
        </div>

        {/* 2 PRODUCTS PER ROW ON MOBILE */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {newArrivals.map((product, idx) => {
            const wished = isInWishlist(product.id);
            return (
              <div
                key={idx}
                className="group border border-white/30 bg-black overflow-hidden flex flex-col hover:border-white transition-all relative"
              >
                <div className="relative aspect-3/4 overflow-hidden bg-zinc-900 block">
                  <Link href={`/products/${product.id}`} className="block w-full h-full">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    className={`absolute top-2.5 right-2.5 p-1.5 rounded-full border transition-all z-20 ${wished
                      ? 'bg-red-600 border-red-600 text-white fill-white'
                      : 'bg-black/70 border-white/30 text-white hover:bg-white hover:text-black'
                      }`}
                    title={wished ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`w-3.5 h-3.5 ${wished ? 'fill-white' : ''}`} />
                  </button>
                </div>

                <div className="p-3 sm:p-4 bg-[#111111]/90 flex flex-col justify-between space-y-3 flex-1">
                  <Link href={`/products/${product.id}`} className="block">
                    <h4 className="font-inter text-xs font-bold uppercase tracking-wider text-white line-clamp-1 group-hover:underline">
                      {product.name}
                    </h4>
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
                      <ShoppingBag className="w-3 h-3" />
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}