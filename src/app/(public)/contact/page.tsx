"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
    website_field_hp: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setSuccess(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
        website_field_hp: "",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-teal-50/80 to-white py-14 sm:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold text-teal-600 tracking-wider uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-100">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-4">
            Contact Dr. Abdijalii
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Have questions about an orthopedic condition or consultation schedule? Reach out to our
            clinic desk in Mogadishu.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Clinic Coordination Desk</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                We are here to assist you with scheduling, clinical questions, and diagnostic report reviews.
              </p>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Clinic Location</div>
                    <div>{siteConfig.doctor.location}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Phone Calls</div>
                    <a href={`tel:${siteConfig.doctor.phone}`} className="hover:text-teal-600 transition-colors">
                      {siteConfig.doctor.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-green-100 text-green-700 flex items-center justify-center shrink-0 mt-0.5">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">WhatsApp Desk</div>
                    <a
                      href={`https://wa.me/${siteConfig.doctor.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-semibold hover:underline"
                    >
                      +{siteConfig.doctor.whatsapp} (Chat Now)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Email Address</div>
                    <a href={`mailto:${siteConfig.doctor.email}`} className="hover:text-teal-600 transition-colors">
                      {siteConfig.doctor.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Clinic Hours</div>
                    <div>{siteConfig.doctor.hours}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-xl space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Send a General Message</h2>

              {errorMsg && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {success && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>Thank you! Your message has been sent to Dr. Abdijalii&apos;s team.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot field */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website_field_hp">Website Field</label>
                  <input
                    id="website_field_hp"
                    type="text"
                    value={formData.website_field_hp}
                    onChange={(e) => setFormData({ ...formData, website_field_hp: e.target.value })}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+252 61 5000000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Appointment question, Knee X-ray"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can Dr. Abdijalii's team help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-teal-600/20"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

