import Link from "next/link";
import Image from "next/image";
import { Star, ArrowRight } from "lucide-react";

export function TestimonialsSection() {
  const reviews = [
    {
      name: "Ahmed M. Warsame",
      location: "Mogadishu, Hodan",
      quote:
        "The consultation was quick, professional and very helpful. I'm so grateful for the knee care service!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Fadumo K. Nur",
      location: "Mogadishu, Waberi",
      quote:
        "Easy to book, great doctor and excellent support. Highly recommended for bone fractures.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Mustafa H. Ali",
      location: "Mogadishu, Wadajir",
      quote:
        "The best healthcare experience I've had. Simple, fast and very reliable shoulder recovery.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              What Our Patients Say
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Real stories. Real people. Real care.
            </p>
          </div>
          <Link
            href="/testimonials"
            className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 group"
          >
            View All Reviews
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* User avatar and name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden relative bg-slate-100 shrink-0">
                    <Image
                      src={rev.image}
                      alt={rev.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{rev.name}</h3>
                    <p className="text-[10px] text-slate-400">{rev.location}</p>
                  </div>
                </div>

                {/* Review quote */}
                <p className="text-xs text-slate-600 leading-relaxed italic mb-4">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              {/* 5 Stars */}
              <div className="flex items-center gap-1 pt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
