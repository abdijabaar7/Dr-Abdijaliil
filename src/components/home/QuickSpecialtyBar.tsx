"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Activity, Bone, ShieldCheck, HeartPulse, Sparkles, UserCheck } from "lucide-react";

export function QuickSpecialtyBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const specialties = [
    { name: "General Assessment", icon: Activity, href: "/conditions#assessment" },
    { name: "Bone Fractures", icon: Bone, href: "/conditions#fractures" },
    { name: "Knee & Joint", icon: HeartPulse, href: "/conditions#knee-joint" },
    { name: "Shoulder & Hip", icon: ShieldCheck, href: "/conditions#shoulder-hip" },
    { name: "Pediatric Ortho", icon: UserCheck, href: "/conditions#pediatric" },
    { name: "Sports Injuries", icon: Sparkles, href: "/conditions#sports" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/conditions?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/conditions");
    }
  };

  return (
    <section className="relative -mt-6 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-navy-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-white border border-slate-700/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-700/60">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Find the Right Treatment for Your Needs
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Search by condition, joint problem, or choose from Dr. Abdijalii&apos;s clinical specialties
            </p>
          </div>

          {/* Quick Search Input */}
          <form onSubmit={handleSearch} className="flex items-center gap-2 w-full lg:max-w-md">
            <div className="relative flex-grow">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search knee pain, fracture, shoulder..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-navy-950/80 border border-slate-600 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-5 py-2.5 rounded-xl text-sm shrink-0 transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Specialty Pills */}
        <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {specialties.map((spec) => {
            const Icon = spec.icon;
            return (
              <Link
                key={spec.name}
                href={spec.href}
                className="flex items-center gap-2.5 bg-navy-900/80 hover:bg-teal-900/60 border border-slate-700/70 hover:border-teal-500/50 p-3 rounded-2xl transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0 group-hover:bg-teal-500 group-hover:text-white transition-all">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors truncate">
                  {spec.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

