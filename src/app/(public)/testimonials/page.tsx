import Link from "next/link";
import { Star, CheckCircle2, Calendar } from "lucide-react";

export const metadata = {
  title: "Patient Testimonials & Reviews",
  description: "Read verified feedback and recovery experiences from patients treated by Dr. Abdijalii in Mogadishu.",
};

const TESTIMONIALS = [
  {
    name: "Ahmed M. Warsame",
    location: "Mogadishu, Hodan",
    treatment: "Knee Meniscus Treatment & Therapy",
    rating: 5,
    quote:
      "Dr. Abdijalii diagnosed my meniscus injury with incredible accuracy. After 6 weeks of dedicated therapy and expert guidance, I am back walking without any pain.",
  },
  {
    name: "Fadumo K. Nur",
    location: "Mogadishu, Waberi",
    treatment: "Pediatric Arm Fracture Fixation",
    rating: 5,
    quote:
      "When my son broke his arm playing football, we rushed to Dr. Abdijalii. His gentle bedside manner and skilled fracture reduction made all the difference.",
  },
  {
    name: "Mustafa H. Ali",
    location: "Mogadishu, Wadajir",
    treatment: "Chronic Shoulder Discomfort",
    rating: 5,
    quote:
      "Professional, thorough, and highly knowledgeable. Dr. Abdijalii took the time to explain my shoulder X-rays and designed a targeted recovery plan that solved my chronic discomfort.",
  },
  {
    name: "Khadra A. Samatar",
    location: "Mogadishu, Hamar Weyne",
    treatment: "Knee Osteoarthritis Management",
    rating: 5,
    quote:
      "I was struggling to pray or walk comfortably due to severe knee stiffness. The joint care regimen Dr. Abdijalii recommended gave me my active life back.",
  },
  {
    name: "Osman Y. Gelle",
    location: "Mogadishu, Yaqshid",
    treatment: "Ankle Fracture Cast & Recovery",
    rating: 5,
    quote:
      "After a motorcycle accident left me with a broken ankle, Dr. Abdijalii supervised my casting and weight-bearing rehabilitation. Clean healing and no complications.",
  },
];

export default function TestimonialsPage() {
  return (
    <div className="bg-white">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-teal-50/80 to-white py-14 sm:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold text-teal-600 tracking-wider uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-100">
            Real Experiences
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-4">
            Patient Stories & Reviews
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Read verified feedback from patients who entrusted their bone, joint, and fracture care
            to Dr. Abdijalii in Mogadishu, Somalia.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    {rev.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">{rev.location}</p>
                </div>
                <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">
                  {rev.treatment}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Appointment CTA */}
        <div className="mt-16 text-center bg-teal-50/70 border border-teal-100 rounded-3xl p-10 max-w-2xl mx-auto space-y-4">
          <h3 className="text-2xl font-bold text-slate-900">Begin Your Recovery Journey Today</h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Book an appointment with Dr. Abdijalii for personalized orthopedic assessment and dedicated care.
          </p>
          <div className="pt-2">
            <Link
              href="/appointments"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold px-7 py-3.5 rounded-full text-sm shadow-md transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

