// Schriften.
//
// Alle Schriften werden über next/font zur Bauzeit heruntergeladen und vom
// eigenen Server ausgeliefert. Sie dürfen NICHT per <link> von
// fonts.googleapis.com geladen werden: Dabei fliesst die IP-Adresse jeder
// Besucherin an Google in die USA — ohne Einwilligung und ohne dass es in der
// Datenschutzerklärung stünde. Genau darum ging es im Urteil des LG München I
// (3 O 17493/20).
//
// Weil die Schrift im Admin umschaltbar ist, werden alle Familien geladen und
// über CSS-Variablen angesprochen. Der Browser lädt nur die Schnitte, die auf
// der Seite tatsächlich vorkommen.

import {
  Inter,
  Playfair_Display,
  Cormorant_Garamond,
  DM_Serif_Display,
  DM_Sans,
} from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

/** Gehört auf das <html>-Element, damit alle Schrift-Variablen verfügbar sind. */
export const fontVariables = [
  inter.variable,
  playfair.variable,
  cormorant.variable,
  dmSerif.variable,
  dmSans.variable,
].join(" ");
