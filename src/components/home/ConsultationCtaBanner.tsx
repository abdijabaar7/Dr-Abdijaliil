import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Calendar, MessageSquare } from "lucide-react";

export function ConsultationCtaBanner() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0e2c38] rounded-3xl p-6 sm:p-10 text-white shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Consultation Photo */}
          <div className="md:col-span-5 relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-inner">
            <Image
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop"
              alt="Consultation With Dr. Abdijalii"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Heading & Buttons */}
          <div className="md:col-span-7 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
              Need an Orthopedic Consultation? <br />
              It&apos;s Just a Click Away
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md">
              Book your consultation with {siteConfig.doctor.name} today and receive specialized bone
              and joint care in Mogadishu.
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <Link
                href="/appointments"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-[#0e2c38] font-bold px-6 py-3 rounded-full text-xs sm:text-sm shadow-md transition-all"
              >
                <Calendar className="w-4 h-4 text-teal-600" />
                Book an Appointment
              </Link>
              <a
                href={`https://wa.me/${siteConfig.doctor.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-5 py-3 rounded-full text-xs sm:text-sm shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Doctor
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
