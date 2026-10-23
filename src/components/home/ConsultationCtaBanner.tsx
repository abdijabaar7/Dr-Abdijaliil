import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Calendar, MessageSquare, PhoneCall } from "lucide-react";

export function ConsultationCtaBanner() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-navy-800 text-white p-8 sm:p-12 shadow-2xl border border-slate-700">
          {/* Subtle decorative circles */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-1/3 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3 text-center lg:text-left">
              <span className="inline-block text-xs font-bold tracking-wider uppercase bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3.5 py-1 rounded-full">
                Instant Appointment Access
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Need an Orthopedic Consultation? <br className="hidden sm:inline" />
                It&apos;s Just a Click Away
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Schedule your consultation with {siteConfig.doctor.name} today. Our clinic coordination
                desk ensures prompt confirmation and answers all your questions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <Link
                href="/appointments"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white hover:bg-slate-100 text-navy-900 font-bold px-7 py-3.5 rounded-full text-sm sm:text-base shadow-xl transition-all"
              >
                <Calendar className="w-5 h-5 text-teal-600" />
                Book an Appointment
              </Link>
              <a
                href={`https://wa.me/${siteConfig.doctor.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3.5 rounded-full text-sm sm:text-base transition-all"
              >
                <MessageSquare className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

