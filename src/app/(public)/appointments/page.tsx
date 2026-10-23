import { Suspense } from "react";
import { BookingWizard } from "@/components/appointments/BookingWizard";
import { siteConfig } from "@/config/site";
import { MapPin, Clock, Phone, ShieldAlert, CheckCircle, MessageSquare } from "lucide-react";

export const metadata = {
  title: "Book an Orthopedic Appointment",
  description: "Request a consultation appointment with Dr. Abdijalii Abdiwahab Adan in Mogadishu, Somalia.",
};

export default function AppointmentsPage() {
  return (
    <div className="bg-slate-50/50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-teal-600 tracking-wider uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-100">
            Clinic Scheduling
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-3">
            Book an Orthopedic Consultation
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Select your preferred date and time. Our clinic desk will review the slot and confirm your
            scheduled appointment promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Booking Form */}
          <div className="lg:col-span-8">
            <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading form...</div>}>
              <BookingWizard />
            </Suspense>
          </div>

          {/* Sidebar Clinic Details */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-5">
              <h3 className="font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
                Clinic Location & Hours
              </h3>

              <div className="space-y-4 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900">Mogadishu Clinic</div>
                    <div>{siteConfig.doctor.location}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900">Working Hours</div>
                    <div>{siteConfig.doctor.hours}</div>
                    <div className="text-xs text-slate-500 mt-0.5">Friday: Emergency calls only</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900">Phone Contact</div>
                    <a href={`tel:${siteConfig.doctor.phone}`} className="text-teal-600 font-semibold hover:underline">
                      {siteConfig.doctor.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <a
                  href={`https://wa.me/${siteConfig.doctor.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold py-2.5 rounded-xl text-xs border border-emerald-200 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Direct WhatsApp Coordination
                </a>
              </div>
            </div>

            {/* Emergency Notice */}
            <div className="bg-amber-50 rounded-3xl p-6 border border-amber-200/80 space-y-2">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                Acute Trauma or Emergency?
              </div>
              <p className="text-xs text-amber-900/80 leading-relaxed">
                If you or a family member have sustained an open compound bone fracture, neurovascular compromise,
                or severe bleeding, please visit the emergency room immediately or contact our emergency desk.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

