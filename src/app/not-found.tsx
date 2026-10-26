import Link from "next/link";
import { Home, ArrowLeft, Stethoscope } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-3xl bg-teal-50 border border-teal-100 flex items-center justify-center">
            <Stethoscope className="w-10 h-10 text-teal-600" />
          </div>
        </div>

        {/* 404 */}
        <h1 className="text-8xl font-extrabold text-slate-200 leading-none select-none">404</h1>

        <h2 className="text-2xl font-extrabold text-slate-900 mt-2 tracking-tight">
          Page Not Found
        </h2>
        <p className="text-sm text-slate-500 mt-3 leading-relaxed">
          The page you are looking for does not exist or has been moved.
          Return to the homepage to find what you need.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Homepage
          </Link>
          <Link
            href="/appointments"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold px-6 py-3 rounded-xl text-sm transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Book an Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}

