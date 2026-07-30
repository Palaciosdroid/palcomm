# palcomm

Monorepo für die Websites von Palacios Communications — Kundenseiten, unsere
eigene Seite und der Website-Builder, mit dem neue Seiten entstehen.

## Struktur

```
sites/
  enza/        Hypnose Enza — live auf www.hypnose-enza.ch
  palacios/    Unsere eigene Seite (inkl. Builder-Bereich)
templates/
  serene/      Neutrales Basis-Template (aus Enza abgeleitet)
docs/          Briefings und Notizen
```

Jedes Projekt unter `sites/` und `templates/` ist eine eigenständige Next.js-App
mit eigenem `package.json`. Es gibt bewusst kein geteiltes Paket: Kundenseiten
sollen einzeln anpassbar sein, ohne dass Änderungen auf andere durchschlagen.

## Entwicklung

```bash
cd sites/enza
npm install
npm run dev
```

## Deployment

Jede Seite ist ein eigenes Hosting-Projekt. Entscheidend ist das
**Root Directory** in den Projekteinstellungen — es muss auf den jeweiligen
Ordner zeigen, z. B. `sites/enza`, nicht auf das Repo-Root.

| Projekt | Root Directory | Domain |
|---|---|---|
| Hypnose Enza | `sites/enza` | www.hypnose-enza.ch |

## Neue Kundenseite anlegen

1. `templates/serene` nach `sites/<name>` kopieren
2. Konfiguration aus dem Builder (`content.json`, `theme.json`) einsetzen
3. Neues Hosting-Projekt mit Root Directory `sites/<name>` anlegen
