import { Star, Quote, CheckCircle2 } from "lucide-react";

export function TestimonialsSection() {
  const reviews = [
    {
      name: "Ahmed M. Warsame",
      location: "Mogadishu, Hodan",
      treatment: "Knee Injury & Rehabilitation",
      rating: 5,
      content:
        "Dr. Abdijalii diagnosed my meniscus injury with incredible accuracy. After 6 weeks of dedicated therapy and expert guidance, I am back walking without any pain.",
    },
    {
      name: "Fadumo K. Nur",
      location: "Mogadishu, Waberi",
      treatment: "Arm Fracture Fixation",
      rating: 5,
      content:
        "When my son broke his arm playing football, we rushed to Dr. Abdijalii. His gentle bedside manner and skilled fracture reduction made all the difference.",
    },
    {
      name: "Mustafa H. Ali",
      location: "Mogadishu, Wadajir",
      treatment: "Chronic Shoulder Discomfort",
      rating: 5,
      content:
        "Professional, thorough, and highly knowledgeable. Dr. Abdijalii took the time to explain my shoulder X-rays and designed a targeted recovery plan that solved my chronic discomfort.",
    },
  ];

  return (
    <section className="py-20 bg-slate-50/70 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-teal-600 tracking-wider uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-100">
            Patient Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            What Our Patients Say
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Real feedback from patients treated by Dr. Abdijalii for bone fractures, joint pain, and sports trauma.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                  &ldquo;{rev.content}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    {rev.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">{rev.location}</p>
                </div>
                <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">
                  {rev.treatment}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

