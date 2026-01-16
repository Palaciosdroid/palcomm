# Briefing: Angstfrei-Tag Landing Page

## Projektübersicht

Nachbau der bestehenden "Angstfrei Kongress" Seite als **"Angstfrei-Tag 2026"** – ein 1-tägiges Event (nur Samstag) statt 2 Tage.

**Tech Stack:** Next.js 14 (App Router) + Tailwind CSS

**Referenz:** Screenshot im Anhang (ursprüngliche 2-Tages-Version)

---

## 📅 Event-Details

| | |
|---|---|
| **Event-Name** | Angstfrei-Tag 2026 |
| **Datum** | Samstag, 24. Oktober 2026 |
| **Ort** | Kursaal, Bern |
| **Slogan** | Dein Vorsprung durch mentale Gesundheit |

---

## 🚀 WICHTIG: Optimierungsauftrag

**Baue nicht einfach 1:1 nach – mach es BESSER!**

Wenn du offensichtlichen Optimierungsbedarf siehst, setz es direkt um. Ziel ist die **ultimativ geilste Landing Page**. 

### Optimiere proaktiv:
- **Conversion-Optimierung:** CTAs prominenter, mehr Urgency, bessere Button-Platzierung
- **Moderne UI/UX:** Subtile Animationen, Micro-Interactions, smooth Scroll-Effekte
- **Visuelle Hierarchie:** Klare Fokuspunkte, besserer Weissraum, stärkere Kontraste
- **Mobile Experience:** Nicht nur responsiv, sondern mobile-first optimiert
- **Performance:** Lazy Loading, optimierte Bilder, schnelle Ladezeiten
- **Trust-Elemente:** Social Proof prominent platzieren, Testimonials wirksamer einsetzen
- **Storytelling:** Emotionaler Flow durch die Seite, nicht nur Info-Blöcke
- **Moderne Design-Trends:** Glassmorphism, subtile Gradients, elegante Shadows wo sinnvoll

### Was NICHT im Original ist, aber geil wäre:
- Sticky CTA-Button auf Mobile
- Animierter Countdown mit mehr Punch
- Speaker-Karten mit Hover-Reveal für mehr Info
- Parallax-Effekte im Hero (dezent)
- Progress-Indicator beim Scrollen
- "Nur noch X Plätze" Urgency-Element
- Testimonial-Carousel mit Auto-Play
- Smooth Reveal-Animationen beim Scrollen (Intersection Observer / Framer Motion)

**Kurz: Sei kreativ, denk mit, mach es geiler als das Original!**

---

## Seitenstruktur & Sektionen

### 1. Hero Section (Dunkelblauer Hintergrund mit Gradient)
- **Header:** Logo links, Navigation rechts (dezent)
- **Hauptinhalt:**
  - Kleine Tagline oben: "ANGSTFREI-TAG 2026"
  - **Slogan:** "Dein Vorsprung durch mentale Gesundheit"
  - Große Headline: "5 Tipps, die dein Leben für immer verändern werden" (oder ähnlich)
  - Subheadline mit Event-Details
  - **Countdown-Timer:** Tage | Stunden | Minuten | Sekunden (bis 24.10.2026)
  - **Event-Datum-Badge:** "24 OKT 2026" + "Kursaal, Bern"
  - CTA-Button: "Jetzt anmelden" (orange/gelb)

### 2. Social Proof / Statistiken
- "Werde Teil einer grossen Kongress-Community"
- Zahlen-Boxen: Teilnehmer, Vorträge, etc.
- Kleine Testimonial-Zitate oder Trust-Elemente

### 3. Speaker Grid (Dunkelblauer Hintergrund)
- **Titel:** "12 Weltklasse Vorträge" (anpassen auf tatsächliche Anzahl)
- **Grid-Layout:** Speaker-Karten mit:
  - Rundes Profilbild (Platzhalter verwenden)
  - Name
  - Titel/Expertise
  - Kurzbeschreibung
- **Layout:** 4 Spalten Desktop, 2 Spalten Tablet, 1 Spalte Mobile

