import type { SiteContent } from "@/types/content";
import { siteConfig, type SectionId } from "@/lib/site-config";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import WelcomeSection from "@/components/sections/WelcomeSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import ServicesSection from "@/components/sections/ServicesSection";
import ImpressionsSection from "@/components/sections/ImpressionsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CertificatesSection from "@/components/sections/CertificatesSection";
import PricingSection from "@/components/sections/PricingSection";
import DisclaimerSection from "@/components/sections/DisclaimerSection";
import ContactSection from "@/components/sections/ContactSection";
import StickyCTA from "@/components/ui/StickyCTA";

/**
 * Setzt die Seite aus den in der Site-Config aktivierten Sektionen zusammen.
 *
 * Welche Sektionen es gibt und in welcher Reihenfolge sie stehen, wird beim
 * Onboarding festgelegt und ist danach nicht mehr über den Admin änderbar —
 * dort lassen sich nur die Inhalte, die Palette und die Schrift anpassen.
 */
export default function SitePage({ content }: { content: SiteContent }) {
  const sections: Record<SectionId, React.ReactNode> = {
    hero: <HeroSection content={content.hero} />,
    welcome: <WelcomeSection content={content.welcome} business={content.business} />,
    philosophy: <PhilosophySection content={content.philosophy} />,
    services: <ServicesSection content={content.services} />,
    impressions: <ImpressionsSection content={content.impressions} />,
    testimonials: <TestimonialsSection content={content.testimonials} />,
    certificates: <CertificatesSection content={content.certificates} />,
    pricing: <PricingSection content={content.pricing} />,
    disclaimer: <DisclaimerSection content={content.disclaimer} />,
    contact: <ContactSection content={content.contact} business={content.business} />,
  };

  return (
    <main className="min-h-screen">
      <Header content={{ navigation: content.navigation, business: content.business }} />
      {siteConfig.sections.map((id) => (
        <div key={id}>{sections[id]}</div>
      ))}
      <Footer content={content.footer} business={content.business} />
      <StickyCTA business={content.business} />
    </main>
  );
}
