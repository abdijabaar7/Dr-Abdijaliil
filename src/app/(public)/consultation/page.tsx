"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { MessageSquare, Phone, User, Calendar, CheckCircle2, AlertCircle, Info, Loader2 } from "lucide-react";

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    preferred_mode: "WhatsApp",
    preferred_time: "Morning (09:00 - 12:00)",
    summary: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const createWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hello Dr. Abdijalii, I would like to request an online pre-consultation.\n` +
        `Patient Name: ${formData.name}\n` +
        `Phone: ${formData.phone}\n` +
        `Preferred Channel: ${formData.preferred_mode}\n` +
        `Preferred Window: ${formData.preferred_time}\n` +
        `Brief Summary: ${formData.summary}`
    );
    return `https://wa.me/${siteConfig.doctor.whatsapp}?text=${text}`;
  };

  return (
    <div className="bg-white py-14 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-teal-600 tracking-wider uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-100">
            Digital Triage & Inquiry
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-3">
            Online Orthopedic Inquiry
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Need initial orthopedic advice before travelling to the clinic? Submit your request below or
            message our clinic desk directly via WhatsApp.
          </p>
        </div>

        {/* Clinical Disclaimer Notice */}
        <div className="mb-10 bg-blue-50/80 border border-blue-200/80 rounded-2xl p-5 flex items-start gap-3.5">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-blue-900 leading-relaxed">
            <strong className="font-semibold">Important Medical Notice:</strong> An online inquiry is for
            pre-screening, report review, and scheduling guidance. It is not an emergency medical intervention
            or a definitive clinical diagnosis. Severe pain or acute fractures require immediate in-person evaluation.
          </div>
        </div>

        {submitted ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">Inquiry Received!</h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you, {formData.name}. To accelerate your inquiry, you can connect directly with our clinic
                desk via WhatsApp with your pre-filled inquiry details.
              </p>
            </div>

            <div className="pt-2">
              <a
                href={createWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3.5 rounded-full text-sm shadow-lg shadow-emerald-600/20"
              >
                <MessageSquare className="w-5 h-5" />
                Continue on WhatsApp
              </a>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="+252 61 5000000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Preferred Contact Channel
                </label>
                <select
                  value={formData.preferred_mode}
                  onChange={(e) => setFormData({ ...formData, preferred_mode: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white"
                >
                  <option value="WhatsApp">WhatsApp (Recommended)</option>
                  <option value="Phone Call">Direct Phone Call</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Preferred Window
                </label>
                <select
                  value={formData.preferred_time}
                  onChange={(e) => setFormData({ ...formData, preferred_time: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white"
                >
                  <option value="Morning (09:00 - 12:00)">Morning (09:00 - 12:00)</option>
                  <option value="Afternoon (13:00 - 16:00)">Afternoon (13:00 - 16:00)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                What orthopedic issue are you experiencing? <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                required
                placeholder="Briefly explain your symptoms or previous X-ray findings..."
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-teal-600/20 text-sm sm:text-base flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <MessageSquare className="w-5 h-5" />
                  Submit Online Inquiry
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

