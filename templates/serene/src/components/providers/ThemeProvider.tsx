"use client";

import { useEffect } from "react";
import { themeToCssVars, type ThemeSelection } from "@/lib/theme";

/**
 * Setzt Palette und Schrift zur Laufzeit auf das Dokument.
 *
 * Im normalen Betrieb passiert hier nichts Sichtbares — das Layout liefert
 * das Theme bereits serverseitig aus, damit die Seite nicht umspringt. Nötig
 * ist der Provider für die Live-Vorschau im Admin, wo die Auswahl sofort
 * greifen soll, ohne dass gespeichert oder neu geladen wird. Die
 * Schriftdateien liegen alle bereits vor (siehe src/lib/fonts.ts), es
 * wechseln also nur die Variablen.
 */
export default function ThemeProvider({ theme }: { theme: ThemeSelection }) {
  useEffect(() => {
    const root = document.documentElement;
    const vars = themeToCssVars(theme);

    for (const [name, value] of Object.entries(vars)) {
      root.style.setProperty(name, value);
    }

  }, [theme]);

  return null;
}
