"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { GalleryItem } from "@/types/database.types";
import { Plus, Image as ImageIcon, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    image_url: "/images/doctor/design-reference.jpg",
    category: "Clinic",
    is_published: true,
  });

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
      if (data) {
        setItems(data as GalleryItem[]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("gallery").insert(form);
      if (!error) {
        setShowModal(false);
        setForm({
          title: "",
          description: "",
          image_url: "/images/doctor/design-reference.jpg",
          category: "Clinic",
          is_published: true,
        });
        fetchGallery();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Clinic & Surgery Gallery
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Showcase your clinical facilities, consultation rooms, and modern diagnostic technology.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Photo
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-16 text-center text-slate-400 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-teal-600" />
            <p className="text-sm">Loading gallery photos...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="col-span-full bg-white rounded-3xl p-16 text-center text-slate-400 border border-slate-200">
            <ImageIcon className="w-12 h-12 mx-auto text-slate-300 mb-2" />
            <p className="font-bold text-slate-700">No photos in gallery</p>
            <p className="text-xs text-slate-400 mt-1">Upload verified clinic environment photos.</p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm space-y-3 p-4"
            >
              <div className="h-44 bg-slate-100 rounded-xl overflow-hidden relative">
                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-white/90 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  {item.category}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500">{item.description}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Add Gallery Image</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modern Consultation Suite"
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
                  rows={2}
                  placeholder="Brief caption..."
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
                  {saving ? "Adding..." : "Add Photo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

