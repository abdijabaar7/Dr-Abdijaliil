"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Bone, Activity, ShieldCheck, Zap, UserCheck, Heart } from "lucide-react";

export function QuickSpecialtyBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const specialtyIcons = [
    { label: "Bone Fractures", icon: Bone, href: "/conditions#fractures" },
    { label: "Knee & Joint", icon: Activity, href: "/conditions#knee-joint" },
    { label: "Shoulder & Hip", icon: ShieldCheck, href: "/conditions#shoulder-hip" },
    { label: "Sports Injuries", icon: Zap, href: "/conditions#sports" },
    { label: "Pediatric Ortho", icon: UserCheck, href: "/conditions#pediatric" },
    { label: "Spine Care", icon: Heart, href: "/conditions#assessment" },
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
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-16">
      <div className="bg-[#0e2c38] rounded-3xl p-6 sm:p-10 shadow-2xl text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Title & Description */}
          <div className="lg:col-span-7 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Find Orthopedic Care <br className="hidden sm:inline" />
              for Your Condition
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-lg">
              Search by bone injury, joint condition, or select from Dr. Abdijalii&apos;s orthopedic specialties in Mogadishu.
            </p>

            {/* Search Input Box */}
            <form onSubmit={handleSearch} className="pt-4 flex items-center gap-2 max-w-xl">
              <div className="relative flex-grow">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search bone fracture, knee pain, shoulder, casting..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#163a48] border border-slate-600/80 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold px-6 py-3 rounded-xl text-sm shrink-0 transition-colors"
              >
                Search
              </button>
            </form>
          </div>

          {/* Right 2x3 Grid of Specialty Icon Badges */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-3">
            {specialtyIcons.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="bg-[#163a48] hover:bg-teal-700/60 border border-slate-700/60 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center text-center gap-2 group transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 group-hover:bg-teal-500 group-hover:text-white flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-200 group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
