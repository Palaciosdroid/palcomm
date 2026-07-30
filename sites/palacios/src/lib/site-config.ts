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
  defaultTheme: {
    paletteId: "gold",
    fontId: "modern",
  },
  // Für die eigene Seite brauchen wir weder Konditionen-Tabelle noch
  // Zertifikate — diese Sektionen bleiben aus.
  sections: ["hero", "welcome", "philosophy", "services", "testimonials", "contact"],
  heroVideo: null,
  showInclusivityBadge: false,
};

export const siteUrl = `https://${siteConfig.useWww ? "www." : ""}${siteConfig.domain}`;

export function hasSection(id: SectionId): boolean {
  return siteConfig.sections.includes(id);
}
