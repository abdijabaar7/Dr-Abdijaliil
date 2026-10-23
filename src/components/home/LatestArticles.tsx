import Link from "next/link";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";

export function LatestArticles() {
  const articles = [
    {
      title: "How to Recognize and Provide First Aid for Bone Fractures",
      slug: "bone-fracture-first-aid-guide",
      category: "Trauma & First Aid",
      date: "Oct 20, 2026",
      readTime: "4 min read",
      excerpt:
        "Crucial early steps when dealing with suspected bone fractures, immobilization tips, and when to seek urgent hospital care.",
    },
    {
      title: "Living Well with Knee Osteoarthritis: Evidence-Based Steps",
      slug: "knee-osteoarthritis-management",
      category: "Joint Health",
      date: "Oct 15, 2026",
      readTime: "5 min read",
      excerpt:
        "Exploring non-invasive therapies, weight management, low-impact joint exercises, and modern options to alleviate joint stiffness.",
    },
    {
      title: "Preventing Common Sports Injuries: A Guide for Young Athletes",
      slug: "preventing-sports-injuries-somalia",
      category: "Sports Medicine",
      date: "Oct 10, 2026",
      readTime: "3 min read",
      excerpt:
        "Warm-up dynamics, hydration in warm climates, and progressive training strategies to prevent ACL and ankle tears.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-teal-600 tracking-wider uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-100">
              Health Insights
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Latest Health Articles
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Stay informed with orthopedic guidance, joint health maintenance, and fracture prevention tips.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-600 hover:text-teal-700 group shrink-0"
          >
            View All Articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article
              key={art.slug}
              className="bg-white rounded-2xl border border-slate-100 hover:border-teal-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div className="p-7">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                  <span className="font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">
                    {art.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {art.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-700 transition-colors leading-snug">
                  <Link href={`/blog/${art.slug}`}>{art.title}</Link>
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {art.excerpt}
                </p>
              </div>

              <div className="px-7 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {art.date}
                </span>
                <Link
                  href={`/blog/${art.slug}`}
                  className="text-xs font-bold text-teal-600 hover:text-teal-800 flex items-center gap-1"
                >
                  Read Article
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

