"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle2, AlertCircle, Loader2, MessageSquare } from "lucide-react";

const TIME_SLOTS = [
  "08:30",
  "09:30",
  "10:30",
  "11:30",
  "13:00",
  "14:00",
  "15:00",
];

const SPECIALTY_OPTIONS = [
  { id: "fracture", label: "Bone Fracture or Acute Injury" },
  { id: "knee", label: "Knee Pain & Arthritis / Ligament" },
  { id: "shoulder", label: "Shoulder or Hip Discomfort" },
  { id: "sports", label: "Sports Injury & Sprain" },
  { id: "pediatric", label: "Pediatric Bone Condition" },
  { id: "spine", label: "Spine & Chronic Back Pain" },
  { id: "other", label: "General Orthopedic Consultation" },
];

export function BookingWizard() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service") || "";

  const [formData, setFormData] = useState({
    patient_name: "",
    phone: "",
    email: "",
    appointment_date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    appointment_time: "09:30",
    reason: preselectedService ? `Specialty: ${preselectedService}` : "",
    consent: true,
    website_field_hp: "", // honeypot
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    message: string;
    whatsappLink: string;
    appointmentId?: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.patient_name.trim() || formData.patient_name.trim().length < 2) {
      setErrorMsg("Please enter your full name.");
      return;
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      setErrorMsg("Please provide a valid contact phone number.");
      return;
    }

    if (!formData.appointment_date) {
      setErrorMsg("Please select an appointment date.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_name: formData.patient_name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim() || undefined,
          appointment_date: formData.appointment_date,
          appointment_time: formData.appointment_time,
          reason: formData.reason.trim() || undefined,
          website_field_hp: formData.website_field_hp,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit appointment request.");
      }

      setSuccessData({
        message: data.message || "Appointment request submitted successfully.",
        whatsappLink: data.whatsappLink,
        appointmentId: data.appointmentId,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMsg(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successData) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-xl max-w-2xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Appointment Request Received!
          </h3>
          <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto">
            {successData.message} Our clinic desk in Mogadishu will review the requested slot and
            confirm your scheduled visit.
          </p>
        </div>

        <div className="p-4 bg-teal-50 border border-teal-100 rounded-2xl text-left space-y-2 max-w-md mx-auto text-xs sm:text-sm text-slate-700">
          <div className="flex justify-between">
            <span className="font-semibold text-slate-500">Patient:</span>
            <span className="font-bold text-slate-900">{formData.patient_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-slate-500">Preferred Date:</span>
            <span className="font-bold text-slate-900">{formData.appointment_date}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-slate-500">Preferred Time:</span>
            <span className="font-bold text-slate-900">{formData.appointment_time}</span>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href={successData.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3.5 rounded-full shadow-lg shadow-emerald-600/20 text-sm transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            Fast-Confirm on WhatsApp
          </a>
          <button
            onClick={() => {
              setSuccessData(null);
              setFormData({
                patient_name: "",
                phone: "",
                email: "",
                appointment_date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
                appointment_time: "09:30",
                reason: "",
                consent: true,
                website_field_hp: "",
              });
            }}
            className="inline-flex items-center justify-center text-slate-600 hover:text-slate-900 text-sm font-semibold px-6 py-3.5"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl max-w-2xl mx-auto space-y-6"
    >
      <div className="border-b border-slate-100 pb-5">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          Book an Orthopedic Appointment
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Complete the form below to request a clinical consultation with Dr. Abdijalii in Mogadishu.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Honeypot field - visually hidden */}
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

      {/* Patient Name & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Patient Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              placeholder="e.g. Hassan Ahmed"
              value={formData.patient_name}
              onChange={(e) => setFormData({ ...formData, patient_name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Phone / WhatsApp Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              required
              placeholder="e.g. +252 61 5000000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Email & Specialty selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Email Address <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Specialty / Condition
          </label>
          <select
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white transition-colors"
          >
            <option value="">-- Select Orthopedic Specialty --</option>
            {SPECIALTY_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.label}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Date & Time slot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Preferred Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
              value={formData.appointment_date}
              onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Preferred Time Slot <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              required
              value={formData.appointment_time}
              onChange={(e) => setFormData({ ...formData, appointment_time: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white transition-colors"
            >
              {TIME_SLOTS.map((t) => (
                <option key={t} value={t}>
                  {t} (Clinic Hours)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Additional details */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          Brief Medical Notes / Symptoms <span className="text-slate-400 font-normal">(Optional)</span>
        </label>
        <div className="relative">
          <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <textarea
            rows={3}
            placeholder="Briefly describe your symptoms (e.g. left knee swelling for 2 weeks, fracture follow-up...)"
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Consent checkbox */}
      <div className="flex items-start gap-3 pt-1">
        <input
          id="consent"
          type="checkbox"
          checked={formData.consent}
          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
          className="w-4 h-4 mt-0.5 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
        />
        <label htmlFor="consent" className="text-xs text-slate-600 leading-relaxed">
          I consent to having Dr. Abdijalii&apos;s clinic desk store my contact details to coordinate and
          confirm this consultation. Your health information is kept strictly confidential.
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || !formData.consent}
        className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-teal-600/20 text-sm sm:text-base flex items-center justify-center gap-2 transition-all"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting Request...
          </>
        ) : (
          <>
            <Calendar className="w-5 h-5" />
            Submit Appointment Request
          </>
        )}
      </button>
    </form>
  );
}

