import { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { readContent } from "@/lib/content-store";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DatenschutzContent from "@/components/legal/DatenschutzContent";

export const metadata: Metadata = {
  title: `Datenschutzerklärung | ${siteConfig.name}`,
  description: `Datenschutzerklärung von ${siteConfig.name}`,
};

export default async function DatenschutzPage() {
  const content = await readContent();

  return (
    <>
      <Header content={{ navigation: content.navigation, business: content.business }} />
      <main className="min-h-screen bg-base-50 pt-32 pb-20 px-6 md:px-8">
        <DatenschutzContent business={content.business} />
      </main>
      <Footer content={content.footer} business={content.business} />
    </>
  );
}
