import Link from "next/link";
import Image from "next/image";

export function ConsultationCtaBanner() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0e2c38] rounded-3xl p-6 sm:p-10 text-white shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Consultation Photo */}
          <div className="md:col-span-5 relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-inner">
            <Image
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop"
              alt="Consultation With Doctor"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Heading & Button */}
          <div className="md:col-span-7 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
              Need an Orthopedic Consultation? <br />
              It&apos;s Just a Click Away
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md">
              Book your consultation with Dr. Abdijalii today and receive specialized bone and joint care.
            </p>
            <div className="pt-1">
              <Link
                href="/appointments"
                className="inline-block bg-white hover:bg-slate-100 text-[#0e2c38] font-bold px-7 py-3 rounded-full text-sm shadow-md transition-all"
              >
                Book an Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
