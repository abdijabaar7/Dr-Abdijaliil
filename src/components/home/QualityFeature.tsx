import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Award, ArrowRight } from "lucide-react";

export function QualityFeature() {
  const highlights = [
    "Precise orthopedic diagnostic evaluations & digital radiography review",
    "Conservative non-surgical joint management and modern casting techniques",
    "Evidence-based surgical fracture fixation and ligament repairs",
    "Individualized patient rehabilitation and mobility restoration programs",
  ];

  return (
    <section className="py-16 bg-mint-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-teal-600 tracking-wider uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-100">
              Modern Clinical Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Quality Orthopedic Care for a Healthier Tomorrow
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Dr. Abdijalii provides specialized clinical care aimed at restoring movement, reducing chronic
              musculoskeletal pain, and healing bone trauma. Every patient receives attentive examination,
              transparent treatment explanations, and personalized recovery roadmaps.
            </p>

            <div className="space-y-3 pt-2">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-700">{h}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-full text-sm shadow-md shadow-teal-600/20 transition-all"
              >
                Learn About Dr. Abdijalii
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-semibold text-sm px-4 py-3"
              >
                Explore All Services
              </Link>
            </div>
          </div>

          {/* Right Feature Graphic with 98% Patient Satisfaction Floating Badge */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md h-[340px] sm:h-[400px] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-100">
              <Image
                src="/images/doctor/design-reference.jpg"
                alt="Orthopedic Clinical Examination"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Floating satisfaction badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-500 text-white flex items-center justify-center font-bold text-xl shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-slate-900">98%</span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Verified
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 font-medium">
                    Patient Satisfaction & Positive Outcome Rate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

