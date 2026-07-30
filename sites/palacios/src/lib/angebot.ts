// Das Angebot als Bausteine.
//
// Grundgedanke: Es gibt EINEN Grundpreis und eine Liste von Bausteinen. Die
// drei "Pakete" sind nichts anderes als vorausgewählte Kombinationen — sie
// existieren, damit niemand vor einer leeren Liste sitzt, nicht damit jemand
// etwas kaufen muss, das er nicht braucht.
//
// Deshalb öffnet der Konfigurator mit "Gemeinsam" angehakt: Wer nichts
// entscheiden will, sieht eine Empfehlung. Wer etwas nicht braucht, hakt es ab
// und sieht den Preis sinken. Das ist der Grund, warum die Einzelpreise
// sichtbar bleiben — ein Bündel wirkt nur dann wie ein Angebot, wenn man
// sieht, was die Teile kosten.

export type BausteinGruppe = "texte" | "sichtbarkeit" | "auftritt" | "funktionen";

export interface Baustein {
  id: string;
  gruppe: BausteinGruppe;
  name: string;
  beschreibung: string;
  /** Einmalig, in CHF inkl. MwSt */
  preis: number;
  /** Zusätzlich pro Monat, in CHF inkl. MwSt */
  proMonat?: number;
  /**
   * Bausteine derselben Auswahlgruppe schliessen sich aus — z. B. die drei
   * Stufen beim Texten. Ohne Angabe ist der Baustein frei kombinierbar.
   */
  auswahlgruppe?: string;
  /** Nicht online buchbar, wir offerieren persönlich */
  nurAufAnfrage?: boolean;
  hinweis?: string;
}

export const GRUNDPREIS = 980;

/**
 * Absolvent/innen bekommen die Textüberarbeitung geschenkt statt eines
 * Prozentrabatts. Kostet uns rund 45 Minuten, ist 190 wert — und hebt jede
 * Absolventenseite von "selbst getippt" auf "redigiert". Ein Prozentrabatt
 * würde bei überwiegend Absolvent/innen schlicht zum Normalpreis.
 */
export const ABSOLVENTEN_GRATIS = "texte-lektorat";
export const ABO_MONATLICH = 29.9;
export const ABO_JAEHRLICH = 299;

export const GRUNDLEISTUNG = [
  "Website nach unserer Vorlage, mit Ihrer Farbpalette und Schrift",
  "Wunschdomain: geprüft, registriert und eingerichtet",
  "Hosting, SSL-Zertifikat und Backups",
  "Impressum und Datenschutzerklärung, auf Ihre Praxis zugeschnitten",
  "Die Pflichthinweise für Gesundheitsberufe, fertig formuliert",
  "Zugang zum Selberbearbeiten von Texten, Farben und Schrift",
  "Eine Korrekturrunde vor der Aufschaltung",
];

