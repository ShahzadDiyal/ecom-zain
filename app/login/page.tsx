"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ArrowRight, Lock, Mail, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      router.push("/");
    } catch (err: any) {
      console.error("Login failed:", err);
      if (err.code === "auth/configuration-not-found" || err.message?.includes("configuration-not-found")) {
        setError("Firebase Authentication configuration missing: Please enable 'Email/Password' sign-in method in your Firebase Console (Authentication -> Sign-in method -> Email/Password).");
      } else if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
        setError("Invalid email or password. Please check your credentials.");
      } else {
        setError(err.message || "Failed to sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6 flex items-center justify-center">
      <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 p-8 sm:p-10 shadow-2xl relative">
        <div className="text-center mb-8">
          <h1 className="font-serif-display text-3xl sm:text-4xl text-white tracking-wide uppercase">
            SIGN IN
          </h1>
          <p className="font-inter text-xs text-neutral-400 tracking-widest uppercase mt-2">
            WELCOME BACK TO TARZ
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-start gap-3">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[11px] font-medium tracking-widest text-neutral-300 uppercase mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-black border border-neutral-700 px-4 py-3 pl-10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
              />
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[11px] font-medium tracking-widest text-neutral-300 uppercase">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-[11px] text-neutral-400 hover:text-white uppercase tracking-wider underline transition-colors"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black border border-neutral-700 px-4 py-3 pl-10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
              />
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black hover:bg-neutral-200 font-inter text-xs tracking-widest font-semibold py-4 uppercase flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {loading ? "AUTHENTICATING..." : "SIGN IN"}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-neutral-800 text-center">
          <p className="text-xs text-neutral-400 tracking-wider">
            DON'T HAVE AN ACCOUNT?{" "}
            <Link href="/register" className="text-white underline hover:text-neutral-300 font-medium ml-1">
              CREATE ONE
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
