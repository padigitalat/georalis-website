# Georalis Full Site Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert dark-theme site to light theme, create 15 German SEO landing pages, add DE/EN language switcher, add datenschutz/AGB pages, and create English versions of all pages.

**Architecture:** Static HTML/CSS/JS site on Cloudflare Pages. All pages share styles.css and main.js. Landing pages follow a fixed template (lp-hero → keywords → problems → results → CTA). English pages are separate files with -en.html suffix.

**Tech Stack:** HTML5, CSS3 (custom properties), Vanilla JS, GSAP 3.12.2 via CDN

---

## File Map

**Modify:**
- `styles.css` — color system overhaul + new LP component styles
- `index.html`, `fokus.html`, `service.html`, `profil.html`, `kontakt.html`, `bedarfsanalyse.html`, `impressum.html` — footer links + nav lang switcher

**Create (German):**
- `sc-logistik.html`, `sc-einkauf.html`, `sc-planung.html`
- `zoll-kosten.html`, `zoll-incoterms.html`, `zoll-ursprung.html`, `zoll-compliance.html`
- `org-governance.html`, `org-kpi.html`, `org-change.html`
- `stab-silos.html`, `stab-schnittstellen.html`
- `sys-automatisierung.html`, `sys-daten.html`, `sys-integration.html`
- `datenschutz.html`, `agb.html`

**Create (English):**
- `index-en.html`, `fokus-en.html`, `service-en.html`, `profil-en.html`, `kontakt-en.html`, `bedarfsanalyse-en.html`, `impressum-en.html`, `datenschutz-en.html`
- All 15 LP pages as `-en.html` variants

---

## TASK 1 — Update styles.css: Light Theme + Landing Page Components

**Files:** Modify `styles.css`

### Color System Changes

- [ ] **Step 1: Replace CSS custom properties in `:root`**

Replace the `:root` block (lines 8–38) with:

```css
:root {
  --bg:           #F8F8F6;
  --surface:      #FFFFFF;
  --border:       #C8A96A;
  --text:         #1A1A1A;
  --secondary:    #666666;
  --accent:       #005F6A;
  --accent-dark:  #003F47;
  --gold:         #C8A96A;
  --cta-bg:       #005F6A;
  --cta-text:     #FFFFFF;
  --light-tint:   #E8F4F5;

  --serif: 'Playfair Display', Georgia, serif;
  --sans:  'Inter', -apple-system, sans-serif;

  --hero-size: clamp(2.5rem, 5vw, 5rem);
  --h1-size:   clamp(2rem, 4vw, 3.5rem);
  --h2-size:   clamp(1.625rem, 3vw, 2.5rem);
  --h3-size:   clamp(1.125rem, 2vw, 1.625rem);
  --body-size: 1rem;
  --sm-size:   0.875rem;
  --xs-size:   0.75rem;

  --section-pad: clamp(80px, 10vw, 140px);
  --side-pad:    clamp(24px, 5vw, 80px);
  --gap:         clamp(16px, 3vw, 32px);

  --nav-h:    72px;
  --ease:     0.3s ease;
  --line:     1px solid var(--border);
}
```

- [ ] **Step 2: Update nav.scrolled + cursor-ring for light bg**

Find `.nav.scrolled` and replace its `background` line:
```css
.nav.scrolled {
  height: 56px;
  border-bottom: var(--line);
  background: rgba(248,248,246,0.96);
  backdrop-filter: blur(10px);
}
```

Find `.cursor-ring` and replace its border:
```css
.cursor-ring {
  position: fixed; width: 32px; height: 32px;
  border: 1px solid rgba(26,26,26,0.3); border-radius: 50%;
  pointer-events: none; z-index: 9998;
  transform: translate(-50%, -50%);
}
```

- [ ] **Step 3: Add hero dark-section overrides**

After the `.hero` block, append:
```css
/* Hero stays dark regardless of theme */
.hero {
  background: var(--accent-dark);
}
.hero-headline .word { color: #FFFFFF; }
.hero-subline { color: rgba(255,255,255,0.72); }
.scroll-indicator span { color: rgba(255,255,255,0.5); }
.scroll-line { background: linear-gradient(to bottom, rgba(255,255,255,0.35), transparent); }
.hero .btn-outline {
  color: #FFFFFF;
  border-color: rgba(255,255,255,0.4);
}
.hero .btn-outline:hover {
  background: rgba(255,255,255,0.12);
  color: #FFFFFF;
  border-color: rgba(255,255,255,0.8);
}
```

- [ ] **Step 4: Keep strip + quote-section dark**

Find `.strip` and update:
```css
.strip {
  border-top: var(--line); border-bottom: var(--line);
  overflow: hidden; padding: 18px 0;
  background: var(--accent-dark);
}
.strip-item { color: rgba(255,255,255,0.55); }
.strip-sep { color: var(--gold); }
```

Find `.quote-section` and update:
```css
.quote-section {
  text-align: center;
  background: var(--accent-dark);
  border-top: var(--line); border-bottom: var(--line);
}
.quote-text { color: #FFFFFF; }
.quote-attr { color: rgba(255,255,255,0.5); }
```

- [ ] **Step 5: Update ghost numbers for light bg**

Replace `.focus-num` color:
```css
.focus-num {
  font-family: var(--serif); font-size: clamp(5rem, 10vw, 9rem);
  font-weight: 300; color: rgba(26,26,26,0.05);
  position: absolute; top: -8px; right: 20px;
  line-height: 1; pointer-events: none; user-select: none;
}
```

Replace `.fokus-num-large` color:
```css
.fokus-num-large {
  font-family: var(--serif); font-size: clamp(4rem, 9vw, 9rem);
  font-weight: 300; color: rgba(26,26,26,0.05);
  line-height: 1; margin-bottom: -16px; display: block;
}
```

- [ ] **Step 6: Add landing page component styles**

Append to end of styles.css (before responsive breakpoints):

```css
/* ── Landing Page Components ── */
.lp-hero {
  background: var(--accent-dark);
  min-height: 72vh;
  display: flex; align-items: center;
  padding: calc(var(--nav-h) + clamp(48px, 8vw, 100px)) var(--side-pad) clamp(60px, 10vw, 120px);
}
.lp-hero-inner { max-width: 780px; }
.lp-hero .label { color: rgba(200,169,106,0.8); margin-bottom: 20px; }
.lp-hero h1 {
  font-family: var(--serif); font-weight: 300;
  font-size: clamp(1.75rem, 3.5vw, 3rem);
  color: #FFFFFF; line-height: 1.18;
  letter-spacing: -0.02em; margin-bottom: 24px;
  max-width: 740px;
}
.lp-hero-sub {
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  color: rgba(255,255,255,0.7); line-height: 1.65;
  max-width: 580px; margin-bottom: 40px;
}
.lp-cta-group { display: flex; gap: 16px; flex-wrap: wrap; }
.lp-btn-outline {
  background: transparent; color: #FFFFFF;
  border: 1px solid rgba(255,255,255,0.4);
  transition: background var(--ease), border-color var(--ease);
}
.lp-btn-outline:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.7); }

.keyword-grid { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 8px; }
.keyword-pill {
  font-size: 0.8rem; font-weight: 500; letter-spacing: 0.04em;
  color: var(--accent); border: 1px solid var(--accent);
  padding: 10px 20px;
  transition: background var(--ease), color var(--ease);
}
.keyword-pill:hover { background: var(--accent); color: #FFFFFF; }

.problem-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--gap);
}
.problem-card {
  padding: clamp(24px, 3vw, 36px);
  border: 1px solid var(--border);
  background: var(--surface);
}
.problem-card-dash {
  color: var(--gold); font-size: 0.875rem;
  display: block; margin-bottom: 14px;
}
.problem-card h3 {
  font-family: var(--sans); font-size: 1rem;
  font-weight: 500; margin-bottom: 10px; letter-spacing: 0;
}
.problem-card p { font-size: var(--sm-size); color: var(--secondary); line-height: 1.7; }

.lp-results { background: var(--accent-dark); }
.lp-results-inner { max-width: 960px; }
.lp-results .label { color: rgba(200,169,106,0.8); }
.lp-results h2 { color: #FFFFFF; }
.result-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--gap); margin-top: 40px;
}
.result-item {
  padding: clamp(20px, 2.5vw, 32px);
  border: 1px solid rgba(200,169,106,0.3);
}
.result-item h3 {
  font-family: var(--sans); font-weight: 500;
  font-size: 0.9375rem; color: #FFFFFF;
  margin-bottom: 10px; letter-spacing: 0;
}
.result-item p { font-size: var(--sm-size); color: rgba(255,255,255,0.6); line-height: 1.65; }

/* ── Language Switcher ── */
.lang-switch {
  border-left: 1px solid var(--border);
  padding-left: 20px; margin-left: 4px;
}
.lang-link {
  font-size: var(--xs-size); letter-spacing: 0.08em;
  font-weight: 500; color: var(--secondary);
  transition: color var(--ease);
}
.lang-link:hover, .lang-link.lang-active { color: var(--text); }
```

- [ ] **Step 7: Add responsive overrides for LP components**

Inside the `@media (max-width: 768px)` block, add:
```css
  .lp-hero { min-height: 60vh; }
  .problem-grid { grid-template-columns: 1fr; }
  .result-list { grid-template-columns: 1fr; }
  .lang-switch { display: none; }
```

- [ ] **Step 8: Commit**
```bash
cd /Users/philipppaizoni/georalis-website
git add styles.css
git commit -m "feat: light theme color system + landing page components"
```

---

## TASK 2 — Update Existing 7 Pages: Footer Links + Lang Switcher

**Files:** Modify `index.html`, `fokus.html`, `service.html`, `profil.html`, `kontakt.html`, `bedarfsanalyse.html`, `impressum.html`

- [ ] **Step 1: In each of the 7 files, find the footer-legal block and replace**

Find (in every file):
```html
      <a href="#">Datenschutz</a>
      <a href="#">AGB</a>
```
Replace with:
```html
      <a href="datenschutz.html">Datenschutz</a>
      <a href="agb.html">AGB</a>
```

- [ ] **Step 2: Add lang switcher to nav-links in each file**

Find (in every file, inside `<ul class="nav-links" ...>`):
```html
    <li><a href="bedarfsanalyse.html" class="nav-cta">Bedarfsanalyse</a></li>
  </ul>
```
Replace with (using correct EN counterpart per file):

`index.html` → `index-en.html`
`fokus.html` → `fokus-en.html`
`service.html` → `service-en.html`
`profil.html` → `profil-en.html`
`kontakt.html` → `kontakt-en.html`
`bedarfsanalyse.html` → `bedarfsanalyse-en.html`
`impressum.html` → `impressum-en.html`

```html
    <li><a href="bedarfsanalyse.html" class="nav-cta">Bedarfsanalyse</a></li>
    <li class="lang-switch"><a href="[EN_COUNTERPART]" class="lang-link">EN</a></li>
  </ul>
```

- [ ] **Step 3: Commit**
```bash
git add index.html fokus.html service.html profil.html kontakt.html bedarfsanalyse.html impressum.html
git commit -m "feat: footer legal links + DE/EN switcher on existing pages"
```

---

## TASK 3 — sc-logistik.html (Template Page — establishes pattern for all LP pages)

**File:** Create `sc-logistik.html`

- [ ] **Step 1: Create the file with full content**

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Logistikkosten systematisch analysieren und reduzieren — Frachtkosten, Transportoptimierung und KPI-Steuerung für Industrieunternehmen. Georalis Consulting.">
  <title>Logistikkosten reduzieren & optimieren — Georalis Consulting GmbH</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>

