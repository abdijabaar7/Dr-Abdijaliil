import { ShieldCheck, CalendarCheck, Lock, HeartHandshake } from "lucide-react";

export function WhyChooseUs() {
  const points = [
    {
      title: "Verified Specialist",
      desc: "Trained and experienced in advanced orthopedic trauma and reconstructive musculoskeletal surgery.",
      icon: ShieldCheck,
      color: "bg-teal-50 text-teal-600 border-teal-100",
    },
    {
      title: "Clinical Consultation",
      desc: "In-depth evaluations, physical examinations, and radiographic analysis at our central Mogadishu clinic.",
      icon: HeartHandshake,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      title: "Easy Online Booking",
      desc: "Fast, seamless appointment request system with automated WhatsApp coordination and time confirmation.",
      icon: CalendarCheck,
      color: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      title: "Secure & Private",
      desc: "Your medical inquiry and contact details are protected with rigorous healthcare database security.",
      icon: Lock,
      color: "bg-indigo-50 text-indigo-600 border-indigo-100",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-teal-600 tracking-wider uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-100">
            Dedicated Patient Focus
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Why Choose Dr. Abdijalii?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Committed to providing compassionate, precise, and scientifically sound orthopedic care
            for every individual in Somalia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((pt) => {
            const Icon = pt.icon;
            return (
              <div
                key={pt.title}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-teal-200 transition-all flex flex-col items-start group"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${pt.color} group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">
                  {pt.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

