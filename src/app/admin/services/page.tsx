"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Service } from "@/types/database.types";
import { Plus, Edit3, Trash2, Eye, EyeOff, Activity, Loader2, Check } from "lucide-react";

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    category: "Trauma Surgery",
    is_published: true,
  });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data } = await supabase.from("services").select("*").order("sort_order");
      if (data) {
        setServices(data as Service[]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const supabase = createClient();
      const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const { error } = await supabase.from("services").insert({
        title: form.title,
        slug,
        description: form.description,
        category: form.category,
        is_published: form.is_published,
      });

      if (!error) {
        setShowModal(false);
        setForm({ title: "", slug: "", description: "", category: "Trauma Surgery", is_published: true });
        fetchServices();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (id: string, currentState: boolean) => {
    try {
      const supabase = createClient();
      await supabase.from("services").update({ is_published: !currentState }).eq("id", id);
      setServices((prev) =>
        prev.map((s) => (s.id === id ? { ...s, is_published: !currentState } : s))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Orthopedic Services Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Publish, edit, or archive clinical treatments visible to patients on the website.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Service
        </button>
      </div>

      {/* Services List */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-slate-400 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-teal-600" />
            <p className="text-sm">Loading orthopedic services...</p>
          </div>
        ) : services.length === 0 ? (
          <div className="p-16 text-center text-slate-400">
            <Activity className="w-12 h-12 mx-auto text-slate-300 mb-2" />
            <p className="font-bold text-slate-700">No services configured yet</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {services.map((svc) => (
              <div
                key={svc.id}
                className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900">{svc.title}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded">
                      {svc.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        svc.is_published
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {svc.is_published ? "Published" : "Draft / Hidden"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 max-w-xl">{svc.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => togglePublish(svc.id, svc.is_published)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    {svc.is_published ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                        Unpublish
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5 text-teal-600" />
                        Publish
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5">
            <h2 className="text-xl font-bold text-slate-900">Add New Orthopedic Service</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Service Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Minimally Invasive Knee Arthroscopy"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Joint Care, Trauma Surgery, Sports Medicine"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Clinical summary of the procedure..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-5 py-2 rounded-xl text-xs shadow-md"
                >
                  {saving ? "Saving..." : "Save Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