<nav class="nav" role="navigation" aria-label="Hauptnavigation">
  <a href="index.html" class="nav-logo">
    <span class="nav-logo-name">Georalis</span>
    <span class="nav-logo-slogan">Order in Motion</span>
  </a>
  <ul class="nav-links" role="list">
    <li><a href="fokus.html" class="nav-link">Fokus</a></li>
    <li><a href="service.html" class="nav-link">Service</a></li>
    <li><a href="profil.html" class="nav-link">Profil</a></li>
    <li><a href="kontakt.html" class="nav-link">Kontakt</a></li>
    <li><a href="bedarfsanalyse.html" class="nav-cta">Bedarfsanalyse</a></li>
    <li class="lang-switch"><a href="sc-logistik-en.html" class="lang-link">EN</a></li>
  </ul>
  <button class="nav-hamburger" aria-label="Menü öffnen" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
</nav>
<div class="nav-overlay" role="dialog" aria-modal="true" aria-label="Navigation">
  <a href="fokus.html" class="nav-link">Fokus</a>
  <a href="service.html" class="nav-link">Service</a>
  <a href="profil.html" class="nav-link">Profil</a>
  <a href="kontakt.html" class="nav-link">Kontakt</a>
  <a href="bedarfsanalyse.html" class="btn btn-outline">Bedarfsanalyse</a>
</div>

<main>

  <section class="lp-hero">
    <div class="lp-hero-inner">
      <span class="label">Supply Chain — Logistik</span>
      <h1>Logistikkosten verstehen, kontrollieren und gezielt reduzieren – statt sie nur zu akzeptieren</h1>
      <p class="lp-hero-sub">Viele Industrieunternehmen zahlen zu viel für Logistik — ohne es genau zu wissen. Wir machen Ihre Transportkosten sichtbar und reduzieren sie strukturiert.</p>
      <div class="lp-cta-group">
        <a href="bedarfsanalyse.html" class="btn btn-primary">Bedarfsanalyse starten</a>
        <a href="kontakt.html" class="btn lp-btn-outline">Gespräch vereinbaren</a>
      </div>
    </div>
  </section>

  <section class="section" style="background: var(--light-tint);">
    <div class="section-header reveal">
      <span class="label">Relevante Themen</span>
      <h2>Was Unternehmen in diesem Bereich suchen</h2>
    </div>
    <div class="keyword-grid reveal">
      <span class="keyword-pill">Logistikkosten reduzieren</span>
      <span class="keyword-pill">Transportkosten optimieren</span>
      <span class="keyword-pill">Frachtkosten Analyse</span>
      <span class="keyword-pill">Logistikprozesse Industrie</span>
    </div>
  </section>

  <section class="section">
    <div class="section-header reveal">
      <span class="label">Typische Probleme</span>
      <h2>Was wir häufig vorfinden</h2>
    </div>
    <div class="problem-grid reveal">
      <div class="problem-card">
        <span class="problem-card-dash">—</span>
        <h3>Keine Kostentransparenz</h3>
        <p>Logistikkosten sind über viele Carrier, Verträge und Kostenstellen verteilt — eine belastbare Gesamtübersicht fehlt.</p>
      </div>
      <div class="problem-card">
        <span class="problem-card-dash">—</span>
        <h3>Fehlende Bündelung</h3>
        <p>Viele Einzelverträge mit Speditionen, kein Volumeneffekt, keine strategische Verhandlungsposition gegenüber Carriern.</p>
      </div>
      <div class="problem-card">
        <span class="problem-card-dash">—</span>
        <h3>Schlechte Routenplanung</h3>
        <p>Unnötige Transporte, falsche Verkehrsträger, keine Konsolidierung — Kostenpotenziale bleiben dauerhaft ungenutzt.</p>
      </div>
      <div class="problem-card">
        <span class="problem-card-dash">—</span>
        <h3>Keine KPI-Steuerung</h3>
        <p>Logistikleistung wird nicht gemessen — Fehler, Verzögerungen und Mehrkosten fallen zu spät auf.</p>
      </div>
    </div>
  </section>

  <section class="section lp-results">
    <div class="lp-results-inner">
      <div class="section-header reveal">
        <span class="label">Was Georalis liefert</span>
        <h2>Ihre Logistikkosten, systematisch optimiert</h2>
      </div>
      <div class="result-list reveal">
        <div class="result-item">
          <h3>Kostenanalyse &amp; Transparenz</h3>
          <p>Vollständige Analyse Ihrer Logistikkosten nach Carriern, Routen und Produktgruppen — Einsparungspotenziale von 20–35% sind typisch.</p>
        </div>
        <div class="result-item">
          <h3>Strukturierte Kostensenkung</h3>
          <p>Transportbündelung, Neuverhandlung und Routenoptimierung — mit messbaren Ergebnissen in 60–90 Tagen.</p>
        </div>
        <div class="result-item">
          <h3>KPI-Steuerung aufbauen</h3>
          <p>Dashboards und Kennzahlen für tägliche Logistiksteuerung — statt einmal jährlich zu analysieren.</p>
        </div>
        <div class="result-item">
          <h3>Umsetzungsbegleitung</h3>
          <p>Wir begleiten nicht nur die Analyse, sondern die Umsetzung — bis Veränderungen in Ihrem System verankert sind.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section cta-section">
    <h2 class="reveal">Ihre Logistikkosten haben mehr Potenzial als Sie denken.</h2>
    <div class="cta-buttons reveal">
      <a href="bedarfsanalyse.html" class="btn btn-primary">Bedarfsanalyse starten</a>
      <a href="kontakt.html" class="btn btn-outline">Kontakt aufnehmen</a>
    </div>
  </section>

</main>

<footer class="footer" role="contentinfo">
  <div class="footer-grid">
    <div>
      <p class="footer-logo">Georalis</p>
      <p class="footer-tagline">Order in Motion.</p>
    </div>
    <div class="footer-col">
      <h4>Navigation</h4>
      <ul class="footer-links" role="list">
        <li><a href="fokus.html">Fokus</a></li>
        <li><a href="service.html">Service</a></li>
        <li><a href="profil.html">Profil</a></li>
        <li><a href="kontakt.html">Kontakt</a></li>
        <li><a href="bedarfsanalyse.html">Bedarfsanalyse</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Kontakt</h4>
      <div class="footer-contact">
        <p>Georgiana Bonas, EMBA<br>Founder &amp; Managing Director</p>
        <p style="margin-top:8px">Bruggraberweg 15<br>8344 Bad Gleichenberg</p>
        <p><a href="mailto:office@georalis.at">office@georalis.at</a></p>
        <p><a href="tel:+436606708331">+43 660 670 83 31</a></p>
        <p>Österreich</p>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2026 Georalis Consulting GmbH</p>
    <nav class="footer-legal" aria-label="Rechtliches">
      <a href="impressum.html">Impressum</a>
      <a href="datenschutz.html">Datenschutz</a>
      <a href="agb.html">AGB</a>
    </nav>
  </div>
</footer>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script src="main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Commit**
```bash
git add sc-logistik.html
git commit -m "feat: add sc-logistik.html landing page"
```

---

## TASKS 4–16 — Remaining 14 German Landing Pages

**Pattern:** Each page uses identical HTML structure as sc-logistik.html. Only the values in the table below change. Nav `lang-switch` href = `[filename]-en.html`.

### Content Table

