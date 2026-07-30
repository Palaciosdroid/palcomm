# Hypnose Enza

Website von Enza Gasser-Fiorini — live auf www.hypnose-enza.ch.

Die Seite ist vor dem Umbau des Repos entstanden und läuft unverändert weiter.
Neue Kundenseiten entstehen nicht aus dieser, sondern aus `templates/serene`.

## Entwicklung

```bash
npm install
npm run dev
```

## Deployment

Railway-Service mit **Root Directory `sites/enza`** und Watch Paths auf `sites/enza/`. Environment-Variablen nach `.env.example`.

## Unterschiede zum Template

Was im Template inzwischen anders gelöst ist und hier bewusst nicht
nachgezogen wurde:

- **Blog** (`/blog`) speichert Beiträge nur im `localStorage` der schreibenden
  Person. Für Besucher/innen ist er leer. Im Template deshalb entfernt.
- **`PUT /api/content`** prüft keine Anmeldung, und die Session-Prüfung in
  `api/admin/auth` sieht nur auf den Zeitstempel, nicht auf die Signatur.
  Im Template beides gefixt.
- **Farben und Texte** liegen teils fest in den Komponenten (`data.ts` parallel
  zu `content.ts`, Hex-Werte in den Sektionen). Im Template auf Theme-Tokens
  und eine einzige Textquelle umgestellt.

Wenn diese Punkte hier nachgezogen werden sollen: Die Änderungen lassen sich
aus `templates/serene` übernehmen, brauchen aber einen Test gegen die
bestehenden Redis-Inhalte — das Content-Schema hat sich mit umbenannt
(`practiceInfo` → `business`, `therapy` → `services`).