export const bausteine: Baustein[] = [
  // --- Texte: drei Stufen, eine davon ist immer gewählt ---
  {
    id: "texte-selbst",
    gruppe: "texte",
    auswahlgruppe: "texte",
    name: "Ich schreibe selbst",
    beschreibung:
      "Sie füllen die Fragen im Konfigurator aus. Wir übernehmen Ihre Texte, wie sie sind.",
    preis: 0,
  },
  {
    id: "texte-lektorat",
    gruppe: "texte",
    auswahlgruppe: "texte",
    name: "Ich schreibe, Sie überarbeiten",
    beschreibung:
      "Sie liefern den Inhalt, wir bringen ihn in Form: Rechtschreibung, Rhythmus, Wirkung — und wir weisen auf Formulierungen hin, die im Gesundheitsbereich heikel sind.",
    preis: 190,
  },
  {
    id: "texte-komplett",
    gruppe: "texte",
    auswahlgruppe: "texte",
    name: "Sie schreiben für mich",
    beschreibung:
      "Sie schicken uns Stichworte, Lebenslauf und ein paar Sätze über Ihre Haltung. Den Rest schreiben wir.",
    preis: 490,
  },

  // --- Sichtbarkeit ---
  {
    id: "seo",
    gruppe: "sichtbarkeit",
    name: "SEO-Grundausbau",
    beschreibung:
      "Suchbegriffe für Ihre Region und Ihr Angebot, Seitenstruktur und Beschreibungstexte darauf abgestimmt.",
    preis: 390,
  },
  {
    id: "google-business",
    gruppe: "sichtbarkeit",
    name: "Google-Business-Profil",
    beschreibung:
      "Eingerichtet und verifiziert, damit Sie in der Kartensuche erscheinen. Für lokale Praxen oft wirksamer als die Website selbst.",
    preis: 290,
  },
  {
    id: "seo-betreuung",
    gruppe: "sichtbarkeit",
    name: "Laufende SEO-Betreuung",
    beschreibung:
      "Wir schauen quartalsweise, wonach Menschen tatsächlich suchen, und passen Ihre Texte an.",
    preis: 0,
    proMonat: 30,
  },

  // --- Auftritt ---
  {
    id: "logo-schriftzug",
    gruppe: "auftritt",
    auswahlgruppe: "logo",
    name: "Logo als Schriftzug",
    beschreibung:
      "Ihr Name als gesetzter Schriftzug, abgestimmt auf die Farben Ihrer Website. Als Datei für Website, Druck und Social Media.",
    preis: 690,
  },
  {
    id: "logo-bildmarke",
    gruppe: "auftritt",
    auswahlgruppe: "logo",
    name: "Logo mit Bildmarke",
    beschreibung:
      "Ein eigenes Zeichen zum Schriftzug, in mehreren Entwurfsrunden entwickelt.",
    preis: 1490,
    nurAufAnfrage: true,
    hinweis: "Wir offerieren das persönlich, weil der Aufwand je nach Idee stark schwankt.",
  },
  {
    id: "visitenkarten",
    gruppe: "auftritt",
    name: "200 Visitenkarten",
    beschreibung: "Gesetzt in Ihren Farben, gedruckt und zu Ihnen geliefert.",
    preis: 390,
  },
  {
    id: "fotoshooting",
    gruppe: "auftritt",
    name: "Fotoshooting im Studio Bern",
    beschreibung:
      "Portraits an einem unserer Studiotage. Der häufigste Grund, warum eine Seite unfertig wirkt, sind fehlende Bilder.",
    preis: 590,
  },
  {
    id: "video",
    gruppe: "auftritt",
    name: "Vorstellungsvideo",
    beschreibung:
      "Im Greenscreen-Studio in Bern oder bei Ihnen vor Ort. Kann als bewegtes Startbild Ihrer Website dienen.",
    preis: 890,
    nurAufAnfrage: true,
    hinweis: "Dafür reservieren wir einen Drehtag — deshalb besprechen wir das persönlich.",
  },

  // --- Funktionen ---
  {
    id: "unterseite",
    gruppe: "funktionen",
    name: "Weitere Unterseite",
    beschreibung: "Zum Beispiel für ein einzelnes Angebot, eine Methode oder ein Team.",
    preis: 390,
    proMonat: 5,
  },
  {
    id: "terminbuchung",
    gruppe: "funktionen",
    name: "Terminbuchung",
    beschreibung:
      "Klient/innen buchen selbst einen freien Termin. Verbunden mit Ihrem Kalender.",
    preis: 290,
    proMonat: 10,
  },
  {
    id: "blog",
    gruppe: "funktionen",
    name: "Blog",
    beschreibung:
      "Ein Bereich für Beiträge, den Sie selbst pflegen. Hilft auch bei der Auffindbarkeit.",
    preis: 490,
    proMonat: 15,
  },
  {
    id: "zweite-sprache",
    gruppe: "funktionen",
    name: "Zweite Sprache",
    beschreibung: "Ihre Seite zusätzlich auf Französisch, Italienisch oder Englisch.",
    preis: 1490,
    proMonat: 20,
    nurAufAnfrage: true,
    hinweis: "Preis je nach Textmenge — wir schauen es uns an.",
  },
];

