# Template: Serene

Basis-Template für Kundenwebsites. Ruhig, textlastig, eine Seite mit Ankern —
passt für Beratung, Therapie, Coaching, Praxen und ähnliche Dienstleistungen.

Abgeleitet aus der Website von Hypnose Enza, aber vollständig neutralisiert:
Farben, Schriften und alle Texte kommen aus der Konfiguration.

## Neue Kundenseite daraus bauen

```bash
cp -r templates/serene sites/<name>
cd sites/<name>
npm install
```

Dann in dieser Reihenfolge:

1. **`src/lib/site-config.ts`** — Name, Domain, Sprache, Palette, Schrift,
   welche Sektionen die Seite hat. Wird einmalig gesetzt und danach nicht mehr
   über den Admin geändert.
2. **`src/lib/content.ts`** — alle Texte. Was in `[eckigen Klammern]` steht,
   muss ersetzt werden.
3. **`public/images/`** — Bilder gemäss den Pfaden im Content ablegen.
4. **`.env`** — nach `.env.example` anlegen.

## Was die Kund/in danach selbst ändern kann

Unter `/admin`, mit dem Passwort aus `ADMIN_PASSWORD`:

- alle Texte direkt auf der Seite
- Farbpalette (5 Stück zur Auswahl)
- Schrift-Kombination (4 Stück zur Auswahl)
- Kontaktdaten

Bewusst **nicht** änderbar: Aufbau und Reihenfolge der Sektionen, Abstände,
Layout. Das verhindert, dass die Seite beim Bearbeiten auseinanderfällt.

## Aufbau

| Datei | Zweck |
|---|---|
| `src/lib/theme.ts` | Farbpaletten und Schrift-Kombinationen |
| `src/lib/site-config.ts` | Website-Identität, aktive Sektionen |
| `src/lib/content.ts` | Standardtexte, einzige Quelle |
| `src/lib/content-store.ts` | Server-seitiger Speicher (Redis) |
| `src/lib/auth.ts` | Admin-Session |
| `src/components/SitePage.tsx` | Setzt die Seite aus den Sektionen zusammen |

### Farben

Alle Farben kommen aus CSS-Variablen, die das Theme-System setzt. **Nie
Farbwerte direkt in Komponenten schreiben** — sonst färbt die Palettenauswahl
nur einen Teil der Seite um. Verfügbar sind `brand`, `accent-100…600`,
`base-50…400` und `text-dark/medium/light/muted`, jeweils als
Tailwind-Utility (`bg-accent-200`) oder CSS-Variable (`var(--accent-200)`).

## Noch nicht enthalten

Ein Blog. Der aus der Enza-Seite übernommene Blog speicherte Beiträge nur im
Browser der schreibenden Person und war damit für Besucher/innen unsichtbar —
er wurde deshalb aus dem Template entfernt statt mitkopiert. Wenn eine
Kundenseite einen Blog braucht, gehört er serverseitig gespeichert wie der
übrige Content.
