// Standard-Inhalte der Website.
//
// Das hier ist die EINZIGE Quelle für Texte. Beim Onboarding wird diese Datei
// mit den echten Inhalten der Kund/in gefüllt; im Betrieb liegt der bearbeitete
// Stand in Redis und wird über /api/content geladen.
//
// Die Beispieltexte sind absichtlich als solche erkennbar — was noch
// [in Klammern] steht, ist beim Aufsetzen einer neuen Seite zu ersetzen.

import type { SiteContent, SectionKey } from "@/types/content";
import { siteConfig } from "./site-config";

const STORAGE_KEY = "site_content";

export const defaultContent: SiteContent = {
  theme: siteConfig.defaultTheme,
  seo: {
    title: "Musterpraxis | Beratung und Begleitung in [Ort]",
    description:
      "Musterpraxis begleitet Sie persönlich und auf Augenhöhe. Erstgespräch kostenlos, Termine flexibel, zentral in [Ort].",
    keywords: ["Beratung [Ort]", "Begleitung [Ort]", "Musterpraxis"],
  },
  business: {
    name: "Musterpraxis",
    tagline: "Beratung & Begleitung",
    fullName: "Vorname Nachname",
    subtitle: "Persönlich und auf Augenhöhe",
    phone: "+41 00 000 00 00",
    email: "kontakt@musterpraxis.ch",
    website: siteConfig.domain,
    address: {
      street: "Musterstrasse 1",
      city: "0000 Musterort",
      country: "Schweiz",
    },
    // Nur ausfüllen, was zutrifft — Leeres wird im Impressum weggelassen.
    legal: {
      uid: "",
      commercialRegister: "",
      vatNumber: "",
      professionalTitle: "",
      supervisoryAuthority: "",
      professionalAssociation: "",
      registrationNumber: "",
    },
  },
  navigation: [
    { name: "Start", href: "#" },
    { name: "Über mich", href: "#ueber-mich" },
    { name: "Angebot", href: "#angebot" },
    { name: "Kontakt", href: "#kontakt" },
  ],
  hero: {
    title: "Ihr Weg beginnt hier",
    description:
      "Ein kurzer, einladender Satz, der beschreibt, was Sie anbieten und wofür Sie stehen. Zwei bis drei Zeilen wirken am besten.",
    subtitle: "Persönlich und auf Augenhöhe",
    ctaText: "Termin vereinbaren",
    ctaLink: "#kontakt",
  },
  welcome: {
    title: "Herzlich willkommen",
    intro:
      "Hier steht ein einladender Einstieg: Wen Sie begleiten, was Menschen zu Ihnen führt und was sie bei Ihnen erwartet.",
    aboutTitle: "Über mich",
    aboutText:
      "Ein kurzer Text über Sie — Werdegang, Haltung, was Ihnen in der Arbeit wichtig ist. Persönlich geschrieben wirkt hier deutlich besser als eine Aufzählung von Qualifikationen; die stehen weiter unten bei den Auszeichnungen.",
    image: "/images/portrait.svg",
    quote: "Ein Satz, der Ihre Haltung auf den Punkt bringt.",
    inclusivityText: "Alle sind willkommen",
  },
  philosophy: {
    title: "Wie ich arbeite",
    text: "Beschreiben Sie hier Ihre Methode oder Herangehensweise in zwei kurzen Abschnitten.\n\nDer zweite Abschnitt eignet sich gut, um konkret zu werden: Wie läuft eine Zusammenarbeit ab, was ist der erste Schritt?",
    ctaText: "Termin vereinbaren",
    ctaLink: "#kontakt",
    quote: {
      text: "Ein passendes Zitat, das zu Ihrer Arbeit spricht.",
      author: "Name",
      role: "Funktion",
    },
  },
  services: {
    title: "Angebot",
    intro:
      "Ein einleitender Satz zu Ihrem Angebot — was Sie anbieten und für wen es gedacht ist.",
    targetGroupsTitle: "Für wen ist das Angebot?",
    targetGroups: [
      {
        id: "gruppe-1",
        title: "Erste Zielgruppe",
        image: "/images/zielgruppe-1.svg",
        description:
          "Ein bis zwei Sätze dazu, welche Situation diese Gruppe mitbringt und wie Sie dabei unterstützen.",
      },
      {
        id: "gruppe-2",
        title: "Zweite Zielgruppe",
        image: "/images/zielgruppe-2.svg",
        description:
          "Ein bis zwei Sätze dazu, welche Situation diese Gruppe mitbringt und wie Sie dabei unterstützen.",
      },
      {
        id: "gruppe-3",
        title: "Dritte Zielgruppe",
        image: "/images/zielgruppe-3.svg",
        description:
          "Ein bis zwei Sätze dazu, welche Situation diese Gruppe mitbringt und wie Sie dabei unterstützen.",
      },
    ],
    topicsTitle: "Themen",
    topics: [
      {
        id: "thema-1",
        title: "Erstes Thema",
        icon: "sun",
        description: "Kurze Beschreibung in ein bis zwei Sätzen.",
      },
      {
        id: "thema-2",
        title: "Zweites Thema",
        icon: "heart-pulse",
        description: "Kurze Beschreibung in ein bis zwei Sätzen.",
      },
      {
        id: "thema-3",
        title: "Drittes Thema",
        icon: "moon-star",
        description: "Kurze Beschreibung in ein bis zwei Sätzen.",
      },
      {
        id: "thema-4",
        title: "Viertes Thema",
        icon: "unlock",
        description: "Kurze Beschreibung in ein bis zwei Sätzen.",
      },
      {
        id: "thema-5",
        title: "Fünftes Thema",
        icon: "trophy",
        description: "Kurze Beschreibung in ein bis zwei Sätzen.",
      },
      {
        id: "thema-6",
        title: "Sechstes Thema",
        icon: "flower-2",
        description: "Kurze Beschreibung in ein bis zwei Sätzen.",
      },
    ],
  },
  impressions: {
    title: "Einblicke",
    subtitle:
      "Ein kurzer Satz zu den Bildern — Räumlichkeiten, Atmosphäre, Arbeitsweise.",
    images: [
      {
        id: "bild-1",
        image: "/images/einblick-1.svg",
        alt: "Beschreibung des ersten Bildes",
      },
      {
        id: "bild-2",
        image: "/images/einblick-2.svg",
        alt: "Beschreibung des zweiten Bildes",
      },
    ],
  },
  certificates: {
    title: "Aus- und Weiterbildungen",
    certificates: [
      { id: 1, title: "Erste Qualifikation", image: "/images/zertifikat-1.svg" },
      { id: 2, title: "Zweite Qualifikation", image: "/images/zertifikat-2.svg" },
      { id: 3, title: "Dritte Qualifikation", image: "/images/zertifikat-3.svg" },
    ],
  },
  testimonials: {
    title: "Erfahrungen",
    subtitle: "Was Kund/innen sagen",
    testimonials: [
      {
        id: 1,
        text: "Eine echte Rückmeldung wirkt hier am stärksten. Konkret, in eigenen Worten, zwei bis drei Sätze.",
        author: "Vorname N.",
        location: "Ort",
        rating: 5,
      },
      {
        id: 2,
        text: "Eine echte Rückmeldung wirkt hier am stärksten. Konkret, in eigenen Worten, zwei bis drei Sätze.",
        author: "Vorname N.",
        location: "Ort",
        rating: 5,
      },
      {
        id: 3,
        text: "Eine echte Rückmeldung wirkt hier am stärksten. Konkret, in eigenen Worten, zwei bis drei Sätze.",
        author: "Vorname N.",
        location: "Ort",
        rating: 5,
      },
    ],
  },
  pricing: {
    title: "Konditionen",
    freeConsultation: {
      title: "Kostenloses Erstgespräch",
      subtitle: "15 Min. telefonisch – unverbindlich",
      phone: "tel:+41000000000",
      buttonText: "Jetzt anrufen",
    },
    hourlyRate: "000 CHF / Stunde",
    firstSession: {
      title: "Erstgespräch",
      duration: "ca. 1.5 – 2 Stunden",
    },
    followUpSession: {
      title: "Folgetermine",
      duration: "ca. 1 – 1.5 Stunden",
    },
    discount: {
      title: "Ermässigung",
      description: "Für wen eine Ermässigung gilt und wie hoch sie ist.",
    },
    payment: {
      title: "Bezahlung nach jedem Termin",
      methods: ["Bar", "TWINT"],
    },
    houseVisits: {
      title: "Termine vor Ort möglich",
      cost: "zzgl. Anfahrt nach Absprache",
    },
    cancellation: {
      title: "Terminabsage",
      text: "Bitte spätestens 24 Stunden vorher absagen, andernfalls wird der Termin verrechnet.",
    },
    insurance: {
      title: "Kostenbeteiligung",
      text: "Hinweis dazu, ob und in welchem Umfang eine Kostenbeteiligung möglich ist.",
    },
    ctaText: "Termin vereinbaren",
    ctaLink: "#kontakt",
  },
  // Diese vier Hinweise sind für Angebote im Gesundheitsbereich gedacht und
  // bewusst vorausgefüllt: Eine Seite darf nicht ohne sie online gehen. Für
  // andere Branchen anpassen oder die Sektion in site-config.ts abwählen.
  disclaimer: {
    title: "Wichtige Hinweise",
    items: [
      {
        title: "Ergänzende Begleitung",
        text: "Meine Arbeit versteht sich als Ergänzung zu ärztlicher, psychotherapeutischer oder psychiatrischer Behandlung — nicht als deren Ersatz. Bei gesundheitlichen Beschwerden wenden Sie sich bitte zuerst an Ihre Ärztin oder Ihren Arzt.",
      },
      {
        title: "Laufende Behandlung",
        text: "Wenn Sie sich derzeit in ärztlicher, psychotherapeutischer oder psychiatrischer Behandlung befinden oder Medikamente einnehmen, sagen Sie mir das bitte vor der ersten Sitzung. Eine Begleitung erfolgt dann in Absprache mit den behandelnden Fachpersonen.",
      },
      {
        title: "Kein Heilversprechen",
        text: "Ich gebe keine Heilversprechen und keine Garantien für einen bestimmten Erfolg ab. Jeder Mensch ist verschieden, und wie eine Begleitung wirkt, lässt sich nicht voraussagen.",
      },
      {
        title: "Im Notfall",
        text: "Diese Website ist kein Notfallangebot. In einer akuten Krise wenden Sie sich bitte an den ärztlichen Notfalldienst (144), die Dargebotene Hand (Tel. 143) oder die nächste Notfallstation.",
      },
    ],
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
    privacyNotice:
      "Ihre Angaben verwende ich ausschliesslich, um Ihre Anfrage zu beantworten. Bitte schreiben Sie hier keine Angaben zu Ihrer Gesundheit — das besprechen wir persönlich. Mehr dazu in der",
    privacyText: "Datenschutzerklärung",
    successTitle: "Nachricht gesendet!",
    successMessage:
      "Vielen Dank für Ihre Anfrage. Ich melde mich so schnell wie möglich bei Ihnen.",
  },
  footer: {
    copyright: "Musterpraxis",
    email: "kontakt@musterpraxis.ch",
    links: [
      { name: "Impressum", href: "/impressum" },
      { name: "Datenschutz", href: "/datenschutz" },
    ],
    socialLinks: [],
  },
};

// ---------------------------------------------------------------------------
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
