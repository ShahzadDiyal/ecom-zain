"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ArrowRight, Lock, Mail, User, AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { signup } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      await signup(fullName, email, password, "user");
      router.push("/");
    } catch (err: any) {
      console.error("Registration failed:", err);
      if (err.code === "auth/configuration-not-found" || err.message?.includes("configuration-not-found")) {
        setError("Firebase Authentication configuration missing: Please enable 'Email/Password' sign-in method in your Firebase Console (Authentication -> Sign-in method -> Email/Password).");
      } else if (err.code === "auth/email-already-in-use") {
        setError("An account with this email address already exists.");
      } else {
        setError(err.message || "Failed to create account. Please try again.");
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
            CREATE ACCOUNT
          </h1>
          <p className="font-inter text-xs text-neutral-400 tracking-widest uppercase mt-2">
            JOIN THE TARZ WINTER EXPERIENCE
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-start gap-3">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[11px] font-medium tracking-widest text-neutral-300 uppercase mb-2">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full bg-black border border-neutral-700 px-4 py-3 pl-10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
              />
              <User className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
            </div>
          </div>

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
            <label className="block text-[11px] font-medium tracking-widest text-neutral-300 uppercase mb-2">
              Password
            </label>
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

          <div>
            <label className="block text-[11px] font-medium tracking-widest text-neutral-300 uppercase mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black border border-neutral-700 px-4 py-3 pl-10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
              />
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black hover:bg-neutral-200 font-inter text-xs tracking-widest font-semibold py-4 uppercase flex items-center justify-center gap-2 transition-colors disabled:opacity-50 mt-6"
          >
            {loading ? "CREATING ACCOUNT..." : "REGISTER NOW"}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-neutral-800 text-center">
          <p className="text-xs text-neutral-400 tracking-wider">
            ALREADY HAVE AN ACCOUNT?{" "}
            <Link href="/login" className="text-white underline hover:text-neutral-300 font-medium ml-1">
              SIGN IN
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
