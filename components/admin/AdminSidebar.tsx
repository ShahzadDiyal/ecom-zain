"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Tag, 
  Users, 
  ExternalLink,
  Shield,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { userProfile, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { label: "Categories", href: "/admin/categories", icon: Tag },
    { label: "Users & Roles", href: "/admin/users", icon: Users },
  ];

  return (
    <aside className="w-full lg:w-64 bg-neutral-950 border-b lg:border-b-0 lg:border-r border-neutral-800 flex flex-col justify-between shrink-0">
      <div>
        {/* Admin Header / Logo */}
        <div className="p-4 sm:p-6 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-red-600/20 border border-red-600/50 flex items-center justify-center text-red-500 font-bold">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-lexend text-sm font-bold text-white tracking-widest">TARZ</h2>
              <span className="text-[10px] text-red-400 uppercase tracking-widest font-semibold">ADMIN CONTROL</span>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-neutral-400 hover:text-white"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* User Badge */}
        <div className="px-6 py-3 border-b border-neutral-800/60 bg-neutral-900/40 hidden sm:block">
          <p className="text-[10px] uppercase text-neutral-400 tracking-wider">LOGGED IN AS</p>
          <p className="text-xs text-white font-medium truncate mt-0.5">{userProfile?.displayName || userProfile?.email}</p>
        </div>

        {/* Navigation Links (Visible on lg, or toggled on mobile) */}
        <nav className={`p-4 space-y-1 ${mobileOpen ? "block" : "hidden lg:block"}`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-xs tracking-wider uppercase font-medium transition-all ${
                  isActive
                    ? "bg-white text-black font-semibold shadow-md"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-black" : "text-neutral-400"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Navigation Actions */}
      <div className={`p-4 border-t border-neutral-800 space-y-2 ${mobileOpen ? "block" : "hidden lg:block"}`}>
        <Link
          href="/"
          className="flex items-center justify-between px-4 py-2.5 text-xs text-neutral-400 hover:text-white hover:bg-neutral-900 uppercase tracking-wider transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            View Storefront
          </span>
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-red-400 hover:bg-red-950/40 uppercase tracking-wider transition-colors text-left"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
