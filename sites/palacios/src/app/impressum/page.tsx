import { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { readContent } from "@/lib/content-store";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ImpressumContent from "@/components/legal/ImpressumContent";

export const metadata: Metadata = {
  title: `Impressum | ${siteConfig.name}`,
  description: `Impressum und rechtliche Angaben von ${siteConfig.name}`,
};

export default async function ImpressumPage() {
  const content = await readContent();

  return (
    <>
      <Header content={{ navigation: content.navigation, business: content.business }} />
      <main className="min-h-screen bg-base-50 pt-32 pb-20 px-6 md:px-8">
        <ImpressumContent business={content.business} />
      </main>
      <Footer content={content.footer} business={content.business} />
    </>
  );
}