| File | Meta Title | Label | H1 | Subline | Keywords (4) | Problems (title / text) | Results (title / text) | CTA H2 |
|---|---|---|---|---|---|---|---|---|
| `sc-einkauf.html` | Einkauf optimieren & Beschaffungskosten senken — Georalis | Supply Chain — Einkauf | Materialkosten sichtbar machen und systematisch reduzieren – nicht nur verhandeln | Preise sind historisch gewachsen, Lieferanten kaum vergleichbar, Kosten intransparent. Wir analysieren Ihre Beschaffungsstruktur und senken Materialkosten nachhaltig. | Einkauf optimieren Industrie · Beschaffungskosten senken · Strategischer Einkauf · Lieferantenmanagement | 1. Historisch gewachsene Preise / Preise wurden nie systematisch hinterfragt — kein Marktvergleich, keine Benchmarks. · 2. Keine Vergleichbarkeit / Gleiches Material, unterschiedliche Preise je Werk oder Periode — ohne nachvollziehbaren Grund. · 3. Zu viele Lieferanten / Viele Einzellieferanten, kein Bündelungseffekt, hoher Verwaltungsaufwand. · 4. Fehlende Transparenz / Welche Materialgruppen machen welche Kosten? Niemand weiß es genau. | 1. Materialkosten-Transparenz / Vollständige Sicht auf Ihre Einkaufsstruktur nach Warengruppen, Lieferanten und Werken. · 2. Systematische Kostensenkung / Lieferantenkonsolidierung, Preisvergleiche, strategische Neuverhandlung — kein Einmalprojekt, sondern ein System. · 3. Lieferantenbasis optimieren / Weniger, stärkere Lieferantenbeziehungen mit klaren Kriterien und Bewertungen. · 4. Strategischen Einkauf aufbauen / Von reaktivem Bestellen zu proaktivem Einkaufsmanagement mit Prozessen und Verantwortlichkeiten. | Ihre Materialkosten tragen mehr Potenzial als Sie sehen. |
| `sc-planung.html` | Supply Chain Planung optimieren — Bestandsoptimierung & MRP — Georalis | Supply Chain — Planung | Supply Chains steuerbar machen – statt nur auf Probleme zu reagieren | Zu hohe Lagerbestände und gleichzeitig Materialengpässe — das ist kein Zufall, sondern ein Planungsproblem. Wir lösen es systematisch. | Bestandsoptimierung · Disposition verbessern · Produktionsplanung optimieren · MRP / ERP Planung | 1. Bestände und Engpässe gleichzeitig / Zu viel Lager beim falschen Material, gleichzeitig Engpässe beim richtigen — beide Probleme gleichzeitig. · 2. Planung funktioniert nicht / Dispositionsregeln sind veraltet, Sicherheitsbestände willkürlich, MRP liefert schlechte Vorschläge. · 3. Excel statt Systemsteuerung / Planung läuft über Excel-Listen statt systemisch — fehleranfällig, zeitaufwändig, nicht skalierbar. · 4. Keine Steuerbarkeit / Ohne klare KPIs weiß niemand, ob die Planung gut oder schlecht ist. | 1. Planungsprozesse stabilisieren / Ursachenanalyse für Engpässe und Überstände — mit konkreten Maßnahmen, nicht nur Diagnose. · 2. ERP / MRP richtig nutzen / Ihre Systeme können mehr — wir stellen sicher, dass Planung und Disposition systemisch gesteuert werden. · 3. Bestände reduzieren / Zielbestandsrechnung, Safety Stock Optimierung — mit sofortiger Cash-Wirkung. · 4. KPI-basierte Steuerung / Liefertreue, Reichweite, Engpassquote — messbar und steuerbar. | Planungsprobleme sind lösbar — wenn man sie an der Wurzel packt. |
| `zoll-kosten.html` | Zollkosten optimieren & Importkosten senken — Georalis | Global Trade — Zollkosten | Zollkosten sichtbar machen und gezielt steuern – statt sie einfach zu bezahlen | Falsche Zolltarifnummern, ungenutzte Präferenzen, keine Kostentransparenz — viele Industrieunternehmen zahlen mehr Zoll als nötig. Wir analysieren und optimieren systematisch. | Zollkosten optimieren · Importkosten senken · TARIC Analyse · Zolltarifnummer Optimierung | 1. Falsche Zolltarifnummern / Zolltarifnummern wurden einmal vergeben und nie geprüft — Fehler bedeuten Mehrkosten und Haftungsrisiken. · 2. Keine Kostentransparenz / Gesamte Importkosten (Zoll, EUSt, Handling) sind nirgends sauber zusammengefasst. · 3. Präferenzen ungenutzt / Freihandelsabkommen existieren, werden aber nicht systematisch angewendet. · 4. Risiko durch falsche Deklaration / Fehlerhafte Deklarationen können zu Nacherhebungen, Bußgeldern und Zollprüfungen führen. | 1. TARIC-Analyse &amp; Optimierung / Überprüfung aller Zolltarifnummern auf Korrektheit und Potenzial — typische Einsparungen 15–40%. · 2. Importkosten-Transparenz / Vollständige Sicht auf tatsächliche Einfuhrkosten: Zoll, EUSt, Lagergebühren, Bearbeitungskosten. · 3. Präferenznutzung / Identifikation und Aktivierung aller verfügbaren Freihandelsabkommen — europaweit und international. · 4. Risikominimierung / Korrekte Deklaration, interne Prozesse und Dokumentationsstandards. | Zoll ist kein Fixkostenblock — er ist steuerbar. |
| `zoll-incoterms.html` | Incoterms optimieren — Lieferbedingungen strategisch gestalten — Georalis | Global Trade — Incoterms | Lieferbedingungen so gestalten, dass Sie Kosten, Risiko und Steuerung zurückgewinnen | EXW bedeutet: Ihr Lieferant entscheidet über Transport, Zoll und Kosten — und Sie sehen nur die Rechnung. Wir helfen Ihnen, die Kontrolle zurückzugewinnen. | Incoterms Optimierung · EXW vs DDP Kosten · Lieferbedingungen international · Verantwortung Transport Zoll | 1. EXW ohne Kostenkontrolle / Lieferant organisiert Transport — Sie tragen Kosten und Risiko, haben aber keine Steuerung. · 2. Falsche Risikoübertragung / Risikoübergang und tatsächliche Kostentragung sind in vielen Verträgen nicht synchron. · 3. Transport und Zoll nicht steuerbar / Wer EXW kauft, verliert die Möglichkeit, Carrier und Zollanmelder selbst zu wählen. · 4. Versteckte Kosten / Kosten für Transport und Zoll sind im Lieferantenpreis versteckt — nicht verhandelbar, nicht transparent. | 1. Incoterms-Audit / Analyse Ihrer Lieferbedingungen: Wer trägt Kosten, Risiko, Verantwortung — stimmt das mit Ihren Verträgen überein? · 2. Optimierte Lieferstruktur / Klare Empfehlung zur Incoterms-Strategie je Handelspartner und Produktgruppe. · 3. Kostenkontrolle zurückgewinnen / Strukturierte Transition von EXW zu DAP, CIP oder DDP — mit vollständiger Kostentransparenz. · 4. Vertragsanpassung &amp; Umsetzung / Begleitung der Vertragsanpassungen und Implementierung neuer Lieferbedingungen. | Ihre Lieferbedingungen bestimmen, wer wirklich steuert. |
| `zoll-ursprung.html` | Präferenzursprung nutzen & Zölle sparen — Georalis | Global Trade — Ursprung | Zölle vermeiden, indem Sie Ihre Lieferkette strategisch steuern | Wer Freihandelsabkommen nicht nutzt, zahlt Zölle die andere nicht zahlen. Wir berechnen, strukturieren und integrieren Präferenzursprung in Ihre Supply Chain. | Präferenzursprung · Freihandelsabkommen nutzen · Ursprung berechnen · Zoll sparen Export | 1. Ursprung unklar / Niemand weiß genau, welchen präferenziellen Ursprung die eigenen Produkte haben — und ob er nachweisbar ist. · 2. Lieferkette nicht auf Präferenz ausgelegt / Beschaffungsentscheidungen werden ohne Blick auf Ursprungskonsequenzen getroffen. · 3. Lieferantenerklärungen fehlen / Lieferantenerklärungen existieren nicht, sind veraltet oder decken nicht alle Materialien ab. · 4. Ursprung nicht im ERP / Ursprungsberechnungen laufen manuell in Excel — nicht skalierbar, fehleranfällig. | 1. Ursprungsanalyse / Berechnung des präferenziellen Ursprungs für alle relevanten Produktgruppen nach aktuellen Regelwerken. · 2. Lieferkette ausrichten / Strategische Beschaffungsanpassung zur Erfüllung von Ursprungsanforderungen — mit messbarer Zolleinsparung. · 3. Lieferantenerklärungen / Aufbau eines vollständigen Systems zur Einholung, Prüfung und Archivierung. · 4. ERP-Integration / Ursprung und Präferenz systemisch verankern — nicht als manuelle Nachkalkulation. | Freihandelsabkommen gelten. Aber nur wenn Sie sie nutzen. |
| `zoll-compliance.html` | Trade Compliance aufbauen — Exportkontrolle & CBAM — Georalis | Global Trade — Compliance | Compliance von einem Pflicht-Thema zu einem steuerbaren System machen | CBAM, EUDR, Exportkontrolle — neue Regulierungen treffen Unternehmen unvorbereitet. Wir helfen Ihnen, Compliance als funktionierendes System zu etablieren — nicht als Checkliste. | Trade Compliance · Exportkontrolle · CBAM / EUDR · Zollprüfung Vorbereitung | 1. Keine klare Verantwortung / Compliance-Themen liegen bei niemandem — jeder ist irgendwie zuständig, niemand wirklich. · 2. Neue Regulierungen nicht integriert / CBAM, EUDR, Sanktionslisten — viele Unternehmen wissen nicht, wie betroffen sie sind. · 3. Zollprüfungen treffen unvorbereitet / Dokumentation, Prozesse und Systeme sind nicht prüfungsreif — hohe Risiken bei Kontrollen. · 4. Systeme vorhanden aber falsch genutzt / SAP GTS, Oracle GTM, AEB — vorhanden aber nicht strategisch genutzt. | 1. Compliance-Struktur aufbauen / Klare Verantwortlichkeiten, Prozesse und interne Kontrollen — als System, nicht als Checkliste. · 2. Regulatorik integrieren / CBAM, EUDR, Exportkontrolle — Betroffenheitsanalyse und Integration in Ihre Prozesse. · 3. Prüfungsvorbereitung / Systematische Vorbereitung auf Zollprüfungen: Dokumentation, Prozesse, interne Audits. · 4. Systemnutzung optimieren / SAP GTS, Oracle GTM, AEB — strategisch steuern statt nur verwalten. | Compliance-Risiken lassen sich steuern — wenn man sie kennt. |
| `org-governance.html` | Governance &amp; Entscheidungsstrukturen verbessern — Georalis | Organisation — Governance | Klare Entscheidungen statt Abstimmungsschleifen | Wenn alles durch Meetings muss und trotzdem niemand entscheidet, liegt das nicht an den Menschen — sondern an fehlenden Strukturen. Wir bauen sie auf. | Governance Struktur Unternehmen · Entscheidungsprozesse verbessern · Verantwortlichkeiten definieren · RACI Matrix | 1. Keiner entscheidet / Entscheidungen werden vorbereitet, diskutiert, vertagt — aber nicht getroffen. · 2. Alles geht durch Meetings / Jede Entscheidung braucht ein Meeting, jedes Meeting einen Folgetermin. · 3. Verantwortlichkeiten unklar / Jeder ist für alles irgendwie zuständig — niemand wirklich verantwortlich. · 4. Abstimmungsschleifen / Einfache operative Entscheidungen brauchen mehrere Hierarchieebenen. | 1. Entscheidungsstruktur klären / Klare RACI-Matrix: Wer entscheidet was — ohne Abstimmungsschleifen und endlose Meetings. · 2. Governance-Framework / Praktische Strukturen, die in Ihrem Unternehmen funktionieren — nicht theoretisch, sondern gelebt. · 3. Schnellere Entscheidungen / Messbar kürzere Entscheidungszeiten durch klare Prozesse und Eskalationspfade. · 4. Umsetzungsbegleitung / Wir begleiten die Einführung neuer Strukturen bis sie in der Organisation verankert sind. | Wer schneller entscheidet, gewinnt operative Geschwindigkeit. |
| `org-kpi.html` | KPI-System &amp; Performance Management aufbauen — Georalis | Organisation — Steuerung | Transparenz schaffen und Unternehmen steuerbar machen | Zahlen gibt es überall — aber keine Entscheidungsbasis. Wir bauen KPI-Systeme, die tatsächlich zur Steuerung genutzt werden. | KPI Reporting Unternehmen · Performance Management · Steuerungsmodelle · KPI Dashboard | 1. Zahlen ohne Steuerung / Berichte existieren, aber niemand leitet daraus Maßnahmen ab — Zahlen dokumentieren nur Vergangenheit. · 2. Unterschiedliche Datenquellen / Jede Abteilung hat ihre eigene Zahl — welcher man glauben soll, ist unklar. · 3. Keine Entscheidungsbasis / Strategie und operative Steuerung sind nicht verbunden — kein gemeinsames Bild der Lage. · 4. Reporting-Overhead / Zu viele Reports, zu viel Aufwand, zu wenig Nutzen. | 1. KPI-System entwickeln / Relevante Kennzahlen für Ihre Unternehmensbereiche — abgestimmt auf Strategie, Prozesse und Entscheidungsebenen. · 2. Datenbasis harmonisieren / Eine Zahl, ein Verständnis — systemübergreifend und konsistent. · 3. Reporting-Struktur aufbauen / Dashboards und Reports, die Entscheidungen ermöglichen — nicht Vergangenheit dokumentieren. · 4. Performance Management / Steuerungsroutinen, die tatsächlich zu Maßnahmen führen. | Steuerung beginnt mit Klarheit — über die richtigen Kennzahlen. |
| `org-change.html` | Change Management &amp; Transformation umsetzen — Georalis | Organisation — Transformation | Transformation umsetzen statt nur planen | Viele Transformationsprojekte scheitern nicht an der Strategie, sondern an der Umsetzung. Wir begleiten Unternehmen durch Veränderungen — bis Neues tatsächlich funktioniert. | Transformation Unternehmen · Change Management Umsetzung · Restrukturierung Organisation · Veränderungsmanagement | 1. Widerstand im Team / Veränderungen stoßen auf Ablehnung — die Gründe werden nicht adressiert. · 2. Keine klare Richtung / Warum verändern wir uns? Die Antwort ist unklar — auf allen Ebenen. · 3. Transformation bleibt stecken / Projekte starten mit Energie und verlieren sich in Planungsschleifen oder Piloten. · 4. Altes kehrt zurück / Ohne Verankerung fallen Organisationen in alte Muster zurück — Transformation verpufft. | 1. Klarheit schaffen / Eine klare Richtung, kommuniziert verständlich auf allen Ebenen der Organisation. · 2. Widerstand adressieren / Systematische Analyse von Widerstandsmustern und gezielte Maßnahmen — ohne Tempo zu verlieren. · 3. Umsetzung strukturieren / Projektstruktur, Milestones und Steuerungsrhythmen, die Transformation machbar machen. · 4. Verankern / Neue Strukturen und Prozesse in der Organisation verankern — damit Veränderung bleibt. | Transformation gelingt, wenn Umsetzung und Richtung stimmen. |
| `stab-silos.html` | Silodenken auflösen &amp; Zusammenarbeit verbessern — Georalis | Zusammenarbeit — Silos | Warum Ihre Abteilungen gegeneinander arbeiten – statt zusammen | Wenn Einkauf, Logistik und Produktion gegeneinander optimieren, verliert das Gesamtunternehmen. Wir analysieren Ursachen und schaffen Strukturen für echte Zusammenarbeit. | Silodenken auflösen · Zusammenarbeit verbessern Unternehmen · Schnittstellenprobleme lösen · Abteilungsübergreifende Zusammenarbeit | 1. Einkauf vs. Logistik vs. Produktion / Jede Abteilung optimiert für sich — das Gesamtergebnis leidet. · 2. Schuldzuweisungen statt Lösungen / Bei Problemen sucht man den Schuldigen in der anderen Abteilung — nicht die Lösung. · 3. Keine End-to-End Sicht / Niemand hat ein vollständiges Bild des Prozesses — nur den eigenen Ausschnitt. · 4. Zielkonflikte zwischen Bereichen / Abteilungsziele sind gegenläufig — was für Einkauf gut ist, schadet Logistik. | 1. Konfliktursachen analysieren / Identifikation der Ursachen von Silokonflikten: Anreize, Zielkonflikte, fehlende Prozesse. · 2. Gemeinsame Ziele definieren / Abteilungsübergreifende KPIs, die Zusammenarbeit fördern statt behindern. · 3. Schnittstellenprozesse klären / Klare Übergaben, Verantwortlichkeiten und Kommunikationsroutinen. · 4. End-to-End Sicht / Steuerung über Abteilungsgrenzen hinweg — von Bestellung bis Auslieferung. | Zusammenarbeit entsteht nicht durch Appelle — sondern durch Struktur. |
| `stab-schnittstellen.html` | Prozessschnittstellen optimieren &amp; End-to-End Prozesse gestalten — Georalis | Zusammenarbeit — Schnittstellen | Prozesse funktionieren nur, wenn Schnittstellen funktionieren | Informationsverluste, Doppelarbeit und Verzögerungen entstehen fast immer an Übergabepunkten zwischen Abteilungen und Systemen. Wir klären und strukturieren diese Schnittstellen. | End-to-End Prozesse · Prozessschnittstellen optimieren · Value Stream Mapping · Übergaben verbessern | 1. Übergaben funktionieren nicht / Informationen gehen verloren wenn Verantwortung wechselt — regelmäßig und systematisch. · 2. Informationsverluste / Was eine Abteilung weiß, kommt nicht vollständig bei der nächsten an. · 3. Doppelte Arbeit / Gleiche Daten werden mehrfach erfasst — in verschiedenen Systemen und von verschiedenen Personen. · 4. Keine klare Verantwortung / An Schnittstellen ist unklar, wer zuständig ist — Probleme fallen durch alle Raster. | 1. Value Stream Mapping / Visualisierung der Prozessflüsse — Informationen, Material, Entscheidungen — und Identifikation von Brüchen. · 2. Schnittstellen neu definieren / Klare Übergabeprozesse mit Anforderungen, Verantwortlichkeiten und Eskalationspfaden. · 3. Informationsverluste eliminieren / Standardisierte Kommunikation und Systemintegration — keine doppelte Datenpflege. · 4. Prozessverantwortung / End-to-End Verantwortliche, die über Abteilungsgrenzen hinweg steuern. | Gut gestaltete Schnittstellen sind Wettbewerbsvorteil. |
| `sys-automatisierung.html` | Prozessautomatisierung &amp; digitale Workflows — Georalis | Systeme — Automatisierung | Manuelle Prozesse eliminieren und Effizienz steigern | Excel-Listen, manuelle E-Mail-Weiterleitungen, händische Dateneingaben — diese Prozesse kosten täglich Zeit, erzeugen Fehler und blockieren Wachstum. Wir lösen sie systematisch ab. | Prozessautomatisierung · Digitale Workflows · Effizienzsteigerung Systeme · Excel ablösen Industrie | 1. Manuelle Excel-Prozesse / Kernprozesse laufen über Excel — aufwändig, fehleranfällig, nicht skalierbar. · 2. Hohe Fehleranfälligkeit / Manuelle Dateneingabe erzeugt Fehler — die erst spät und teuer auffallen. · 3. Zeitverlust / Mitarbeiter verbringen Stunden mit Tätigkeiten, die Systeme erledigen könnten. · 4. Kein Überblick / Prozessstatus ist nur bekannt, wenn man nachfragt — kein automatischer Informationsfluss. | 1. Prozessaufnahme &amp; Priorisierung / Aufnahme manueller Prozesse und Priorisierung nach Aufwand, Fehleranfälligkeit und Automatisierungspotenzial. · 2. Digitale Workflows / Schritt-für-Schritt Ablösung von Excel und E-Mail durch systemgestützte, automatisierte Prozesse. · 3. Fehleranfälligkeit reduzieren / Systemische Kontrollen statt manueller Prüfungen — weniger Fehler, mehr Verlässlichkeit. · 4. Schnelle Umsetzung / Erste Automatisierungen in 4–8 Wochen live — sichtbarer Fortschritt, keine endlose Planung. | Jeder manuelle Prozess ist ein lösbares Problem. |
| `sys-daten.html` | KPI Dashboard &amp; Datenanalyse für Industrie — Georalis | Systeme — Daten | Daten in Entscheidungen übersetzen | Daten sind vorhanden — aber niemand kann damit steuern. Jede Abteilung hat andere Zahlen, kein gemeinsames Bild, keine Entscheidungsbasis. Wir ändern das. | KPI Dashboard Unternehmen · Datenanalyse Industrie · Reporting Systeme · Business Intelligence Industrie | 1. Daten ohne Nutzbarkeit / Daten werden gesammelt aber nicht genutzt — fehlende Aufbereitung und Kontext. · 2. Unterschiedliche Zahlen / Jede Abteilung rechnet mit anderen Werten — wer hat recht? · 3. Keine Entscheidungsbasis / Daten dokumentieren Vergangenheit statt Entscheidungen zu ermöglichen. · 4. Reporting-Overhead / Zu viele manuelle Reports, zu viel Aufwand, zu wenig Steuerungswirkung. | 1. Datenstrategie entwickeln / Definition relevanter KPIs und Datenquellen — abgestimmt auf Ihre Entscheidungsprozesse. · 2. Einheitliche Datenbasis / Eine Wahrheit, ein System, eine Zahl — konsistent über alle Abteilungen. · 3. Dashboard &amp; Reporting / Operative und strategische Dashboards, die täglich genutzt werden — kein Overhead, pure Steuerung. · 4. Entscheidungskultur stärken / Vom Bauchgefühl zur datenbasierten Entscheidung — mit passenden Steuerungsroutinen. | Daten, die nicht steuern, sind nur Kosten. |
| `sys-integration.html` | Systemintegration &amp; ERP Schnittstellen — Georalis | Systeme — Integration | Systeme verbinden statt Insellösungen betreiben | ERP, WMS, CRM, MES — viele Systeme, wenig Verbindung. Daten werden mehrfach gepflegt, Medienbrüche erzeugen Fehler, und niemand hat ein vollständiges Bild. Wir verbinden, was zusammengehört. | Systemintegration · Schnittstellen optimieren · Datenintegration ERP · Medienbrüche eliminieren | 1. Systeme sprechen nicht miteinander / Daten fließen nicht automatisch zwischen Systemen — manuelle Transfers sind der Standard. · 2. Mehrfache Datenpflege / Gleiche Daten werden in drei Systemen separat gepflegt — Inkonsistenzen inklusive. · 3. Medienbrüche / Informationen werden aus einem System exportiert und manuell ins nächste eingegeben. · 4. Kein Gesamtbild / Weil Systeme nicht integriert sind, hat niemand eine vollständige, aktuelle Sicht auf das Unternehmen. | 1. Schnittstellenanalyse / Aufnahme der Systemlandschaft und Identifikation von Medienbrüchen, Doppelerfassungen und Lücken. · 2. Integrationskonzept / Klare Architektur: Welche Systeme müssen wie miteinander kommunizieren — mit welcher Priorität. · 3. Implementierungsbegleitung / Technische Umsetzung begleiten und sicherstellen, dass Integrationen tatsächlich genutzt werden. · 4. Datenpflege reduzieren / Ein Datensatz, ein System — keine mehrfache Erfassung, keine Inkonsistenzen. | Integrierte Systeme sind die Grundlage für operative Exzellenz. |

