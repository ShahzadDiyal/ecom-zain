import React from 'react';
import Link from 'next/link';
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-[#0B0B0B] to-black border-t border-white/20 pt-16 pb-8 px-6 lg:px-10 text-white font-lexend">
      <div className="max-w-[1440px] mx-auto space-y-12">
        
       {/* Brand Logo Header */}
<div className="flex justify-center">
  <Link href="/" className="flex items-center">
    <Image
      src="/logo.png"
      alt="TARZ"
      width={140}
      height={50}
      className="h-auto w-[190px] object-contain"
      priority
    />
  </Link>
</div>

        {/* 4 Footer Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-4xl mx-auto pt-4">
          
          {/* SHOP */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-white">SHOP</h4>
            <ul className="space-y-3 text-xs tracking-wider text-zinc-400 font-normal">
              <li><Link href="/products" className="hover:text-white transition-colors">HOODIES</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">JACKETS</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">NEW ARRIVALS</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">BEST SELLERS</Link></li>
            </ul>
          </div>

          {/* HELP */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-white">HELP</h4>
            <ul className="space-y-3 text-xs tracking-wider text-zinc-400 font-normal">
              <li><a href="#" className="hover:text-white transition-colors">CONTACT</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">SHIPPING</a></li>
              <li><a href="#" className="hover:text-white transition-colors">RETURNS</a></li>
              <li><a href="#" className="hover:text-white transition-colors">SIZE GUIDE</a></li>
            </ul>
          </div>

          {/* ABOUT */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-white">ABOUT</h4>
            <ul className="space-y-3 text-xs tracking-wider text-zinc-400 font-normal">
              <li><a href="#" className="hover:text-white transition-colors">ABOUT TARZ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">INSTAGRAM</a></li>
            </ul>
          </div>

          {/* LEGAL */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-white">LEGAL</h4>
            <ul className="space-y-3 text-xs tracking-wider text-zinc-400 font-normal">
              <li><a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a></li>
              <li><a href="#" className="hover:text-white transition-colors">TERMS & CONDITIONS</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-10 border-t border-white/10 flex justify-center md:justify-end text-xs tracking-widest text-zinc-500 font-semibold">
          © 2026 TARZ
        </div>

      </div>
    </footer>
  );
}
