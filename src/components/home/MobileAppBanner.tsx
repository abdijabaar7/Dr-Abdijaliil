import Image from "next/image";
import { siteConfig } from "@/config/site";
import { MessageSquare, Smartphone, CheckCircle2 } from "lucide-react";

export function MobileAppBanner() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#094852] rounded-3xl p-8 sm:p-12 text-white shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center overflow-hidden">
          {/* Left Text & Badges */}
          <div className="md:col-span-7 space-y-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Direct Mobile & WhatsApp <br className="hidden sm:inline" />
              Patient Assistance
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm max-w-md leading-relaxed">
              Get direct access to Dr. Abdijalii, instant appointment confirmations, symptom guidance,
              and clinic directions — right from your phone.
            </p>

            {/* Store / WhatsApp buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/${siteConfig.doctor.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Desk
              </a>
              <div className="inline-flex items-center gap-2 bg-slate-900/60 border border-slate-600 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200">
                <Smartphone className="w-4 h-4 text-teal-300" />
                Mobile Friendly Web App
              </div>
            </div>
          </div>

          {/* Right Smartphone Screen Mockup matching screenshot */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-48 sm:w-56 h-80 sm:h-96 rounded-[36px] bg-slate-900 border-4 border-slate-800 shadow-2xl p-2 flex flex-col overflow-hidden">
              {/* Speaker / camera notch */}
              <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto mb-2 shrink-0" />

              {/* Screen Content */}
              <div className="flex-grow bg-white rounded-[26px] p-3 text-slate-900 flex flex-col justify-between overflow-hidden shadow-inner">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-[10px] font-bold text-teal-600">Dr. Abdijalii App</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <div className="pt-2 text-center">
                    <div className="w-14 h-14 rounded-full overflow-hidden mx-auto relative mb-1.5 border-2 border-teal-500">
                      <Image
                        src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&auto=format&fit=crop"
                        alt="Doctor"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-xs font-bold">Dr. Abdijalii</div>
                    <div className="text-[9px] text-slate-400">Orthopedic Surgeon</div>
                  </div>

                  <div className="mt-3 bg-teal-50 p-2 rounded-xl text-[9px] text-teal-800 space-y-1">
                    <div className="font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Clinic Open Today
                    </div>
                    <div className="text-slate-500">Sat - Thu: 8:00 AM - 4:00 PM</div>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${siteConfig.doctor.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-teal-600 text-white font-bold py-2 rounded-xl text-[10px] shadow"
                >
                  Book Instant Visit
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

