import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Calendar, MessageSquare, Star, Award, Users, CheckCircle2, Shield } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/60 via-white to-white pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Decorative ambient background blur */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-10 left-10 w-72 h-72 bg-emerald-100/40 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline, CTAs, Statistics */}
          <div className="lg:col-span-7 space-y-8">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100/70 text-teal-800 text-xs sm:text-sm font-semibold border border-teal-200/70">
              <span className="w-2 h-2 rounded-full bg-teal-600" />
              Trusted Healthcare, Anytime, Anywhere
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Your Health, <br />
                <span className="text-teal-600">Our Priority</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Connect with certified orthopedic specialist{" "}
                <span className="font-semibold text-slate-800">
                  {siteConfig.doctor.name}
                </span>{" "}
                in Mogadishu. Get expert medical evaluation, bone fracture care, and joint treatment
                — all fast, secure, and hassle-free.
              </p>
            </div>

            {/* Call To Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/appointments"
                className="inline-flex items-center justify-center gap-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-teal-600/25 hover:shadow-teal-600/35 transition-all text-base"
              >
                <Calendar className="w-5 h-5" />
                Book Appointment
              </Link>
              <a
                href={`https://wa.me/${siteConfig.doctor.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-6 py-3.5 rounded-full border border-slate-200 shadow-sm transition-all text-base"
              >
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                WhatsApp Direct
              </a>
            </div>

            {/* Stats Row matching the 3 pill cards in the image */}
            <div className="pt-4 grid grid-cols-3 gap-3 sm:gap-4 max-w-lg border-t border-slate-200/70">
              <div className="flex items-center gap-2.5 sm:gap-3 p-2">
                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700 shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">1,000+</div>
                  <div className="text-[11px] sm:text-xs text-slate-500 font-medium">Patients Treated</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 p-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">4+ Yrs</div>
                  <div className="text-[11px] sm:text-xs text-slate-500 font-medium">Orthopedic Exp.</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 p-2">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                  <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">4.8 / 5</div>
                  <div className="text-[11px] sm:text-xs text-slate-500 font-medium">Patient Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Doctor Hero Graphic with Mint Backdrop & Floating Badge */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Soft circular mint graphic backdrop */}
            <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-to-tr from-teal-200/50 via-teal-100/40 to-emerald-100/60 p-4 shadow-inner flex items-center justify-center">
              {/* Doctor image container */}
              <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full overflow-hidden border-4 border-white shadow-2xl bg-slate-100">
                <Image
                  src="/images/doctor/design-reference.jpg"
                  alt={siteConfig.doctor.name}
                  fill
                  priority
                  className="object-cover object-top"
                />
              </div>

              {/* Floating Doctor Badge overlay at bottom right */}
              <div className="absolute -bottom-4 -left-2 sm:bottom-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3.5 max-w-[260px] animate-in fade-in slide-in-from-bottom-3 duration-500">
                <div className="w-11 h-11 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-base shrink-0 shadow-md">
                  DA
                </div>
                <div className="space-y-0.5">
                  <div className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                    {siteConfig.doctor.name}
                  </div>
                  <div className="text-[11px] text-teal-600 font-medium">
                    {siteConfig.doctor.specialty}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-semibold pt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Available in Mogadishu
                  </div>
                </div>
              </div>

              {/* Floating verified badge at top right */}
              <div className="absolute top-4 -right-2 sm:top-8 sm:-right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full shadow-lg border border-slate-100 flex items-center gap-2">
                <Shield className="w-4 h-4 text-teal-600" />
                <span className="text-xs font-bold text-slate-800">Verified Surgeon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