### 4. Einblick Section (Heller Hintergrund)
- Titel: "Einblick"
- Bild oder Video-Embed (Platzhalter)
- Kann ein Buch-Cover oder Promo-Material zeigen

### 5. Programm Section
- **Titel:** "Programm 2026"
- **NUR 1 TAG:** "Samstag, [Datum]"
- **Timeline-Layout:**
  - Zeitslots links
  - Speaker-Info rechts (Bild, Name, Vortragstitel)
  - Vertikale Linie als visueller Connector
- **Featured Speaker:** Grössere Darstellung für Hauptredner

### 6. "Weshalb sollte ich teilnehmen?" Section
- Titel mit Highlight (z.B. "teilnehmen" in anderer Farbe)
- Benefit-Liste oder kurzer Text
- Kann Testimonials enthalten

### 7. "Was unsere Teilnehmer sagen" (Testimonials)
- Testimonial-Karten mit:
  - Zitat
  - Name
  - Optional: Bild
- Carousel oder Grid-Layout

### 8. Workshops Section
- **Titel:** "Workshops"
- Workshop-Karten mit:
  - Bild (Platzhalter)
  - Titel
  - Kursleiter
  - Kurzbeschreibung
  - Preis (falls separat)

### 9. "Das Herzstück des Kongresses" → "Das Herzstück des Angstfrei-Tags"
- Emotionaler Text-Block
- Bild oder Illustration
- Community-Fokus

### 10. Impressionen (Galerie)
- **Titel:** "Impressionen"
- Foto-Grid vergangener Events (Platzhalter-Bilder)
- Zeigt Atmosphäre, Publikum, Bühne

### 11. "Vergangene Referenten / Gäste" (Optional)
- Logos oder Bilder früherer Speaker
- Social Proof durch bekannte Namen

### 12. Tickets Section
- **Titel:** "Tickets"
- **3 Ticket-Optionen:**

  **1. Online-Ticket – CHF 99.–**
  - Livestream des gesamten Angstfrei-Tags
  - Aufzeichnungen für 30 Tage
  - Digitales Workbook
  
  **2. Tagesticket – CHF 249.–** ⭐ (Empfohlen / Highlighted)
  - Vor-Ort-Teilnahme am Angstfrei-Tag
  - Alle Vorträge live erleben
  - Networking mit Gleichgesinnten
  - Verpflegung inklusive
  - Aufzeichnungen
  
  **3. VIP-Tagesticket – CHF 599.–**
  - Alles aus dem Tagesticket
  - Premium-Sitzplätze (erste Reihen)
  - Exklusives Meet & Greet mit Speakern
  - VIP-Lunch mit Gabriel Palacios
  - Persönliches Zertifikat
  - Exklusive VIP-Goodie-Bag

- **Design:** Mittlere Karte (Tagesticket) hervorgehoben mit Border/Schatten/Badge "Beliebt"
- **Urgency-Element:** "Frühbucherpreis – nur noch bis [Datum]!" oder "Nur noch X Plätze!"
- **CTA-Button:** Pro Ticket ein Button "Jetzt sichern"

### 13. Footer
- Partner-Logos
- "Unterstützt durch Kanton/Sponsor" Badges
- Links: Impressum, Datenschutz, etc.
- Copyright

---

## Design-Spezifikationen

### Farbpalette
```css
/* Primärfarben */
--primary-dark: #0a1628;      /* Dunkles Navy für Hero/Speaker-Sections */
--primary-blue: #1a2d4a;      /* Etwas heller für Akzente */
--accent-orange: #f5a623;     /* CTA-Buttons, Highlights */
--accent-yellow: #ffd700;     /* Sekundäre Akzente */

/* Neutrale Farben */
--white: #ffffff;
--light-gray: #f5f7fa;        /* Helle Section-Hintergründe */
--text-dark: #1a1a1a;
--text-gray: #666666;

/* Gradienten */
--hero-gradient: linear-gradient(135deg, #0a1628 0%, #1a3a5c 100%);
```

### Typografie
- **Headlines:** Bold, grosse Schrift (z.B. Inter oder Montserrat)
- **Body:** Regular, gut lesbar
- **Akzente:** Farbige Highlights in Headlines

