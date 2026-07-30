// Datenmodell des Website-Builders.
//
// Die Kund/in füllt das im Onboarding aus; daraus entstehen die beiden
// Dateien, die eine neue Seite braucht (site-config.ts und content.ts) plus
// ein Prompt für alles, was darüber hinausgeht.

import type { SectionId } from "@/lib/site-config";

export interface BuilderBasics {
  siteName: string;
  domain: string;
  ownerName: string;
  /** Was gemacht wird, ein bis zwei Wörter — z. B. "Ernährungsberatung" */
  tagline: string;
  /** Ein Satz, der das Angebot beschreibt. Fliesst in SEO und Hero ein. */
  summary: string;
  phone: string;
  email: string;
  street: string;
  city: string;
}

export interface BuilderTexts {
  heroTitle: string;
  heroDescription: string;
  heroSubtitle: string;
  ctaText: string;
  welcomeIntro: string;
  aboutText: string;
  philosophyTitle: string;
  philosophyText: string;
  servicesIntro: string;
  targetGroups: { title: string; description: string }[];
  topics: { title: string; description: string }[];
  testimonials: { text: string; author: string; location: string }[];
}

export interface BuilderState {
  basics: BuilderBasics;
  paletteId: string;
  fontId: string;
  sections: SectionId[];
  texts: BuilderTexts;
  /** Freitext für Sonderwünsche — landet unverändert im Prompt */
  notes: string;
}

export const emptyState: BuilderState = {
  basics: {
    siteName: "",
    domain: "",
    ownerName: "",
    tagline: "",
    summary: "",
    phone: "",
    email: "",
    street: "",
    city: "",
  },
  paletteId: "salbei",
  fontId: "klassisch",
  sections: [
    "hero",
    "welcome",
    "philosophy",
    "services",
    "impressions",
    "testimonials",
    "disclaimer",
    "contact",
  ],
  texts: {
    heroTitle: "",
    heroDescription: "",
    heroSubtitle: "",
    ctaText: "Termin vereinbaren",
    welcomeIntro: "",
    aboutText: "",
    philosophyTitle: "Wie ich arbeite",
    philosophyText: "",
    servicesIntro: "",
    targetGroups: [
      { title: "", description: "" },
      { title: "", description: "" },
      { title: "", description: "" },
    ],
    topics: [
      { title: "", description: "" },
      { title: "", description: "" },
      { title: "", description: "" },
    ],
    testimonials: [{ text: "", author: "", location: "" }],
  },
  notes: "",
};

export const SECTION_LABELS: Record<SectionId, { name: string; hint: string }> = {
  hero: { name: "Startbild", hint: "Titel und Einstieg — immer dabei" },
  welcome: { name: "Willkommen & Über mich", hint: "Portrait, Vorstellung, Zitat" },
  philosophy: { name: "Arbeitsweise", hint: "Methode oder Herangehensweise" },
  services: { name: "Angebot", hint: "Zielgruppen und Themen" },
  impressions: { name: "Einblicke", hint: "Bildergalerie, z. B. Räumlichkeiten" },
  testimonials: { name: "Erfahrungen", hint: "Rückmeldungen von Kund/innen" },
  certificates: { name: "Aus- und Weiterbildungen", hint: "Diplome und Zertifikate" },
  pricing: { name: "Konditionen", hint: "Preise, Ermässigungen, Bezahlung" },
  disclaimer: { name: "Wichtige Hinweise", hint: "Kein Heilversprechen, Notfallnummern — immer dabei" },
  contact: { name: "Kontakt", hint: "Formular und Kontaktdaten — immer dabei" },
};

/**
 * Diese Sektionen lassen sich nicht abwählen. "disclaimer" gehört dazu, weil
 * das Template für Angebote im Gesundheitsbereich gedacht ist — ohne die
 * Hinweise (kein Heilversprechen, ergänzende Begleitung, Notfallnummern)
 * darf keine Seite aufgeschaltet werden.
 */
export const REQUIRED_SECTIONS: SectionId[] = ["hero", "disclaimer", "contact"];

/** Reihenfolge der Sektionen auf der fertigen Seite. */
export const SECTION_ORDER: SectionId[] = [
  "hero",
  "welcome",
  "philosophy",
  "services",
  "impressions",
  "testimonials",
  "certificates",
  "pricing",
  "disclaimer",
  "contact",
];
