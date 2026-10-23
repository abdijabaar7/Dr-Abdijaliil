import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { ShieldCheck, Award, Clock, MapPin, Calendar, MessageSquare, ArrowRight } from "lucide-react";

export function DoctorHighlight() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Doctor Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-72 sm:w-80 sm:h-96 rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-200">
              <Image
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop"
                alt={siteConfig.doctor.name}
                fill
                className="object-cover object-top"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-teal-800 shadow-sm flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                Verified Specialist
              </div>
            </div>
          </div>

          {/* Doctor Details */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <span className="text-xs font-bold text-teal-600 tracking-wider uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-100">
                Orthopedic Specialist
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
                {siteConfig.doctor.name}
              </h2>
              <p className="text-teal-600 font-bold text-sm mt-1">
                {siteConfig.doctor.specialty} • Mogadishu, Somalia
              </p>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Dr. Abdijalii is a dedicated Orthopedic and Trauma Surgeon with over 4 years of focused surgical
              experience. He provides patient-centered bone fracture fixation, joint arthritis management, sports
              trauma rehabilitation, and pediatric orthopedic care in Mogadishu.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700 pt-1">
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-teal-600 shrink-0" />
                <span><strong>4+ Years</strong> Specialized Orthopedic Practice</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
                <span>{siteConfig.doctor.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                <span>{siteConfig.doctor.hours}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Strict Patient Privacy & RLS Data Protection</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/appointments"
                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-full text-sm shadow-md shadow-teal-600/25 transition-all"
              >
                <Calendar className="w-4 h-4" />
                Book Consultation with Dr. Abdijalii
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 hover:text-teal-600"
              >
                Read Full Biography
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
