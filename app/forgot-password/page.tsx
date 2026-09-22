"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { ArrowRight, Mail, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await resetPassword(email);
      setSubmitted(true);
    } catch (err: any) {
      console.error("Password reset error:", err);
      setError(err.message || "Failed to send password reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6 flex items-center justify-center">
      <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 p-8 sm:p-10 shadow-2xl relative">
        <div className="mb-6">
          <Link href="/login" className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-white uppercase tracking-wider transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Sign In
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="font-serif-display text-3xl text-white tracking-wide uppercase">
            RESET PASSWORD
          </h1>
          <p className="font-inter text-xs text-neutral-400 tracking-widest uppercase mt-2">
            WE WILL SEND YOU INSTRUCTIONS TO RESET YOUR PASSWORD
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="font-serif-display text-lg uppercase text-white">Check Your Email</h3>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-xs mx-auto">
              We have sent a password reset link to <span className="text-white font-medium">{email}</span>. Please check your inbox.
            </p>
            <Link
              href="/login"
              className="inline-block mt-4 bg-white text-black font-inter text-xs tracking-widest font-semibold px-6 py-3 uppercase hover:bg-neutral-200 transition-colors"
            >
              RETURN TO LOGIN
            </Link>
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-6 p-4 bg-red-950/50 border border-red-800/80 text-red-300 text-xs flex items-center gap-3">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
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
                    placeholder="Enter your registered email"
                    className="w-full bg-black border border-neutral-700 px-4 py-3 pl-10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                  />
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black hover:bg-neutral-200 font-inter text-xs tracking-widest font-semibold py-4 uppercase flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {loading ? "SENDING..." : "SEND RESET LINK"}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
