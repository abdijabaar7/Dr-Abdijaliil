import { HeroSection } from "@/components/home/HeroSection";
import { QuickSpecialtyBar } from "@/components/home/QuickSpecialtyBar";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { QualityFeature } from "@/components/home/QualityFeature";
import { PopularServices } from "@/components/home/PopularServices";
import { ConsultationCtaBanner } from "@/components/home/ConsultationCtaBanner";
import { DoctorHighlight } from "@/components/home/DoctorHighlight";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { LatestArticles } from "@/components/home/LatestArticles";
import { ClinicDeskBanner } from "@/components/home/ClinicDeskBanner";

export default function HomePage() {
  return (
    <div className="space-y-4">
      {/* 1. Hero Section matching the reference layout (Dr. Abdijalii photo, circular mint backdrop, floating badge) */}
      <HeroSection />

      {/* 2. Dark Blue/Teal Quick Search Bar & Orthopedic Specialties */}
      <QuickSpecialtyBar />

      {/* 3. Why Choose Dr. Abdijalii? (4 Modern Cards) */}
      <WhyChooseUs />

      {/* 4. Quality Healthcare for a Healthier Tomorrow (Split Card with 98% Patient Satisfaction Badge) */}
      <QualityFeature />

      {/* 5. Orthopedic Clinical Specialties */}
      <PopularServices />

      {/* 6. Need an Orthopedic Consultation CTA Banner */}
      <ConsultationCtaBanner />

      {/* 7. Dr. Abdijalii Abdiwahab Adan - Specialist Spotlight Card */}
      <DoctorHighlight />

      {/* 8. What Our Patients Say (Verified Patient Testimonials & 5-Star Ratings) */}
      <TestimonialsSection />

      {/* 9. Latest Health Articles written by Dr. Abdijalii */}
      <LatestArticles />

      {/* 10. Direct WhatsApp & Clinic Desk Assistance in Mogadishu */}
      <ClinicDeskBanner />
    </div>
  );
}
