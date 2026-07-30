// Theme-System: Farbpaletten und Schrift-Kombinationen
//
// Beim Onboarding wählt die Kund/in eine Palette und eine Schrift-Kombination.
// Beide bleiben danach im Admin änderbar — mehr nicht. Alles andere am Design
// ist bewusst festgelegt, damit an der Seite nichts kaputtgehen kann.

export interface PaletteColors {
  /** Primärfarbe: Buttons, Links, Akzente */
  brand: string;
  brandLight: string;
  brandDark: string;
  /** Getönte Sekundärskala: Sektionsflächen, Rahmen, Trenner (hell → dunkel) */
  accent100: string;
  accent200: string;
  accent300: string;
  accent400: string;
  accent500: string;
  accent600: string;
  /** Neutrale Grundskala: Seitenhintergrund und Karten (hell → dunkel) */
  base50: string;
  base100: string;
  base200: string;
  base300: string;
  base400: string;
  /** Textfarben (dunkel → hell) */
  textDark: string;
  textMedium: string;
  textLight: string;
  textMuted: string;
}

export interface Palette {
  id: string;
  name: string;
  /** Kurzbeschreibung für die Auswahl im Onboarding */
  description: string;
  /** Drei Farben für die Vorschau-Kachel in der Auswahl */
  preview: [string, string, string];
  colors: PaletteColors;
}

export const palettes: Palette[] = [
  {
    id: "salbei",
    name: "Salbei",
    description: "Ruhig und natürlich. Passt zu Therapie, Coaching und Gesundheit.",
    preview: ["#8c836c", "#a8b5a0", "#f5f0e8"],
    colors: {
      brand: "#8c836c",
      brandLight: "#a69d88",
      brandDark: "#706857",
      accent100: "#f4f6f3",
      accent200: "#e5ebe3",
      accent300: "#c9d4c5",
      accent400: "#a8b5a0",
      accent500: "#8a9c82",
      accent600: "#6b7d64",
      base50: "#fdfcfa",
      base100: "#faf8f5",
      base200: "#f5f0e8",
      base300: "#ebe4d8",
      base400: "#d9cfc0",
      textDark: "#3d4a3a",
      textMedium: "#5a6657",
      textLight: "#7a8775",
      textMuted: "#9ca898",
    },
  },
  {
    id: "terrakotta",
    name: "Terrakotta",
    description: "Warm und einladend. Passt zu Handwerk, Gastronomie und Beratung.",
    preview: ["#b5654a", "#d99e85", "#f7ede5"],
    colors: {
      brand: "#b5654a",
      brandLight: "#c8826a",
      brandDark: "#94503a",
      accent100: "#fbf4ef",
      accent200: "#f4e3d8",
      accent300: "#e8c7b3",
      accent400: "#d99e85",
      accent500: "#c47d5f",
      accent600: "#a35f43",
      base50: "#fffdfb",
      base100: "#fdf8f4",
      base200: "#f7ede5",
      base300: "#eeded1",
      base400: "#ddc5b2",
      textDark: "#4a3428",
      textMedium: "#6b4d3e",
      textLight: "#8c6d5c",
      textMuted: "#ab9184",
    },
  },
  {
    id: "ozean",
    name: "Ozean",
    description: "Klar und vertrauenswürdig. Passt zu Kanzleien, Finanz und Technik.",
    preview: ["#2c6e8f", "#7fa8bd", "#e8f0f4"],
    colors: {
      brand: "#2c6e8f",
      brandLight: "#4a89a8",
      brandDark: "#1f5470",
      accent100: "#f1f6f9",
      accent200: "#e0ecf2",
      accent300: "#bcd6e2",
      accent400: "#7fa8bd",
      accent500: "#5b8ba5",
      accent600: "#416f89",
      base50: "#fcfdfe",
      base100: "#f6fafc",
      base200: "#e8f0f4",
      base300: "#d6e4eb",
      base400: "#b6ccd7",
      textDark: "#1f3644",
      textMedium: "#3a5567",
      textLight: "#5c7688",
      textMuted: "#8399a8",
    },
  },
  {
    id: "rose",
    name: "Rosé",
    description: "Sanft und persönlich. Passt zu Kosmetik, Ernährung und Begleitung.",
    preview: ["#a8636f", "#cf9aa4", "#f8eeef"],
    colors: {
      brand: "#a8636f",
      brandLight: "#bd808b",
      brandDark: "#8a4b57",
      accent100: "#fbf4f5",
      accent200: "#f4e3e6",
      accent300: "#e5c3c9",
      accent400: "#cf9aa4",
      accent500: "#b87b87",
      accent600: "#9a5d69",
      base50: "#fffdfd",
      base100: "#fdf7f8",
      base200: "#f8eeef",
      base300: "#efdfe1",
      base400: "#ddc3c7",
      textDark: "#432e33",
      textMedium: "#62474d",
      textLight: "#836569",
      textMuted: "#a68b8f",
    },
  },
  {
    id: "anthrazit",
    name: "Anthrazit",
    description: "Reduziert und modern. Passt zu Agenturen, Architektur und Beratung.",
    preview: ["#3f4550", "#8b929e", "#eef0f2"],
    colors: {
      brand: "#3f4550",
      brandLight: "#5c636f",
      brandDark: "#2a2f38",
      accent100: "#f4f5f7",
      accent200: "#e7e9ec",
      accent300: "#ccd1d7",
      accent400: "#8b929e",
      accent500: "#6b7280",
      accent600: "#4e5560",
      base50: "#fdfdfe",
      base100: "#f8f9fa",
      base200: "#eef0f2",
      base300: "#e0e3e7",
      base400: "#c4c9cf",
      textDark: "#22262d",
      textMedium: "#414751",
      textLight: "#646b76",
      textMuted: "#8f959e",
    },
  },
];

