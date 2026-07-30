// Verfügbarkeitsprüfung für Wunschdomains.
//
// Grundlage ist RDAP, der Nachfolger von WHOIS. Jede Registry betreibt einen
// eigenen Dienst; wir fragen ihn direkt und mit HEAD, weil uns nur interessiert
// OB es die Domain gibt, nicht wem sie gehört.
//
//   404 -> nicht registriert  ->  frei
//   200 -> registriert        ->  vergeben
//
// WICHTIG: Nicht über Sammeldienste wie rdap.org gehen. Die kennen .ch und .de
// nicht, antworten aber trotzdem mit 404 — eine vergebene Domain würde als
// frei angezeigt. Nachgemessen: rdap.org meldet google.de als nicht gefunden.
// Deshalb die feste Zuordnung unten.
//
// Preise kommen NICHT von hier. RDAP kennt keine Preise; die stehen in der
// Liste des Registrars und sind für Standardendungen praktisch konstant.

/** Registry-RDAP-Dienste der Endungen, die wir anbieten. */
const RDAP_ENDPOINTS: Record<string, string> = {
  ch: "https://rdap.nic.ch/domain/",
  li: "https://rdap.nic.ch/domain/",
  de: "https://rdap.denic.de/domain/",
  com: "https://rdap.verisign.com/com/v1/domain/",
  net: "https://rdap.verisign.com/net/v1/domain/",
  swiss: "https://rdap.nic.swiss/domain/",
};

/** Endungen zur Auswahl im Feld, in der Reihenfolge der Anzeige. */
export const SUGGESTED_TLDS = ["ch", "de", "com"] as const;

/**
 * Jahrespreis pro Endung in CHF, Einkauf. Bewusst eine feste Liste statt
 * einer Live-Abfrage: Die Werte ändern sich selten, und eine zusätzliche
 * Abhängigkeit im Kaufablauf lohnt den Nutzen nicht. Bei Änderung hier
 * anpassen.
 */
const TLD_PREISE: Record<string, number> = {
  ch: 12,
  li: 25,
  de: 10,
  com: 14,
  net: 16,
  swiss: 55,
};

/** Endungen, die im Abo inbegriffen sind. Alles andere wird verrechnet. */
const INBEGRIFFEN = new Set(["ch", "de", "com"]);

export type DomainStatus = "frei" | "vergeben" | "unbekannt" | "ungueltig";

export interface DomainErgebnis {
  domain: string;
  status: DomainStatus;
  /** Jahrespreis in CHF, wenn die Endung nicht im Abo inbegriffen ist */
  preisChf: number | null;
  inbegriffen: boolean;
  /** Verständlicher Satz für die Anzeige im Formular */
  hinweis: string;
}

/**
 * Prüft eine Domain auf formale Gültigkeit.
 * Zulässig sind Buchstaben, Ziffern und Bindestriche; nicht am Anfang oder
 * Ende, jedes Label höchstens 63 Zeichen.
 */
export function istGueltigeDomain(domain: string): boolean {
  const teile = domain.toLowerCase().split(".");
  if (teile.length < 2) return false;
  if (domain.length > 253) return false;

  return teile.every(
    (label) =>
      label.length >= 1 &&
      label.length <= 63 &&
      /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/.test(label)
  );
}

/** Normalisiert eine Eingabe zu einer Domain: Protokoll, www und Pfad weg. */
export function normalisiereDomain(eingabe: string): string {
  return eingabe
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "")
    .replace(/\.$/, "");
}

function tldVon(domain: string): string {
  return domain.split(".").pop() ?? "";
}

/**
 * Fragt die zuständige Registry, ob die Domain registriert ist.
 *
 * Wirft nie. Bei Zeitüberschreitung, unbekannter Endung oder einer
 * unerwarteten Antwort kommt "unbekannt" zurück — der Kaufablauf darf an
 * einer Domainprüfung nicht scheitern.
 */
export async function pruefeDomain(
  eingabe: string,
  timeoutMs = 5000
): Promise<DomainErgebnis> {
  const domain = normalisiereDomain(eingabe);
  const tld = tldVon(domain);
  const inbegriffen = INBEGRIFFEN.has(tld);
  const preisChf = inbegriffen ? null : (TLD_PREISE[tld] ?? null);

  const basis = { domain, preisChf, inbegriffen };

  if (!istGueltigeDomain(domain)) {
    return {
      ...basis,
      status: "ungueltig",
      hinweis:
        "Das sieht noch nicht nach einer Domain aus. Erlaubt sind Buchstaben, Zahlen und Bindestriche.",
    };
  }

  const endpoint = RDAP_ENDPOINTS[tld];
  if (!endpoint) {
    return {
      ...basis,
      status: "unbekannt",
      hinweis: `Die Endung .${tld} prüfen wir von Hand und melden uns dazu.`,
    };
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    const antwort = await fetch(`${endpoint}${encodeURIComponent(domain)}`, {
      method: "HEAD",
      signal: controller.signal,
      headers: { Accept: "application/rdap+json" },
    });
    clearTimeout(timer);

    if (antwort.status === 404) {
      return {
        ...basis,
        status: "frei",
        hinweis: inbegriffen
          ? `${domain} ist frei und im Abo inbegriffen.`
          : `${domain} ist frei. Diese Endung kostet zusätzlich CHF ${preisChf ?? "?"} pro Jahr.`,
      };
    }

    if (antwort.status === 200) {
      return {
        ...basis,
        status: "vergeben",
        hinweis: `${domain} ist bereits vergeben. Probieren Sie eine andere Schreibweise oder Endung.`,
      };
    }

    return {
      ...basis,
      status: "unbekannt",
      hinweis: "Das konnten wir gerade nicht prüfen. Wir schauen es von Hand an.",
    };
  } catch {
    // Zeitüberschreitung oder Netzwerkfehler — bewusst nicht als Fehler nach
    // aussen. Die Kund/in soll weitermachen können.
    return {
      ...basis,
      status: "unbekannt",
      hinweis: "Das konnten wir gerade nicht prüfen. Wir schauen es von Hand an.",
    };
  }
}
