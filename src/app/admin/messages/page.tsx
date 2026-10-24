"use client";

import { useState, useEffect, useCallback } from "react";
import { ContactMessage } from "@/types/database.types";
import {
  MessageSquare,
  User,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Clock,
  Search,
  Loader2,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch (err) {
      console.error("Messages fetch err:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const toggleRead = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, is_read: !currentStatus }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, is_read: !currentStatus } : m))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = messages.filter((m) => {
    if (filter === "unread" && m.is_read) return false;
    if (filter === "read" && !m.is_read) return false;
    const q = search.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.phone.toLowerCase().includes(q) ||
      (m.subject && m.subject.toLowerCase().includes(q)) ||
      m.message.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Patient Inquiries & Messages
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Farriimaha iyo weydiimaha dadweynaha ee laga soo diray foomka xiriirka bogga.
          </p>
        </div>

        <button
          onClick={() => fetchMessages()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-sm self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              filter === "all"
                ? "bg-teal-600 text-white shadow-sm"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100"
            }`}
          >
            All ({messages.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              filter === "unread"
                ? "bg-teal-600 text-white shadow-sm"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100"
            }`}
          >
            Unread ({messages.filter((m) => !m.is_read).length})
          </button>
          <button
            onClick={() => setFilter("read")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              filter === "read"
                ? "bg-teal-600 text-white shadow-sm"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100"
            }`}
          >
            Read ({messages.filter((m) => m.is_read).length})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search patient, message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs text-slate-900 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-slate-400 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-teal-600" />
            <p className="text-sm">Loading messages...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center text-slate-400 space-y-2">
            <MessageSquare className="w-12 h-12 mx-auto text-slate-300" />
            <p className="text-base font-bold text-slate-700">No messages found</p>
            <p className="text-xs text-slate-400">Wax farriin ah oo ku hoos jira shaandhada ma jiraan.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map((item) => (
              <div
                key={item.id}
                className={`p-6 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-6 ${
                  !item.is_read ? "bg-teal-50/30" : "hover:bg-slate-50/70"
                }`}
              >
                <div className="space-y-2.5 max-w-3xl">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-base text-slate-900 flex items-center gap-2">
                      <User className="w-4 h-4 text-teal-600" />
                      {item.name}
                    </span>
                    {!item.is_read && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 uppercase tracking-wider">
                        New Message
                      </span>
                    )}
                  </div>

                  {item.subject && (
                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Mowduuca: {item.subject}
                    </h3>
                  )}

                  <p className="text-xs sm:text-sm text-slate-700 bg-white p-3 rounded-2xl border border-slate-100 shadow-xs leading-relaxed">
                    &ldquo;{item.message}&rdquo;
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-mono">
                    <span className="flex items-center gap-1 text-slate-700">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {item.phone}
                    </span>
                    {item.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        {item.email}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`https://wa.me/${item.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                      `Salaamu calaykum ${item.name}, kani waa Dr. Abdijalii oo ka jawaabaya fariintaadii aad nooga soo dirtay website-ka.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold px-3 py-2 rounded-xl text-xs border border-emerald-200 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Reply on WhatsApp
                  </a>

                  <button
                    onClick={() => toggleRead(item.id, item.is_read)}
                    className="inline-flex items-center gap-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold px-3 py-2 rounded-xl text-xs transition-colors shadow-xs"
                  >
                    <CheckCircle2 className={`w-3.5 h-3.5 ${item.is_read ? "text-emerald-600" : "text-slate-400"}`} />
                    {item.is_read ? "Mark Unread" : "Mark as Read"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
