import Link from "next/link";
import Image from "next/image";
import { MessageSquare, FileText, Pill, Activity, ShieldPlus, Heart, ArrowRight } from "lucide-react";

export function ComprehensiveServicesBanner() {
  const services = [
    {
      title: "Online Consultation",
      desc: "Talk to Dr. Abdijalii from anywhere.",
      icon: MessageSquare,
      href: "/consultation",
    },
    {
      title: "Digital X-Ray / Radiography",
      desc: "Accurate bone fracture imaging review.",
      icon: FileText,
      href: "/services",
    },
    {
      title: "Post-Fracture Casting",
      desc: "Anatomic casting and splinting.",
      icon: Pill,
      href: "/services",
    },
    {
      title: "Follow-up Care",
      desc: "Stay on track with your bone healing.",
      icon: Activity,
      href: "/appointments",
    },
    {
      title: "Joint & Ligament Support",
      desc: "Knee arthritis & sports rehab.",
      icon: ShieldPlus,
      href: "/conditions#knee-joint",
    },
    {
      title: "Chronic Spine Care",
      desc: "Long-term posture & back management.",
      icon: Heart,
      href: "/conditions#assessment",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Dark Teal Banner with Doctor holding tablet */}
        <div className="bg-[#0c2a33] rounded-3xl p-8 sm:p-12 text-white shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-300 bg-teal-900/60 px-3 py-1 rounded-full border border-teal-500/30">
              Our Clinical Services
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Comprehensive Healthcare <br />
              Services for You
            </h2>
            <p className="text-slate-300 text-xs sm:text-base max-w-lg leading-relaxed">
              From online pre-consultations to specialized trauma surgery, we offer a wide range of orthopedic services to meet your needs.
            </p>
            <div className="pt-2">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-[#0c2a33] font-bold px-6 py-3 rounded-full text-xs sm:text-sm shadow-md transition-all"
              >
                Explore All Services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="md:col-span-4 relative h-48 sm:h-60 rounded-2xl overflow-hidden shadow-inner">
            <Image
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop"
              alt="Medical Services Overview"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* 6 Clean White Service Cards Grid (matching right column in screenshot) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <Link
                key={svc.title}
                href={svc.href}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-teal-200 transition-all flex flex-col group"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  {svc.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {svc.desc}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

