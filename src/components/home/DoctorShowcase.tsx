import Link from "next/link";
import Image from "next/image";
import { Star, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export function DoctorShowcase() {
  const doctors = [
    {
      name: "Dr. Abdijalii A. Adan",
      specialty: "Orthopedic & Trauma Surgeon",
      rating: "4.9/5",
      reviews: "180+ reviews",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: "Dr. Farah M. Ali",
      specialty: "Surgical Assistant & Trauma",
      rating: "4.8/5",
      reviews: "120+ reviews",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: "Dr. Amina H. Warsame",
      specialty: "Physical Rehab & Joint Therapy",
      rating: "4.9/5",
      reviews: "140+ reviews",
      image: "https://images.unsplash.com/photo-1594824813570-34907153b3eb?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: "Dr. Osman K. Nur",
      specialty: "Diagnostic Radiology & Casting",
      rating: "4.8/5",
      reviews: "95+ reviews",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Meet Our Orthopedic Team
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Highly rated. Expert in bone care. Always here for you.
            </p>
          </div>
          <Link
            href="/about"
            className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 group"
          >
            View All Team
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doc, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-100 rounded-2xl p-5 hover:border-teal-200 hover:shadow-lg transition-all flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden mb-4 relative border-2 border-teal-100 shadow-sm">
                <Image
                  src={doc.image}
                  alt={doc.name}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="font-bold text-sm text-slate-900 group-hover:text-teal-700 transition-colors">
                {doc.name}
              </h3>
              <p className="text-[11px] text-slate-400 font-medium mb-2">
                {doc.specialty}
              </p>

              <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mb-4">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                <span>{doc.rating}</span>
                <span className="text-[10px] text-slate-400 font-normal">({doc.reviews})</span>
              </div>

              <Link
                href="/appointments"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-full text-xs shadow-sm transition-colors"
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

