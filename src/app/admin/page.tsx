import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { siteConfig } from "@/config/site";
import {
  Calendar,
  Clock,
  CheckCircle2,
  Activity,
  BookOpen,
  ArrowRight,
  User,
  PlusCircle,
  AlertCircle,
  Phone,
} from "lucide-react";

export const metadata = {
  title: "Doctor Dashboard Overview",
};

export default async function AdminOverviewPage() {
  const supabase = createAdminClient();

  // Fetch metrics with graceful fallback
  let totalAppointments = 0;
  let pendingCount = 0;
  let confirmedCount = 0;
  let activeServicesCount = 6;
  let articlesCount = 3;
  let recentAppointments: Array<{
    id: string;
    patient_name: string;
    phone: string;
    appointment_date: string;
    appointment_time: string;
    status: string;
    reason: string | null;
  }> = [];

  try {
    const { count: total } = await supabase
      .from("appointments")
      .select("*", { count: "exact", head: true });
    totalAppointments = total || 0;

    const { count: pending } = await supabase
      .from("appointments")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending");
    pendingCount = pending || 0;

    const { count: confirmed } = await supabase
      .from("appointments")
      .select("*", { count: "exact", head: true })
      .eq("status", "confirmed");
    confirmedCount = confirmed || 0;

    const { data: appointments } = await supabase
      .from("appointments")
      .select("id, patient_name, phone, appointment_date, appointment_time, status, reason")
      .order("created_at", { ascending: false })
      .limit(5);

    if (appointments) {
      recentAppointments = appointments;
    }

    const { count: services } = await supabase
      .from("services")
      .select("*", { count: "exact", head: true });
    if (services) activeServicesCount = services;

    const { count: articles } = await supabase
      .from("articles")
      .select("*", { count: "exact", head: true });
    if (articles) articlesCount = articles;
  } catch (err) {
    console.error("Dashboard overview query fallback:", err);
  }

  const statCards = [
    {
      title: "Pending Requests",
      value: pendingCount,
      desc: "Needs doctor review",
      icon: Clock,
      color: "bg-amber-50 text-amber-600 border-amber-200",
      href: "/admin/appointments?status=pending",
    },
    {
      title: "Confirmed Visits",
      value: confirmedCount,
      desc: "Scheduled consultations",
      icon: CheckCircle2,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
      href: "/admin/appointments?status=confirmed",
    },
    {
      title: "Total Inquiries",
      value: totalAppointments,
      desc: "All recorded bookings",
      icon: Calendar,
      color: "bg-teal-50 text-teal-600 border-teal-200",
      href: "/admin/appointments",
    },
    {
      title: "Published Articles",
      value: articlesCount,
      desc: "Patient education guides",
      icon: BookOpen,
      color: "bg-blue-50 text-blue-600 border-blue-200",
      href: "/admin/blog",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-teal-600 tracking-wider uppercase bg-teal-50 px-3 py-1 rounded-full">
            Clinic Command Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
            Welcome, Dr. Abdijalii
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Review incoming patient appointments, manage orthopedic procedures, and update health guides.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/appointments"
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm shadow-md transition-colors"
          >
            <Calendar className="w-4 h-4" />
            Manage Appointments
          </Link>
          <Link
            href="/admin/services"
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            Add Service
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((st) => {
          const Icon = st.icon;
          return (
            <Link
              key={st.title}
              href={st.href}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-teal-300 transition-all group block"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {st.title}
                </span>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${st.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900 group-hover:text-teal-600 transition-colors">
                {st.value}
              </div>
              <p className="text-xs text-slate-400 mt-1">{st.desc}</p>
            </Link>
          );
        })}
      </div>

      {/* Recent Appointments Preview */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Recent Appointment Requests</h2>
            <p className="text-xs text-slate-500">Patients seeking clinical consultation</p>
          </div>
          <Link
            href="/admin/appointments"
            className="text-xs font-bold text-teal-600 hover:text-teal-800 flex items-center gap-1"
          >
            View All
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentAppointments.length === 0 ? (
          <div className="p-8 text-center text-slate-400 space-y-2">
            <Calendar className="w-10 h-10 mx-auto text-slate-300" />
            <p className="text-sm font-medium">No appointment requests in database yet.</p>
            <p className="text-xs text-slate-400">
              When patients book via the public website, their requests appear here for triage.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Patient</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Requested Date</th>
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentAppointments.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      {item.patient_name}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-mono text-xs">{item.phone}</td>
                    <td className="py-3.5 px-4 text-slate-700">{item.appointment_date}</td>
                    <td className="py-3.5 px-4 text-slate-700">{item.appointment_time}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          item.status === "confirmed"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : item.status === "pending"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href="/admin/appointments"
                        className="text-xs font-semibold text-teal-600 hover:underline"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

