import Link from "next/link";
import { Activity, Bone, ShieldPlus, Zap, HeartHandshake, Sparkles, ArrowRight } from "lucide-react";

export function PopularServices() {
  const services = [
    {
      title: "Fractures & Bone Trauma",
      category: "Trauma Surgery",
      desc: "Emergency radiographic analysis, anatomic casting, and modern internal fixation for upper and lower limb bone fractures.",
      icon: Bone,
      slug: "fracture-management-trauma",
    },
    {
      title: "Knee & Joint Preservation",
      category: "Joint Care",
      desc: "Comprehensive evaluation of meniscus tears, ACL/PCL injuries, patellar instability, and advanced knee osteoarthritis.",
      icon: Activity,
      slug: "knee-joint-preservation-care",
    },
    {
      title: "Shoulder & Hip Conditions",
      category: "Reconstruction",
      desc: "Specialized treatment for rotator cuff tears, recurrent dislocations, labral lesions, and chronic hip pain.",
      icon: ShieldPlus,
      slug: "shoulder-hip-conditions",
    },
    {
      title: "Sports Injury Rehabilitation",
      category: "Sports Medicine",
      desc: "Rapid diagnostic triage and structured athletic rehab programs for ligament sprains, muscle tears, and tendonitis.",
      icon: Zap,
      slug: "sports-injuries-rehabilitation",
    },
    {
      title: "Pediatric Orthopedics",
      category: "Pediatric Bone Care",
      desc: "Gentle assessments for bow legs, knock knees, developmental clubfoot, flat feet, and pediatric bone growth conditions.",
      icon: HeartHandshake,
      slug: "pediatric-orthopedic-assessments",
    },
    {
      title: "Spine & Back Pain Evaluation",
      category: "Spine Care",
      desc: "Differential clinical diagnosis for lumbar disc irritation, posture strains, sciatica, and targeted physiotherapy guidance.",
      icon: Sparkles,
      slug: "spine-back-pain-evaluation",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-teal-600 tracking-wider uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-100">
              Specialized Care
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Comprehensive Orthopedic Services
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Explore specialized surgical and non-surgical orthopedic treatments tailored to help you regain painless mobility.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-600 hover:text-teal-700 group shrink-0"
          >
            View All Services
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.slug}
                className="bg-white rounded-2xl p-7 border border-slate-100 hover:border-teal-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-5 group-hover:bg-teal-600 group-hover:text-white transition-all shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600 bg-teal-50/70 px-2.5 py-1 rounded-md">
                    {svc.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-3 mb-2 group-hover:text-teal-700 transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {svc.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/services#${svc.slug}`}
                    className="text-xs font-bold text-slate-700 hover:text-teal-600 transition-colors flex items-center gap-1"
                  >
                    Clinical Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/appointments?service=${svc.slug}`}
                    className="text-xs font-semibold bg-teal-50 text-teal-700 hover:bg-teal-600 hover:text-white px-3.5 py-1.5 rounded-full transition-all"
                  >
                    Book Consultation
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

