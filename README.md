# palcomm

Monorepo für die Websites von Palacios Communications — Kundenseiten, unsere
eigene Seite und der Website-Builder, mit dem neue Seiten entstehen.

## Struktur

```
sites/
  enza/        Hypnose Enza — live auf www.hypnose-enza.ch
  palacios/    Unsere eigene Seite, enthält den Builder unter /builder
templates/
  serene/      Basis-Template für neue Kundenseiten
scripts/       Hilfsskripte
docs/          Briefings und Notizen
```

Jedes Projekt unter `sites/` und `templates/` ist eine eigenständige
Next.js-App mit eigenem `package.json`. Es gibt bewusst kein geteiltes Paket:
Kundenseiten sollen einzeln anpassbar sein, ohne dass Änderungen auf andere
durchschlagen.

## Wie eine neue Kundenseite entsteht

1. **Onboarding** — die Kund/in füllt den Builder aus
   (`sites/palacios` → `/builder`)
2. **Erzeugen** — der Builder liefert `site-config.ts`, `content.ts` und einen
   Prompt. Die beiden TypeScript-Dateien sind vollständig; der Prompt deckt
   nur ab, was ein Formular nicht kann (Bilder, Sonderwünsche)
3. **Aufsetzen** — `cp -r templates/serene sites/<name>`, die beiden Dateien
   einsetzen, Bilder ablegen
4. **Aufschalten** — Hosting-Projekt mit Root Directory `sites/<name>`

Danach kann die Kund/in unter `/admin` selbst Texte, Farbpalette und Schrift
ändern. Aufbau und Reihenfolge der Sektionen bleiben fest — so kann beim
Bearbeiten nichts an der Seite kaputtgehen.

## Deployment

Jede Seite ist ein eigenes Hosting-Projekt. Entscheidend ist das
**Root Directory** in den Projekteinstellungen — es muss auf den jeweiligen
Ordner zeigen, nicht auf das Repo-Root.

| Projekt | Root Directory | Domain |
|---|---|---|
| Hypnose Enza | `sites/enza` | www.hypnose-enza.ch |
| Palacios Communications | `sites/palacios` | noch offen |

Jede Seite braucht `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` und `REDIS_URL`
als Environment-Variablen — siehe die jeweilige `.env.example`.

## Entwicklung

```bash
cd sites/enza      # oder templates/serene, sites/palacios
npm install
npm run dev
```

Nach Änderungen am Template prüfen, ob die geteilten Dateien noch
übereinstimmen:

```bash
node scripts/check-sync.mjs
```
