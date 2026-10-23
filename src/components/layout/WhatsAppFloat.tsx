"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

export function WhatsAppFloat() {
  return (
    <aside aria-label="WhatsApp Quick Contact" className="fixed bottom-6 right-6 z-40 group">
      <a
        href={`https://wa.me/${siteConfig.doctor.whatsapp}?text=${encodeURIComponent(
          "Hello Dr. Abdijalii, I would like to inquire about orthopedic care and clinic appointments."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-lg shadow-emerald-600/30 hover:scale-105 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-300"
        aria-label="Direct WhatsApp Consultation with Dr. Abdijalii"
      >
        <MessageCircle className="w-6 h-6 fill-white stroke-none" />
        <span className="hidden sm:inline font-semibold text-sm">
          WhatsApp Doctor
        </span>
      </a>
      {/* Floating status badge */}
      <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
      </span>
    </aside>
  );
}

