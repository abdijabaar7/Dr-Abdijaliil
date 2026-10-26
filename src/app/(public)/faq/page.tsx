"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, HelpCircle, Calendar, MessageSquare } from "lucide-react";
import { siteConfig } from "@/config/site";

const FAQS = [
  {
    q: "How do I book an appointment with Dr. Abdijalii?",
    a: "You can book an appointment using our online booking form on this website, or reach out directly to our clinic coordination desk via WhatsApp (+252 61 9515497). Our team confirms your preferred date and time quickly.",
    cat: "Booking",
  },
  {
    q: "Where is Dr. Abdijalii's clinic located and what are the working hours?",
    a: "The clinic is centrally located in Mogadishu, Somalia. In-person clinical consultations are held Saturday through Thursday from 8:00 AM to 4:00 PM. Fridays are reserved for emergency triage.",
    cat: "Location & Hours",
  },
  {
    q: "What should I bring to my first orthopedic consultation?",
    a: "Please bring any prior digital X-rays, MRI/CT scans, previous surgery reports or discharge summaries, your current prescription medications, and a valid phone number for coordination.",
    cat: "Consultation",
  },
  {
    q: "Do I always need surgery for bone fractures or joint pain?",
    a: "No. The vast majority of orthopedic conditions—including many fractures, sprains, and early osteoarthritis—can be managed successfully with non-surgical conservative treatments such as modern casting, braces, physical therapy, and targeted medications. Surgery is only recommended when clearly beneficial.",
    cat: "Treatment",
  },
  {
    q: "How soon can I walk after casting or fracture treatment?",
    a: "Weight-bearing timelines depend strictly on the fracture location, bone stability, and whether surgical fixation or a cast was used. Dr. Abdijalii will provide a clear, phased protocol detailing when partial and full weight-bearing are safe.",
    cat: "Recovery",
  },
  {
    q: "Can I receive consultation assistance if I live outside Mogadishu?",
    a: "Yes. Patients from other regions of Somalia can submit an online inquiry with their symptoms and previous diagnostic reports for preliminary guidance before travelling to Mogadishu for clinical care.",
    cat: "Consultation",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-teal-50/80 to-white py-14 sm:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold text-teal-600 tracking-wider uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-100">
            Frequently Asked Questions
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-4">
            Patient FAQs
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Find answers to common questions about consultations, fracture treatments, clinic hours, and booking.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200/80 rounded-2xl overflow-hidden transition-all bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors focus:outline-none"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center text-xs font-bold shrink-0">
                      Q{idx + 1}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-slate-900">
                      {faq.q}
                    </span>
                  </div>
                  <span className="text-slate-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-5 h-5 text-teal-600" /> : <ChevronDown className="w-5 h-5" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-14 bg-navy-800 text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">Still have questions?</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Our clinic desk is ready to assist you via WhatsApp or direct call.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${siteConfig.doctor.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-5 py-3 rounded-full text-sm shadow-md transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Us
            </a>
            <Link
              href="/appointments"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 font-semibold px-5 py-3 rounded-full text-sm shadow-md transition-all"
            >
              <Calendar className="w-4 h-4 text-teal-600" />
              Book Slot
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

