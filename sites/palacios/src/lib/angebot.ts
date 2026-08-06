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

export type BausteinGruppe =
  | "texte"
  | "sichtbarkeit"
  | "adresse"
  | "auftritt"
  | "funktionen";

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

/**
 * Beschriftung der hervorgehobenen Voreinstellung — an einer Stelle, weil sie
 * an mehreren Orten steht.
 *
 * ACHTUNG: "Am häufigsten gewählt" ist eine Tatsachenbehauptung. Solange es
 * keine Bestellungen gibt, ist sie nicht belegbar und damit nach UWG Art. 3
 * Abs. 1 lit. b angreifbar. Belegbar ab etwa dreissig Bestellungen — bis
 * dahin ist "Unsere Empfehlung" die sichere Variante.
 */
export const HERVORHEBUNG = "Am häufigsten gewählt";
export const ABO_MONATLICH = 29.9;
export const ABO_JAEHRLICH = 299;

export const GRUNDLEISTUNG = [
  "Website nach unserer Vorlage, mit deiner Farbpalette und Schrift",
  "Deine Wunschadresse im Netz: geprüft, angemeldet und eingerichtet",
  // Stand bis August 2026 als eigener Posten «Bei Google gefunden werden»
  // für CHF 390 im Konfigurator. Gestrichen, weil das technische Fundament
  // (saubere Struktur, Anmeldung, Suchmaschinen-Angaben) die Vorlage ohnehin
  // für jede Seite erzeugt — das einzeln zu verkaufen, wäre die Sorte
  // Posten, die beim zweiten Hinsehen Vertrauen kostet. Die FAQ «Findet man
  // mich danach auf Google?» sagt dasselbe seit jeher. Die Regional-
  // Recherche, die im alten Posten steckte, lebt in der Abo-Betreuung
  // weiter — dort gehört sie hin, weil sich Suchverhalten ändert.
  "Bei Google angemeldet, technisch für Suchmaschinen eingerichtet",
  "Wir halten die Seite am Laufen, mit täglichen Sicherungskopien",
  "Das Schloss im Browser: deine Seite ist verschlüsselt",
  "Impressum und Datenschutzerklärung, auf deine Praxis zugeschnitten",
  "Die Pflichthinweise für Gesundheitsberufe, fertig formuliert",
  "Dein Zugang, um Texte, Farben und Schrift selbst zu ändern",
  "Eine Korrekturrunde, bevor die Seite online geht",
];

