import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Calendar, ArrowLeft, Share2, MessageSquare, CheckCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

const ARTICLE_DATA: Record<
  string,
  {
    title: string;
    category: string;
    date: string;
    readTime: string;
    content: string[];
    keyTakeaways: string[];
  }
> = {
  "bone-fracture-first-aid-guide": {
    title: "How to Recognize and Provide First Aid for Bone Fractures",
    category: "Trauma & First Aid",
    date: "October 20, 2026",
    readTime: "4 min read",
    keyTakeaways: [
      "Do not try to straighten or force an unnaturally bent limb.",
      "Immobilize the joint above and below the suspected fracture using a rigid support.",
      "Apply an ice pack wrapped in a clean cloth to alleviate swelling.",
      "Seek emergency orthopedic assessment immediately for open wounds.",
    ],
    content: [
      "A bone fracture occurs when physical force exerted on the bone is stronger than the bone itself. Recognizing the telltale signs—severe localized swelling, intense pain with movement, inability to bear weight, and visible deformity—is the first step.",
      "When responding to a suspected bone fracture at home, on the road, or during a sports match, immobilization is vital. Avoid massaging the injured zone or attempting to realign the bone, as jagged fragments can injure adjacent blood vessels and nerves.",
      "Wrap an ice pack in a clean towel and apply it gently around the swelling for 15-20 minutes at a time. Never apply bare ice directly to the skin. Transport the patient to an orthopedic specialist or hospital promptly for definitive digital X-rays and anatomical casting or surgical reduction.",
    ],
  },
  "knee-osteoarthritis-management": {
    title: "Living Well with Knee Osteoarthritis: Evidence-Based Steps",
    category: "Joint Health",
    date: "October 15, 2026",
    readTime: "5 min read",
    keyTakeaways: [
      "Low-impact exercises (swimming, cycling) protect articular knee cartilage.",
      "Every kilogram of body weight reduced offloads approximately 4 kilograms of force from the knees.",
      "Cushioned supportive footwear significantly reduces joint heel impact.",
    ],
    content: [
      "Knee osteoarthritis is a progressive wear-and-tear condition that causes gradual degeneration of joint cartilage. Patients commonly report morning joint stiffness, aching after prolonged standing, and difficulty during prayer transitions.",
      "While worn cartilage cannot simply grow back on its own, modern evidence shows that targeted lifestyle interventions can dramatically reduce pain and delay or avoid the need for surgical joint replacement.",
      "Strengthening the quadriceps and hamstring muscles helps absorb mechanical shock that would otherwise strain the joint surface. In our Mogadishu clinic, Dr. Abdijalii tailors customized joint preservation regimens, including supportive braces and intra-articular therapies when appropriate.",
    ],
  },
  "preventing-sports-injuries-somalia": {
    title: "Preventing Common Sports Injuries: A Guide for Young Athletes",
    category: "Sports Medicine",
    date: "October 10, 2026",
    readTime: "3 min read",
    keyTakeaways: [
      "Never skip dynamic warm-ups prior to competitive football or sprint drills.",
      "Ensure proper hydration before, during, and after high-heat training sessions.",
      "Do not play through sharp joint pain or 'giving way' sensations.",
    ],
    content: [
      "Football and athletics are tremendously popular across Somalia. However, playing on firm or uneven pitch surfaces without prior neuromuscular warm-ups frequently causes anterior cruciate ligament (ACL) tears, meniscus lesions, and ankle sprains.",
      "Dynamic stretching exercises—such as lunges, high knees, and controlled decelerations—prepare the tendon structures for explosive sprints and abrupt directional changes.",
      "If you experience a sudden pop or severe twisting injury during play, discontinue activity immediately and undergo an orthopedic examination before resuming athletic drills.",
    ],
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const article = ARTICLE_DATA[resolvedParams.slug];

  if (!article) {
    notFound();
  }

  return (
    <div className="bg-white py-14 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-teal-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all articles
        </Link>

        {/* Article Meta */}
        <div className="space-y-4 border-b border-slate-100 pb-8">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-md">
              {article.category}
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-800">By {siteConfig.doctor.name}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {article.date}
              </span>
            </div>
            <a
              href={`https://wa.me/${siteConfig.doctor.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-600 font-semibold hover:underline"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Ask Doctor on WhatsApp
            </a>
          </div>
        </div>

        {/* Key Takeaways Box */}
        <div className="my-8 bg-teal-50/70 border border-teal-100 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-teal-800">
            Key Clinical Takeaways:
          </h2>
          <div className="space-y-2.5">
            {article.keyTakeaways.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-800 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Paragraphs */}
        <div className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed text-base sm:text-lg">
          {article.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 p-8 bg-slate-50 border border-slate-100 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Have questions about your condition?</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Schedule a clinical consultation with Dr. Abdijalii in Mogadishu for a definitive evaluation.
            </p>
          </div>
          <Link
            href="/appointments"
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-full text-sm shrink-0 shadow-md transition-colors"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}

