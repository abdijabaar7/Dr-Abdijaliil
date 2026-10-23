import { HeroSection } from "@/components/home/HeroSection";
import { QuickSpecialtyBar } from "@/components/home/QuickSpecialtyBar";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { QualityFeature } from "@/components/home/QualityFeature";
import { PopularServices } from "@/components/home/PopularServices";
import { ConsultationCtaBanner } from "@/components/home/ConsultationCtaBanner";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { LatestArticles } from "@/components/home/LatestArticles";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <QuickSpecialtyBar />
      <WhyChooseUs />
      <QualityFeature />
      <PopularServices />
      <ConsultationCtaBanner />
      <TestimonialsSection />
      <LatestArticles />
    </div>
  );
}

