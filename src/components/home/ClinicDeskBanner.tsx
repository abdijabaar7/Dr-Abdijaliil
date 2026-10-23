import Link from "next/link";
import { siteConfig } from "@/config/site";
import { MessageSquare, Calendar, MapPin, Clock, Phone, ShieldAlert } from "lucide-react";

export function ClinicDeskBanner() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#094852] rounded-3xl p-8 sm:p-12 text-white shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Text */}
          <div className="md:col-span-8 space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-200 bg-teal-900/60 px-3.5 py-1 rounded-full border border-teal-400/30">
              Clinic Coordination Desk
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Direct WhatsApp & Clinic Assistance <br className="hidden sm:inline" />
              in Mogadishu
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm max-w-xl leading-relaxed">
              Connect directly with Dr. Abdijalii&apos;s clinic desk for appointment scheduling,
              X-ray reviews, and acute fracture assistance.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-200 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-300 shrink-0" />
                <span>{siteConfig.doctor.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-300 shrink-0" />
                <span>{siteConfig.doctor.hours}</span>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/${siteConfig.doctor.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-full text-xs sm:text-sm shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Clinic Desk
              </a>
              <Link
                href="/appointments"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-[#094852] font-bold px-6 py-3 rounded-full text-xs sm:text-sm shadow-md transition-all"
              >
                <Calendar className="w-4 h-4" />
                Book Online Appointment
              </Link>
            </div>
          </div>

          {/* Right Card */}
          <div className="md:col-span-4 bg-teal-950/60 p-6 rounded-2xl border border-teal-700/50 space-y-3 text-xs">
            <div className="font-bold text-sm text-teal-300 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Emergency Phone Contact
            </div>
            <a
              href={`tel:${siteConfig.doctor.phone}`}
              className="text-lg font-bold text-white hover:text-teal-300 block font-mono"
            >
              {siteConfig.doctor.phone}
            </a>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              For suspected bone fractures or acute joint trauma, call or message our clinic coordination
              line for priority guidance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
