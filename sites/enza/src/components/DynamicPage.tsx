'use client';

import { useEffect, useState } from 'react';
import { getContent, defaultContent } from '@/lib/content';
import type { SiteContent } from '@/types/content';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import WelcomeSection from '@/components/sections/WelcomeSection';
import PhilosophySection from '@/components/sections/PhilosophySection';
import TherapySection from '@/components/sections/TherapySection';
import ImpressionsSection from '@/components/sections/ImpressionsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CertificatesSection from '@/components/sections/CertificatesSection';
import PricingSection from '@/components/sections/PricingSection';
import DisclaimerSection from '@/components/sections/DisclaimerSection';
import ContactSection from '@/components/sections/ContactSection';
import StickyCTA from '@/components/ui/StickyCTA';

export default function DynamicPage() {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    async function loadContent() {
      // Erst lokalen Content laden (schnell)
      const localContent = getContent();
      setContent(localContent);
      setMounted(true);

      // Dann von API laden (persistent)
      try {
        const res = await fetch('/api/content');
        if (res.ok) {
          const apiContent = await res.json();
          setContent(apiContent);
        }
      } catch (error) {
        console.error('Error loading content from API:', error);
      }
    }

    loadContent();

    // Listener für Änderungen (wenn Admin-Tab editiert)
    const handleUpdate = () => {
      setContent(getContent());
    };

    window.addEventListener('storage', handleUpdate);
    return () => window.removeEventListener('storage', handleUpdate);
  }, []);

  // Während SSR und erstem Render: Defaults verwenden
  // Nach Hydration: Custom Content wenn vorhanden
  const c = mounted ? content : defaultContent;

  return (
    <main className="min-h-screen">
      <Header content={{ navigation: c.navigation, practiceInfo: c.practiceInfo }} />
      <HeroSection content={c.hero} />
      <WelcomeSection content={c.welcome} practiceInfo={c.practiceInfo} />
      <PhilosophySection content={c.philosophy} />
      <TherapySection content={c.therapy} />
      <ImpressionsSection />
      <TestimonialsSection content={c.testimonials} />
      <CertificatesSection content={c.certificates} />
      <PricingSection content={c.pricing} />
      <DisclaimerSection content={c.disclaimer} />
      <ContactSection content={c.contact} practiceInfo={c.practiceInfo} />
      <Footer content={c.footer} practiceInfo={c.practiceInfo} />
      <StickyCTA practiceInfo={c.practiceInfo} />
    </main>
  );
}