- [ ] **Step 1: For each row in the table, create the corresponding .html file**

Use the exact same HTML structure as sc-logistik.html. Substitute:
- `<meta name="description">` content
- `<title>`
- `.label` inside `.lp-hero-inner`
- `<h1>` text
- `.lp-hero-sub` text
- 4 `.keyword-pill` spans
- 4 `.problem-card` blocks (each with `<h3>` title and `<p>` text)
- `.lp-results h2` text
- 4 `.result-item` blocks (each with `<h3>` title and `<p>` text)
- `.cta-section h2` text
- `lang-switch` href attribute

- [ ] **Step 2: Commit all 14 files**
```bash
git add sc-einkauf.html sc-planung.html zoll-kosten.html zoll-incoterms.html zoll-ursprung.html zoll-compliance.html org-governance.html org-kpi.html org-change.html stab-silos.html stab-schnittstellen.html sys-automatisierung.html sys-daten.html sys-integration.html
git commit -m "feat: add 14 German SEO landing pages"
```

---

## TASK 17 — Update fokus.html: Add Subpage Links

**File:** Modify `fokus.html`

- [ ] **Step 1: In section `#transformation`, after the `fokus-keywords` div, add:**
```html
    <div class="fokus-bullets" style="margin-top: 28px;">
      <li><a href="sys-automatisierung.html" class="arrow-link" style="font-size:var(--sm-size)">Prozessautomatisierung →</a></li>
      <li><a href="sys-daten.html" class="arrow-link" style="font-size:var(--sm-size)">Daten &amp; KPI-Systeme →</a></li>
      <li><a href="sys-integration.html" class="arrow-link" style="font-size:var(--sm-size)">Systemintegration →</a></li>
      <li><a href="org-governance.html" class="arrow-link" style="font-size:var(--sm-size)">Governance &amp; Entscheidungen →</a></li>
      <li><a href="org-change.html" class="arrow-link" style="font-size:var(--sm-size)">Change Management →</a></li>
    </div>
```

- [ ] **Step 2: In section `#supplychain`, after the `fokus-keywords` div, add:**
```html
    <div class="fokus-bullets" style="margin-top: 28px;">
      <li><a href="sc-logistik.html" class="arrow-link" style="font-size:var(--sm-size)">Logistikkosten optimieren →</a></li>
      <li><a href="sc-einkauf.html" class="arrow-link" style="font-size:var(--sm-size)">Einkauf &amp; Beschaffung →</a></li>
      <li><a href="sc-planung.html" class="arrow-link" style="font-size:var(--sm-size)">Planung &amp; Bestandsoptimierung →</a></li>
      <li><a href="stab-silos.html" class="arrow-link" style="font-size:var(--sm-size)">Silodenken auflösen →</a></li>
      <li><a href="stab-schnittstellen.html" class="arrow-link" style="font-size:var(--sm-size)">Schnittstellenoptimierung →</a></li>
    </div>
```

- [ ] **Step 3: In section `#produktion`, after the `fokus-keywords` div, add:**
```html
    <div class="fokus-bullets" style="margin-top: 28px;">
      <li><a href="org-kpi.html" class="arrow-link" style="font-size:var(--sm-size)">KPI &amp; Performance Management →</a></li>
      <li><a href="org-governance.html" class="arrow-link" style="font-size:var(--sm-size)">Governance &amp; Steuerung →</a></li>
      <li><a href="stab-silos.html" class="arrow-link" style="font-size:var(--sm-size)">Zusammenarbeit verbessern →</a></li>
    </div>
```

