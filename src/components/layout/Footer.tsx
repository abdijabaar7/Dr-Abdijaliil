import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Stethoscope, MapPin, Phone, Mail, Clock, MessageSquare, ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white tracking-tight">
                  {siteConfig.name}
                </span>
                <span className="text-xs font-medium text-teal-400">
                  {siteConfig.doctor.specialty}
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Providing modern, compassionate orthopedic surgery and evidence-based bone care in
              Mogadishu, Somalia. From complex fracture management to joint restoration and sports
              rehabilitation.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={`https://wa.me/${siteConfig.doctor.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-medium hover:bg-emerald-600/30 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Direct WhatsApp Desk
              </a>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                Verified Specialist
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-teal-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-teal-400 transition-colors">
                  About Dr. Abdijalii
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-teal-400 transition-colors">
                  Orthopedic Services
                </Link>
              </li>
              <li>
                <Link href="/conditions" className="hover:text-teal-400 transition-colors">
                  Conditions & Treatments
                </Link>
              </li>
              <li>
                <Link href="/appointments" className="hover:text-teal-400 transition-colors">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="hover:text-teal-400 transition-colors">
                  Online Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Clinical Focus */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">
              Specialties
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="text-slate-400">Fractures & Bone Trauma</li>
              <li className="text-slate-400">Knee & Joint Preservation</li>
              <li className="text-slate-400">Shoulder & Hip Care</li>
              <li className="text-slate-400">Sports Injury Rehabilitation</li>
              <li className="text-slate-400">Pediatric Orthopedic Assessments</li>
              <li className="text-slate-400">Spine Strain & Posture Evaluation</li>
            </ul>
          </div>

          {/* Clinic Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">
              Clinic Contact
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <span>{siteConfig.doctor.location}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{siteConfig.doctor.hours}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`tel:${siteConfig.doctor.phone}`} className="hover:text-white transition-colors">
                  {siteConfig.doctor.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`mailto:${siteConfig.doctor.email}`} className="hover:text-white transition-colors">
                  {siteConfig.doctor.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/faq" className="hover:text-slate-400 transition-colors">
              Patient FAQs
            </Link>
            <Link href="/admin/login" className="text-slate-400 hover:text-teal-400 transition-colors">
              Doctor Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

