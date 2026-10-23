"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Stethoscope, Lock, Mail, AlertCircle, Loader2, ArrowLeft, Key } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("doctor@example.com");
  const [password, setPassword] = useState("Doctor2026!");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const inputEmail = email.trim().toLowerCase();

    // 1. Direct doctor login validation (development & production portal access)
    if (
      (inputEmail === "doctor@example.com" || inputEmail === "dr.abdijalii@gmail.com" || inputEmail === "info@drabdijalii.so") &&
      (password === "Doctor2026!" || password === "Admin123456!" || password === "doctor2026")
    ) {
      document.cookie = "dr_admin_session=true; path=/; max-age=86400;";
      router.push("/admin");
      router.refresh();
      return;
    }

    // 2. Try Supabase Auth if cloud credentials configured
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (!error && data.user) {
        document.cookie = "dr_admin_session=true; path=/; max-age=86400;";
        router.push("/admin");
        router.refresh();
        return;
      }

      throw error || new Error("Invalid doctor email or password.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid doctor email or password.";
      setErrorMsg(msg);
      setLoading(false);
    }
  };

  const autofillDemo = () => {
    setEmail("doctor@example.com");
    setPassword("Doctor2026!");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-600 mb-6 transition-colors mx-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Public Website
        </Link>

        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-2xl bg-teal-600 flex items-center justify-center text-white shadow-xl shadow-teal-600/30">
            <Stethoscope className="w-8 h-8" />
          </div>
        </div>

        <h1 className="mt-4 text-center text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Doctor Admin Portal
        </h1>
        <p className="mt-2 text-center text-xs sm:text-sm text-slate-600">
          Management Access for {siteConfig.doctor.name}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl rounded-3xl border border-slate-100">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Doctor Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="doctor@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-teal-600/20 text-sm flex items-center justify-center gap-2 transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifying Credentials...
                </>
              ) : (
                "Sign In to Dashboard"
              )}
            </button>
          </form>

          {/* Direct Credentials Card for ease of use */}
          <div className="mt-6 p-4 bg-teal-50/80 rounded-2xl border border-teal-100 space-y-1.5 text-xs text-slate-700">
            <div className="font-bold text-teal-800 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5" />
              Doctor Access Credentials:
            </div>
            <div><strong>Email:</strong> <code className="bg-white px-1.5 py-0.5 rounded border border-teal-200">doctor@example.com</code></div>
            <div><strong>Password:</strong> <code className="bg-white px-1.5 py-0.5 rounded border border-teal-200">Doctor2026!</code></div>
          </div>
        </div>
      </div>
    </div>
  );
}
