import Link from "next/link";
import { Bone, Activity, Heart, ShieldCheck, UserCheck, ArrowRight } from "lucide-react";

export function PopularServices() {
  const specialties = [
    {
      title: "Bone Fractures",
      subtitle: "Bones & Joints",
      icon: Bone,
      href: "/conditions#fractures",
    },
    {
      title: "Knee Care",
      subtitle: "Joint & Cartilage",
      icon: Activity,
      href: "/conditions#knee-joint",
    },
    {
      title: "Spine Care",
      subtitle: "Back & Posture",
      icon: Heart,
      href: "/conditions#assessment",
    },
    {
      title: "Orthopedics",
      subtitle: "Shoulder & Hip",
      icon: ShieldCheck,
      href: "/services",
    },
    {
      title: "Pediatrics",
      subtitle: "Child Bone Health",
      icon: UserCheck,
      href: "/conditions#pediatric",
    },
  ];

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Popular Specialties
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Find the right orthopedic care for your health needs
            </p>
          </div>
          <Link
            href="/conditions"
            className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 group"
          >
            View All
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {specialties.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="bg-white border border-slate-100 rounded-2xl p-5 hover:border-teal-200 hover:shadow-md transition-all flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3 group-hover:bg-teal-600 group-hover:text-white transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  {item.title}
                </h3>
                <span className="text-[11px] text-slate-400 mt-0.5">
                  {item.subtitle}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
