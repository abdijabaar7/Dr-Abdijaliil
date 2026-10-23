"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Article } from "@/types/database.types";
import { Plus, BookOpen, Clock, Eye, EyeOff, Loader2 } from "lucide-react";

export default function BlogAdminPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "Bone Health",
    read_time: "4 min read",
    excerpt: "",
    content: "",
    status: "published" as "draft" | "published",
  });

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data } = await supabase.from("articles").select("*").order("created_at", { ascending: false });
      if (data) {
        setArticles(data as Article[]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const supabase = createClient();
      const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const { error } = await supabase.from("articles").insert({
        title: form.title,
        slug,
        category: form.category,
        read_time: form.read_time,
        excerpt: form.excerpt,
        content: form.content,
        status: form.status,
      });

      if (!error) {
        setShowModal(false);
        setForm({
          title: "",
          slug: "",
          category: "Bone Health",
          read_time: "4 min read",
          excerpt: "",
          content: "",
          status: "published",
        });
        fetchArticles();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (id: string, currentStatus: "draft" | "published") => {
    const nextStatus = currentStatus === "published" ? "draft" : "published";
    try {
      const supabase = createClient();
      await supabase.from("articles").update({ status: nextStatus }).eq("id", id);
      setArticles((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: nextStatus } : a))
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
            Health Articles & Patient Guides
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Write, edit, and publish educational orthopedic articles for your patients.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          Write New Article
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-slate-400 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-teal-600" />
            <p className="text-sm">Loading articles...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="p-16 text-center text-slate-400">
            <BookOpen className="w-12 h-12 mx-auto text-slate-300 mb-2" />
            <p className="font-bold text-slate-700">No articles written yet</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {articles.map((art) => (
              <div
                key={art.id}
                className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900">{art.title}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                      {art.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        art.status === "published"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {art.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 max-w-xl">{art.excerpt}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleStatus(art.id, art.status)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    {art.status === "published" ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                        Move to Draft
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5 text-teal-600" />
                        Publish Now
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Article Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-slate-900">Write New Health Article</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Caring for Casts and Avoiding Skin Infections"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                    Read Time
                  </label>
                  <input
                    type="text"
                    required
                    value={form.read_time}
                    onChange={(e) => setForm({ ...form, read_time: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Brief Excerpt / Summary
                </label>
                <textarea
                  rows={2}
                  placeholder="1-2 sentences summarizing the article..."
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Article Content
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder="Write medical content and patient guidelines..."
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-sans"
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
                  {saving ? "Publishing..." : "Publish Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

