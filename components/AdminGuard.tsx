"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { ShieldAlert, Lock, ArrowLeft } from "lucide-react";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        <p className="font-lexend text-xs tracking-widest text-neutral-400 uppercase">
          VERIFYING PERMISSIONS...
        </p>
      </div>
    );
  }

  if (!user || userProfile?.role !== "admin") {
    return (
      <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6 flex items-center justify-center">
        <div className="max-w-md w-full bg-neutral-950 border border-red-900/50 p-8 sm:p-10 text-center shadow-2xl space-y-6">
          <div className="w-16 h-16 rounded-full bg-red-950/80 border border-red-800 flex items-center justify-center mx-auto text-red-500">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="font-serif-display text-2xl uppercase tracking-wider text-white">
              ACCESS RESTRICTED
            </h1>
            <p className="text-xs text-neutral-400 leading-relaxed uppercase tracking-wider">
              YOU DO NOT HAVE ADMIN PRIVILEGES TO ACCESS THE TARZ CONTROL CENTER.
            </p>
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <Link
              href="/login"
              className="w-full bg-white text-black hover:bg-neutral-200 font-inter text-xs tracking-widest font-semibold py-3.5 uppercase flex items-center justify-center gap-2 transition-colors"
            >
              <Lock className="w-4 h-4" />
              SIGN IN AS ADMIN
            </Link>

            <Link
              href="/"
              className="w-full bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800 font-inter text-xs tracking-widest font-semibold py-3.5 uppercase flex items-center justify-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              RETURN TO STOREFRONT
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
