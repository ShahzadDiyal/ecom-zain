'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data/products';
import { ShoppingBag, ShieldCheck, Truck, RotateCcw, Award, Lock, Sparkles } from 'lucide-react';

export default function HomePage() {
  const { addToCart, formatPrice } = useCart();
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [currentFeaturedSlide, setCurrentFeaturedSlide] = useState(0);

  const bestSellers = PRODUCTS.slice(0, 4);
  const newArrivals = [PRODUCTS[0], PRODUCTS[1], PRODUCTS[1], PRODUCTS[0]];

  const instagramImages = [
    'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80',
    'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80',
    'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&q=80'
  ];

  const featuredSlides = [
    {
      number: '01',
      title: 'TARZ Alpine Hoodie',
      subtitle: 'THE MOUNTAIN + MOON EMBROIDERY MAKES “ALPINE” A STRONG FIT.',
      price: 6490,
      auraColor: '#B88884',
      image: PRODUCTS[0].image,
      product: PRODUCTS[0],
    },
    {
      number: '02',
      title: 'TARZ Alpine Hoodie',
      subtitle: 'THE MOUNTAIN + MOON EMBROIDERY MAKES “ALPINE” A STRONG FIT.',
      price: 6490,
      auraColor: '#1C0C0E',
      image: PRODUCTS[1].image,
      product: PRODUCTS[1],
    },
  ];

  const activeSlide = featuredSlides[currentFeaturedSlide];

  return (
    <div className="bg-black text-white min-h-screen font-inter selection:bg-white selection:text-black overflow-x-hidden">
      
      {/* 1. HERO BANNER - FULLSCREEN OVERLAY WITH TRANSPARENT NAVBAR */}
      <section className="relative w-full h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        
        {/* Fullscreen Hero Background Image (Two Models Side-by-Side) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
  <img
    src="/images/hero-img.png"
    alt="TARZ 77C3 Winter Collection"
    className="w-full h-full object-cover object-center brightness-[0.7]"
  />

  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/80" />
</div>

        {/* Hero Center Overlay Content */}
        <div className="relative z-10 max-w-5xl mx-auto space-y-6 pt-16">
          
          {/* Badge: —— 77C3 COLLECTION —— */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 sm:w-16 h-[1.5px] bg-white" />
            <span className="font-lexend text-[14px] sm:text-[16px] tracking-[0.25em] font-medium text-white uppercase">
              77C3 COLLECTION
            </span>
            <div className="w-12 sm:w-16 h-[1.5px] bg-white" />
          </div>

          {/* Headline: WINTER, REDEFINED. */}
          <h1 className="font-serif-display text-[40px] sm:text-[60px] lg:text-[80px] font-bold tracking-tight uppercase leading-none text-white drop-shadow-2xl">
            WINTER, REDEFINED.
          </h1>

          {/* Subtitle: BUILT FOR COLD DAYS. DESIGNED FOR EVERYWHERE. */}
          <div className="font-lexend text-[16px] sm:text-[24px] tracking-[0.2em] uppercase text-white leading-relaxed max-w-xl mx-auto font-normal space-y-1">
            <p>BUILT FOR COLD DAYS.</p>
            <p>DESIGNED FOR EVERYWHERE.</p>
          </div>

          {/* CTA Button: SHOP HOODIES ——> */}
          <div className="pt-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 px-8 py-4 border border-white bg-black/30 backdrop-blur-xs text-white font-lexend text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all group shadow-2xl"
            >
              SHOP HOODIES
              <span className="w-5 h-[1.5px] bg-current transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>

      </section>


      {/* 2. PERKS BAR (Frame 15) */}
      <section className="border-b border-white/50 bg-black py-8 px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white">
          
          {/* Frame 11 */}
          <div className="flex items-center gap-6 pt-4 sm:pt-0 sm:pl-4 first:pl-0">
            <Award className="w-6 h-6 text-white stroke-[1.5] shrink-0" />
            <div className="space-y-1">
              <h4 className="font-inter text-base font-normal tracking-wide text-white uppercase">PREMIUM QUALITY</h4>
              <p className="font-inter text-base font-normal text-white">Top-tier materials</p>
            </div>
          </div>

          {/* Frame 12 */}
          <div className="flex items-center gap-6 pt-4 sm:pt-0 sm:pl-8">
            <Truck className="w-6 h-6 text-white stroke-[1.5] shrink-0" />
            <div className="space-y-1">
              <h4 className="font-inter text-base font-normal tracking-wide text-white uppercase">WORLDWIDE SHIPPING</h4>
              <p className="font-inter text-base font-normal text-white">Fast & secure delivery</p>
            </div>
          </div>

          {/* Frame 13 */}
          <div className="flex items-center gap-6 pt-4 sm:pt-0 sm:pl-8">
            <Lock className="w-6 h-6 text-white stroke-[1.5] shrink-0" />
            <div className="space-y-1">
              <h4 className="font-inter text-base font-normal tracking-wide text-white uppercase">SECURE PAYMENT</h4>
              <p className="font-inter text-base font-normal text-white">100% protected</p>
            </div>
          </div>

          {/* Frame 14 */}
          <div className="flex items-center gap-6 pt-4 sm:pt-0 sm:pl-8">
            <RotateCcw className="w-6 h-6 text-white stroke-[1.5] shrink-0" />
            <div className="space-y-1">
              <h4 className="font-inter text-base font-normal tracking-wide text-white uppercase">EASY RETURN</h4>
              <p className="font-inter text-base font-normal text-white">14-day returns</p>
            </div>
          </div>

        </div>
      </section>


    {/* 3. FEATURED COLLECTION - FIGMA MATCH + FULL-WIDTH DIAGONAL GRADIENT */}
<section className="relative py-20 overflow-hidden">

  {/* =========================================================
      FULL-WIDTH DIAGONAL GRADIENT BACKGROUND
      Starts from the beginning of the section and spans viewport
  ========================================================== */}
{/* Thin Diagonal Gradient Beam - only ~30px wide */}
<div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
  <div
    className="
      absolute
      top-[-40%]
      left-[45%]
      w-[330px]
      h-[180%]
      rotate-[-120deg]
      bg-gradient-to-r
      from-transparent
      via-white
      to-transparent
      blur-[18px]
      opacity-10
    "
  />
</div>


  {/* =========================================================
      CONTENT CONTAINER
  ========================================================== */}
  <div className="relative z-10 max-w-[1440px] mx-auto ">


    {/* =========================================================
        HEADER LINE
    ========================================================== */}
    <div className="flex justify-between items-center px-6 lg:px-10">

      <h2 className="font-inter text-2xl sm:text-3xl font-medium tracking-tight uppercase text-white">
        FEATURED COLLECTION
      </h2>

      <Link
        href="/products"
        className="
          font-inter
          text-xs
          sm:text-sm
          tracking-wider
          uppercase
          text-white
          hover:underline
          flex
          items-center
          gap-2
        "
      >
        View All
        <span className="w-5 h-[1.5px] bg-white" />
      </Link>

    </div>

    {/* =========================================================
        DIAMOND CAROUSEL INDICATORS
        Keep below showcase
    ========================================================== */}
    <div className="relative z-10 flex justify-center items-center gap-3 mt-4">

      <button
        onClick={() => setCurrentFeaturedSlide(0)}
        className={`
          w-4
          h-4
          rotate-45
          transition-all
          ${
            currentFeaturedSlide === 0
              ? 'bg-white shadow-lg scale-110'
              : 'bg-white/50 hover:bg-white'
          }
        `}
        title="Slide 1"
      />

      <button
        onClick={() => setCurrentFeaturedSlide(1)}
        className={`
          w-4
          h-4
          rotate-45
          transition-all
          ${
            currentFeaturedSlide === 1
              ? 'bg-white shadow-lg scale-110'
              : 'bg-white/50 hover:bg-white'
          }
        `}
        title="Slide 2"
      />

    </div>

    {/* =========================================================
        SHOWCASE AREA
    ========================================================== */}
    <div className="relative min-h-[660px] mt-12">


      {/* =======================================================
          WATERMARK + TOP INDICATOR
          Both are full-width
      ======================================================== */}

      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">

        {/* Top Indicator - RIGHT END */}
        <div
          className="
            absolute
            top-0
            right-0
            z-20
            flex
            items-center
            gap-4
            px-6 lg:px-10
          "
        >

          {activeSlide.number === '01' ? (
            <>
              <div className="w-12 h-[1.5px] bg-white" />

              <span className="font-lexend text-xs tracking-widest text-white font-medium">
                01
              </span>

              <div className="w-56 h-[1.5px] bg-white" />
            </>
          ) : (
            <>
              <div className="w-56 h-[1.5px] bg-white" />

              <span className="font-lexend text-xs tracking-widest text-white font-medium">
                02
              </span>

              <div className="w-12 h-[1.5px] bg-white" />
            </>
          )}

        </div>


        {/* =====================================================
            BURGUNDY HOODIE
            FULL WIDTH WATERMARK
            Positioned BELOW INDICATOR
        ====================================================== */}
        <div
          className="
            absolute
            top-16
            left-1/2
            -translate-x-1/2
            w-screen
            flex
            justify-center
            overflow-hidden
          "
        >
          <span
            className="
              font-serif-display
              text-[90px]
              sm:text-[140px]
              lg:text-[190px]
              xl:text-[170px]
              font-bold
              whitespace-nowrap
              leading-none
              text-white
              opacity-5
            "
          >
            Burgundy Hoodie
          </span>
        </div>

      </div>


      {/* =======================================================
          MAIN PRODUCT GRID

          KEEPING YOUR EXISTING POSITIONING
          Product details remain centered on right side.
      ======================================================== */}
      <div className="relative z-10 w-full min-h-[660px] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">


        {/* =====================================================
            LEFT: MODEL IMAGE
        ====================================================== */}
        <div className="lg:col-span-7 relative flex justify-center">

  <div className="relative w-[430px] sm:w-[580px] h-[520px] sm:h-[700px]">

    {/* Model */}
    <img
      src="/images/featured-img.png"
      alt={activeSlide.title}
      className="
        absolute
        bottom-0
        left-1/2
        -translate-x-1/2
        w-full
        h-[560px]
        sm:h-[680px]
        object-cover
        object-top
        filter
        brightness-95
        transition-all
        duration-500
        z-10
      "
    />

  </div>

</div>

        {/* =====================================================
            RIGHT: PRODUCT DETAILS
            NO POSITIONING CHANGE
        ====================================================== */}
        <div className="lg:col-span-5 mt-[200px]  z-10">

          {/* Title & Specs */}
          <div className="space-y-4">

            <h3
              className="
                font-inter
                text-[26px]
                sm:text-[32px]
                font-semibold
                uppercase
                tracking-tight
                text-white
                underline
                underline-offset-8
              "
            >
              {activeSlide.title}
            </h3>

            <p
              className="
                font-inter
                text-[14px]
                sm:text-[16px]
                font-medium
                uppercase
                tracking-wider
                text-white
                leading-relaxed
                max-w-md
              "
            >
              {activeSlide.subtitle}
            </p>

            <p
              className="
                font-inter
                text-[30px]
                sm:text-[40px]
                font-bold
                uppercase
                tracking-tight
                text-white
                pt-2
              "
            >
              {formatPrice(activeSlide.price)}
            </p>

          </div>


          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">

            <button
              onClick={() => addToCart(activeSlide.product)}
              className="
                w-[225px]
                py-4
                border
                border-white
                text-white
                font-lexend
                text-xs
                font-normal
                tracking-[0.15em]
                uppercase
                hover:bg-white
                hover:text-black
                transition-all
                flex
                items-center
                justify-center
                gap-3
                bg-black/40
                backdrop-blur-xs
              "
            >
              Add To Cart
              <span className="w-6 h-[1.5px] bg-current" />
            </button>

            <Link
              href={`/products/${activeSlide.product.id}`}
              className="
                w-[202px]
              py-4  
                border
                border-white
                text-white
                font-lexend
                text-xs
                font-normal
                tracking-[0.15em]
                uppercase
                hover:bg-white
                hover:text-black
                transition-all
                flex
                items-center
                justify-center
                gap-3
                bg-black/40
                backdrop-blur-xs
              "
            >
              Shop Now
              <span className="w-6 h-[1.5px] bg-current" />
            </Link>

          </div>

        </div>

      </div>

    </div>



  </div>

</section>


      {/* 4. BEST SELLERS */}
      <section className="py-16 px-6 lg:px-10 max-w-[1440px] mx-auto space-y-8">
        <div className="flex justify-between items-center border-b border-white/10 pb-6">
          <h2 className="font-inter text-2xl sm:text-3xl font-medium tracking-tight uppercase text-white">
            BEST SELLERS
          </h2>
          <Link href="/products" className="font-inter text-xs tracking-wider uppercase text-white hover:underline flex items-center gap-2">
            View All <span className="w-5 h-[1.5px] bg-white" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <div
              key={product.id}
              className="group border border-white/30 bg-black overflow-hidden flex flex-col hover:border-white transition-all relative"
            >
              <Link href={`/products/${product.id}`} className="relative aspect-3/4 overflow-hidden bg-zinc-900 block">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              <div className="p-4 bg-[#111111]/90 flex flex-col justify-between space-y-3">
                <div className="flex justify-between items-center">
                  <Link href={`/products/${product.id}`} className="block">
                    <h4 className="font-inter text-xs font-semibold uppercase tracking-wider text-white line-clamp-1 group-hover:underline">
                      {product.name}
                    </h4>
                  </Link>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="text-white hover:scale-110 transition-transform p-1 relative z-10"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
                <Link href={`/products/${product.id}`}>
                  <p className="font-inter text-xs font-semibold text-zinc-300 hover:underline">
                    {formatPrice(product.price)}
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>


{/* 5. TARZ ESSENTIAL JACKET PROMO */}
<section className="relative w-full min-h-[700px] flex items-center overflow-hidden my-16 bg-zinc-950 border-y border-white/20">

  {/* Background image / atmosphere */}
  <img
    src="/images/tarz-section.png"
    alt=""
    aria-hidden="true"
    className="
      absolute
      inset-0
      w-full
      h-full
      object-cover
      scale-100
    "
  />

  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/65" />

  {/* Subtle center glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_45%)]" />


  <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 w-full min-h-[700px]">


    {/* =====================================================
        CENTER TITLE — BEHIND IMAGE
    ====================================================== */}
    <div
      className="
        absolute
        inset-0
        flex
        items-center
        justify-center
        pointer-events-none
        overflow-hidden
        z-10
      "
    >
      <h2
        className="
          font-serif-display
          text-[70px]
          sm:text-[110px]
          lg:text-[150px]
          xl:text-[180px]
          font-bold
          text-white
          tracking-tight
          uppercase
          leading-none
          whitespace-nowrap
          opacity-[0.22]
        "
      >
        {/* Tarz Essential Jacket */}
      </h2>
    </div>


    {/* =====================================================
        CENTER JACKET IMAGE — ABOVE TITLE
    ====================================================== */}
    <div
      className="
        absolute
        inset-0
        flex
        items-center
        justify-center
        pointer-events-none
        z-20
      "
    >
      <div
        className="
          relative
          w-[320px]
          sm:w-[430px]
          lg:w-[500px]
          h-[500px]
          sm:h-[600px]
          lg:h-[680px]
        "
      >

        

      </div>
    </div>


    {/* =====================================================
        TOP RIGHT DESCRIPTION
    ====================================================== */}
    <div
      className="
        absolute
        top-16
        right-6
        lg:right-10
        w-full
        max-w-lg
        text-right
        z-30
      "
    >
      <p
        className="
          font-inter
          text-base
          sm:text-xl
          font-medium
          tracking-wide
          uppercase
          text-white
          leading-relaxed
          ml-auto
        "
      >
        TARZ IS BUILT AROUND WINTER ESSENTIALS THAT BALANCE
        COMFORT, CHARACTER AND EVERYDAY WEAR.
      </p>
    </div>


    {/* =====================================================
        BOTTOM LEFT — LAUNCHING SOON
    ====================================================== */}
    <div
      className="
        absolute
        bottom-16
        left-6
        lg:left-10
        z-30
      "
    >

      <div className="space-y-5">

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
            className="
              px-8
              py-4
              border-2
              border-white
              bg-white
              text-black
              font-lexend
              text-xs
              font-bold
              tracking-wider
              uppercase
              hover:bg-black
              hover:text-white
              transition-all
              flex
              items-center
              gap-4
              shadow-2xl
            "
          >
            JOIN THE WAITLIST
            <span className="w-6 h-[2px] bg-current" />
          </button>
        )}

      </div>

    </div>

  </div>

</section>


      {/* 6. NEW ARRIVALS */}
      <section className="py-16 px-6 lg:px-10 max-w-[1440px] mx-auto space-y-8">
        <div className="flex justify-between items-center border-b border-white/10 pb-6">
          <h2 className="font-inter text-2xl sm:text-3xl font-medium tracking-tight uppercase text-white">
            NEW ARRIVALS
          </h2>
          <Link href="/products" className="font-inter text-xs tracking-wider uppercase text-white hover:underline flex items-center gap-2">
            View All <span className="w-5 h-[1.5px] bg-white" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product, idx) => (
            <div
              key={idx}
              className="group border border-white/30 bg-black overflow-hidden flex flex-col hover:border-white transition-all relative"
            >
              <Link href={`/products/${product.id}`} className="relative aspect-3/4 overflow-hidden bg-zinc-900 block">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              <div className="p-4 bg-[#111111]/90 flex flex-col justify-between space-y-3">
                <div className="flex justify-between items-center">
                  <Link href={`/products/${product.id}`} className="block">
                    <h4 className="font-inter text-xs font-semibold uppercase tracking-wider text-white line-clamp-1 group-hover:underline">
                      {product.name}
                    </h4>
                  </Link>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="text-white hover:scale-110 transition-transform p-1 relative z-10"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
                <Link href={`/products/${product.id}`}>
                  <p className="font-inter text-xs font-semibold text-zinc-300 hover:underline">
                    {formatPrice(product.price)}
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 7. WHY TARZ? (Frame 49) */}
      <section className="py-20 px-6 lg:px-10 max-w-[1440px] mx-auto space-y-16 border-t border-white/10">
        <h2 className="font-inter text-2xl sm:text-3xl font-medium tracking-tight uppercase text-white text-center sm:text-left">
          Why TARZ?
        </h2>

        {/* Frame 48: 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          
          {/* Frame 47 */}
          <div className="space-y-4">
            <div className="w-10 h-10 border border-white mx-auto flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-lexend text-base font-semibold tracking-wider uppercase text-white">
              HEAVYWEIGHT FABRIC
            </h3>
            <p className="font-inter text-sm text-white font-normal uppercase">
              Built for winter.
            </p>
          </div>

          {/* Frame 46 */}
          <div className="space-y-4">
            <div className="w-10 h-10 border border-white mx-auto flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-lexend text-base font-semibold tracking-wider uppercase text-white">
              MADE TO LAST
            </h3>
            <p className="font-inter text-sm text-white font-normal uppercase">
              Quality construction and durable materials.
            </p>
          </div>

          {/* Frame 45 */}
          <div className="space-y-4">
            <div className="w-10 h-10 border border-white mx-auto flex items-center justify-center">
              <div className="w-4 h-4 rounded-full border border-white" />
            </div>
            <h3 className="font-lexend text-base font-semibold tracking-wider uppercase text-white">
              EVERYDAY FIT
            </h3>
            <p className="font-inter text-sm text-white font-normal uppercase">
              Relaxed silhouettes designed for layering.
            </p>
          </div>

          {/* Frame 44 */}
          <div className="space-y-4">
            <div className="w-10 h-10 border border-white mx-auto flex items-center justify-center">
              <RotateCcw className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-lexend text-sm font-semibold tracking-wider uppercase text-white">
              EASY RETURNS
            </h3>
            <p className="font-inter text-sm text-white font-normal uppercase">
              Simple returns and exchanges.
            </p>
          </div>

        </div>
      </section>


      {/* 8. INSTAGRAM FEED */}
      <section className="py-16 px-6 lg:px-10 max-w-[1440px] mx-auto space-y-10">
        <div className="flex items-center gap-6">
          <h2 className="font-lexend text-3xl sm:text-5xl font-extrabold tracking-wider uppercase text-white shrink-0">
            INSTAGRAM
          </h2>
          <div className="w-full h-[1px] bg-white/40" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramImages.map((imgUrl, idx) => (
            <div key={idx} className="relative aspect-3/4 overflow-hidden border border-white/20 group">
              <img
                src={imgUrl}
                alt="TARZ Instagram"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="font-lexend text-xs font-bold tracking-widest text-white uppercase border border-white px-4 py-2">
                  @TARZ.OFFICIAL
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}