- [ ] **Step 4: In section `#zoll`, after the `fokus-keywords` div, add:**
```html
    <div class="fokus-bullets" style="margin-top: 28px;">
      <li><a href="zoll-kosten.html" class="arrow-link" style="font-size:var(--sm-size)">Zollkosten optimieren →</a></li>
      <li><a href="zoll-incoterms.html" class="arrow-link" style="font-size:var(--sm-size)">Incoterms &amp; Lieferbedingungen →</a></li>
      <li><a href="zoll-ursprung.html" class="arrow-link" style="font-size:var(--sm-size)">Präferenzursprung →</a></li>
      <li><a href="zoll-compliance.html" class="arrow-link" style="font-size:var(--sm-size)">Trade Compliance →</a></li>
    </div>
```

- [ ] **Step 5: Commit**
```bash
git add fokus.html
git commit -m "feat: add subpage links to fokus.html sections"
```

---

## TASK 18 — datenschutz.html

**File:** Create `datenschutz.html`

- [ ] **Step 1: Create the file**

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex">
  <title>Datenschutzerklärung — Georalis Consulting GmbH</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>

<nav class="nav" role="navigation" aria-label="Hauptnavigation">
  <a href="index.html" class="nav-logo">
    <span class="nav-logo-name">Georalis</span>
    <span class="nav-logo-slogan">Order in Motion</span>
  </a>
  <ul class="nav-links" role="list">
    <li><a href="fokus.html" class="nav-link">Fokus</a></li>
    <li><a href="service.html" class="nav-link">Service</a></li>
    <li><a href="profil.html" class="nav-link">Profil</a></li>
    <li><a href="kontakt.html" class="nav-link">Kontakt</a></li>
    <li><a href="bedarfsanalyse.html" class="nav-cta">Bedarfsanalyse</a></li>
    <li class="lang-switch"><a href="datenschutz-en.html" class="lang-link">EN</a></li>
  </ul>
  <button class="nav-hamburger" aria-label="Menü öffnen" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
</nav>
<div class="nav-overlay" role="dialog" aria-modal="true" aria-label="Navigation">
  <a href="fokus.html" class="nav-link">Fokus</a>
  <a href="service.html" class="nav-link">Service</a>
  <a href="profil.html" class="nav-link">Profil</a>
  <a href="kontakt.html" class="nav-link">Kontakt</a>
  <a href="bedarfsanalyse.html" class="btn btn-outline">Bedarfsanalyse</a>
</div>

<main>
  <header class="page-header">
    <span class="label">Rechtliches</span>
    <h1>Datenschutzerklärung</h1>
    <p>Gemäß DSGVO (EU) 2016/679 und dem österreichischen Datenschutzgesetz (DSG 2018)</p>
  </header>

  <section class="section" style="max-width: 800px;">
    <div style="color: var(--secondary); line-height: 1.9; font-size: var(--sm-size);">

      <h2 style="font-size: 1.25rem; margin-bottom: 12px; margin-top: 48px; color: var(--text);">1. Verantwortliche</h2>
      <p>Verantwortliche im Sinne der DSGVO:</p>
      <p style="margin-top: 12px;"><strong style="color: var(--text);">Georalis Consulting GmbH</strong><br>
      Bruggraberweg 15<br>8344 Bad Gleichenberg<br>Österreich<br>
      ATU 82975158 · FN 671002v<br>
      E-Mail: <a href="mailto:office@georalis.at" style="color: var(--accent);">office@georalis.at</a><br>
      Tel: <a href="tel:+436606708331" style="color: var(--accent);">+43 660 670 83 31</a></p>

      <h2 style="font-size: 1.25rem; margin-bottom: 12px; margin-top: 48px; color: var(--text);">2. Erhobene Daten &amp; Zwecke</h2>
      <p><strong style="color: var(--text);">Kontaktformular (via Formspree)</strong><br>
      Wenn Sie das Kontaktformular auf georalis.at nutzen, werden die von Ihnen eingegebenen Daten (Name, E-Mail-Adresse, Nachricht) an den Drittanbieter Formspree, Inc. (USA) übermittelt und von dort an unsere E-Mail-Adresse weitergeleitet. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw. lit. f DSGVO (berechtigtes Interesse an Kommunikation). Formspree verarbeitet Daten gemäß seiner eigenen Datenschutzrichtlinie (formspree.io/legal/privacy-policy).</p>
      <p style="margin-top: 16px;"><strong style="color: var(--text);">Bedarfsanalyse-Formular</strong><br>
      Daten aus dem Bedarfsanalyse-Formular (Branche, Problembereich, Kontaktdaten) werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.</p>
      <p style="margin-top: 16px;"><strong style="color: var(--text);">Server-Logfiles (Cloudflare Pages)</strong><br>
      Beim Besuch der Website speichert Cloudflare, Inc. automatisch Logdaten (IP-Adresse, Browser, Betriebssystem, Uhrzeit, aufgerufene Seiten). Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO. Cloudflare agiert als Auftragsverarbeiter gemäß Art. 28 DSGVO.</p>

      <h2 style="font-size: 1.25rem; margin-bottom: 12px; margin-top: 48px; color: var(--text);">3. Cookies</h2>
      <p>Diese Website verwendet keine Tracking-Cookies und kein Analytics-Tool. Cloudflare Pages kann für Sicherheitszwecke technisch notwendige Cookies setzen.</p>

      <h2 style="font-size: 1.25rem; margin-bottom: 12px; margin-top: 48px; color: var(--text);">4. Speicherdauer</h2>
      <p>Kontaktanfragen und Bedarfsanalyse-Formulare werden gespeichert, solange sie für die Bearbeitung erforderlich sind, längstens 3 Jahre, sofern keine gesetzlichen Aufbewahrungspflichten gelten.</p>

      <h2 style="font-size: 1.25rem; margin-bottom: 12px; margin-top: 48px; color: var(--text);">5. Ihre Rechte</h2>
      <p>Sie haben nach der DSGVO folgende Rechte gegenüber uns: Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20), Widerspruch (Art. 21). Zur Ausübung Ihrer Rechte wenden Sie sich an <a href="mailto:office@georalis.at" style="color: var(--accent);">office@georalis.at</a>.</p>
      <p style="margin-top: 16px;">Sie haben zudem das Recht, bei der österreichischen Datenschutzbehörde Beschwerde einzulegen:<br>
      Österreichische Datenschutzbehörde, Barichgasse 40-42, 1030 Wien, <a href="mailto:dsb@dsb.gv.at" style="color: var(--accent);">dsb@dsb.gv.at</a></p>

      <h2 style="font-size: 1.25rem; margin-bottom: 12px; margin-top: 48px; color: var(--text);">6. Drittländer-Transfers</h2>
      <p>Formspree und Cloudflare sitzen in den USA. Die Übermittlung erfolgt auf Basis von Standarddatenschutzklauseln (Art. 46 Abs. 2 lit. c DSGVO) bzw. eines Angemessenheitsbeschlusses.</p>

      <p style="margin-top: 48px; color: var(--secondary); font-size: 0.75rem;">Stand: April 2026</p>
    </div>
  </section>
</main>

<footer class="footer" role="contentinfo">
  <div class="footer-grid">
    <div>
      <p class="footer-logo">Georalis</p>
      <p class="footer-tagline">Order in Motion.</p>
    </div>
    <div class="footer-col">
      <h4>Navigation</h4>
      <ul class="footer-links" role="list">
        <li><a href="fokus.html">Fokus</a></li>
        <li><a href="service.html">Service</a></li>
        <li><a href="profil.html">Profil</a></li>
        <li><a href="kontakt.html">Kontakt</a></li>
        <li><a href="bedarfsanalyse.html">Bedarfsanalyse</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Kontakt</h4>
      <div class="footer-contact">
        <p>Georgiana Bonas, EMBA<br>Founder &amp; Managing Director</p>
        <p style="margin-top:8px">Bruggraberweg 15<br>8344 Bad Gleichenberg</p>
        <p><a href="mailto:office@georalis.at">office@georalis.at</a></p>
        <p><a href="tel:+436606708331">+43 660 670 83 31</a></p>
        <p>Österreich</p>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2026 Georalis Consulting GmbH</p>
    <nav class="footer-legal" aria-label="Rechtliches">
      <a href="impressum.html">Impressum</a>
      <a href="datenschutz.html">Datenschutz</a>
      <a href="agb.html">AGB</a>
    </nav>
  </div>
</footer>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script src="main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Commit**
```bash
git add datenschutz.html
git commit -m "feat: add datenschutz.html (DSGVO)"
```

---

## TASK 19 — agb.html

**File:** Create `agb.html`

- [ ] **Step 1: Create the file**

Use the same nav/footer structure as datenschutz.html. `lang-switch` href = `#` (no English AGB). Content:

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex">
  <title>Allgemeine Geschäftsbedingungen — Georalis Consulting GmbH</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>

<nav class="nav" role="navigation" aria-label="Hauptnavigation">
  <a href="index.html" class="nav-logo">
    <span class="nav-logo-name">Georalis</span>
    <span class="nav-logo-slogan">Order in Motion</span>
  </a>
  <ul class="nav-links" role="list">
    <li><a href="fokus.html" class="nav-link">Fokus</a></li>
    <li><a href="service.html" class="nav-link">Service</a></li>
    <li><a href="profil.html" class="nav-link">Profil</a></li>
    <li><a href="kontakt.html" class="nav-link">Kontakt</a></li>
    <li><a href="bedarfsanalyse.html" class="nav-cta">Bedarfsanalyse</a></li>
  </ul>
  <button class="nav-hamburger" aria-label="Menü öffnen" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
</nav>
<div class="nav-overlay" role="dialog" aria-modal="true" aria-label="Navigation">
  <a href="fokus.html" class="nav-link">Fokus</a>
  <a href="service.html" class="nav-link">Service</a>
  <a href="profil.html" class="nav-link">Profil</a>
  <a href="kontakt.html" class="nav-link">Kontakt</a>
  <a href="bedarfsanalyse.html" class="btn btn-outline">Bedarfsanalyse</a>
</div>

