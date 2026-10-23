import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { siteConfig } from "@/config/site";

export function QualityFeature() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#eaf6f7] rounded-3xl p-8 sm:p-14 border border-teal-100/60 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-5">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Quality Orthopedic Care <br />
              for a Healthier Tomorrow
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg">
              At {siteConfig.doctor.name}&apos;s orthopedic practice in Mogadishu, we believe everyone
              deserves access to great bone and joint healthcare. Our focus is accurate diagnostic X-ray
              evaluation, non-surgical therapies first, and precision fracture fixation when surgery is required.
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-bold px-7 py-3 rounded-full text-sm shadow-md shadow-teal-600/20 transition-all"
              >
                Learn More About Dr. Abdijalii
              </Link>
            </div>
          </div>

          {/* Right Image with 98% Patient Satisfaction Floating Badge */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm h-72 sm:h-80 rounded-2xl overflow-hidden shadow-md bg-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop"
                alt="Orthopedic Healthcare Consultation"
                fill
                className="object-cover"
              />

              {/* Floating satisfaction badge matching reference */}
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                  <Check className="w-5 h-5 stroke-[3]" />
                </div>
                <div>
                  <div className="text-base font-extrabold text-slate-900 leading-tight">98%</div>
                  <div className="text-[10px] text-slate-500 font-semibold">Patient Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