export const bausteine: Baustein[] = [
  // --- Texte: drei Stufen, eine davon ist immer gewählt ---
  {
    id: "texte-selbst",
    gruppe: "texte",
    auswahlgruppe: "texte",
    name: "Du schreibst selbst",
    beschreibung:
      "Du beantwortest unsere Fragen. Wir übernehmen deine Texte so, wie sie sind.",
    preis: 0,
  },
  {
    id: "texte-lektorat",
    gruppe: "texte",
    auswahlgruppe: "texte",
    name: "Du schreibst, wir überarbeiten",
    beschreibung:
      "Du lieferst den Inhalt, wir bringen ihn in Form: Rechtschreibung, Rhythmus, Wirkung. Und wir sagen dir, wo eine Formulierung im Gesundheitsbereich heikel ist.",
    preis: 190,
  },
  {
    id: "texte-komplett",
    gruppe: "texte",
    auswahlgruppe: "texte",
    name: "Wir schreiben für dich",
    beschreibung:
      "Du schickst uns Stichworte, deinen Lebenslauf und ein paar Sätze zu deiner Haltung. Den Rest schreiben wir — in deinem Ton, nicht in unserem.",
    preis: 490,
  },

  // --- Sichtbarkeit ---
  {
    id: "google-business",
    gruppe: "sichtbarkeit",
    // Hiess vorher «Dein Eintrag auf Google Maps». Das war zu eng: Der
    // Eintrag erscheint nicht nur auf der Karte, sondern auch rechts neben
    // den Suchergebnissen, und genau dort stehen Öffnungszeiten, Telefon
    // und Bewertungen. Wer nur «Maps» liest, unterschätzt, was er kauft.
    name: "Dein Praxiseintrag bei Google",
    beschreibung:
      "Der Kasten mit Adresse, Öffnungszeiten, Telefon und Bewertungen — er erscheint neben den Suchergebnissen und auf der Karte. Wir richten ihn ein, lassen ihn bestätigen und füllen ihn. Für eine lokale Praxis oft wirksamer als die Website selbst.",
    preis: 290,
    hinweis: "Google nennt das Unternehmensprofil, früher Google My Business.",
  },
  {
    id: "seo-betreuung",
    gruppe: "sichtbarkeit",
    // «Laufend nachhelfen» allein sagte nicht, WOBEI — das Wort
    // Suchmaschinen muss in den Namen, sonst weiss niemand, was er kauft.
    name: "Suchmaschinen: laufend nachhelfen",
    beschreibung:
      "Wir schauen jedes Quartal, wonach Menschen in deiner Region suchen, und passen Texte und Überschriften darauf an. Sichtbarkeit ist nichts, was man einmal einstellt.",
    preis: 0,
    proMonat: 30,
    hinweis:
      "Fachleute nennen das SEO. Das technische Fundament dafür ist bei jeder Seite von uns inbegriffen.",
  },

  // --- Adresse: Internetadresse und E-Mail, beides auf ihren Namen ---
  /**
   * E-MAIL: WIE DER PREIS ZUSTANDE KOMMT (Stand 6.8.2026)
   *
   * Einkauf: Infomaniak Mail-Service, CHF 2.29 pro Adresse und Monat exkl.
   * MwSt. (geprüft auf infomaniak.com/de/ksuite/service-mail/preise) —
   * unbegrenzter Speicher, eigene Domain. Die Vorsteuer holen wir zurück.
   *
   * Verkauf CHF 9.90 inkl. 8.1 % MwSt. Netto 9.16, abzüglich Einkauf
   * bleiben CHF 6.87 im Monat, rund 82 Franken je Kund/in und Jahr.
   *
   * Der Anker ist Google Workspace, nicht unser Einkauf: Business Starter
   * kostet die Kund/in direkt bei Google rund CHF 7 exkl. MwSt. im Monat —
   * selbst eingerichtet, Daten in den USA. Wir liegen bewusst KNAPP
   * DARÜBER, nicht darunter: Billiger als Google sähe nach einem Haken
   * aus, und verkauft wird hier nicht Speicherplatz, sondern «jemand
   * richtet es ein und ist zuständig». Und bewusst nicht weiter oben — bei
   * 12.90 kostete ein Postfach 43 % des ganzen Website-Abos; die
   * Proportion macht entweder die Mail teuer oder die 29.90 billig.
   *
   * Einrichtung CHF 190 einmalig: nicht fürs Anlegen des Postfachs (fünf
   * Minuten), sondern für MX-, SPF-, DKIM- und DMARC-Einträge und das
   * Einrichten auf Telefon und Computer der Kund/in — bei dieser
   * Zielgruppe gut eine Stunde.
   *
   * DIE STELLE, DIE WEHTUN KANN: Auch 6.87 decken wenig Support. Ein
   * Anruf «ich komme nicht an meine Mails» von zwanzig Minuten (~65
   * Franken) frisst zehn Monate Marge. Der Riegel ist die Supportregel,
   * nicht der Preis.
   *
   * ABHÄNGIGKEIT: «Schweizer Server» unten gilt für Infomaniak. Wird der
   * Anbieter gewechselt, muss der Satz mitwandern — er steht auch in den
   * AGB (Abschnitt 11). Die kostenlose Weiterleitung ist bei Infomaniak
   * in der Domain enthalten.
   */
  {
    id: "email-postfach",
    gruppe: "adresse",
    name: "E-Mail-Adresse mit deinem Praxisnamen",
    beschreibung:
      "info@deine-praxis.ch statt einer Adresse bei GMX, Bluewin oder Gmail — zum Empfangen und zum Antworten. Wir richten sie ein und stellen sie dir auf Telefon und Computer bereit, damit du deine Mails dort liest, wo du sie heute schon liest.",
    preis: 190,
    proMonat: 9.9,
    hinweis:
      "Eine Adresse, unbegrenzter Speicher, auf Schweizer Servern. Wenn du deine Mails lieber weiterhin bei Gmail liest, richten wir dir stattdessen kostenlos eine Weiterleitung ein — antworten würdest du dann aber weiterhin von deiner alten Adresse aus.",
  },

  // --- Auftritt ---
  {
    id: "logo-schriftzug",
    gruppe: "auftritt",
    auswahlgruppe: "logo",
    name: "Logo als Schriftzug",
    beschreibung:
      "Dein Name als gesetzter Schriftzug, abgestimmt auf die Farben deiner Website. Als Datei für Web, Druck und Social Media.",
    // 690 war der Preis freier Logoarbeit — die steckt hier nicht drin.
    // Der Schriftzug entsteht aus den Schriftpaarungen der Vorlage:
    // setzen, zurichten, als Dateien für Web und Druck exportieren. Rund
    // eine Stunde, also 190 im selben Stundensatz wie der Grundpreis.
    // Die Bildmarke darunter bleibt bewusst Offerte: Entwurfsrunden sind
    // nicht produktisierbar, ein Festpreis bezahlte jede Runde aus
    // unserer Tasche.
    preis: 190,
  },
  {
    id: "logo-bildmarke",
    gruppe: "auftritt",
    auswahlgruppe: "logo",
    name: "Logo mit eigenem Zeichen",
    beschreibung:
      "Ein eigenes Bildzeichen zu deinem Schriftzug, entwickelt in mehreren Entwurfsrunden.",
    preis: 1490,
    nurAufAnfrage: true,
    hinweis: "Das offerieren wir dir persönlich, weil der Aufwand je nach Idee stark schwankt.",
  },
  {
    id: "visitenkarten",
    gruppe: "auftritt",
    name: "200 Visitenkarten",
    beschreibung: "Gesetzt in deinen Farben, gedruckt und zu dir geliefert.",
    // Druck und Versand kosten uns 30–40 Franken, der Satz aus dem
    // bestehenden Design eine knappe Stunde. 390 war dafür zu viel.
    preis: 240,
  },
  {
    id: "fotoshooting",
    gruppe: "auftritt",
    name: "Fotoshooting bei uns im Institut",
    beschreibung:
      "Portraits an einem unserer Fototage in Bern. Fehlende Bilder sind der häufigste Grund, warum eine Seite unfertig wirkt.",
    // Die alte Preisliste kannte genau diese Zahl («Fotoshooting bei uns
    // in Bern, CHF 390») — die Zielgruppe kennt sie. Rechnet sich über
    // den Fototag: fünf bis sechs Personen ergeben 1'950–2'340 pro Tag.
    preis: 390,
  },
  {
    id: "video",
    gruppe: "auftritt",
    name: "Vorstellungsvideo",
    beschreibung:
      "Gedreht bei uns im Institut oder bei dir vor Ort. Kann als bewegtes Startbild deiner Website dienen.",
    preis: 890,
    nurAufAnfrage: true,
    hinweis: "Dafür reservieren wir einen Drehtag — deshalb besprechen wir das persönlich mit dir.",
  },

  // --- Funktionen ---
  {
    id: "unterseite",
    gruppe: "funktionen",
    name: "Eine weitere Seite",
    beschreibung:
      "Zum Beispiel für ein einzelnes Angebot, eine Methode oder dein Team — zusätzlich zur Startseite.",
    // «Eine Stunde von uns»-Logik wie überall, wo 190 steht: Vorlagenseite
    // mit den Inhalten der Kund/in, Einbau in die Navigation, Prüfung.
    // Der Fünfliber im Monat deckt, dass jede weitere Seite bei jedem
    // Update mitgeprüft wird.
    preis: 190,
    proMonat: 5,
  },
  /**
   * Bewusst KEIN eigenes Buchungssystem — das wäre ein zweites Produkt
   * mit eigener Plattformpflege. Wir richten der Kund/in einen bewährten
   * Dienst ein: cal.com in der kostenlosen Grundausführung (Calendly kann
   * in der Gratisstufe nur eine Terminart). Der Name steht mit Absicht
   * nicht auf der Verkaufsseite — Entscheid des Inhabers vom 6.8.2026 —,
   * das Buchungsfenster zeigt ihn dann ohnehin.
   *
   * Kein Monatszuschlag von uns: Das Konto läuft auf den Namen der
   * Kund/in; Bezahlstufen (mehrere Kalender, ohne Fremdlogo) bucht sie
   * selbst direkt beim Dienst. Spätere Änderungen an Terminarten sind
   * ihr Konto, nicht unser Abo — Supportregel.
   *
   * Datenschutz-Flag für die Rechtsprüfung: Wer einen Hypnosetermin
   * bucht, gibt etwas über sich preis. Der Dienst gehört ins
   * Verarbeitungsverzeichnis der Kund/in, nicht in unseres — auch
   * deshalb ihr Konto, nicht unseres.
   */
  {
    id: "terminbuchung",
    gruppe: "funktionen",
    name: "Termine online buchen",
    beschreibung:
      "Deine Klient/innen wählen selbst einen freien Termin — verbunden mit deinem Kalender, damit nichts doppelt gebucht wird. Wir richten alles ein und bauen es in deine Seite ein.",
    preis: 190,
    hinweis:
      "Wir richten dir dafür einen bewährten Buchungsdienst ein. Das Konto läuft auf deinen Namen, die Grundausführung ist dauerhaft kostenlos — sie zeigt im Buchungsfenster das Logo des Dienstes. Mehr Funktionen kannst du später direkt dort dazubuchen.",
  },
  {
    id: "blog",
    gruppe: "funktionen",
    name: "Ein Bereich für eigene Beiträge",
    beschreibung:
      "Wenn du gerne schreibst: ein Blog, den du selbst pflegst. Hilft auch dabei, gefunden zu werden.",
    preis: 490,
    proMonat: 15,
  },
  /**
   * Der Wunsch des Inhabers war 190 («ist ja easy mit AI»). Die Maschine
   * übersetzt tatsächlich in Minuten — aber auf einer Therapieseite
   * entscheidet die Nuance: Aus «ich begleite Menschen mit Ängsten» darf
   * in keiner Sprache «ich behandle Angststörungen» werden, sonst steht
   * dort ein Heilversprechen. Bezahlt wird die menschliche Durchsicht
   * plus Einbau und Sprachumschaltung — zwei bis drei Stunden, daher 490.
   * Wer die Durchsicht streicht, kann auf 190 gehen; empfehlen würden
   * wir es nicht.
   */
  {
    id: "zweite-sprache",
    gruppe: "funktionen",
    name: "Zweite Sprache",
    beschreibung:
      "Deine Seite zusätzlich auf Französisch, Italienisch oder Englisch — maschinell vorübersetzt, von Menschen geprüft, mit Sprachumschaltung.",
    preis: 490,
    proMonat: 20,
    hinweis:
      "Gilt pro Sprache. Der Monatsbeitrag deckt, dass jede spätere Textänderung in beiden Sprachen nachgeführt wird.",
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
    fuerWen: "Du schreibst deine Texte selbst und willst schnell online sein.",
    preis: 980,
    bausteinIds: ["texte-selbst"],
  },
  // Neu gerechnet am 6.8.2026, nachdem die Bausteinpreise gesenkt wurden
  // und der einmalige SEO-Posten in die Grundleistung gewandert ist. Das
  // Prinzip bleibt: Ein Paket muss spürbar billiger sein als seine Teile —
  // check-angebot erzwingt mindestens zehn Prozent.
  {
    id: "gemeinsam",
    name: "Gemeinsam",
    fuerWen:
      "Du schreibst, wir bringen es in Form — und sorgen dafür, dass man dich findet.",
    empfohlen: true,
    // Einzeln: 980 + 190 + 290 = 1'460
    preis: 1290,
    bausteinIds: ["texte-lektorat", "google-business"],
  },
  {
    id: "rundum",
    name: "Rundum",
    fuerWen: "Der ganze Auftritt soll stimmen, nicht nur die Website.",
    // Einzeln: 980 + 490 + 290 + 190 + 240 + 390 = 2'580
    preis: 2190,
    bausteinIds: [
      "texte-komplett",
      "google-business",
      "logo-schriftzug",
      "visitenkarten",
      "fotoshooting",
    ],
  },
];

