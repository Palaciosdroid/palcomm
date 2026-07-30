// Erzeugt aus den Builder-Angaben die Dateien für eine neue Kundenseite.
//
// Der Grossteil einer Seite entsteht damit ohne Modell: site-config.ts und
// content.ts sind vollständig bestimmt und können direkt ins kopierte
// Template gelegt werden. Der Prompt ist nur für den Rest da — Bilder,
// Sonderwünsche, Feinschliff.

import type { BuilderState } from "./types";
import { SECTION_ORDER } from "./types";
import { getPalette, getFontPairing } from "@/lib/theme";
import { slugify } from "./slug";

/** Wert als TypeScript-String-Literal, sicher gegen Anführungszeichen und Zeilenumbrüche. */
function ts(value: string): string {
  return JSON.stringify(value ?? "");
}

function tsList(values: string[], indent: string): string {
  if (values.length === 0) return "[]";
  return `[\n${values.map((v) => `${indent}  ${ts(v)},`).join("\n")}\n${indent}]`;
}

export function siteSlug(state: BuilderState): string {
  return slugify(state.basics.siteName || state.basics.domain || "neue-seite");
}

/**
 * Der untere, für alle Seiten identische Teil von content.ts. Wird mit
 * ausgegeben, damit die erzeugte Datei ohne Nacharbeit einsetzbar ist.
 * Muss mit templates/serene/src/lib/content.ts übereinstimmen.
 */
const CONTENT_HELPERS = `// ---------------------------------------------------------------------------
// Client-seitiger Zwischenspeicher
//
// Dient nur dazu, beim Bearbeiten im Admin nichts zu verlieren, bevor
// gespeichert wird. Verbindlich ist immer der Stand aus /api/content.
// ---------------------------------------------------------------------------

export function getContent(): SiteContent {
  if (typeof window === "undefined") {
    return defaultContent;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return mergeContent(defaultContent, JSON.parse(stored));
    }
  } catch (e) {
    console.error("Error loading content:", e);
  }

  return defaultContent;
}

export function saveContent(content: SiteContent): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch (e) {
    console.error("Error saving content:", e);
  }
}

export function getSection<K extends SectionKey>(key: K): SiteContent[K] {
  return getContent()[key];
}

export function saveSection<K extends SectionKey>(key: K, data: SiteContent[K]): void {
  const content = getContent();
  content[key] = data;
  saveContent(content);
}

export function resetContent(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function resetSection<K extends SectionKey>(key: K): void {
  const content = getContent();
  content[key] = defaultContent[key];
  saveContent(content);
}

/**
 * Ergänzt gespeicherten Content um Felder, die es beim Speichern noch nicht
 * gab. Arrays werden dabei komplett übernommen, nicht zusammengeführt —
 * sonst kämen gelöschte Einträge wieder zurück.
 */
export function mergeContent(
  target: SiteContent,
  source: Partial<SiteContent>
): SiteContent {
  const result = { ...target };

  for (const key of Object.keys(source) as SectionKey[]) {
    const sourceValue = source[key];
    if (sourceValue === undefined) continue;

    const targetValue = target[key];
    const bothPlainObjects =
      typeof sourceValue === "object" &&
      sourceValue !== null &&
      !Array.isArray(sourceValue) &&
      typeof targetValue === "object" &&
      targetValue !== null &&
      !Array.isArray(targetValue);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (result as any)[key] = bothPlainObjects
      ? { ...targetValue, ...sourceValue }
      : sourceValue;
  }

  return result;
}
`;

