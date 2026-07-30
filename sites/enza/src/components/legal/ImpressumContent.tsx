"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getContent, defaultContent } from "@/lib/content";
import type { PracticeInfo } from "@/types/content";

export default function ImpressumContent() {
  const [practiceInfo, setPracticeInfo] = useState<PracticeInfo>(defaultContent.practiceInfo);

  useEffect(() => {
    const content = getContent();
    setPracticeInfo(content.practiceInfo);
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-brand hover:text-brand/80 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Zurück zur Startseite
      </Link>

      <h1
        className="text-4xl md:text-5xl mb-10"
        style={{ fontFamily: "Playfair Display, Georgia, serif" }}
      >
        Impressum
      </h1>

      <div className="prose prose-sage max-w-none space-y-8 text-text-medium">
        <section>
          <h2 className="text-xl font-semibold text-text-dark mb-3">
            Angaben gemäss Art. 3 Abs. 1 lit. s UWG
          </h2>
        </section>

        <section>
          <h3 className="text-lg font-medium text-text-dark mb-2">Anbieterin:</h3>
          <p className="leading-relaxed">
            {practiceInfo.fullName}<br />
            {practiceInfo.tagline}
          </p>
        </section>

        <section>
          <h3 className="text-lg font-medium text-text-dark mb-2">Adresse:</h3>
          <p className="leading-relaxed">
            {practiceInfo.address.street && <>{practiceInfo.address.street}<br /></>}
            {practiceInfo.address.city}<br />
            {practiceInfo.address.country}
          </p>
        </section>

        <section>
          <h3 className="text-lg font-medium text-text-dark mb-2">Telefon:</h3>
          <p>
            <a href={`tel:${practiceInfo.phone.replace(/\s/g, '')}`} className="text-brand hover:underline">
              {practiceInfo.phone}
            </a>
          </p>
        </section>

        <section>
          <h3 className="text-lg font-medium text-text-dark mb-2">E-Mail:</h3>
          <p>
            <a href={`mailto:${practiceInfo.email}`} className="text-brand hover:underline">
              {practiceInfo.email}
            </a>
          </p>
        </section>

        <section>
          <h3 className="text-lg font-medium text-text-dark mb-2">Verantwortlich für den Inhalt:</h3>
          <p className="leading-relaxed">
            {practiceInfo.fullName}<br />
            {practiceInfo.address.city}<br />
            {practiceInfo.address.country}
          </p>
        </section>

        <section>
          <h3 className="text-lg font-medium text-text-dark mb-2">Haftungsausschluss:</h3>
          <p className="leading-relaxed">
            Die Inhalte dieser Website wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-medium text-text-dark mb-2">Urheberrechte:</h3>
          <p className="leading-relaxed">
            Die Inhalte und Werke auf dieser Website unterliegen dem schweizerischen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung oder jede Art der Verwertung ausserhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung der Anbieterin.
          </p>
        </section>
      </div>
    </div>
  );
}
