// Site-Konfiguration — Palacios Communications
//
// Erklärung der Felder siehe templates/serene/src/lib/site-config.ts.

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
  name: "Palacios Communications",
  // TODO beim Aufschalten prüfen
  domain: "palacios-relations.ch",
  useWww: true,
  locale: "de-CH",
  // Gold auf Anthrazit mit der Paarung "Warm" (DM Serif Display über DM Sans).
  // Bewusst nicht "Klassisch": Playfair auf Salbei ist die Voreinstellung des
  // Templates und wird auf den meisten Kundenseiten stehen. Unsere eigene
  // Seite soll nicht aussehen wie das, was wir verkaufen.
  defaultTheme: {
    paletteId: "gold",
    fontId: "warm",
  },
  // Für die eigene Seite brauchen wir weder Konditionen-Tabelle noch
  // Zertifikate — diese Sektionen bleiben aus.
  sections: ["hero", "welcome", "philosophy", "services", "testimonials", "contact"],
  heroVideo: null,
  showInclusivityBadge: false,
};

export const siteUrl = `https://${siteConfig.useWww ? "www." : ""}${siteConfig.domain}`;

/**
 * Läuft diese Instanz als Vorschau (z. B. auf einer *.up.railway.app-Adresse)?
 *
 * Dann wird die Seite auf noindex gesetzt. Eine zweite, öffentlich
 * erreichbare Kopie derselben Texte macht der echten Domain sonst in der
 * Suche Konkurrenz. In Railway dazu SITE_VORSCHAU=1 setzen.
 */
export const istVorschau = process.env.SITE_VORSCHAU === "1";

export function hasSection(id: SectionId): boolean {
  return siteConfig.sections.includes(id);
}
