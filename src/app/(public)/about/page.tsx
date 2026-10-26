import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Award, ShieldCheck, HeartPulse, GraduationCap, MapPin, Calendar, Clock } from "lucide-react";

export const metadata = {
  title: "About Dr. Abdijalii Abdiwahab Adan",
  description: "Learn about Dr. Abdijalii's background, orthopedic surgical training, clinical experience, and patient-centered philosophy in Mogadishu, Somalia.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-teal-50/80 to-white py-14 sm:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold text-teal-600 tracking-wider uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-100">
            Specialist Biography
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-4">
            About Dr. Abdijalii Abdiwahab Adan
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Orthopedic and Trauma Surgeon dedicated to restoring mobility, healing complex bone fractures,
            and providing modern musculoskeletal healthcare in Mogadishu, Somalia.
          </p>
        </div>
      </div>

      {/* Main Profile Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Portrait Col */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-white rounded-3xl p-4 border border-slate-100 shadow-xl space-y-6">
              <div className="relative w-full h-[400px] rounded-2xl overflow-hidden bg-slate-100">
                <Image
                  src="/images/doctor/dr-abdijaliil.jpg"
                  alt={siteConfig.doctor.name}
                  fill
                  className="object-cover object-top"
                />
              </div>

              <div className="space-y-3 px-2">
                <h2 className="text-2xl font-bold text-slate-900">{siteConfig.doctor.name}</h2>
                <p className="text-sm text-teal-600 font-semibold">{siteConfig.doctor.specialty}</p>

                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>{siteConfig.doctor.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>{siteConfig.doctor.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Over 4 Years Focused Orthopedic Experience</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col gap-2">
                  <Link
                    href="/appointments"
                    className="w-full text-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl text-sm shadow-md transition-colors"
                  >
                    Book Consultation
                  </Link>
                  <a
                    href={`https://wa.me/${siteConfig.doctor.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2.5 rounded-xl text-xs transition-colors"
                  >
                    Inquire on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bio & Clinical Credentials */}
          <div className="lg:col-span-7 space-y-8">
            <div className="prose prose-slate max-w-none">
              <h3 className="text-2xl font-bold text-slate-900">Professional Background</h3>
              <p className="text-slate-600 leading-relaxed">
                Dr. Abdijalii Abdiwahab Adan is a committed Orthopedic Specialist practicing in Mogadishu,
                Somalia. With comprehensive medical education and specialized clinical training in orthopedic surgery,
                he provides patient-centric treatment for acute bone fractures, chronic joint conditions, sports injuries,
                and musculoskeletal deformities.
              </p>
              <p className="text-slate-600 leading-relaxed">
                His clinical philosophy emphasizes accurate diagnostic evaluation, exploring non-surgical and
                conservative therapeutic avenues first, and employing precision surgical interventions when required
                to ensure the highest probability of restoring full, painless limb function.
              </p>
            </div>

            {/* Key Areas of Specialization */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
              <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-teal-600" />
                Areas of Clinical Focus
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  Bone Fracture Reduction & Plating
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  Knee Osteoarthritis & Joint Care
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  Shoulder Dislocation & Rotator Cuff Care
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  Sports Ligament & Tendon Injuries
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  Pediatric Limb & Growth Assessments
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  Post-traumatic Functional Rehabilitation
                </li>
              </ul>
            </div>

            {/* Practice Values */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-slate-900">Clinical Philosophy & Patient Care</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm space-y-2">
                  <h5 className="font-bold text-slate-900 text-sm">Clear Patient Communication</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Every diagnosis and X-ray finding is explained in clear, approachable terms so you and your
                    family make informed decisions.
                  </p>
                </div>
                <div className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm space-y-2">
                  <h5 className="font-bold text-slate-900 text-sm">Conservative First Approach</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Surgery is recommended only when indicated; non-invasive physical therapy and joint preservation
                    are prioritized whenever safe and effective.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