<main>
  <header class="page-header">
    <span class="label">Rechtliches</span>
    <h1>Allgemeine Geschäftsbedingungen</h1>
    <p>Georalis Consulting GmbH · Stand April 2026</p>
  </header>

  <section class="section" style="max-width: 800px;">
    <div style="color: var(--secondary); line-height: 1.9; font-size: var(--sm-size);">

      <h2 style="font-size: 1.25rem; margin-bottom: 12px; margin-top: 0; color: var(--text);">§ 1 Geltungsbereich</h2>
      <p>Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Beratungsverträge zwischen der Georalis Consulting GmbH (nachfolgend „Auftragnehmer") und Unternehmen (nachfolgend „Auftraggeber") im Sinne des § 1 UGB. Abweichende Bedingungen des Auftraggebers gelten nur, wenn der Auftragnehmer diesen ausdrücklich schriftlich zugestimmt hat.</p>

      <h2 style="font-size: 1.25rem; margin-bottom: 12px; margin-top: 48px; color: var(--text);">§ 2 Leistungsumfang</h2>
      <p>Der Auftragnehmer erbringt Beratungsleistungen im Bereich Unternehmensberatung, Supply Chain Management, Global Trade &amp; Zoll sowie Organisations- und Prozessoptimierung. Der genaue Leistungsumfang ergibt sich aus dem jeweiligen Angebot bzw. der Auftragsbestätigung. Änderungen des Leistungsumfangs bedürfen der schriftlichen Vereinbarung.</p>

      <h2 style="font-size: 1.25rem; margin-bottom: 12px; margin-top: 48px; color: var(--text);">§ 3 Vergütung &amp; Zahlungsbedingungen</h2>
      <p>Die Vergütung richtet sich nach dem vereinbarten Angebot. Rechnungen sind innerhalb von 14 Tagen nach Rechnungsstellung ohne Abzug zu begleichen. Bei Zahlungsverzug werden Verzugszinsen gemäß § 456 UGB (8 Prozentpunkte über dem Basiszinssatz) berechnet. Alle Preise verstehen sich zuzüglich der gesetzlichen Umsatzsteuer.</p>

      <h2 style="font-size: 1.25rem; margin-bottom: 12px; margin-top: 48px; color: var(--text);">§ 4 Mitwirkungspflichten des Auftraggebers</h2>
      <p>Der Auftraggeber stellt alle für die Leistungserbringung erforderlichen Informationen, Daten und Ansprechpartner rechtzeitig zur Verfügung. Verzögerungen durch fehlende Mitwirkung des Auftraggebers berühren die Vertragspflichten des Auftragnehmers nicht und können zu Mehrvergütungsansprüchen führen.</p>

      <h2 style="font-size: 1.25rem; margin-bottom: 12px; margin-top: 48px; color: var(--text);">§ 5 Vertraulichkeit</h2>
      <p>Beide Parteien verpflichten sich, alle im Rahmen der Zusammenarbeit erhaltenen vertraulichen Informationen der jeweils anderen Partei vertraulich zu behandeln und Dritten gegenüber nicht offenzulegen. Diese Verpflichtung gilt auch nach Beendigung des Vertragsverhältnisses für die Dauer von 5 Jahren.</p>

      <h2 style="font-size: 1.25rem; margin-bottom: 12px; margin-top: 48px; color: var(--text);">§ 6 Haftung</h2>
      <p>Der Auftragnehmer haftet für Schäden nur bei Vorsatz und grober Fahrlässigkeit. Die Haftung für leichte Fahrlässigkeit ist, soweit gesetzlich zulässig, ausgeschlossen. Die Haftung ist der Höhe nach auf den Nettobetrag des jeweiligen Auftrags begrenzt. Für indirekte Schäden, entgangenen Gewinn oder Folgeschäden wird keine Haftung übernommen.</p>

      <h2 style="font-size: 1.25rem; margin-bottom: 12px; margin-top: 48px; color: var(--text);">§ 7 Urheberrecht &amp; Nutzungsrechte</h2>
      <p>Alle vom Auftragnehmer erstellten Konzepte, Berichte, Analysen und sonstigen Arbeitsergebnisse bleiben bis zur vollständigen Bezahlung der Vergütung Eigentum des Auftragnehmers. Nach vollständiger Bezahlung überträgt der Auftragnehmer dem Auftraggeber ein einfaches, nicht übertragbares Nutzungsrecht für interne Zwecke.</p>

      <h2 style="font-size: 1.25rem; margin-bottom: 12px; margin-top: 48px; color: var(--text);">§ 8 Vertragsdauer &amp; Kündigung</h2>
      <p>Projektverträge enden mit Abschluss der vereinbarten Leistungen. Laufende Rahmenverträge können von beiden Parteien mit einer Frist von 30 Tagen zum Monatsende schriftlich gekündigt werden. Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.</p>

      <h2 style="font-size: 1.25rem; margin-bottom: 12px; margin-top: 48px; color: var(--text);">§ 9 Anwendbares Recht &amp; Gerichtsstand</h2>
      <p>Es gilt österreichisches Recht unter Ausschluss des UN-Kaufrechts (CISG). Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit diesem Vertragsverhältnis ist Graz. Der Auftragnehmer behält sich vor, den Auftraggeber auch an seinem allgemeinen Gerichtsstand zu klagen.</p>

      <h2 style="font-size: 1.25rem; margin-bottom: 12px; margin-top: 48px; color: var(--text);">§ 10 Salvatorische Klausel</h2>
      <p>Sollten einzelne Bestimmungen dieser AGB unwirksam oder undurchführbar sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. Die unwirksame Bestimmung ist durch eine wirksame zu ersetzen, die dem wirtschaftlichen Zweck der unwirksamen Bestimmung am nächsten kommt.</p>

      <p style="margin-top: 48px; color: var(--secondary); font-size: 0.75rem;">Georalis Consulting GmbH · Bruggraberweg 15 · 8344 Bad Gleichenberg · ATU 82975158 · FN 671002v · Stand: April 2026</p>
    </div>
  </section>
</main>

<footer class="footer" role="contentinfo">
  <div class="footer-grid">
    <div>
      <p class="footer-logo">Georalis</p>
      <p class="footer-tagline">Order in Motion.</p>
    </div>
    <div class="footer-col">
      <h4>Navigation</h4>
      <ul class="footer-links" role="list">
        <li><a href="fokus.html">Fokus</a></li>
        <li><a href="service.html">Service</a></li>
        <li><a href="profil.html">Profil</a></li>
        <li><a href="kontakt.html">Kontakt</a></li>
        <li><a href="bedarfsanalyse.html">Bedarfsanalyse</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Kontakt</h4>
      <div class="footer-contact">
        <p>Georgiana Bonas, EMBA<br>Founder &amp; Managing Director</p>
        <p style="margin-top:8px">Bruggraberweg 15<br>8344 Bad Gleichenberg</p>
        <p><a href="mailto:office@georalis.at">office@georalis.at</a></p>
        <p><a href="tel:+436606708331">+43 660 670 83 31</a></p>
        <p>Österreich</p>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2026 Georalis Consulting GmbH</p>
    <nav class="footer-legal" aria-label="Rechtliches">
      <a href="impressum.html">Impressum</a>
      <a href="datenschutz.html">Datenschutz</a>
      <a href="agb.html">AGB</a>
    </nav>
  </div>
</footer>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script src="main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Commit**
```bash
git add agb.html
git commit -m "feat: add agb.html (Austrian consulting terms)"
```

---

## TASK 20 — English Main Pages (7 pages)

**Files:** Create `index-en.html`, `fokus-en.html`, `service-en.html`, `profil-en.html`, `kontakt-en.html`, `bedarfsanalyse-en.html`, `impressum-en.html`

**Pattern:** Identical structure to German counterpart. Nav links point to -en.html versions. Lang switcher points back to German. Footer legal links point to `datenschutz-en.html`, `agb.html`.

English nav structure (all EN pages):
```html
<ul class="nav-links" role="list">
  <li><a href="fokus-en.html" class="nav-link">Focus</a></li>
  <li><a href="service-en.html" class="nav-link">Services</a></li>
  <li><a href="profil-en.html" class="nav-link">About</a></li>
  <li><a href="kontakt-en.html" class="nav-link">Contact</a></li>
  <li><a href="bedarfsanalyse-en.html" class="nav-cta">Get Started</a></li>
  <li class="lang-switch"><a href="[DE_COUNTERPART]" class="lang-link lang-active">DE</a></li>
</ul>
```

English nav overlay:
```html
<div class="nav-overlay" role="dialog" aria-modal="true" aria-label="Navigation">
  <a href="fokus-en.html" class="nav-link">Focus</a>
  <a href="service-en.html" class="nav-link">Services</a>
  <a href="profil-en.html" class="nav-link">About</a>
  <a href="kontakt-en.html" class="nav-link">Contact</a>
  <a href="bedarfsanalyse-en.html" class="btn btn-outline">Get Started</a>
</div>
```

English footer:
```html
<footer class="footer" role="contentinfo">
  <div class="footer-grid">
    <div>
      <p class="footer-logo">Georalis</p>
      <p class="footer-tagline">Order in Motion.</p>
    </div>
    <div class="footer-col">
      <h4>Navigation</h4>
      <ul class="footer-links" role="list">
        <li><a href="fokus-en.html">Focus</a></li>
        <li><a href="service-en.html">Services</a></li>
        <li><a href="profil-en.html">About</a></li>
        <li><a href="kontakt-en.html">Contact</a></li>
        <li><a href="bedarfsanalyse-en.html">Get Started</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Contact</h4>
      <div class="footer-contact">
        <p>Georgiana Bonas, EMBA<br>Founder &amp; Managing Director</p>
        <p style="margin-top:8px">Bruggraberweg 15<br>8344 Bad Gleichenberg</p>
        <p><a href="mailto:office@georalis.at">office@georalis.at</a></p>
        <p><a href="tel:+436606708331">+43 660 670 83 31</a></p>
        <p>Austria</p>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2026 Georalis Consulting GmbH</p>
    <nav class="footer-legal" aria-label="Legal">
      <a href="impressum-en.html">Imprint</a>
      <a href="datenschutz-en.html">Privacy Policy</a>
      <a href="agb.html">Terms</a>
    </nav>
  </div>
</footer>
```

- [ ] **Step 1: Create index-en.html**

Translate index.html. Key content changes:
- `<html lang="en">`
- Meta description: "Georalis Consulting — Industrial excellence in Supply Chain Optimization, Manufacturing, and Global Trade. Order in Motion."
- Title: "Georalis Consulting GmbH — Industrial Excellence"
- Hero H1 words: "Industrial" / "Excellence." / "Measurable" / "Results."
- Hero subline: "Strategic consulting for industry, manufacturing and supply chain — from analysis to implementation."
- Strip items: "Industrial Transformation · Supply Chain Optimization · Production Excellence · Operational Excellence · Global Trade & Customs · ERP Transformation · End-to-End Supply Chain · Cost Optimization · Process Optimization · Engineering"
- Section label: "Focus Areas" / H2: "Four Fields. Industry in Focus."
- Card 1: label "01 — ERP & Digitalization" / h3 "Industrial Transformation" / p "ERP transformation, digital processes and operational realignment — we guide industrial companies through complex change with measurable results." / link "Learn more →"
- Card 2: label "02 — End-to-End Supply Chain" / h3 "Supply Chain & Logistics" / p "Opaque supply chains, high logistics costs, missing KPIs: we make your supply chain manageable — from procurement to delivery." / link "Learn more →"
- Card 3: label "03 — Production & Manufacturing" / h3 "Production & Process Optimization" / p "Inefficient production processes, material shortages, missing KPI structures: we optimize your production and sustainably increase operational excellence." / link "Learn more →"
- Card 4: label "04 — Customs & Foreign Trade" / h3 "Global Trade & Customs Optimization" / p "Making customs costs visible, leveraging preferences, building trade compliance — we manage your global trade processes strategically." / link "Learn more →"
- Models section label: "Consulting Models" / H2: "How We Work Together"
- Model 1: sub "Model 01" / h3 "Orientation" / p "Clarity before action. Short, focused engagement for situation assessment and strategic positioning."
- Model 2: sub "Model 02" / h3 "Stabilization" / p "Regain control. Crisis management, rapid stabilization and restoration of operational structures."
- Model 3: sub "Model 03" / h3 "Transformation" / p "Shape the future. Long-term guidance through change processes — from vision to implementation."
- Model 4: sub "Model 04" / h3 "Executive Retainer" / p "Strategic backing for leadership. Continuous strategic support for decision-makers at eye level."
- Stats: label 1 "Years of experience in industry & supply chain" / label 2 "Projects in DACH and internationally" / label 3 "Consulting models — tailored"
- Quote: "The purest form of insanity is to leave everything as it is and still hope that something will change."  attr: "— Albert Einstein"
- CTA H2: "Operational excellence begins with the right analysis."
- CTA buttons: "Start Assessment" / "Get in Touch"
- Focus card links: `fokus-en.html#transformation`, `fokus-en.html#supplychain`, `fokus-en.html#produktion`, `fokus-en.html#zoll`
- `lang-switch` href: `index.html`

- [ ] **Step 2: Create fokus-en.html**

