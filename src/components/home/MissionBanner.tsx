import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function MissionBanner() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0e2c38] rounded-3xl p-6 sm:p-10 text-white shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Text */}
          <div className="md:col-span-7 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
              Your Health, Our Mission
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
              Get expert medical care, anytime, anywhere. Start your journey to a healthier you today.
            </p>
            <div className="pt-2">
              <Link
                href="/appointments"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-[#0e2c38] font-bold px-6 py-3 rounded-full text-xs sm:text-sm shadow-md transition-all"
              >
                Find a Doctor
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Image with subtle watermark */}
          <div className="md:col-span-5 relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-inner">
            <Image
              src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop"
              alt="Health is Wealth"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
              <span className="text-xs font-serif italic text-white/90">
                &ldquo;Health is Wealth&rdquo;
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