export function generateSiteConfig(state: BuilderState): string {
  const { basics } = state;
  const sections = SECTION_ORDER.filter((id) => state.sections.includes(id));
  const domain = basics.domain.replace(/^https?:\/\//, "").replace(/^www\./, "");

  return `// Site-Konfiguration — ${basics.siteName}
//
// Erzeugt aus dem Website-Builder. Erklärung der Felder siehe
// templates/serene/src/lib/site-config.ts.

import type { ThemeSelection } from "./theme";

export type SectionId =
  | "hero"
  | "welcome"
  | "philosophy"
  | "services"
  | "impressions"
  | "testimonials"
  | "certificates"
  | "pricing"
  | "disclaimer"
  | "contact";

export interface SiteConfig {
  name: string;
  domain: string;
  useWww: boolean;
  locale: string;
  defaultTheme: ThemeSelection;
  sections: SectionId[];
  heroVideo: string | null;
  showInclusivityBadge: boolean;
}

export const siteConfig: SiteConfig = {
  name: ${ts(basics.siteName)},
  domain: ${ts(domain)},
  useWww: true,
  locale: "de-CH",
  defaultTheme: {
    paletteId: ${ts(state.paletteId)},
    fontId: ${ts(state.fontId)},
  },
  sections: ${tsList(sections, "  ")},
  heroVideo: null,
  showInclusivityBadge: false,
};

export const siteUrl = \`https://\${siteConfig.useWww ? "www." : ""}\${siteConfig.domain}\`;

export function hasSection(id: SectionId): boolean {
  return siteConfig.sections.includes(id);
}
`;
}

export function generateContent(state: BuilderState): string {
  const { basics, texts } = state;
  const city = basics.city.replace(/^\d{4,5}\s+/, "");
  const phoneLink = `tel:${basics.phone.replace(/[^\d+]/g, "")}`;

  const targetGroups = texts.targetGroups
    .filter((g) => g.title.trim())
    .map(
      (g, i) => `      {
        id: ${ts(slugify(g.title) || `gruppe-${i + 1}`)},
        title: ${ts(g.title)},
        image: ${ts(`/images/zielgruppe-${i + 1}.jpg`)},
        description: ${ts(g.description)},
      },`
    )
    .join("\n");

  const topics = texts.topics
    .filter((t) => t.title.trim())
    .map(
      (t, i) => `      {
        id: ${ts(slugify(t.title) || `thema-${i + 1}`)},
        title: ${ts(t.title)},
        icon: "sun",
        description: ${ts(t.description)},
      },`
    )
    .join("\n");

  const testimonials = texts.testimonials
    .filter((t) => t.text.trim())
    .map(
      (t, i) => `      {
        id: ${i + 1},
        text: ${ts(t.text)},
        author: ${ts(t.author)},
        location: ${ts(t.location)},
        rating: 5,
      },`
    )
    .join("\n");

  return `// Inhalte — ${basics.siteName}
//
// Erzeugt aus dem Website-Builder. Einzige Quelle für die Texte der Seite.

import type { SiteContent, SectionKey } from "@/types/content";
import { siteConfig } from "./site-config";

const STORAGE_KEY = "site_content";

export const defaultContent: SiteContent = {
  theme: siteConfig.defaultTheme,
  seo: {
    title: ${ts(`${basics.siteName} | ${basics.tagline} in ${city}`)},
    description: ${ts(basics.summary)},
    keywords: ${tsList(
      [
        `${basics.tagline} ${city}`.trim(),
        `${basics.tagline} Schweiz`.trim(),
        basics.siteName,
      ].filter(Boolean),
      "    "
    )},
  },
  business: {
    name: ${ts(basics.siteName)},
    tagline: ${ts(basics.tagline)},
    fullName: ${ts(basics.ownerName)},
    subtitle: ${ts(texts.heroSubtitle)},
    phone: ${ts(basics.phone)},
    email: ${ts(basics.email)},
    website: siteConfig.domain,
    address: {
      street: ${ts(basics.street)},
      city: ${ts(basics.city)},
      country: "Schweiz",
    },
  },
  navigation: [
    { name: "Start", href: "#" },
    { name: "Über mich", href: "#ueber-mich" },
    { name: "Angebot", href: "#angebot" },
    { name: "Kontakt", href: "#kontakt" },
  ],
  hero: {
    title: ${ts(texts.heroTitle)},
    description: ${ts(texts.heroDescription)},
    subtitle: ${ts(texts.heroSubtitle)},
    ctaText: ${ts(texts.ctaText)},
    ctaLink: "#kontakt",
  },
  welcome: {
    title: "Herzlich willkommen",
    intro: ${ts(texts.welcomeIntro)},
    aboutTitle: "Über mich",
    aboutText: ${ts(texts.aboutText)},
    image: "/images/portrait.jpg",
    quote: "",
    inclusivityText: "Alle sind willkommen",
  },
  philosophy: {
    title: ${ts(texts.philosophyTitle)},
    text: ${ts(texts.philosophyText)},
    ctaText: ${ts(texts.ctaText)},
    ctaLink: "#kontakt",
    quote: {
      text: "",
      author: "",
      role: "",
    },
  },
  services: {
    title: "Angebot",
    intro: ${ts(texts.servicesIntro)},
    targetGroupsTitle: "Für wen ist das Angebot?",
    targetGroups: [
${targetGroups || "      // TODO: Zielgruppen ergänzen"}
    ],
    topicsTitle: "Themen",
    topics: [
${topics || "      // TODO: Themen ergänzen"}
    ],
  },
  impressions: {
    title: "Einblicke",
    subtitle: "",
    images: [
      { id: "bild-1", image: "/images/einblick-1.jpg", alt: "" },
      { id: "bild-2", image: "/images/einblick-2.jpg", alt: "" },
    ],
  },
  certificates: {
    title: "Aus- und Weiterbildungen",
    certificates: [],
  },
  testimonials: {
    title: "Erfahrungen",
    subtitle: "Was Kund/innen sagen",
    testimonials: [
${testimonials || "      // TODO: Rückmeldungen ergänzen"}
    ],
  },
  pricing: {
    title: "Konditionen",
    freeConsultation: {
      title: "Kostenloses Erstgespräch",
      subtitle: "15 Min. telefonisch – unverbindlich",
      phone: ${ts(phoneLink)},
      buttonText: "Jetzt anrufen",
    },
    hourlyRate: "",
    firstSession: { title: "Erstgespräch", duration: "" },
    followUpSession: { title: "Folgetermine", duration: "" },
    discount: { title: "", description: "" },
    payment: { title: "Bezahlung nach jedem Termin", methods: ["Bar", "TWINT"] },
    houseVisits: { title: "", cost: "" },
    cancellation: {
      title: "Terminabsage",
      text: "Bitte spätestens 24 Stunden vorher absagen, andernfalls wird der Termin verrechnet.",
    },
    insurance: { title: "", text: "" },
    ctaText: ${ts(texts.ctaText)},
    ctaLink: "#kontakt",
  },
  disclaimer: {
    title: "Wichtige Hinweise",
    items: [],
  },
  contact: {
    title: "Kontakt",
    fields: {
      firstName: "Vorname",
      lastName: "Nachname",
      email: "E-Mail Adresse",
      phone: "Telefon",
      message: "Ihre Nachricht...",
    },
    submitText: "Senden",
    privacyText: "Datenschutz",
    successTitle: "Nachricht gesendet!",
    successMessage:
      "Vielen Dank für Ihre Anfrage. Ich melde mich so schnell wie möglich bei Ihnen.",
  },
  footer: {
    copyright: ${ts(basics.siteName)},
    email: ${ts(basics.email)},
    links: [
      { name: "Impressum", href: "/impressum" },
      { name: "Datenschutz", href: "/datenschutz" },
    ],
    socialLinks: [],
  },
};

${CONTENT_HELPERS}`;
}

export function generatePrompt(state: BuilderState): string {
  const { basics, texts } = state;
  const slug = siteSlug(state);
  const palette = getPalette(state.paletteId);
  const font = getFontPairing(state.fontId);
  const active = SECTION_ORDER.filter((id) => state.sections.includes(id));

  const missing: string[] = [];
  if (!texts.heroTitle.trim()) missing.push("Titel im Startbild");
  if (!texts.aboutText.trim()) missing.push("Über-mich-Text");
  if (state.sections.includes("services") && !texts.targetGroups.some((g) => g.title.trim()))
    missing.push("Zielgruppen");
  if (state.sections.includes("testimonials") && !texts.testimonials.some((t) => t.text.trim()))
    missing.push("Rückmeldungen");
  if (state.sections.includes("pricing")) missing.push("Konditionen (Preise, Ermässigungen)");
  if (state.sections.includes("certificates")) missing.push("Aus- und Weiterbildungen");

  return `# Neue Kundenseite: ${basics.siteName}

Baue eine neue Website im Repo palcomm. Basis ist das Template
\`templates/serene\`, die neue Seite kommt nach \`sites/${slug}\`.

## Vorgehen

1. \`cp -r templates/serene sites/${slug}\`
2. In \`sites/${slug}/package.json\` den Namen auf \`site-${slug}\` setzen
3. Die beiden mitgelieferten Dateien einsetzen:
   - \`src/lib/site-config.ts\` (aus dem Builder, unverändert übernehmen)
   - \`src/lib/content.ts\` (aus dem Builder, unverändert übernehmen)
4. \`npm install && npm run build\` — muss ohne Fehler durchlaufen
5. Seite lokal starten und Screenshot prüfen

## Eckdaten

| | |
|---|---|
| Name | ${basics.siteName} |
| Domain | ${basics.domain} |
| Inhaber/in | ${basics.ownerName} |
| Angebot | ${basics.tagline} |
| Ort | ${basics.city} |
| Palette | ${palette.name} (\`${palette.id}\`) |
| Schrift | ${font.name} (\`${font.id}\`) |
| Sektionen | ${active.join(", ")} |

## Bilder

Im Ordner \`sites/${slug}/public/images/\` liegen noch die Platzhalter aus dem
Template. Zu ersetzen sind:

- \`portrait.jpg\` — Portrait der Inhaber/in (Hochformat, ca. 1200×900)
${state.sections.includes("services") ? `- \`zielgruppe-1.jpg\` … \`zielgruppe-${texts.targetGroups.filter((g) => g.title.trim()).length || 3}.jpg\` — je ein Bild pro Zielgruppe (Querformat, ca. 800×600)\n` : ""}${state.sections.includes("impressions") ? "- `einblick-1.jpg`, `einblick-2.jpg` — Räumlichkeiten oder Arbeitssituation\n" : ""}${state.sections.includes("certificates") ? "- `zertifikat-1.jpg` … — Abbildungen der Diplome\n" : ""}- \`logo.svg\` — Logo
- \`og-image.jpg\` — Vorschaubild für Social Media (1200×630)

Solange die echten Bilder fehlen, die Platzhalter drin lassen — die Seite
soll bauen und anschaubar sein.

${
  missing.length > 0
    ? `## Noch offen

Diese Angaben fehlen und sind im Content als TODO markiert. Bitte beim
Einsetzen nachfragen statt zu erfinden:

${missing.map((m) => `- ${m}`).join("\n")}
`
    : ""
}${
    state.notes.trim()
      ? `## Sonderwünsche

${state.notes.trim()}
`
      : ""
  }
## Grenzen

- Keine Farbwerte direkt in Komponenten schreiben — nur die Theme-Tokens
  (\`bg-accent-200\`, \`text-text-medium\`, \`var(--brand)\`). Sonst greift die
  Palettenauswahl im Admin nicht mehr auf der ganzen Seite.
- Aufbau und Reihenfolge der Sektionen kommen aus \`site-config.ts\`.
- Texte gehören ausschliesslich in \`content.ts\`, nicht in Komponenten.

## Deployment

Neues Hosting-Projekt mit Root Directory \`sites/${slug}\`. Environment-
Variablen nach \`.env.example\` setzen — insbesondere \`ADMIN_PASSWORD\`,
\`ADMIN_SESSION_SECRET\` und \`REDIS_URL\`.
`;
}
