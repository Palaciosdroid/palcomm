// Content Management System - localStorage basiert
// Später einfach auf Cloudflare KV umstellbar

import type { SiteContent, SectionKey } from '@/types/content';

const STORAGE_KEY = 'site_content';
const CONTENT_VERSION_KEY = 'site_content_version';
// Increment this version when critical defaults change (e.g., email, phone)
const CURRENT_VERSION = 2;

// Default Content (aus data.ts übernommen)
export const defaultContent: SiteContent = {
  practiceInfo: {
    name: "Hypnose Enza",
    tagline: "Hypnosetherapie",
    fullName: "Enza Gasser-Fiorini",
    subtitle: "Professionell und kompetent",
    phone: "+41 79 416 22 23",
    email: "hypnoseenza@gmail.com",
    website: "hypnose-enza.ch",
    address: {
      street: "",
      city: "3072 Ostermundigen",
      country: "Schweiz",
    },
  },
  navigation: [
    { name: "Home", href: "#" },
    { name: "Über mich", href: "#ueber-mich" },
    { name: "Therapieangebot", href: "#therapieangebot" },
    { name: "Kontakt", href: "#kontakt" },
  ],
  hero: {
    title: "Hypnosetherapie",
    description: "Beginne, Dein Leben frei, harmonisch und unbeschwert zu leben. Auf dieser Reise begleite ich Dich achtsam und vertrauensvoll in Richtung Deines Wohlbefindens.",
    subtitle: "Professionell und kompetent",
    ctaText: "Termin Buchen",
    ctaLink: "#kontakt",
  },
  welcome: {
    title: "Herzlich willkommen",
    intro: "Gerne stehe ich Dir achtsam und empathisch zur Seite, begleite Dich in einem geschützten Rahmen und unterstütze Dich dabei, Deine starken Ressourcen zu verankern.",
    aboutTitle: "Über mich",
    aboutText: "Mein Name ist Enza Gasser-Fiorini, ich bin verheiratet und Mutter von 2 erwachsenen Söhnen und zweifache Nonna. Meine Eltern waren Italiener (Rom/Apulien) und zudem geprägte Kriegskinder. Ich wuchs zweisprachig mit einer acht Jahren älteren Schwester in Bern auf. Uns wurde die Wertschätzung und respektvollen Umgang mit Menschen, Tieren und Umwelt mitgegeben.",
    image: "/images/portrait.jpg",
    quote: "Vertraue auf Dein Unterbewusstsein, damit Du mit Deinen Gefühlen wieder frei wirst…",
  },
  philosophy: {
    title: "Was ist die Philosophie der Hypnose?",
    text: "Sind Deine Gefühle, Ängste und Glaubensätze wirklich berechtigt Dich zu blockieren? Hypnose ist ein sanfter, geistiger Zustand des Unterbewusstseins. Mit der Imagination suchen wir auf Deiner Reise neue Ressourcen die Dich Dein Unterbewusstsein positiv stärken.\n\nDie Lösungsorientierte Methode nach Gabriel Palacios Hypnoseexperte hilft Dir dabei die Blockaden nachhaltig zu befreien.",
    ctaText: "Termin Buchen",
    ctaLink: "#kontakt",
    quote: {
      text: "Das Leben kann nur verstanden werden, muss aber vorwärts gelebt werden…",
      author: "Søren Kierkegaard",
      role: "Dänischer Philosoph",
    },
  },
  therapy: {
    title: "Therapieangebot",
    intro: "Dein Unterbewusstsein vergisst nie, denn Du kannst Deine Gefühle, Emotionen, Ängste und Glaubensätze ändern. Du verdienst es, in Einklang mit dem Leben zu kommen.",
    targetGroupsTitle: "Für wen ist Hypnosetherapie?",
    targetGroups: [
      {
        id: "erwachsene",
        title: "Erwachsene",
        image: "/images/zielgruppe-erwachsene.jpg",
        description: "Wiederkehrende, oft belastende Kreisen negativer Gedanken, das durch Stress, Angststörungen ausgelöst wird und sich wie eine Endlosschleife anfühlt.",
      },
      {
        id: "kinder",
        title: "Kinder und Jugendliche",
        image: "/images/zielgruppe-kinder.jpg",
        description: "Lernschwierigkeiten, Überforderung durch Stoff, Leistungsdruck, Schulangst, Mobbing, ADHS oder eine generelle Überlastung.",
      },
      {
        id: "eltern",
        title: "Eltern",
        image: "/images/zielgruppe-eltern.jpg",
        description: "Alle Eltern wollen das Beste für ihr Kind. Oft sind das Dinge die man selber nicht kontrollieren oder verstehen kann.",
      },
      {
        id: "stress",
        title: "Menschen in Stresssituationen",
        image: "/images/zielgruppe-stress.jpg",
        description: "Burnout-Prävention, Überforderung im Beruf oder Alltag, Erschöpfungszustände und chronische Anspannung.",
      },
      {
        id: "senioren",
        title: "Senioren",
        image: "/images/zielgruppe-senioren.jpg",
        description: "Lebensübergänge meistern, Ängste im Alter, Schlafprobleme und Unterstützung bei Veränderungsprozessen.",
      },
    ],
    topicsTitle: "Themenspezifisch",
    topics: [
      { id: "phobien", title: "Phobien", icon: "spider", description: "Angst vor Spinnen, Höhenangst, Flugangst oder übersteigerte Angst vor bestimmten Tieren und Situationen überwinden." },
      { id: "aengste", title: "Ängste", icon: "cloud-lightning", description: "Panikattacken, soziale Ängste, Zukunftsangst oder generalisierte Angststörungen nachhaltig behandeln." },
      { id: "selbstbewusstsein", title: "Selbstbewusstsein stärken", icon: "sun", description: "Dein Selbstbewusstsein positiv beeinflussen, negative Denkmuster durchbrechen und Dein Selbstbild mit starken Ressourcen verankern." },
      { id: "sucht", title: "Sucht", icon: "cigarette-off", description: "Raucherentwöhnung, Esssucht oder andere Abhängigkeiten nachhaltig überwinden." },
      { id: "blockaden", title: "Blockaden lösen", icon: "unlock", description: "Mentale Blockaden und Hindernisse erkennen und auflösen für mehr Freiheit im Leben." },
      { id: "konzentration", title: "Konzentration & Schlaf", icon: "moon-star", description: "Konzentrationsschwierigkeiten, Schlaflosigkeit und innere Unruhe behandeln." },
      { id: "schmerzen", title: "Schmerzen", icon: "heart-pulse", description: "Chronische Schmerzen lindern und einen besseren Umgang mit Schmerzempfindungen entwickeln." },
      { id: "gewicht", title: "Gewichtsreduktion", icon: "scale", description: "Nachhaltig abnehmen durch Veränderung der Essgewohnheiten im Unterbewusstsein." },
      { id: "allergien", title: "Allergien", icon: "flower-2", description: "Desensibilisierung und Linderung von allergischen Reaktionen durch Hypnosetherapie." },
      { id: "sport", title: "Sporthypnose", icon: "trophy", description: "Mentale Stärke für Sportler - Leistungsblockaden lösen und Fokus verbessern." },
    ],
  },
  certificates: {
    title: "Diplome & Zertifikate",
    certificates: [
      { id: 1, title: "Diplom Hypnosetherapeutin", image: "/images/diplom-1.jpg" },
      { id: 2, title: "National Guild of Hypnotists", image: "/images/diplom-2.jpg" },
      { id: 3, title: "Verband Schweizer Hypnosetherapeut:innen", image: "/images/diplom-3.jpg" },
      { id: 4, title: "Weiterbildung Zertifikat", image: "/images/diplom-4.jpg" },
      { id: 5, title: "Zusatzqualifikation", image: "/images/diplom-5.jpg" },
    ],
  },
  testimonials: {
    title: "Erfahrungen",
    subtitle: "Was meine Klient:innen sagen",
    testimonials: [
      { id: 1, text: "Nach nur wenigen Sitzungen konnte ich meine Flugangst überwinden. Enza hat eine wunderbare Art, einen durch den Prozess zu begleiten.", author: "Sarah M.", location: "Bern", rating: 5 },
      { id: 2, text: "Endlich kann ich wieder ruhig schlafen. Die Hypnosetherapie hat mir geholfen, meine innere Unruhe loszulassen. Sehr empfehlenswert!", author: "Thomas K.", location: "Thun", rating: 5 },
      { id: 3, text: "Professionell, einfühlsam und wirkungsvoll. Ich habe mich von Anfang an gut aufgehoben gefühlt. Die Blockaden sind endlich gelöst.", author: "Laura B.", location: "Bern", rating: 5 },
    ],
  },
  pricing: {
    title: "Konditionen",
    freeConsultation: {
      title: "Kostenloses Kennenlerngespräch",
      subtitle: "15 Min. telefonisch – unverbindlich",
      phone: "tel:+41794162223",
      buttonText: "Jetzt anrufen",
    },
    hourlyRate: "150 CHF / Stunde",
    firstSession: {
      title: "Erstsitzung + Anamnese",
      duration: "ca. 1.5 – 2 Stunden",
    },
    followUpSession: {
      title: "Folgesitzungen",
      duration: "ca. 1 – 1.5 Stunden",
    },
    discount: {
      title: "20% Ermässigung",
      description: "für Kinder & Jugendliche (6–18 Jahre), Studierende, IV-Bezüger und Pensionierte",
    },
    payment: {
      title: "Bezahlung nach jeder Sitzung",
      methods: ["Bar", "TWINT"],
    },
    houseVisits: {
      title: "Hausbesuche möglich",
      cost: "zzgl. CHF 1.50 pro Kilometer Anfahrt",
    },
    cancellation: {
      title: "Terminabsage",
      text: "Bitte spätestens 24 Stunden vorher absagen, andernfalls wird die Sitzung verrechnet.",
    },
    insurance: {
      title: "Krankenkasse",
      text: "Die Hypnosetherapie ist in der Schweiz noch nicht von allen Krankenkassen anerkannt. Die EGK beteiligt sich bereits an den Kosten.",
    },
    ctaText: "Termin vereinbaren",
    ctaLink: "#kontakt",
  },
  disclaimer: {
    title: "Wichtige Hinweise",
    items: [
      { title: "Komplementäre Therapie", text: "Hypnosetherapie kann ergänzend zur ärztlichen oder therapeutischen Behandlung eingesetzt werden – als achtsame Begleitung auf Deinem Weg zu mehr Bewusstsein, Vertrauen und innerer Balance." },
      { title: "Laufende Behandlung", text: "Falls Du Dich aktuell in psychotherapeutischer oder psychiatrischer Behandlung befindest, informiere mich bitte darüber. Eine Zusammenarbeit erfolgt nur mit dem Einverständnis Deines behandelnden Therapeuten oder Arztes." },
      { title: "Kein Heilversprechen", text: "In meiner Praxis werden ausdrücklich keine Garantien oder Heilversprechen abgegeben. Jeder Mensch ist einzigartig und die Ergebnisse können individuell variieren." },
    ],
  },
  contact: {
    title: "Kontakt",
    fields: {
      firstName: "Vorname",
      lastName: "Nachname",
      email: "E-Mail Adresse",
      phone: "Telefon",
      message: "Deine Nachricht...",
    },
    submitText: "Senden",
    privacyText: "Datenschutz",
    successTitle: "Nachricht gesendet!",
    successMessage: "Vielen Dank für Deine Anfrage. Ich melde mich so schnell wie möglich bei Dir.",
  },
  footer: {
    copyright: "Enza Gasser",
    email: "hypnoseenza@gmail.com",
    links: [
      { name: "Impressum", href: "/impressum" },
      { name: "Datenschutz", href: "/datenschutz" },
      { name: "Ethikkodex VSH", href: "https://verband-schweizer-hypnosetherapeuten.ch/vsh-ethik/", external: true },
    ],
    socialLinks: [
      { name: "Facebook", href: "#", icon: "facebook" },
      { name: "Instagram", href: "#", icon: "instagram" },
    ],
  },
};