### Komponenten-Styling
- **Buttons:** Abgerundete Ecken (rounded-full oder rounded-lg), Orange/Gelb mit Hover-Effekt
- **Karten:** Leichte Schatten, weisse Hintergründe, abgerundete Ecken
- **Speaker-Bilder:** Rund (rounded-full) mit leichtem Border oder Schatten
- **Timeline:** Vertikale Linie mit Punkten/Kreisen

---

## Komponenten-Struktur (Next.js)

```
src/
├── app/
│   ├── page.tsx              # Hauptseite
│   ├── layout.tsx            # Root Layout
│   └── globals.css           # Tailwind + Custom Styles
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── SocialProof.tsx
│   │   ├── SpeakerGrid.tsx
│   │   ├── ProgramSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── WorkshopsSection.tsx
│   │   ├── ImpressionsGallery.tsx
│   │   └── TicketsSection.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── CountdownTimer.tsx
│       ├── SpeakerCard.tsx
│       ├── TicketCard.tsx
│       ├── TestimonialCard.tsx
│       └── TimelineItem.tsx
└── lib/
    └── data.ts               # Platzhalter-Daten für Speaker, Programm, etc.
```

---

## Platzhalter-Daten

### Speaker (Beispiel)
```typescript
const speakers = [
  {
    id: 1,
    name: "Dr. Max Mustermann",
    title: "Angstexperte",
    topic: "Die Neurobiologie der Angst",
    image: "/placeholder-speaker.jpg" // Platzhalter
  },
  // ... weitere Speaker
];
```

### Programm (1 Tag!)
```typescript
const eventDetails = {
  name: "Angstfrei-Tag 2026",
  date: "Samstag, 24. Oktober 2026",
  location: "Kursaal, Bern",
  slogan: "Dein Vorsprung durch mentale Gesundheit",
  countdownTarget: "2026-10-24T09:00:00" // Für Countdown-Timer
};

const program = {
  date: "Samstag, 24. Oktober 2026",
  location: "Kursaal, Bern",
  slots: [
    { time: "09:00 - 09:30", title: "Einlass & Begrüssung", speaker: null },
    { time: "09:30 - 10:30", title: "Keynote: ...", speaker: "Gabriel Palacios" },
    { time: "10:30 - 11:00", title: "Pause", speaker: null },
    // ... weitere Slots
  ]
};
```

### Tickets
```typescript
const tickets = [
  {
    name: "Online-Ticket",
    price: "99",
    currency: "CHF",
    description: "Erlebe den Angstfrei-Tag bequem von zuhause",
    features: [
      "Livestream des gesamten Tages",
      "Aufzeichnungen für 30 Tage",
      "Digitales Workbook"
    ],
    highlighted: false,
    badge: null
  },
  {
    name: "Tagesticket",
    price: "249",
    currency: "CHF",
    description: "Das volle Live-Erlebnis vor Ort",
    features: [
      "Vor-Ort-Teilnahme",
      "Alle Vorträge live",
      "Networking & Community",
      "Verpflegung inklusive",
      "Aufzeichnungen inklusive"
    ],
    highlighted: true, // Hervorgehoben als Empfehlung
    badge: "Beliebt"
  },
  {
    name: "VIP-Tagesticket",
    price: "599",
    currency: "CHF",
    description: "Das exklusive Premium-Erlebnis",
    features: [
      "Alles aus dem Tagesticket",
      "Premium-Sitzplätze erste Reihen",
      "Meet & Greet mit Speakern",
      "VIP-Lunch mit Gabriel Palacios",
      "Persönliches Zertifikat",
      "Exklusive VIP-Goodie-Bag"
    ],
    highlighted: false,
    badge: "Exklusiv"
  }
];
```

---

## Wichtige Anpassungen (Kongress → Angstfrei-Tag)

