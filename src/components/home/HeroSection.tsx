import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Star, Heart, Users, Calendar, MessageSquare } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-8 pb-16 lg:pt-14 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Typography, CTAs, Statistics */}
          <div className="lg:col-span-7 space-y-7">
            {/* Top muted subtitle */}
            <div className="text-xs sm:text-sm font-medium text-slate-400 tracking-wide">
              Trusted Orthopedic Care • Mogadishu, Somalia
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Your Health <br />
              <span className="text-teal-600">Our Priority</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-500 max-w-xl leading-relaxed">
              Connect with <span className="font-semibold text-slate-800">{siteConfig.doctor.name}</span>,
              specialized Orthopedic &amp; Trauma Surgeon in Mogadishu. Expert medical advice, bone fracture care,
              and joint restoration — fast, secure, and hassle-free.
            </p>

            {/* Action Buttons (Solid Teal & Ghost White Pill Buttons) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/appointments"
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-7 py-3.5 rounded-full text-sm sm:text-base shadow-lg shadow-teal-600/25 hover:shadow-teal-600/35 transition-all"
              >
                Book Appointment
              </Link>
              <a
                href={`https://wa.me/${siteConfig.doctor.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-slate-50 text-slate-700 font-bold px-7 py-3.5 rounded-full text-sm sm:text-base border border-slate-200 shadow-sm transition-all"
              >
                WhatsApp Direct
              </a>
            </div>

            {/* 3 Stats Badges matching the image */}
            <div className="pt-6 grid grid-cols-3 gap-4 max-w-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-extrabold text-slate-900 leading-none">1,000+</div>
                  <div className="text-[11px] sm:text-xs text-slate-400 font-medium mt-1">Patients Treated</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-extrabold text-slate-900 leading-none">4+ Yrs</div>
                  <div className="text-[11px] sm:text-xs text-slate-400 font-medium mt-1">Orthopedic Exp.</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 fill-teal-600" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-extrabold text-slate-900 leading-none">4.8 / 5</div>
                  <div className="text-[11px] sm:text-xs text-slate-400 font-medium mt-1">Patient Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Doctor Hero Graphic with Circular Mint Backdrop & Floating Card */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Circular mint backdrop */}
            <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-to-tr from-[#c8f0f2] via-[#ddf7f8] to-[#bbf0f3] flex items-center justify-center shadow-inner">
              {/* Cursive script text top right as in reference */}
              <div className="absolute top-4 right-2 text-teal-800/80 font-serif italic text-xs sm:text-sm tracking-wide select-none">
                Better Care, <br />
                Brighter Future
              </div>

              {/* Doctor portrait */}
              <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full overflow-hidden border-4 border-white shadow-2xl bg-slate-100">
                <Image
                  src="/images/doctor/dr-abdijaliil.jpg"
                  alt={siteConfig.doctor.name}
                  fill
                  priority
                  className="object-cover object-top"
                />
              </div>

              {/* Floating Doctor Profile Card on lower left matching reference */}
              <div className="absolute bottom-2 -left-2 sm:bottom-6 sm:-left-6 bg-white p-3.5 sm:p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 max-w-[250px]">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-teal-100 shrink-0 relative">
                  <Image
                    src="/images/doctor/dr-abdijaliil.jpg"
                    alt={siteConfig.doctor.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="space-y-0.5">
                  <div className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                    {siteConfig.doctor.name}
                  </div>
                  <div className="text-[11px] text-teal-600 font-semibold">
                    {siteConfig.doctor.specialty}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold pt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Available in Mogadishu
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
