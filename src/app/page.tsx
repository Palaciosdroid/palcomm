import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import SocialProofSection from "@/components/sections/SocialProofSection";
import SpeakerSection from "@/components/sections/SpeakerSection";
import ProgramSection from "@/components/sections/ProgramSection";
import WhyAttendSection from "@/components/sections/WhyAttendSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import WorkshopsSection from "@/components/sections/WorkshopsSection";
import HeartSection from "@/components/sections/HeartSection";
import ImpressionsSection from "@/components/sections/ImpressionsSection";
import TicketsSection from "@/components/sections/TicketsSection";
import MobileStickyCTA from "@/components/ui/MobileStickyCTA";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Social Proof / Stats */}
      <SocialProofSection />

      {/* Speaker Grid */}
      <SpeakerSection />

      {/* Program Timeline */}
      <ProgramSection />

      {/* Why Attend */}
      <WhyAttendSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Workshops */}
      <WorkshopsSection />

      {/* Heart of the Event */}
      <HeartSection />

      {/* Impressions Gallery */}
      <ImpressionsSection />

      {/* Tickets */}
      <TicketsSection />

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky CTA */}
      <MobileStickyCTA />
    </main>
  );
}
