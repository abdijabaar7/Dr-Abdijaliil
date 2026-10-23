import Link from "next/link";
import { Clock, Calendar, ArrowRight, BookOpen } from "lucide-react";

export const metadata = {
  title: "Orthopedic Health Articles & Guides",
  description: "Read evidence-based patient education articles on bone fractures, knee arthritis, sports injuries, and recovery.",
};

const ARTICLES = [
  {
    title: "How to Recognize and Provide First Aid for Bone Fractures",
    slug: "bone-fracture-first-aid-guide",
    category: "Trauma & First Aid",
    date: "October 20, 2026",
    readTime: "4 min read",
    excerpt:
      "Crucial early steps when dealing with suspected bone fractures, immobilization tips, and when to seek urgent hospital care in Mogadishu.",
  },
  {
    title: "Living Well with Knee Osteoarthritis: Evidence-Based Steps",
    slug: "knee-osteoarthritis-management",
    category: "Joint Health",
    date: "October 15, 2026",
    readTime: "5 min read",
    excerpt:
      "Exploring non-invasive therapies, weight management, low-impact joint exercises, and modern options to alleviate joint stiffness.",
  },
  {
    title: "Preventing Common Sports Injuries: A Guide for Young Athletes",
    slug: "preventing-sports-injuries-somalia",
    category: "Sports Medicine",
    date: "October 10, 2026",
    readTime: "3 min read",
    excerpt:
      "Warm-up dynamics, hydration in warm climates, and progressive training strategies to prevent ACL and ankle tears.",
  },
];

export default function BlogListingPage() {
  return (
    <div className="bg-white">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-teal-50/80 to-white py-14 sm:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold text-teal-600 tracking-wider uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-100">
            Orthopedic Library
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-4">
            Health Articles & Guides
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Educational insights, fracture prevention, and joint health tips written to help patients make
            informed musculoskeletal wellness decisions.
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTICLES.map((art) => (
            <article
              key={art.slug}
              className="bg-white rounded-3xl border border-slate-100 hover:border-teal-200 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="p-8">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                  <span className="font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-md">
                    {art.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {art.readTime}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-700 transition-colors leading-snug">
                  <Link href={`/blog/${art.slug}`}>{art.title}</Link>
                </h2>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {art.excerpt}
                </p>
              </div>

              <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {art.date}
                </span>
                <Link
                  href={`/blog/${art.slug}`}
                  className="text-xs font-bold text-teal-600 hover:text-teal-800 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  Read Article
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

