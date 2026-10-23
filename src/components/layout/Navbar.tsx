"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Menu, X, Phone, Calendar, Stethoscope, ChevronRight } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
      {/* Top micro-bar for quick contact info */}
      <div className="hidden sm:block bg-teal-800 text-teal-50 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Mogadishu Clinic Open: Sat - Thu (8:00 AM - 4:00 PM)
            </span>
            <span className="text-teal-200">|</span>
            <span>Emergency Trauma Line Available</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${siteConfig.doctor.phone}`}
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {siteConfig.doctor.phone}
            </a>
            <Link href="/admin/login" className="text-teal-300 hover:text-white transition-colors">
              Doctor Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-slate-900 tracking-tight leading-tight group-hover:text-teal-700 transition-colors">
                Dr. Abdijalii
              </span>
              <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider">
                Orthopedic Surgeon
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-teal-600 bg-teal-50 font-semibold"
                    : "text-slate-600 hover:text-teal-600 hover:bg-slate-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Action */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`https://wa.me/${siteConfig.doctor.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-teal-600 text-sm font-medium px-3 py-2"
            >
              WhatsApp
            </a>
            <Link
              href="/appointments"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-medium px-5 py-2.5 rounded-full text-sm shadow-sm hover:shadow-teal-500/25 transition-all"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/appointments"
              className="bg-teal-600 text-white text-xs font-medium px-3.5 py-2 rounded-full flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              Book
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-slate-600 hover:text-teal-600 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-base font-medium ${
                isActive(item.href)
                  ? "bg-teal-50 text-teal-700 font-semibold"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span>{item.name}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/appointments"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 rounded-xl text-base shadow-sm"
            >
              Book an Appointment
            </Link>
            <a
              href={`https://wa.me/${siteConfig.doctor.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center bg-emerald-50 text-emerald-700 font-medium py-2.5 rounded-xl text-sm border border-emerald-200"
            >
              Chat on WhatsApp
            </a>
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center text-xs text-slate-500 py-1"
            >
              Doctor Management Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

