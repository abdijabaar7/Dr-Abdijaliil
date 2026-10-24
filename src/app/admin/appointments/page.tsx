"use client";

import { useState, useEffect, useCallback } from "react";
import { Appointment, AppointmentStatus } from "@/types/database.types";
import {
  Calendar,
  Clock,
  Phone,
  User,
  CheckCircle2,
  XCircle,
  CheckCheck,
  MessageSquare,
  Search,
  Loader2,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

export default function AppointmentsAdminPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const url =
        statusFilter === "all"
          ? "/api/admin/appointments"
          : `/api/admin/appointments?status=${statusFilter}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to load appointments (status ${res.status})`);
      }
      const data = await res.json();
      if (data.appointments) {
        setAppointments(data.appointments);
      }
    } catch (err: unknown) {
      console.error("Error loading appointments:", err);
      setErrorMsg(err instanceof Error ? err.message : "Error loading appointments");
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const updateStatus = async (id: string, newStatus: AppointmentStatus) => {
    setActionLoadingId(id);
    try {
      const res = await fetch("/api/admin/appointments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to update appointment status");
      }

      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
      );
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to update status");
    } finally {
      setActionLoadingId(null);
    }
  };

  const filtered = appointments.filter((a) => {
    const query = search.toLowerCase();
    return (
      a.patient_name.toLowerCase().includes(query) ||
      a.phone.toLowerCase().includes(query) ||
      (a.reason && a.reason.toLowerCase().includes(query))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Appointments Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Triage patient requests, confirm clinical visit slots, and update statuses.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchAppointments()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
            title="Refresh appointments"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex flex-wrap gap-1.5">
          {["all", "pending", "confirmed", "completed", "cancelled"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                statusFilter === st
                  ? "bg-teal-600 text-white shadow-sm"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60"
              }`}
            >
              {st}
              {st === "pending" && appointments.filter((a) => a.status === "pending").length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] bg-amber-400 text-slate-900">
                  {appointments.filter((a) => a.status === "pending").length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Quick Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search patient, phone, symptoms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs text-slate-900 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
          />
        </div>
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Appointments List */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-slate-400 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-teal-600" />
            <p className="text-sm">Loading appointment requests from database...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center text-slate-400 space-y-2">
            <Calendar className="w-12 h-12 mx-auto text-slate-300" />
            <p className="text-base font-bold text-slate-700">No appointments found</p>
            <p className="text-xs text-slate-400">
              No matching records under status &ldquo;{statusFilter}&rdquo;.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="p-6 hover:bg-slate-50/70 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-base text-slate-900 flex items-center gap-2">
                      <User className="w-4 h-4 text-teal-600" />
                      {item.patient_name}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${
                        item.status === "confirmed"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : item.status === "pending"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : item.status === "completed"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                    <span className="flex items-center gap-1 font-mono">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {item.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {item.appointment_date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {item.appointment_time}
                    </span>
                  </div>

                  {item.reason && (
                    <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 max-w-xl">
                      <strong className="text-slate-800">Calaamado / Sabab:</strong> {item.reason}
                    </p>
                  )}
                </div>

                {/* Status action buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`https://wa.me/${item.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                      `Salaamu calaykum ${item.patient_name}, kani waa Dr. Abdijalii (Dhaqtarka Qalliinka Lafaha & Dhaawacyada). Waxaan xaqiijinaynaa ballantaada ee taariikhda ${item.appointment_date} saacadda ${item.appointment_time}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold px-3 py-2 rounded-xl text-xs border border-emerald-200 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    WhatsApp
                  </a>

                  {item.status !== "confirmed" && (
                    <button
                      onClick={() => updateStatus(item.id, "confirmed")}
                      disabled={actionLoadingId === item.id}
                      className="inline-flex items-center gap-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-3 py-2 rounded-xl text-xs shadow-sm transition-colors disabled:opacity-50"
                    >
                      {actionLoadingId === item.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      )}
                      Confirm
                    </button>
                  )}

                  {item.status !== "completed" && (
                    <button
                      onClick={() => updateStatus(item.id, "completed")}
                      disabled={actionLoadingId === item.id}
                      className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 font-semibold px-3 py-2 rounded-xl text-xs transition-colors disabled:opacity-50"
                    >
                      {actionLoadingId === item.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <CheckCheck className="w-3.5 h-3.5" />
                      )}
                      Complete
                    </button>
                  )}

                  {item.status !== "cancelled" && (
                    <button
                      onClick={() => updateStatus(item.id, "cancelled")}
                      disabled={actionLoadingId === item.id}
                      className="inline-flex items-center gap-1 bg-slate-50 text-red-600 hover:bg-red-50 border border-slate-200 font-semibold px-3 py-2 rounded-xl text-xs transition-colors disabled:opacity-50"
                    >
                      {actionLoadingId === item.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5" />
                      )}
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
