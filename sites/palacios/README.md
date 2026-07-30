# Palacios Communications

Unsere eigene Website — aus `templates/serene` gebaut, nach demselben Prinzip
wie die Kundenseiten. Zusätzlich läuft hier der **Website-Builder** unter
`/builder`.

## Website-Builder

Unter `/builder`, geschützt mit demselben Passwort wie der Admin-Bereich
(`ADMIN_PASSWORD`).

Fünf Schritte: Grunddaten → Design → Sektionen → Inhalte → Ergebnis.
Am Ende kommen drei Dinge raus:

| Datei | Was damit passiert |
|---|---|
| `site-config.ts` | direkt nach `sites/<name>/src/lib/` kopieren |
| `content.ts` | direkt nach `sites/<name>/src/lib/` kopieren |
| `PROMPT.md` | in Claude Code einfügen |

Die beiden TypeScript-Dateien sind vollständig und kompilieren ohne
Nacharbeit. Der Prompt ist nur für das da, was sich nicht aus einem Formular
ableiten lässt: Bilder einsetzen, Sonderwünsche, Feinschliff. Angaben, die im
Formular leer geblieben sind, listet er als offene Fragen auf — damit sie
nachgefragt und nicht erfunden werden.

Zwischenstände liegen im Browser, ein versehentliches Neuladen kostet also
keine Arbeit. Der Knopf «Neu» leert das Formular.

### Wenn sich Paletten oder Schriften ändern

Der Builder hat eine Kopie von `src/lib/theme.ts` und `src/types/content.ts`
aus dem Template. Laufen die auseinander, erzeugt der Builder Konfigurationen
mit IDs, die es im Template nicht gibt — die Seite fällt dann still auf die
erste Palette zurück. Nach Änderungen am Template deshalb:

```bash
node scripts/check-sync.mjs
```

## Noch zu tun

Der Aufbau steht, die **Inhalte sind noch die Beispieltexte aus dem
Template**. Zu füllen sind:

- `src/lib/content.ts` — unsere Angebote, Referenzen, Über-uns-Text
- `src/lib/site-config.ts` — Domain prüfen
- `public/images/` — Logo, Portraits, Bilder

## Entwicklung

```bash
npm install
npm run dev
```

Für `/admin` und `/builder` braucht es `ADMIN_PASSWORD` und
`ADMIN_SESSION_SECRET` in `.env` — siehe `.env.example`.
