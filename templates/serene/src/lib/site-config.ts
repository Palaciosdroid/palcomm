// Site-Konfiguration — wird beim Onboarding einmalig gesetzt.
//
// Hier steht alles, was zur Website als Ganzes gehört und sich später nicht
// mehr ändern soll: Domain, Sprache, welche Sektionen es überhaupt gibt.
// Texte und Bilder liegen dagegen im Content (src/lib/content.ts, im Betrieb
// in Redis) und sind über den Admin-Bereich änderbar.

import type { ThemeSelection } from "./theme";

/** Sektionen in der Reihenfolge, in der sie auf der Seite erscheinen. */
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
  /** Name der Website — für Titel, Footer, E-Mails */
  name: string;
  /** Domain ohne Protokoll, z. B. "musterpraxis.ch" */
  domain: string;
  /** true, wenn die Seite unter www. läuft und die nackte Domain umleiten soll */
  useWww: boolean;
  locale: string;
  /** Vorgabe aus dem Onboarding. Im Admin änderbar, dann liegt sie im Content. */
  defaultTheme: ThemeSelection;
  /** Welche Sektionen aktiv sind — im Onboarding gewählt, danach fix. */
  sections: SectionId[];
  /** Optionales Hintergrundvideo im Hero. Leer = ruhiger Farbverlauf. */
  heroVideo: string | null;
  /**
   * Optionales Hintergrundfoto im Hero — der übliche Fall. Ein Video hat
   * fast niemand, ein Foto vom Praxisraum fast alle. Ohne beides bleibt der
   * Farbverlauf, und der wirkt auf einem grossen Schirm sehr leer.
   * Wird ignoriert, wenn heroVideo gesetzt ist.
   */
  heroImage: string | null;
  /** Regenbogen-Badge "Alle sind willkommen" in der Willkommens-Sektion */
  showInclusivityBadge: boolean;
}

export const siteConfig: SiteConfig = {
  name: "Musterpraxis",
  domain: "musterpraxis.ch",
  useWww: true,
  locale: "de-CH",
  defaultTheme: {
    paletteId: "salbei",
    fontId: "klassisch",
  },
  sections: [
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
  ],
  heroVideo: null,
  heroImage: null,
  showInclusivityBadge: true,
};

export const siteUrl = `https://${siteConfig.useWww ? "www." : ""}${siteConfig.domain}`;

export function hasSection(id: SectionId): boolean {
  return siteConfig.sections.includes(id);
}