export interface Summe {
  einmalig: number;
  /** Was Absolvent/innen geschenkt bekommen, in CHF */
  absolventenBonus: number;
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

/**
 * Was die Auswahl mit Paketlogik kostet — und welche Kachel leuchten darf.
 *
 * Der Paketrabatt übersteht Zusätze. Vorher galt er nur bei EXAKT der
 * Paketauswahl: Wer bei «Gemeinsam» (1'290) die SEO-Betreuung anhakte —
 * einmalig null Franken —, sprang auf die Einzelsumme 1'460. Ein Etikett
 * «+ 0» neben einem Sprung von 170 liest sich nicht als Rabattregel,
 * sondern als Abzocke. Es gelten drei Regeln:
 *
 * 1. EXTRAS: Das Paket deckt seine Bausteine; jedes Extra kostet genau das,
 *    was auf seinem Etikett steht.
 * 2. AUFSTUFUNG: Wer innerhalb einer Auswahlgruppe die grössere Stufe wählt
 *    (Gemeinsam, aber «Wir schreiben für dich»), zahlt Paketpreis plus
 *    Stufendifferenz — nicht die Einzelsumme. Die Kachel leuchtet dann
 *    nicht mehr, denn es ist wörtlich nicht mehr dieses Paket; der Rabatt
 *    bleibt trotzdem, weil das ganze Paket in der Auswahl steckt.
 * 3. ABSTUFUNG gibt es nicht: Wer die kleinere Stufe wählt, hat das Paket
 *    nicht mehr — die Einzelsumme ist dann ohnehin die günstigere.
 *
 * Posten auf Anfrage bleiben aussen vor, auf beiden Seiten. Sonst kippte
 * das Vorstellungsvideo den Paketpreis für etwas, das laut Anzeige gar
 * nicht mitgerechnet wird.
 */
function paketRechnung(buchbar: Baustein[]): {
  /** Bester Preis über alle Wege — nie schlechter als die Einzelsumme. */
  besterPreis: number;
  /** Paket, das wörtlich (ohne Aufstufung) in der Auswahl steckt. */
  passung: Voreinstellung | null;
} {
  const gewaehltIds = new Set(buchbar.map((b) => b.id));
  let besterPreis = Infinity;
  let passung: { paket: Voreinstellung; einmalig: number } | null = null;

  for (const v of voreinstellungen) {
    const noetig = v.bausteinIds
      .map(findeBaustein)
      .filter((b): b is Baustein => b !== undefined && !b.nurAufAnfrage);

    let aufpreis = 0;
    let aufgestuft = false;
    let passt = true;
    // Welche gewählten Bausteine das Paket abdeckt — direkt oder als Stufe.
    const gedeckt = new Set<string>();

    for (const teil of noetig) {
      if (gewaehltIds.has(teil.id)) {
        gedeckt.add(teil.id);
        continue;
      }
      const stufe = teil.auswahlgruppe
        ? buchbar.find(
            (b) => b.auswahlgruppe === teil.auswahlgruppe && b.preis >= teil.preis
          )
        : undefined;
      if (stufe) {
        gedeckt.add(stufe.id);
        aufpreis += stufe.preis - teil.preis;
        aufgestuft = true;
        continue;
      }
      passt = false;
      break;
    }
    if (!passt) continue;

    const extras = buchbar
      .filter((b) => !gedeckt.has(b.id))
      .reduce((s, b) => s + b.preis, 0);
    const einmalig = v.preis + aufpreis + extras;

    if (einmalig < besterPreis) besterPreis = einmalig;
    if (!aufgestuft && (!passung || einmalig < passung.einmalig)) {
      passung = { paket: v, einmalig };
    }
  }

  return { besterPreis, passung: passung?.paket ?? null };
}

/** Das Grundpaket, das wörtlich in dieser Auswahl steckt — für die Kachel-Anzeige. */
export function erkenneVoreinstellung(ausgewaehlt: string[]): string | null {
  const buchbar = ausgewaehlt
    .map(findeBaustein)
    .filter((b): b is Baustein => b !== undefined && !b.nurAufAnfrage);
  return paketRechnung(buchbar).passung?.id ?? null;
}

export function berechne(ausgewaehlt: string[], istAbsolventin = false): Summe {
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

  // Steckt ein Paket in der Auswahl, gilt sein Preis plus Einzelpreise für
  // die Extras (Regeln: siehe paketRechnung). Nur wer an den Paketen vorbei
  // kombiniert, zahlt die reine Einzelsumme. «Selbst» ergibt rechnerisch
  // immer die Einzelsumme (sein Preis IST der Grundpreis) — es markiert
  // dann bloss die Kachel.
  const rechnung = paketRechnung(buchbar);
  const passendeVoreinstellung = rechnung.passung?.id ?? null;
  const vorBonus = Math.min(rechnung.besterPreis, ohneRabatt);

  // Absolvent/innen bekommen die Textüberarbeitung geschenkt. Der Wert gilt
  // auch, wenn jemand die grössere Stufe wählt — sonst bekäme ausgerechnet
  // die Kund/in, die mehr bezahlt, weniger Bonus.
  const bonusWert = findeBaustein(ABSOLVENTEN_GRATIS)?.preis ?? 0;
  const gewaehlteTextstufe = gewaehlteBausteine.find((b) => b.auswahlgruppe === "texte");
  const absolventenBonus =
    istAbsolventin && gewaehlteTextstufe
      ? Math.min(bonusWert, gewaehlteTextstufe.preis)
      : 0;

  const einmalig = vorBonus - absolventenBonus;

  return {
    einmalig,
    absolventenBonus,
    proMonat: Math.round(proMonat * 100) / 100,
    ohneRabatt,
    ersparnis: ohneRabatt - einmalig,
    passendeVoreinstellung,
  };
}

export function formatiereChf(betrag: number): string {
  const gerundet = Math.round(betrag * 100) / 100;
  const vorzeichen = gerundet < 0 ? "-" : "";
  const absolut = Math.abs(gerundet);

  const ganzteil = Math.trunc(absolut)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "’");
  const rappen = Number.isInteger(absolut) ? "" : absolut.toFixed(2).slice(-3);

  return `${vorzeichen}${ganzteil}${rappen}`;
}
