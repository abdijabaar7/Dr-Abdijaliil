"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import {
  User,
  Phone,
  MapPin,
  Clock,
  Mail,
  Save,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  KeyRound,
  Eye,
  EyeOff,
  UserPlus,
  AlertCircle,
} from "lucide-react";

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
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  // Admin security state
  const [adminsList, setAdminsList] = useState<Array<{ user_id: string; email: string }>>([]);
  const [targetEmail, setTargetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Fetch profile and registered admins
  const fetchProfileAndAdmins = async () => {
    try {
      const res = await fetch("/api/admin/profile");
      if (res.ok) {
        const data = await res.json();
        if (data.profile) {
          setProfile({
            full_name: data.profile.full_name || siteConfig.doctor.name,
            specialty: data.profile.specialty || siteConfig.doctor.specialty,
            experience_years: data.profile.experience_years ?? siteConfig.doctor.experienceYears,
            location: data.profile.location || siteConfig.doctor.location,
            phone: data.profile.phone || siteConfig.doctor.phone,
            whatsapp_number: data.profile.whatsapp_number || siteConfig.doctor.whatsapp,
            email: data.profile.email || siteConfig.doctor.email,
            working_hours: data.profile.working_hours || siteConfig.doctor.hours,
            biography: data.profile.biography || "",
          });
        }
      }
    } catch (err) {
      console.error("Profile load err:", err);
    }

    try {
      const usersRes = await fetch("/api/admin/users");
      if (usersRes.ok) {
        const usersData = await usersRes.json();
        if (usersData.admins && usersData.admins.length > 0) {
          setAdminsList(usersData.admins);
          setTargetEmail(usersData.admins[0].email);
        }
      }
    } catch (err) {
      console.error("Users list err:", err);
    }
  };

  useEffect(() => {
    fetchProfileAndAdmins();
  }, []);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setProfileSuccess(false);
    setProfileError(null);

    try {
      const res = await fetch("/api/admin/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to update profile settings");
      }

      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3500);
    } catch (err: unknown) {
      setProfileError(err instanceof Error ? err.message : "Error saving profile");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword.length < 6) {
      setPasswordError("Furaha sirta ah (Password) waa inuu ka koobnaadaa ugu yaraan 6 xaraf.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Labada furaha sirta ah (Passwords) isma laha, fadlan hubi.");
      return;
    }

    setPasswordLoading(true);

    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: targetEmail.trim(),
          password: newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update password");
      }

      setPasswordSuccess(data.message || `Password-ka ${targetEmail} si guul leh baa loo cusboonaysiiyay!`);
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      setPasswordError(err instanceof Error ? err.message : "Error updating password");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Doctor Profile & Clinic Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Xogta dhaqtarka, lambarrada WhatsApp-ka ballamaha, saacadaha shaqada, iyo furaha maamulka.
        </p>
      </div>

      {/* Security & Password Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Admin Password & Amniga Akoonka (Gmail & Password)
            </h2>
            <p className="text-xs text-slate-500">
              Halkan waxaad ku cusboonaysiin kartaa password-ka aad ku gasho Admin Portalka.
            </p>
          </div>
        </div>

        {passwordSuccess && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{passwordSuccess}</span>
          </div>
        )}

        {passwordError && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span>{passwordError}</span>
          </div>
        )}

        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Admin Email (Gmail-ka Dhaqtarka)
              </label>
              <input
                type="email"
                required
                value={targetEmail}
                onChange={(e) => setTargetEmail(e.target.value)}
                placeholder="e.g. cabdijanaar@gmail.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
              />
              {adminsList.length > 0 && (
                <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                  <span className="font-medium">Akoonada diiwaangashan:</span>
                  {adminsList.map((a) => (
                    <button
                      type="button"
                      key={a.email}
                      onClick={() => setTargetEmail(a.email)}
                      className="inline-flex items-center px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-[11px] font-mono text-slate-700 transition-colors"
                    >
                      {a.email}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Furaha Cusub (New Password)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Gali furaha cusub (ugu yaraan 6 xaraf)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Xaqiiji Furaha Cusub (Confirm Password)
              </label>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Ku celi furaha cusub"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={passwordLoading}
                className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm transition-colors disabled:opacity-50"
              >
                {passwordLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Cusboonaysiinayaa...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-teal-400" />
                    Cusboonaysii Furaha (Update Password)
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Doctor Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Clinical & Contact Information
            </h2>
            <p className="text-xs text-slate-500">
              Xogta guud ee Dr. Abdijalii ee ka muuqata barta internet-ka dadweynaha.
            </p>
          </div>
        </div>

        {profileSuccess && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Xogta dhaqtarka si guul leh baa loo kaydiyay!</span>
          </div>
        )}

        {profileError && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span>{profileError}</span>
          </div>
        )}

        <form onSubmit={handleProfileSave} className="space-y-6">
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
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
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
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
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
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                WhatsApp Number (iyadoo aan lahayn + ama meel bannaan)
              </label>
              <input
                type="text"
                value={profile.whatsapp_number}
                onChange={(e) => setProfile({ ...profile, whatsapp_number: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
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
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
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
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
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
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md transition-colors disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Kaydinayaa...
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