// Client-side Funktionen
export function getContent(): SiteContent {
  if (typeof window === 'undefined') {
    return defaultContent;
  }

  try {
    // Check version - reset practiceInfo if version changed
    const storedVersion = localStorage.getItem(CONTENT_VERSION_KEY);
    const currentVersion = storedVersion ? parseInt(storedVersion, 10) : 0;

    if (currentVersion < CURRENT_VERSION) {
      // Version changed - reset practiceInfo to get new email/phone
      localStorage.setItem(CONTENT_VERSION_KEY, CURRENT_VERSION.toString());
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Keep user content but reset practiceInfo to defaults
        parsed.practiceInfo = defaultContent.practiceInfo;
        parsed.footer = defaultContent.footer;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        return deepMerge(defaultContent, parsed);
      }
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge mit defaults für neue Felder
      return deepMerge(defaultContent, parsed);
    }
  } catch (e) {
    console.error('Error loading content:', e);
  }

  return defaultContent;
}

export function saveContent(content: SiteContent): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch (e) {
    console.error('Error saving content:', e);
  }
}

export function getSection<K extends SectionKey>(key: K): SiteContent[K] {
  const content = getContent();
  return content[key];
}

export function saveSection<K extends SectionKey>(key: K, data: SiteContent[K]): void {
  const content = getContent();
  content[key] = data;
  saveContent(content);
}

export function resetContent(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function resetSection<K extends SectionKey>(key: K): void {
  const content = getContent();
  content[key] = defaultContent[key];
  saveContent(content);
}

// Helper: Deep merge für nested objects
function deepMerge(target: SiteContent, source: Partial<SiteContent>): SiteContent {
  const result = { ...target };

  for (const key of Object.keys(source) as (keyof SiteContent)[]) {
    const sourceValue = source[key];
    if (sourceValue !== undefined) {
      // Arrays werden überschrieben, nicht gemerged
      if (Array.isArray(sourceValue)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (result as any)[key] = sourceValue;
      } else if (
        typeof sourceValue === 'object' &&
        sourceValue !== null &&
        typeof target[key] === 'object' &&
        target[key] !== null &&
        !Array.isArray(target[key])
      ) {
        // Nested objects werden gemerged
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (result as any)[key] = { ...target[key], ...sourceValue };
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (result as any)[key] = sourceValue;
      }
    }
  }

  return result;
}
