import { ShieldCheck, Lock, EyeOff, FileText } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Privacy Policy & Patient Data Security",
  description: "Learn how Dr. Abdijalii's practice safeguards your medical records, appointment requests, and personal contact information.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-white py-14 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 border-b border-slate-100 pb-8 mb-8">
          <span className="text-xs font-bold text-teal-600 tracking-wider uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-100">
            Confidentiality & Compliance
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Last Updated: October 2026 • Practice of {siteConfig.doctor.name}
          </p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              1. Our Commitment to Patient Confidentiality
            </h2>
            <p>
              At the orthopedic practice of {siteConfig.doctor.name}, we treat patient medical privacy with
              the highest degree of professional responsibility. When you submit an appointment booking request,
              contact inquiry, or consultation questionnaire, your submitted information is processed solely for
              clinical coordination and direct communication with you.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-teal-600" />
              2. Information We Collect
            </h2>
            <p>We collect only the essential information needed to schedule and conduct orthopedic evaluations:</p>
            <ul className="list-disc pl-6 space-y-1 text-slate-600">
              <li>Full Name and contact telephone / WhatsApp number.</li>
              <li>Preferred appointment date and clinical time slot.</li>
              <li>Brief descriptions of the musculoskeletal symptoms or bone fracture history provided voluntarily.</li>
              <li>Email address (optional, if you request digital confirmation).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-teal-600" />
              3. Data Security & Access Controls (RLS Protection)
            </h2>
            <p>
              Unlike simple websites that expose databases publicly, this portal is engineered with strict
              PostgreSQL Row Level Security (RLS):
            </p>
            <ul className="list-disc pl-6 space-y-1 text-slate-600">
              <li>
                Public visitors can only submit appointment requests; they <strong>cannot read or view</strong>{" "}
                requests submitted by any other patient.
              </li>
              <li>
                Only authorized clinical administrators ({siteConfig.doctor.name}) authenticated through encrypted
                session verification can review appointment details.
              </li>
              <li>
                No medical data or personal contact details are sold, rented, or traded to marketing companies or
                third parties under any circumstances.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-600" />
              4. Contacting Us Regarding Your Data
            </h2>
            <p>
              If you have any questions about this privacy statement, or wish to request updating or removal of your
              contact details from our scheduling log, please reach out to our clinic coordination desk:
            </p>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-xs sm:text-sm space-y-1 text-slate-700">
              <div><strong>Practice:</strong> {siteConfig.name}</div>
              <div><strong>Location:</strong> {siteConfig.doctor.location}</div>
              <div><strong>Phone:</strong> {siteConfig.doctor.phone}</div>
              <div><strong>Email:</strong> {siteConfig.doctor.email}</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

