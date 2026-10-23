import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function LatestArticles() {
  const articles = [
    {
      title: "10 Simple Habits for a Healthier Joint & Bone System",
      slug: "bone-fracture-first-aid-guide",
      date: "May 10, 2026",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Best Foods for Stronger Bone Immunity & Calcium Recovery",
      slug: "knee-osteoarthritis-management",
      date: "May 02, 2026",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "How to Manage Stress and Muscle Tension Effectively",
      slug: "preventing-sports-injuries-somalia",
      date: "May 01, 2026",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Latest Health Articles
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Stay informed with the latest health tips and expert advice.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 group"
          >
            View All Articles
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art) => (
            <article
              key={art.slug}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col"
            >
              <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2 leading-snug">
                    <Link href={`/blog/${art.slug}`}>{art.title}</Link>
                  </h3>
                  <div className="pt-3">
                    <Link
                      href={`/blog/${art.slug}`}
                      className="text-xs font-bold text-teal-600 hover:text-teal-800 flex items-center gap-1"
                    >
                      Read More
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 mt-4">
                  {art.date}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
