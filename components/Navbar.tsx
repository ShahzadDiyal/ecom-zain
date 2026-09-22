'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Heart, User, Shield, LogOut, KeyRound } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Image from "next/image";

export default function Navbar() {
  const { cartCount, wishlistCount } = useCart();
  const { user, userProfile, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full bg-transparent border-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-10 h-20 flex items-center justify-between">
        
        {/* Left Icons */}
        <div className="flex items-center gap-3 sm:gap-6">
          <Link href="/products" className="text-white hover:opacity-80 transition-opacity" title="Search">
            <Search className="w-5 h-5 stroke-[1.75]" />
          </Link>
          
          {/* User Profile / Auth Dropdown */}
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)} 
              className="text-white hover:opacity-80 transition-opacity flex items-center gap-1 focus:outline-none"
              title="Account"
            >
              <User className="w-5 h-5 stroke-[1.75]" />
              {userProfile?.role === 'admin' && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" title="Admin User" />
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 mt-3 w-56 bg-black/95 border border-neutral-800 backdrop-blur-md shadow-2xl rounded-none py-2 text-xs z-50 tracking-wider">
                {user ? (
                  <>
                    <div className="px-4 py-2 border-b border-neutral-800">
                      <p className="text-white font-medium truncate">{userProfile?.displayName || user.email}</p>
                      <p className="text-neutral-400 text-[10px] uppercase">{userProfile?.role || 'User'}</p>
                    </div>
                    {userProfile?.role === 'admin' && (
                      <Link 
                        href="/admin" 
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-red-400 hover:bg-neutral-900 transition-colors uppercase font-medium"
                      >
                        <Shield className="w-4 h-4" />
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={async () => {
                        setDropdownOpen(false);
                        await logout();
                      }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-neutral-300 hover:bg-neutral-900 transition-colors uppercase"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-white hover:bg-neutral-900 transition-colors uppercase"
                    >
                      <User className="w-4 h-4" />
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-neutral-400 hover:bg-neutral-900 transition-colors uppercase"
                    >
                      <KeyRound className="w-4 h-4" />
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Brand Logo Header */}
        <div className="flex justify-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="TARZ"
              width={140}
              height={50}
              className="h-auto w-[130px] sm:w-[190px] object-contain"
              priority
            />
          </Link>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-3 sm:gap-6">
          <Link href="/cart" className="relative text-white hover:opacity-80 transition-opacity" title="Cart">
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-white text-black font-lexend text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <Link href="/wishlist" className="relative text-white hover:opacity-80 transition-opacity" title="Wishlist">
            <Heart className="w-5 h-5 stroke-[1.75]" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-red-600 text-white font-lexend text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>
        </div>

      </div>
    </header>
  );
}
