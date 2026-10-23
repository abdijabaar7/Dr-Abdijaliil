"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Stethoscope, Lock, Mail, AlertCircle, Loader2, ArrowLeft } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        throw error;
      }

      // Check if user is in doctor_admins table
      if (data.user) {
        const { data: adminRecord, error: adminErr } = await supabase
          .from("doctor_admins")
          .select("user_id")
          .eq("user_id", data.user.id)
          .maybeSingle();

        if (adminErr || !adminRecord) {
          // If not in doctor_admins, sign them out and show unauthorized message
          await supabase.auth.signOut();
          setErrorMsg("Access Denied: This account is not authorized as a Doctor Administrator.");
          setLoading(false);
          return;
        }
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid credentials or login error.";
      setErrorMsg(msg);
      setLoading(false);
    }
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

          <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
            Protected with Supabase Authentication & Row-Level Security
          </div>
        </div>
      </div>
    </div>
  );
}

