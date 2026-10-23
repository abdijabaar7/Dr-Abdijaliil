"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { siteConfig } from "@/config/site";
import {
  LayoutDashboard,
  Calendar,
  Activity,
  BookOpen,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Stethoscope,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebar, setMobileSidebar] = useState(false);

  // If on /admin/login, don't show the dashboard shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Appointments", href: "/admin/appointments", icon: Calendar },
    { name: "Services", href: "/admin/services", icon: Activity },
    { name: "Health Blog", href: "/admin/blog", icon: BookOpen },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Doctor Profile", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col lg:flex-row">
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-navy-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white">
            <Stethoscope className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm tracking-tight">Doctor Portal</span>
        </div>
        <button
          onClick={() => setMobileSidebar(!mobileSidebar)}
          className="p-2 text-slate-300 hover:text-white"
        >
          {mobileSidebar ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar for Desktop & Mobile drawer */}
      <aside
        className={`${
          mobileSidebar ? "block" : "hidden"
        } lg:block w-full lg:w-64 bg-navy-900 text-slate-300 flex-shrink-0 flex flex-col justify-between p-5 border-r border-slate-800 lg:sticky lg:top-0 lg:h-screen z-30`}
      >
        <div className="space-y-6">
          {/* Logo brand */}
          <div className="flex items-center gap-3 px-2 py-3 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-md">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight leading-tight">
                Dr. Abdijalii
              </h2>
              <span className="text-[11px] font-semibold text-teal-400">
                Orthopedic Surgery
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileSidebar(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-teal-600 text-white shadow-md shadow-teal-600/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              View Public Website
            </span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}