export interface FontPairing {
  id: string;
  name: string;
  description: string;
  /** Schrift für Überschriften */
  heading: string;
  /** Schrift für Fliesstext */
  body: string;
  /** Kursive Überschriften im Hero (passt nicht zu jeder Schrift) */
  headingItalic: boolean;
  /** Google-Fonts-Query, z. B. "Playfair+Display:ital,wght@0,400;0,500" */
  googleFamilies: string[];
}

export const fontPairings: FontPairing[] = [
  {
    id: "klassisch",
    name: "Klassisch",
    description: "Elegante Serifen-Überschriften mit ruhigem Fliesstext.",
    heading: '"Playfair Display", Georgia, serif',
    body: '"Inter", ui-sans-serif, system-ui, sans-serif',
    headingItalic: true,
    googleFamilies: [
      "Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500",
      "Inter:wght@300;400;500;600",
    ],
  },
  {
    id: "fein",
    name: "Fein",
    description: "Zarte, literarische Anmutung mit viel Luft.",
    heading: '"Cormorant Garamond", Georgia, serif',
    body: '"Inter", ui-sans-serif, system-ui, sans-serif',
    headingItalic: true,
    googleFamilies: [
      "Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500",
      "Inter:wght@300;400;500;600",
    ],
  },
  {
    id: "modern",
    name: "Modern",
    description: "Durchgehend serifenlos, klar und sachlich.",
    heading: '"Inter", ui-sans-serif, system-ui, sans-serif',
    body: '"Inter", ui-sans-serif, system-ui, sans-serif',
    headingItalic: false,
    googleFamilies: ["Inter:wght@300;400;500;600;700"],
  },
  {
    id: "warm",
    name: "Warm",
    description: "Runde, freundliche Formen mit kräftigen Überschriften.",
    heading: '"DM Serif Display", Georgia, serif',
    body: '"DM Sans", ui-sans-serif, system-ui, sans-serif',
    headingItalic: true,
    googleFamilies: [
      "DM+Serif+Display:ital@0;1",
      "DM+Sans:wght@300;400;500;600",
    ],
  },
];

export interface ThemeSelection {
  paletteId: string;
  fontId: string;
}

export const defaultTheme: ThemeSelection = {
  paletteId: "salbei",
  fontId: "klassisch",
};

export function getPalette(id: string): Palette {
  return palettes.find((p) => p.id === id) ?? palettes[0];
}

export function getFontPairing(id: string): FontPairing {
  return fontPairings.find((f) => f.id === id) ?? fontPairings[0];
}

/** CSS-Custom-Properties für eine Auswahl — identisch für Server und Client. */
export function themeToCssVars(theme: ThemeSelection): Record<string, string> {
  const { colors } = getPalette(theme.paletteId);
  const font = getFontPairing(theme.fontId);

  return {
    "--brand": colors.brand,
    "--brand-light": colors.brandLight,
    "--brand-dark": colors.brandDark,
    "--accent-100": colors.accent100,
    "--accent-200": colors.accent200,
    "--accent-300": colors.accent300,
    "--accent-400": colors.accent400,
    "--accent-500": colors.accent500,
    "--accent-600": colors.accent600,
    "--base-50": colors.base50,
    "--base-100": colors.base100,
    "--base-200": colors.base200,
    "--base-300": colors.base300,
    "--base-400": colors.base400,
    "--text-dark": colors.textDark,
    "--text-medium": colors.textMedium,
    "--text-light": colors.textLight,
    "--text-muted": colors.textMuted,
    "--font-heading": font.heading,
    "--font-body": font.body,
    "--heading-style": font.headingItalic ? "italic" : "normal",
  };
}

/** Als CSS-Text für ein <style>-Tag im Server-Rendering. */
export function themeToCssText(theme: ThemeSelection): string {
  const vars = themeToCssVars(theme);
  const body = Object.entries(vars)
    .map(([key, value]) => `${key}:${value};`)
    .join("");
  return `:root{${body}}`;
}

/** Google-Fonts-URL für eine Schrift-Kombination. */
export function googleFontsUrl(fontId: string): string {
  const font = getFontPairing(fontId);
  const families = font.googleFamilies.map((f) => `family=${f}`).join("&");
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}