| Original (Kongress) | Neu (Angstfrei-Tag) |
|---------------------|---------------------|
| "Angstfrei Kongress" | "Angstfrei-Tag" |
| 2 Tage (Sa + So) | 1 Tag (nur Samstag) |
| "Programm 2026" mit 2 Tabs | Nur 1 Tag im Programm |
| "Das Herzstück des Kongresses" | "Das Herzstück des Angstfrei-Tags" |
| Mehrere Workshop-Tage | Workshops am selben Tag oder optional |

---

## Responsive Breakpoints

```css
/* Tailwind Standard-Breakpoints */
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large Desktop */
```

### Mobile-First Approach
- Speaker-Grid: 1 Spalte → 2 → 4
- Timeline: Kompakter auf Mobile
- Hero: Stacked Layout auf Mobile
- Navigation: Hamburger-Menu auf Mobile

---

## Assets & Platzhalter

### Benötigte Platzhalter-Bilder
- `placeholder-speaker.jpg` (400x400, rund zugeschnitten)
- `placeholder-workshop.jpg` (600x400)
- `placeholder-impression-1.jpg` bis `-6.jpg` (verschiedene Grössen)
- `placeholder-book.jpg` (für Einblick-Section)
- `placeholder-hero-bg.jpg` (optional, falls Hintergrundbild)

### Icons
- Verwende `lucide-react` oder `heroicons` für:
  - Kalender-Icon
  - Uhr-Icon
  - Check-Icons für Features
  - Social Media Icons
  - Pfeil-Icons

---

## Interaktive Elemente

### Countdown Timer
- Berechnet Zeit bis zum Event-Datum
- Aktualisiert sich jede Sekunde
- Zeigt: Tage | Stunden | Minuten | Sekunden

### Smooth Scroll
- Navigation-Links scrollen sanft zu Sections
- `scroll-behavior: smooth` oder `react-scroll`

### Hover-Effekte
- Buttons: Leichte Skalierung + Farbänderung
- Karten: Schatten-Verstärkung
- Speaker-Bilder: Leichter Zoom

---

## SEO & Meta

```typescript
// app/layout.tsx
export const metadata = {
  title: "Angstfrei-Tag 2026 | Dein Vorsprung durch mentale Gesundheit",
  description: "Erlebe den Angstfrei-Tag am 24. Oktober 2026 im Kursaal Bern. Weltklasse-Speaker, praktische Workshops und eine Community, die dich unterstützt. Dein Vorsprung durch mentale Gesundheit.",
  keywords: "Angstfrei, mentale Gesundheit, Angst überwinden, Bern, Kursaal, Gabriel Palacios, Event 2026",
  // ... weitere Meta-Tags
};
```

---

## Zusätzliche Hinweise

1. **Performance:** Bilder mit `next/image` optimieren
2. **Accessibility:** Semantic HTML, ARIA-Labels, Kontraste prüfen
3. **Animationen:** Subtile Fade-ins beim Scrollen (optional, z.B. mit Framer Motion)
4. **Forms:** Newsletter-Anmeldung oder Ticket-Kauf-CTA (kann zu externem Link führen)

---

## Quick Start für Claude Code

```bash
# Projekt erstellen
npx create-next-app@latest angstfrei-tag --typescript --tailwind --app

# In Projektordner wechseln
cd angstfrei-tag

# Dependencies für geile Animationen & Icons
npm install lucide-react framer-motion

# Dev Server starten
npm run dev
```

Dann die Komponenten gemäss Struktur oben erstellen und den Screenshot als visuelle Referenz nutzen.

---

## Zusammenfassung der Kern-Anforderungen

| | |
|---|---|
| **Event** | Angstfrei-Tag 2026 |
| **Datum** | Samstag, 24. Oktober 2026 |
| **Ort** | Kursaal, Bern |
| **Slogan** | Dein Vorsprung durch mentale Gesundheit |
| **Dauer** | 1 Tag (nur Samstag) |
| **Tickets** | Online (99 CHF) \| Tagesticket (249 CHF) \| VIP (599 CHF) |
| **Tech** | Next.js 14 + Tailwind + Framer Motion |
| **Qualität** | Nicht 1:1 nachbauen, sondern BESSER machen |
| **Bilder** | Platzhalter wo nötig |

**Mach uns die geilste Angstfrei-Tag Landing Page! 🚀**