export interface Voreinstellung {
  id: string;
  name: string;
  fuerWen: string;
  bausteinIds: string[];
  /**
   * Fester Paketpreis statt gerechnetem Prozentsatz. Bewusst so: Ein Rabatt
   * auf die Bausteine ergibt bei einem hohen Grundpreis nur kleine, unrunde
   * Ersparnisse — sichtbar wird ein Angebot erst bei runden Zahlen.
   */
  preis: number;
  empfohlen?: boolean;
}

/**
 * Die drei Voreinstellungen. Sie sind Abkürzungen, keine Produkte — deshalb
 * heissen sie nach dem, was den Unterschied ausmacht: wer die Arbeit macht.
 */
export const voreinstellungen: Voreinstellung[] = [
  {
    id: "selbst",
    name: "Selbst",
    fuerWen: "Sie schreiben Ihre Texte selbst und wollen schnell online sein.",
    preis: 980,
    bausteinIds: ["texte-selbst"],
  },
  {
    id: "gemeinsam",
    name: "Gemeinsam",
    fuerWen:
      "Sie schreiben, wir bringen es in Form — und sorgen dafür, dass man Sie findet.",
    empfohlen: true,
    preis: 1590,
    bausteinIds: ["texte-lektorat", "seo", "google-business"],
  },
  {
    id: "rundum",
    name: "Rundum",
    fuerWen: "Der ganze Auftritt soll stimmen, nicht nur die Website.",
    preis: 2990,
    bausteinIds: [
      "texte-komplett",
      "seo",
      "google-business",
      "logo-schriftzug",
      "visitenkarten",
      "fotoshooting",
    ],
  },
];

export interface Summe {
  einmalig: number;
  proMonat: number;
  /** Was dieselbe Auswahl ohne Paketrabatt kosten würde */
  ohneRabatt: number;
  ersparnis: number;
  /** Auf welche Voreinstellung die Auswahl genau passt, falls überhaupt */
  passendeVoreinstellung: string | null;
}

export function findeBaustein(id: string): Baustein | undefined {
  return bausteine.find((b) => b.id === id);
}

/** Auf welche Voreinstellung passt diese Auswahl exakt? */
export function erkenneVoreinstellung(ausgewaehlt: string[]): string | null {
  const gewaehlt = [...ausgewaehlt].sort().join("|");
  const treffer = voreinstellungen.find(
    (v) => [...v.bausteinIds].sort().join("|") === gewaehlt
  );
  return treffer?.id ?? null;
}

export function berechne(ausgewaehlt: string[]): Summe {
  const gewaehlteBausteine = ausgewaehlt
    .map(findeBaustein)
    .filter((b): b is Baustein => Boolean(b));

  // Was nur auf Anfrage geht, fliesst nicht in die Summe — sonst stünde ein
  // Preis da, den wir nicht zusagen können.
  const buchbar = gewaehlteBausteine.filter((b) => !b.nurAufAnfrage);

  const bausteineEinmalig = buchbar.reduce((s, b) => s + b.preis, 0);
  const proMonat =
    ABO_MONATLICH + buchbar.reduce((s, b) => s + (b.proMonat ?? 0), 0);

  const ohneRabatt = GRUNDPREIS + bausteineEinmalig;

  // Passt die Auswahl genau auf eine Voreinstellung, gilt deren Paketpreis.
  // Wer selbst zusammenstellt, zahlt die Einzelpreise — eine ungewöhnliche
  // Kombination kostet uns mehr Zeit als eine eingespielte.
  const passendeVoreinstellung = erkenneVoreinstellung(ausgewaehlt);
  const paket = passendeVoreinstellung
    ? voreinstellungen.find((v) => v.id === passendeVoreinstellung)
    : undefined;
  const einmalig = paket ? paket.preis : ohneRabatt;

  return {
    einmalig,
    proMonat: Math.round(proMonat * 100) / 100,
    ohneRabatt,
    ersparnis: ohneRabatt - einmalig,
    passendeVoreinstellung,
  };
}

export function formatiereChf(betrag: number): string {
  const gerundet = Math.round(betrag * 100) / 100;
  const ganz = Number.isInteger(gerundet);
  return ganz
    ? gerundet.toLocaleString("de-CH")
    : gerundet.toLocaleString("de-CH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
}