Translate fokus.html. Key changes:
- `<html lang="en">`
- Meta: "Georalis Focus Areas: Industrial Transformation, Supply Chain & Logistics, Production Optimization, Global Trade & Customs — Order in Motion."
- Title: "Focus Areas — Georalis Consulting GmbH"
- Page header label: "Focus Areas" / H1: "Industry in Focus. Results That Matter." / p: "Specialized expertise for manufacturing, supply chain and global trade — measurable, actionable, sustainable."
- Sidebar title: "Contents"
- Sidebar links: "01 — Industrial Transformation" / "02 — Supply Chain & Logistics" / "03 — Production Optimization" / "04 — Global Trade & Customs"
- Section 01 h2: "Industrial Transformation" / sub: "ERP Transformation · Digitalization · Change Management" / translate all paragraphs and bullets
- Section 02 h2: "Supply Chain & Logistics" / sub: "End-to-End Supply Chain · Logistics Costs · Procurement" / translate all
- Section 03 h2: "Production & Process Optimization" / sub: "Operational Excellence · Lean Manufacturing · KPI Management" / translate all
- Section 04 h2: "Global Trade & Customs Optimization" / sub: "Customs Cost Optimization · Rules of Origin · Trade Compliance" / translate all
- Tags: translate all profil-tag texts
- Subpage links: point to -en.html versions (sc-logistik-en.html etc.)
- CTA H2: "Your Industrial Project. Our Expertise." / buttons: "Start Assessment" / "Schedule a Call"
- `lang-switch` href: `fokus.html`

- [ ] **Step 3: Create service-en.html**

Translate service.html maintaining identical structure. Key translations:
- Title: "Services — Georalis Consulting GmbH"
- Page header: label "Services" / H1 from German translation
- Service card titles: "Orientation" / "Stabilization" / "Transformation" / "Executive Retainer"
- Service card subs translate directly
- Comparison table headers and rows translate directly
- `lang-switch` href: `service.html`

- [ ] **Step 4: Create profil-en.html**

Translate profil.html. Key translations:
- Title: "About — Georalis Consulting GmbH"
- Page header: label "About" / H1 translation
- Initials section stays as "GB"
- Name/title: "Georgiana Bonas, EMBA" / "Founder & Managing Director"
- All bio paragraphs translated to English
- All profil-tags translated
- Timeline items translated
- `lang-switch` href: `profil.html`

- [ ] **Step 5: Create kontakt-en.html**

Translate kontakt.html:
- Title: "Contact — Georalis Consulting GmbH"
- Page header: label "Contact" / H1 translation
- Form labels: "Name" / "Company" / "Email" / "Phone" (optional) / "Message" / "Send Message"
- Contact details labels: "Email" / "Phone" / "Address"
- Banner text translated
- `lang-switch` href: `kontakt.html`

- [ ] **Step 6: Create bedarfsanalyse-en.html**

Translate bedarfsanalyse.html:
- Title: "Needs Assessment — Georalis Consulting GmbH"
- Step labels: "Situation" / "Challenge" / "Contact"
- Step 1 title: "Your Starting Point" / subtitle: "Help us understand your current situation."
- All radio/checkbox options translated
- Step 2 title: "Your Core Challenge" / subtitle translation
- Step 3 title: "Your Contact Details"
- Form labels translated
- Button labels: "Next" / "Back" / "Submit"
- `lang-switch` href: `bedarfsanalyse.html`

- [ ] **Step 7: Create impressum-en.html**

- Title: "Imprint — Georalis Consulting GmbH"
- Page header: label "Legal" / H1: "Imprint"
- Translate all imprint content to English (company data stays in German format per Austrian law requirement, but surrounding text in English)
- `lang-switch` href: `impressum.html`

- [ ] **Step 8: Create datenschutz-en.html**

Translate datenschutz.html:
- Title: "Privacy Policy — Georalis Consulting GmbH"
- All section headings and content translated to English
- Legal references adapted (GDPR instead of DSGVO, Austrian Data Protection Authority translated)
- `lang-switch` href: `datenschutz.html`

- [ ] **Step 9: Commit all 8 files**
```bash
git add index-en.html fokus-en.html service-en.html profil-en.html kontakt-en.html bedarfsanalyse-en.html impressum-en.html datenschutz-en.html
git commit -m "feat: add English versions of all main pages"
```

---

## TASK 21 — English Landing Pages (15 pages)

**Files:** Create all 15 `-en.html` LP pages

**Pattern:** Identical HTML structure to German LP template (sc-logistik.html). Use English nav/footer from Task 20. `lang-switch` href points to German counterpart (e.g., `sc-logistik.html`).

- [ ] **Step 1: Create all 15 English LP files using translated content**

