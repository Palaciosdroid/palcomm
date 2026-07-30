"use client";

import { useEffect } from "react";
import {
  getFontPairing,
  googleFontsUrl,
  themeToCssVars,
  type ThemeSelection,
} from "@/lib/theme";

const FONT_LINK_ID = "theme-font-link";

/**
 * Setzt Palette und Schrift zur Laufzeit auf das Dokument.
 *
 * Im normalen Betrieb passiert hier nichts Sichtbares — das Layout liefert
 * das Theme bereits serverseitig aus, damit die Seite nicht umspringt. Nötig
 * ist der Provider für die Live-Vorschau im Admin, wo die Auswahl sofort
 * greifen soll, ohne dass gespeichert oder neu geladen wird.
 */
export default function ThemeProvider({ theme }: { theme: ThemeSelection }) {
  useEffect(() => {
    const root = document.documentElement;
    const vars = themeToCssVars(theme);

    for (const [name, value] of Object.entries(vars)) {
      root.style.setProperty(name, value);
    }

    // Schrift nachladen, falls die gewählte Kombination noch nicht im
    // Dokument steht (z. B. weil im Admin gerade umgestellt wurde).
    const font = getFontPairing(theme.fontId);
    const href = googleFontsUrl(font.id);
    const existing = document.getElementById(FONT_LINK_ID) as HTMLLinkElement | null;

    if (existing) {
      if (existing.href !== href) existing.href = href;
    } else {
      const link = document.createElement("link");
      link.id = FONT_LINK_ID;
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    }
  }, [theme]);

  return null;
}
