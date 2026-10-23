"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Search, Calendar, Menu, X, Plus, ChevronRight, Phone } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Doctor", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Conditions", href: "/conditions" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo matching the Antixor logo style (Medical Cross Badge + Bold Title) */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-600/25 group-hover:bg-teal-700 transition-colors">
              <Plus className="w-6 h-6 stroke-[3]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl text-slate-900 tracking-tight leading-tight group-hover:text-teal-700 transition-colors">
                Dr. Abdijalii
              </span>
              <span className="text-[11px] font-semibold text-slate-400 tracking-wide">
                orthopedic.care
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive(item.href)
                    ? "text-teal-600 font-bold"
                    : "text-slate-600 hover:text-teal-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search Toggle */}
            <Link
              href="/conditions"
              className="p-2.5 rounded-full text-slate-500 hover:text-teal-600 hover:bg-slate-100 transition-colors"
              title="Search Conditions"
            >
              <Search className="w-4 h-4" />
            </Link>

            {/* Book Appointment Solid Pill Button (exact match from reference) */}
            <Link
              href="/appointments"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-2.5 rounded-full text-sm shadow-md shadow-teal-600/25 hover:shadow-teal-600/35 transition-all"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/appointments"
              className="bg-teal-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm"
            >
              Book
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-slate-700 hover:text-teal-600 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-5 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold ${
                isActive(item.href)
                  ? "bg-teal-50 text-teal-700"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span>{item.name}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <Link
              href="/appointments"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-teal-600 text-white font-bold py-3.5 rounded-full text-sm shadow-md"
            >
              Book an Appointment
            </Link>
            <a
              href={`https://wa.me/${siteConfig.doctor.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center bg-emerald-50 text-emerald-700 font-bold py-3 rounded-full text-sm border border-emerald-200"
            >
              WhatsApp Consultation
            </a>
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center text-xs text-slate-400 py-1"
            >
              Doctor Management Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
