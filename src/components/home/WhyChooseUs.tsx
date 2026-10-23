import { ShieldCheck, MessageSquare, CalendarCheck, Lock } from "lucide-react";

export function WhyChooseUs() {
  const points = [
    {
      title: "Verified Specialist",
      desc: "Licensed Orthopedic and Trauma surgeon with verified clinical credentials.",
      icon: ShieldCheck,
    },
    {
      title: "Online Consultation",
      desc: "Get expert advice and diagnostic review from the comfort of home.",
      icon: MessageSquare,
    },
    {
      title: "Easy Booking",
      desc: "Book appointments in just a few clicks with fast WhatsApp confirmation.",
      icon: CalendarCheck,
    },
    {
      title: "Secure & Private",
      desc: "Your medical inquiries and health data are strictly confidential and protected.",
      icon: Lock,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Why Choose Dr. Abdijalii?
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            We make orthopedic care simple, accessible and reliable for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((pt) => {
            const Icon = pt.icon;
            return (
              <div
                key={pt.title}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-teal-200 transition-all flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {pt.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
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
