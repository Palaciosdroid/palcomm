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
4. **Aufschalten** — Railway-Service mit Root Directory `sites/<name>`

Danach kann die Kund/in unter `/admin` selbst Texte, Farbpalette und Schrift
ändern. Aufbau und Reihenfolge der Sektionen bleiben fest — so kann beim
Bearbeiten nichts an der Seite kaputtgehen.

## Deployment (Railway)

Jede Seite ist ein eigener Railway-Service auf demselben Repo. Entscheidend
sind zwei Einstellungen pro Service:

| Einstellung | Wert | Warum |
|---|---|---|
| **Root Directory** | `sites/<name>` | Sonst findet der Build die App nicht |
| **Watch Paths** | `sites/<name>/**` | Sonst baut *jeder* Service bei *jedem* Push neu |

| Service | Root Directory | Domain |
|---|---|---|
| Hypnose Enza | `sites/enza` | www.hypnose-enza.ch |
| Palacios Communications | `sites/palacios` | noch offen |

Watch Paths sind der Punkt, den man in einem Monorepo leicht übersieht: ohne
sie löst eine Änderung an der Palacios-Seite auch ein Redeploy von Enza aus.
Nicht gefährlich, aber unnötig.

### Environment-Variablen

Pro Service, siehe die jeweilige `.env.example`:

| Variable | |
|---|---|
| `ADMIN_PASSWORD` | Passwort für `/admin` |
| `ADMIN_SESSION_SECRET` | `openssl rand -base64 32` — ohne das startet der Admin nicht |
| `REDIS_URL` | Von der Railway-Redis-Instanz; ohne das gehen Inhaltsänderungen beim Neustart verloren |
| `RESEND_API_KEY` | Kontaktformular |
| `CONTACT_EMAIL` | Leer = E-Mail aus dem Content |
| `RESEND_FROM_EMAIL` | Muss eine bei Resend verifizierte Domain sein |

`PORT` setzt Railway selbst, `next start` übernimmt ihn.

### Warum Railway hier gut passt

Der Redis-Client in `content-store.ts` hält eine Verbindung als Modul-Singleton.
Auf einer Serverless-Plattform wäre das heikel — jede Funktionsinstanz baut
eine eigene Verbindung auf. Railway lässt einen Node-Prozess durchlaufen, die
Verbindung wird also einmal geöffnet und wiederverwendet.

### Domain-Weiterleitung

`next.config.ts` leitet die nackte Domain auf `www.` um. Damit das greift,
müssen **beide** Domains am Service hängen — sonst kommt ein Aufruf der
nackten Domain gar nicht erst bei Next.js an.

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
