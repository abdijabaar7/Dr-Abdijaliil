"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { siteConfig } from "@/config/site";
import { User, Phone, MapPin, Clock, Mail, Save, CheckCircle2, Loader2 } from "lucide-react";

export default function SettingsAdminPage() {
  const [profile, setProfile] = useState({
    full_name: siteConfig.doctor.name,
    specialty: siteConfig.doctor.specialty,
    experience_years: siteConfig.doctor.experienceYears,
    location: siteConfig.doctor.location,
    phone: siteConfig.doctor.phone,
    whatsapp_number: siteConfig.doctor.whatsapp,
    email: siteConfig.doctor.email,
    working_hours: siteConfig.doctor.hours,
    biography:
      "Dr. Abdijalii Abdiwahab Adan is a dedicated Orthopedic and Trauma Surgeon based in Mogadishu, Somalia. Focused on evidence-based bone fracture care, joint arthroplasty, and sports injuries.",
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.from("doctor_profile").select("*").limit(1).maybeSingle();
        if (data) {
          setProfile({
            full_name: data.full_name || siteConfig.doctor.name,
            specialty: data.specialty || siteConfig.doctor.specialty,
            experience_years: data.experience_years ?? siteConfig.doctor.experienceYears,
            location: data.location || siteConfig.doctor.location,
            phone: data.phone || siteConfig.doctor.phone,
            whatsapp_number: data.whatsapp_number || siteConfig.doctor.whatsapp,
            email: data.email || siteConfig.doctor.email,
            working_hours: data.working_hours || siteConfig.doctor.hours,
            biography: data.biography || "",
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      const supabase = createClient();
      await supabase
        .from("doctor_profile")
        .upsert({
          id: "a0000000-0000-0000-0000-000000000001",
          ...profile,
        });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Doctor Profile & Clinic Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Update the doctor credentials, WhatsApp contact numbers, and clinic hours shown across the website.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
        {success && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Profile and clinic settings updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Doctor Full Name
              </label>
              <input
                type="text"
                required
                value={profile.full_name}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Specialty Title
              </label>
              <input
                type="text"
                required
                value={profile.specialty}
                onChange={(e) => setProfile({ ...profile, specialty: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Phone Contact Number
              </label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                WhatsApp Number (without + or spaces)
              </label>
              <input
                type="text"
                value={profile.whatsapp_number}
                onChange={(e) => setProfile({ ...profile, whatsapp_number: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Clinic Location
              </label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Clinic Working Hours
              </label>
              <input
                type="text"
                value={profile.working_hours}
                onChange={(e) => setProfile({ ...profile, working_hours: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Professional Biography
            </label>
            <textarea
              rows={4}
              value={profile.biography}
              onChange={(e) => setProfile({ ...profile, biography: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md transition-colors"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Profile Settings
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