| DE File | EN File | EN Meta Title | EN H1 | EN Subline | EN Keywords | EN Problems (title / text) | EN Results (title / text) | EN CTA H2 |
|---|---|---|---|---|---|---|---|---|
| sc-logistik.html | sc-logistik-en.html | Reduce Logistics Costs & Optimize Transport — Georalis | Understand, control and systematically reduce logistics costs – instead of just accepting them | Many industrial companies overpay for logistics — without knowing exactly how much. We make your transport costs visible and reduce them structurally. | Reduce logistics costs · Optimize transport costs · Freight cost analysis · Industrial logistics processes | 1. No cost transparency / Logistics costs are spread across many carriers, contracts and cost centers — a reliable overview is missing. · 2. Lack of bundling / Many individual carrier contracts, no volume effect, no strategic negotiating position. · 3. Poor route planning / Unnecessary transports, wrong modes, no consolidation — cost potential remains permanently untapped. · 4. No KPI management / Logistics performance is not measured — errors, delays and extra costs surface too late. | 1. Cost Analysis & Transparency / Full breakdown of your logistics costs by carrier, route and product group — savings potential of 20–35% is typical. · 2. Structured Cost Reduction / Transport bundling, renegotiation and route optimization — with measurable results in 60–90 days. · 3. KPI Management / Dashboards and metrics for daily logistics control — not annual analysis. · 4. Implementation Support / We support not just the analysis but the implementation — until changes are anchored in your system. | Your logistics costs hold more potential than you think. |
| sc-einkauf.html | sc-einkauf-en.html | Optimize Procurement & Reduce Material Costs — Georalis | Make material costs visible and systematically reduce them – not just negotiate | Prices have grown historically, suppliers are barely comparable, costs are opaque. We analyze your procurement structure and reduce material costs sustainably. | Optimize procurement industry · Reduce procurement costs · Strategic sourcing · Supplier management | 1. Historically grown prices / Prices were never systematically challenged — no market comparison, no benchmarks. · 2. No comparability / Same material, different prices per plant or period — without traceable reason. · 3. Too many suppliers / Many individual suppliers, no bundling effect, high administrative overhead. · 4. Missing transparency / Which material groups drive which costs? Nobody knows precisely. | 1. Material Cost Transparency / Full view of your procurement structure by commodity groups, suppliers and plants. · 2. Systematic Cost Reduction / Supplier consolidation, price benchmarking, strategic renegotiation — not a one-off project, but a system. · 3. Optimize Supplier Base / Fewer, stronger supplier relationships with clear criteria and evaluations. · 4. Build Strategic Procurement / From reactive ordering to proactive procurement management with clear processes. | Your material costs carry more potential than you see. |
| sc-planung.html | sc-planung-en.html | Optimize Supply Chain Planning — Inventory Optimization & MRP — Georalis | Make supply chains manageable – instead of just reacting to problems | Too much inventory and material shortages at the same time — that is not a coincidence, it is a planning problem. We solve it systematically. | Inventory optimization · Improve planning & scheduling · Optimize production planning · MRP / ERP planning | 1. Inventory and shortages simultaneously / Too much stock of the wrong material while running out of the right one — both problems at once. · 2. Planning does not work / Reorder rules are outdated, safety stocks are arbitrary, MRP delivers poor suggestions. · 3. Excel instead of system control / Planning runs on Excel spreadsheets instead of systemically — error-prone, time-consuming, not scalable. · 4. No manageability / Without clear KPIs, nobody knows whether planning is good or bad. | 1. Stabilize Planning Processes / Root cause analysis for shortages and overstock — with concrete actions, not just diagnosis. · 2. Use ERP / MRP Properly / Your systems can do more — we ensure planning and scheduling are managed systemically. · 3. Reduce Inventory / Target stock calculation, safety stock optimization — with immediate cash impact. · 4. KPI-based Control / On-time delivery, coverage, shortage rate — measurable and manageable. | Planning problems are solvable — when tackled at the root. |
| zoll-kosten.html | zoll-kosten-en.html | Optimize Customs Costs & Reduce Import Costs — Georalis | Make customs costs visible and manage them strategically – instead of just paying them | Wrong tariff numbers, unused preferences, no cost transparency — many industrial companies pay more customs than necessary. We analyze and optimize systematically. | Optimize customs costs · Reduce import costs · TARIC analysis · Tariff number optimization | 1. Wrong tariff numbers / Tariff numbers were assigned once and never reviewed — errors mean extra costs and liability risks. · 2. No cost transparency / Total import costs (customs, VAT, handling) are not clearly summarized anywhere. · 3. Preferences unused / Free trade agreements exist but are not systematically applied. · 4. Risk from incorrect declaration / Incorrect declarations can lead to retroactive assessments, fines and customs audits. | 1. TARIC Analysis & Optimization / Review of all tariff numbers for correctness and potential — typical savings 15–40%. · 2. Import Cost Transparency / Full view of actual import costs: customs, VAT, storage fees, handling costs. · 3. Preference Utilization / Identification and activation of all available free trade agreements — across Europe and globally. · 4. Risk Minimization / Correct declaration, internal processes and documentation standards to avoid audits. | Customs is not a fixed cost block — it is manageable. |
| zoll-incoterms.html | zoll-incoterms-en.html | Optimize Incoterms — Design Delivery Conditions Strategically — Georalis | Design delivery terms so that you regain control over costs, risk and operations | EXW means: your supplier decides on transport, customs and costs — and you only see the invoice. We help you regain control. | Incoterms optimization · EXW vs DDP costs · International delivery terms · Transport and customs responsibility | 1. EXW without cost control / Supplier arranges transport — you bear costs and risk but have no operational control. · 2. Wrong risk transfer / Risk transfer and actual cost bearing are out of sync in many contracts. · 3. Transport and customs unmanageable / Buying EXW means losing the ability to choose your own carrier and customs agent. · 4. Hidden costs / Transport and customs costs are hidden in supplier prices — not negotiable, not transparent. | 1. Incoterms Audit / Analysis of your delivery terms: who bears costs, risk and responsibility — does it align with your contracts? · 2. Optimized Delivery Structure / Clear Incoterms strategy recommendation per trading partner and product group. · 3. Regain Cost Control / Structured transition from EXW to DAP, CIP or DDP — with full cost transparency. · 4. Contract Adjustment & Implementation / Support for contract changes and implementation of new delivery terms. | Your delivery terms determine who is actually in control. |
| zoll-ursprung.html | zoll-ursprung-en.html | Leverage Rules of Origin & Save Customs Duties — Georalis | Avoid customs duties by strategically managing your supply chain | Companies that do not use free trade agreements pay duties that others do not pay. We calculate, structure and integrate preferential origin into your supply chain. | Preferential origin · Use free trade agreements · Calculate rules of origin · Save customs duties on export | 1. Origin unclear / Nobody knows exactly what preferential origin your products have — or whether it is provable. · 2. Supply chain not aligned / Sourcing decisions are made without considering origin implications. · 3. Supplier declarations missing / Supplier declarations do not exist, are outdated or do not cover all materials. · 4. Origin not in ERP / Origin calculations are done manually in Excel — not scalable, error-prone. | 1. Origin Analysis / Calculation of preferential origin for all relevant product groups under current regulations and agreements. · 2. Align Supply Chain / Strategic sourcing adjustments to meet origin requirements — with measurable customs savings. · 3. Supplier Declarations / Build a complete system for obtaining, verifying and archiving supplier declarations. · 4. ERP Integration / Anchor origin and preference systemically in SAP, Oracle or your ERP — not as manual post-calculation. | Free trade agreements apply. But only if you use them. |
| zoll-compliance.html | zoll-compliance-en.html | Build Trade Compliance — Export Control & CBAM — Georalis | Turn compliance from an obligation into a manageable system | CBAM, EUDR, export controls — new regulations catch companies unprepared. We help you establish compliance as a working system — not a checklist. | Trade compliance · Export controls · CBAM / EUDR · Customs audit preparation | 1. No clear responsibility / Compliance topics belong to nobody — everyone is somehow responsible, nobody truly accountable. · 2. New regulations not integrated / CBAM, EUDR, sanctions lists — many companies do not know how affected they are. · 3. Customs audits arrive unprepared / Documentation, processes and systems are not audit-ready — high risk during inspections. · 4. Systems present but misused / SAP GTS, Oracle GTM, AEB — in place but not strategically utilized. | 1. Build Compliance Structure / Clear responsibilities, processes and internal controls — as a system, not a checklist. · 2. Integrate Regulations / CBAM, EUDR, export controls — impact assessment and integration into your processes. · 3. Audit Preparation / Systematic preparation for customs audits: documentation, processes, internal audits — before the inspector arrives. · 4. Optimize System Use / SAP GTS, Oracle GTM, AEB — manage strategically, not just administratively. | Compliance risks are manageable — when you know them. |
| org-governance.html | org-governance-en.html | Improve Governance & Decision-Making Structures — Georalis | Clear decisions instead of endless alignment loops | When everything goes through meetings and nobody decides anyway, the problem is not the people — it is the missing structures. We build them. | Governance structure company · Improve decision-making processes · Define responsibilities · RACI matrix | 1. Nobody decides / Decisions are prepared, discussed, postponed — but not made. · 2. Everything goes through meetings / Every decision needs a meeting, every meeting a follow-up. · 3. Responsibilities unclear / Everyone is somewhat responsible for everything — nobody truly accountable. · 4. Alignment loops / Simple operational decisions require multiple hierarchy levels. | 1. Clarify Decision Structure / Clear RACI matrix: who decides what — without alignment loops and endless meetings. · 2. Governance Framework / Practical structures that work in your company — not theoretical, but lived. · 3. Faster Decisions / Measurably shorter decision times through clear processes and escalation paths. · 4. Implementation Support / We accompany the introduction of new structures until they are anchored in the organization. | Who decides faster gains operational speed. |
| org-kpi.html | org-kpi-en.html | Build KPI System & Performance Management — Georalis | Create transparency and make your company manageable | Data exists everywhere — but there is no decision basis. We build KPI systems that are actually used for control. | KPI reporting company · Performance management · Control models · KPI dashboard | 1. Numbers without control / Reports exist but nobody derives actions from them — data only documents the past. · 2. Different data sources / Every department has its own number — which one to trust is unclear. · 3. No decision basis / Strategy and operational control are not connected — no shared picture of the situation. · 4. Reporting overhead / Too many reports, too much effort, too little management impact. | 1. Develop KPI System / Relevant metrics for your business areas — aligned with strategy, processes and decision levels. · 2. Harmonize Data Basis / One number, one understanding — consistent across all systems and departments. · 3. Build Reporting Structure / Dashboards and reports that enable decisions — not just document the past. · 4. Performance Management / Steering routines that actually lead to actions. | Control begins with clarity — about the right metrics. |
| org-change.html | org-change-en.html | Change Management & Transformation Implementation — Georalis | Implement transformation instead of just planning it | Most transformation projects fail not at strategy, but at execution. We guide companies through change — until new ways of working actually function. | Business transformation · Change management implementation · Organizational restructuring · Change management | 1. Resistance in the team / Changes meet rejection — the reasons are not addressed. · 2. No clear direction / Why are we changing? The answer is unclear — at all levels. · 3. Transformation stalls / Projects start with energy and get lost in planning loops or pilots. · 4. Old patterns return / Without anchoring, organizations revert to old habits — transformation evaporates. | 1. Create Clarity / A clear direction, communicated understandably at all organizational levels. · 2. Address Resistance / Systematic analysis of resistance patterns and targeted measures — without losing momentum. · 3. Structure Implementation / Project structure, milestones and steering rhythms that make transformation achievable. · 4. Anchor Change / New structures and processes anchored in the organization — so that change sticks. | Transformation succeeds when execution and direction align. |
| stab-silos.html | stab-silos-en.html | Break Down Silos & Improve Cross-Functional Collaboration — Georalis | Why your departments work against each other – instead of together | When procurement, logistics and production each optimize for themselves, the overall company loses. We analyze causes and build structures for genuine collaboration. | Break down silo thinking · Improve collaboration in companies · Solve interface problems · Cross-functional collaboration | 1. Procurement vs. Logistics vs. Production / Each department optimizes for itself — the overall result suffers. · 2. Blame instead of solutions / When problems occur, the other department is blamed — not the issue solved. · 3. No end-to-end view / Nobody has a complete picture of the process — only their own section. · 4. Conflicting departmental goals / Department objectives are misaligned — what benefits procurement hurts logistics. | 1. Analyze Conflict Causes / Identification of silo conflict root causes: incentives, goal conflicts, missing processes. · 2. Define Shared Goals / Cross-functional KPIs that foster collaboration instead of creating barriers. · 3. Clarify Interface Processes / Clear handoffs, responsibilities and communication routines between departments. · 4. End-to-End View / Management across departmental boundaries — from order to delivery. | Collaboration does not emerge from appeals — but from structure. |
| stab-schnittstellen.html | stab-schnittstellen-en.html | Optimize Process Interfaces & Design End-to-End Processes — Georalis | Processes only work when interfaces work | Information losses, duplicate work and delays almost always occur at handoff points between departments and systems. We clarify and structure these interfaces. | End-to-end processes · Optimize process interfaces · Value stream mapping · Improve handoffs | 1. Handoffs fail / Information is lost when responsibility changes — regularly and systematically. · 2. Information losses / What one department knows does not reach the next one completely. · 3. Duplicate work / The same data is entered multiple times — in different systems by different people. · 4. No clear responsibility / At interfaces, it is unclear who is responsible — problems fall through every net. | 1. Value Stream Mapping / Full visualization of your process flows — information, material, decisions — and identification of breaks. · 2. Redefine Interfaces / Clear handoff processes with documented requirements, responsibilities and escalation paths. · 3. Eliminate Information Losses / Standardized communication and system integration — no duplicate data entry. · 4. Process Ownership / End-to-end process owners who manage across departmental boundaries. | Well-designed interfaces are a competitive advantage. |
| sys-automatisierung.html | sys-automatisierung-en.html | Process Automation & Digital Workflows for Industry — Georalis | Eliminate manual processes and increase efficiency | Excel lists, manual email forwards, manual data entry — these processes cost time daily, create errors and block growth. We replace them systematically. | Process automation · Digital workflows · Efficiency improvement systems · Replace Excel in industry | 1. Manual Excel processes / Core processes run on Excel — time-consuming, error-prone, not scalable. · 2. High error rate / Manual data entry creates errors — which surface late and expensively. · 3. Time lost / Employees spend hours on tasks that systems could handle. · 4. No overview / Process status is only known by asking — no automatic information flow. | 1. Process Assessment & Prioritization / Capture of manual processes and prioritization by effort, error rate and automation potential. · 2. Digital Workflows / Step-by-step replacement of Excel and email by system-supported, automated processes. · 3. Reduce Error Rate / Systemic controls instead of manual checks — fewer errors, more reliability. · 4. Fast Implementation / First automations live in 4–8 weeks — visible progress, not endless planning. | Every manual process is a solvable problem. |
| sys-daten.html | sys-daten-en.html | KPI Dashboard & Data Analytics for Industry — Georalis | Translate data into decisions | Data exists — but nobody can use it for control. Every department has different numbers, no shared picture, no decision basis. We change that. | KPI dashboard company · Data analytics industry · Reporting systems · Business intelligence industry | 1. Data without usability / Data is collected but not used — missing preparation and context. · 2. Different numbers / Every department calculates with different values — who is right? · 3. No decision basis / Data documents the past instead of enabling decisions. · 4. Reporting overhead / Too many manual reports, too much effort, too little management impact. | 1. Develop Data Strategy / Definition of relevant KPIs and data sources — aligned with your decision processes. · 2. Unified Data Basis / One truth, one system, one number — consistent across all departments. · 3. Dashboard & Reporting / Operational and strategic dashboards that are used daily — no overhead, pure control. · 4. Strengthen Decision Culture / From gut feeling to data-driven decision-making — with appropriate steering routines. | Data that does not control is only cost. |
| sys-integration.html | sys-integration-en.html | System Integration & ERP Interfaces — Georalis | Connect systems instead of operating isolated solutions | ERP, WMS, CRM, MES — many systems, little connection. Data is maintained multiple times, media breaks create errors, and nobody has a complete picture. We connect what belongs together. | System integration · Optimize interfaces · ERP data integration · Eliminate media breaks | 1. Systems do not communicate / Data does not flow automatically between systems — manual transfers are the standard. · 2. Multiple data maintenance / The same data is maintained separately in three systems — inconsistencies included. · 3. Media breaks / Information is exported from one system and manually entered into the next. · 4. No complete picture / Because systems are not integrated, nobody has a complete, current view of the business. | 1. Interface Analysis / Assessment of your system landscape and identification of media breaks, duplicate entries and gaps. · 2. Integration Concept / Clear architecture: which systems need to communicate how — with what priority. · 3. Implementation Support / Accompany technical implementation and ensure integrations are actually used. · 4. Reduce Data Maintenance / One data record, one system — no multiple entry, no inconsistencies. | Integrated systems are the foundation for operational excellence. |

- [ ] **Step 2: Commit all 15 English LP files**
```bash
git add sc-logistik-en.html sc-einkauf-en.html sc-planung-en.html zoll-kosten-en.html zoll-incoterms-en.html zoll-ursprung-en.html zoll-compliance-en.html org-governance-en.html org-kpi-en.html org-change-en.html stab-silos-en.html stab-schnittstellen-en.html sys-automatisierung-en.html sys-daten-en.html sys-integration-en.html
git commit -m "feat: add 15 English SEO landing pages"
```

---

## Self-Review

**Spec coverage check:**
- ✅ AUFGABE 0: Color system overhaul → Task 1
- ✅ AUFGABE 1: 15 German LP pages → Tasks 3–16
- ✅ AUFGABE 2: fokus.html subpage links → Task 17
- ✅ AUFGABE 3: datenschutz.html + agb.html + footer fixes → Tasks 2, 18, 19
- ✅ AUFGABE 4: English versions (all 7 main + 15 LP + datenschutz-en) → Tasks 20, 21
- ✅ DE/EN language switcher on all pages
- ✅ No photo of Georgiana Bonas
- ✅ No mention of Mittelstand, Familienunternehmen, Public Sector
- ✅ No Google Business Profile
- ✅ All footer # links replaced

**Constraints verified:**
- All internal links functional (German pages link to German, EN to EN)
- Formspree mentioned in datenschutz.html
- Gerichtsstand Graz in agb.html
- ATU 82975158, FN 671002v in datenschutz.html
- Mobile-first (lp-hero responsive, problem-grid responsive)
- Gold accent used only for borders/lines, never as fill or button color
