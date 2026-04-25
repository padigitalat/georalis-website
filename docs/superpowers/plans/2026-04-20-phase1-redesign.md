# Georalis Phase 1 Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign bestehende Seiten auf Industrie-Fokus: neues Farbsystem (Petrol + Gold), neuer Slogan, 4 neue Fokus-Bereiche, Profil-Seite entpersonalisieren.

**Architecture:** Alle Änderungen in bestehenden statischen HTML/CSS-Dateien — kein Build-System, keine Dependencies. CSS-Variablen in `styles.css` steuern das gesamte Farbsystem. Jede HTML-Seite ist eigenständig mit eigenem Nav/Footer.

**Tech Stack:** HTML5, CSS3 (Custom Properties), Vanilla JS (main.js — keine Änderungen nötig), GSAP via CDN

---

## File Map

| Datei | Was ändert sich |
|---|---|
| `styles.css` | CSS-Variablen: Petrol + Gold hinzufügen, Accent + Border anpassen |
| `index.html` | Hero, Strip, 4 Fokus-Karten, Footer-Tagline, Meta |
| `fokus.html` | Sidebar-Nav, 4 Fokus-Sektionen komplett neu, Meta |
| `profil.html` | Gesamter Main-Content ersetzt (kein Bio/Timeline), Meta |
| `service.html` | Beschreibungen auf Industrie-Fokus anpassen, Meta |
| `kontakt.html` | Meta-Description anpassen |
| `bedarfsanalyse.html` | Meta-Description anpassen |
| `impressum.html` | Keine Änderungen |

---

## Task 1: CSS Farbsystem — Petrol & Gold

**Files:**
- Modify: `styles.css:8-36`

- [ ] **Schritt 1: CSS-Variablen erweitern**

Ersetze den `:root`-Block (Zeilen 8–36) mit:

```css
:root {
  --bg:           #0A0A0A;
  --surface:      #111111;
  --border:       #C8A96A;
  --text:         #FFFFFF;
  --secondary:    #888888;
  --accent:       #005F6A;
  --accent-dark:  #003F47;
  --gold:         #C8A96A;
  --cta-bg:       #005F6A;
  --cta-text:     #FFFFFF;

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

- [ ] **Schritt 2: Nav-Logo & CTA Farbe**

Finde `.nav-cta` in styles.css und stelle sicher dass background: var(--accent) verwendet wird (statt #FFF auf #000). Suche nach `.nav-cta` und update:

```css
.nav-cta {
  background: var(--accent);
  color: var(--text);
  /* rest bleibt gleich */
}
```

- [ ] **Schritt 3: CTA-Button Primär**

Suche `.btn-primary` und update:

```css
.btn-primary {
  background: var(--accent);
  color: #FFFFFF;
  border: 1px solid var(--accent);
}
.btn-primary:hover {
  background: var(--accent-dark);
  border-color: var(--accent-dark);
}
```

- [ ] **Schritt 4: SVG-Strokes auf Gold anpassen (index.html Hero-SVG)**

In `index.html` Zeilen 54–82: Ersetze alle `stroke="#222222"`, `stroke="#1E1E1E"`, `stroke="#1A1A1A"`, `stroke="#181818"`, `stroke="#282828"`, `stroke="#333333"` im Hero-SVG mit `stroke="#C8A96A"` (mit opacity 0.3–0.5 für subtile Wirkung). Und fill-Farben der Rects von `#2A2A2A`/`#282828`/`#1E1E1E` auf `#C8A96A`.

- [ ] **Schritt 5: Visuell prüfen**

Öffne `index.html` im Browser. Erwartung: Borders/Linien gold, Buttons petrol, Logo petrol-farbig.

---

## Task 2: Slogan "Order in Motion" — alle Seiten

**Files:**
- Modify: `index.html`, `fokus.html`, `service.html`, `profil.html`, `kontakt.html`, `bedarfsanalyse.html`

- [ ] **Schritt 1: Nav-Logo Slogan in index.html**

Zeile 16 in index.html — ersetze:
```html
<a href="index.html" class="nav-logo">Georalis</a>
```
mit:
```html
<a href="index.html" class="nav-logo">
  <span class="nav-logo-name">Georalis</span>
  <span class="nav-logo-slogan">Order in Motion</span>
</a>
```

- [ ] **Schritt 2: CSS für Logo-Slogan (styles.css)**

Finde `.nav-logo` in styles.css und ersetze:
```css
.nav-logo {
  font-family: var(--serif);
  font-size: 1.25rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  display: flex;
  flex-direction: column;
  line-height: 1.1;
  gap: 1px;
}
.nav-logo-name {
  font-family: var(--serif);
  font-size: 1.25rem;
  font-weight: 400;
  letter-spacing: 0.05em;
}
.nav-logo-slogan {
  font-family: var(--sans);
  font-size: 0.6rem;
  font-weight: 300;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  opacity: 0.8;
}
```

- [ ] **Schritt 3: Footer-Tagline auf allen Seiten**

In `index.html`, `fokus.html`, `service.html`, `profil.html`, `kontakt.html`, `bedarfsanalyse.html` — suche jeweils:
```html
<p class="footer-tagline">Wandel. Stabilität. Wirkung.</p>
```
und ersetze mit:
```html
<p class="footer-tagline">Order in Motion.</p>
```

- [ ] **Schritt 4: Gleiche Nav-Logo Struktur in alle anderen HTML-Seiten**

Wiederhole Schritt 1 für `fokus.html`, `service.html`, `profil.html`, `kontakt.html`, `bedarfsanalyse.html`, `impressum.html` — jede hat `<a href="index.html" class="nav-logo">Georalis</a>`, alle ersetzen mit der neuen Struktur (Schritt 1).

- [ ] **Schritt 5: Visuell prüfen**

Browser: Jede Seite aufrufen. Erwartung: Logo zeigt "Georalis" mit "ORDER IN MOTION" in gold darunter, Footer sagt "Order in Motion."

---

## Task 3: index.html — Hero & Strip aktualisieren

**Files:**
- Modify: `index.html`

- [ ] **Schritt 1: Hero Headline & Subline**

Ersetze Zeilen 42–50 (hero-headline + hero-subline):
```html
<h1 class="hero-headline">
  <span class="word">Industrielle</span>
  <span class="word">Exzellenz.</span>
  <span class="word">Messbare</span>
  <span class="word">Ergebnisse.</span>
</h1>
<p class="hero-subline">Strategische Beratung für Industrie, Manufacturing und Supply Chain — von der Analyse bis zur Umsetzung.</p>
```

- [ ] **Schritt 2: Meta-Description**

Zeile 6 ersetzen:
```html
<meta name="description" content="Georalis Consulting — Industrielle Transformation, Supply Chain Optimierung, Produktionsoptimierung und Global Trade. Order in Motion.">
```

- [ ] **Schritt 3: Credibility Strip**

Ersetze beide `.strip-content` Blöcke (Zeilen 94–117) — beide identisch:
```html
<div class="strip-content">
  <span class="strip-item">Industrielle Transformation</span><span class="strip-sep">·</span>
  <span class="strip-item">Supply Chain Optimierung</span><span class="strip-sep">·</span>
  <span class="strip-item">Produktionsoptimierung</span><span class="strip-sep">·</span>
  <span class="strip-item">Operative Exzellenz</span><span class="strip-sep">·</span>
  <span class="strip-item">Global Trade & Zoll</span><span class="strip-sep">·</span>
  <span class="strip-item">ERP Transformation</span><span class="strip-sep">·</span>
  <span class="strip-item">End-to-End Supply Chain</span><span class="strip-sep">·</span>
  <span class="strip-item">Kostenoptimierung</span><span class="strip-sep">·</span>
  <span class="strip-item">Prozessoptimierung Produktion</span><span class="strip-sep">·</span>
  <span class="strip-item">Maschinenbau</span><span class="strip-sep">·</span>
</div>
```

- [ ] **Schritt 4: 4 Fokus-Karten neu**

Ersetze den gesamten `.focus-grid` Block (Zeilen 127–170):
```html
<div class="focus-grid">

  <article class="focus-card reveal">
    <span class="focus-num" aria-hidden="true">01</span>
    <div class="focus-card-inner">
      <span class="label">01 — ERP & Digitalisierung</span>
      <h3>Industrielle Transformation</h3>
      <p>ERP-Transformation, digitale Prozesse und operative Neuausrichtung — wir begleiten Industrieunternehmen durch komplexe Veränderungen mit messbaren Ergebnissen.</p>
      <a href="fokus.html#transformation" class="arrow-link">Mehr erfahren →</a>
    </div>
  </article>

  <article class="focus-card reveal">
    <span class="focus-num" aria-hidden="true">02</span>
    <div class="focus-card-inner">
      <span class="label">02 — End-to-End Supply Chain</span>
      <h3>Supply Chain & Logistik</h3>
      <p>Intransparente Lieferketten, hohe Logistikkosten, fehlende KPIs: Wir machen Ihre Supply Chain steuerbar — von der Beschaffung bis zur Auslieferung.</p>
      <a href="fokus.html#supplychain" class="arrow-link">Mehr erfahren →</a>
    </div>
  </article>

  <article class="focus-card reveal">
    <span class="focus-num" aria-hidden="true">03</span>
    <div class="focus-card-inner">
      <span class="label">03 — Produktion & Fertigung</span>
      <h3>Produktions- & Prozessoptimierung</h3>
      <p>Ineffiziente Produktionsprozesse, Materialengpässe, fehlende KPI-Strukturen: Wir optimieren Ihre Produktion und steigern die operative Exzellenz nachhaltig.</p>
      <a href="fokus.html#produktion" class="arrow-link">Mehr erfahren →</a>
    </div>
  </article>

  <article class="focus-card reveal">
    <span class="focus-num" aria-hidden="true">04</span>
    <div class="focus-card-inner">
      <span class="label">04 — Zoll & Außenwirtschaft</span>
      <h3>Global Trade & Zolloptimierung</h3>
      <p>Zollkosten sichtbar machen, Präferenzen nutzen, Trade Compliance aufbauen — wir steuern Ihre globalen Handelsprozesse strategisch und systematisch.</p>
      <a href="fokus.html#zoll" class="arrow-link">Mehr erfahren →</a>
    </div>
  </article>

</div>
```

- [ ] **Schritt 5: Section-Header Text**

Zeile 125 — ersetze:
```html
<h2 id="fokus-heading">Vier Felder. Ein Ziel.</h2>
```
mit:
```html
<h2 id="fokus-heading">Vier Felder.<br>Industrie im Fokus.</h2>
```

- [ ] **Schritt 6: CTA-Section**

Zeile 256 — ersetze:
```html
<h2 class="reveal" id="cta-heading">Transformation beginnt mit Klarheit.</h2>
```
mit:
```html
<h2 class="reveal" id="cta-heading">Operative Exzellenz beginnt mit der richtigen Analyse.</h2>
```

- [ ] **Schritt 7: Visuell prüfen**

Browser: index.html aufrufen. Erwartung: Neuer Hero-Text, Strip mit Industrie-Keywords, 4 neue Fokus-Karten.

---

## Task 4: fokus.html — 4 neue Industrie-Sektionen

**Files:**
- Modify: `fokus.html`

- [ ] **Schritt 1: Page-Header & Meta**

Zeile 6 (meta description):
```html
<meta name="description" content="Georalis Fokus: Industrielle Transformation, Supply Chain & Logistik, Produktionsoptimierung, Global Trade & Zoll — Order in Motion.">
```

Zeile 38–41 (page-header):
```html
<header class="page-header reveal">
  <span class="label">Schwerpunkte</span>
  <h1>Industrie im Fokus.<br>Ergebnisse die zählen.</h1>
  <p>Spezialisierte Expertise für Manufacturing, Supply Chain und globalen Handel — messbar, umsetzbar, nachhaltig.</p>
</header>
```

- [ ] **Schritt 2: Sidebar-Navigation**

Ersetze Zeilen 49–53:
```html
<span class="fokus-nav-link active" data-target="0">01 — Industrielle Transformation</span>
<span class="fokus-nav-link" data-target="1">02 — Supply Chain & Logistik</span>
<span class="fokus-nav-link" data-target="2">03 — Produktionsoptimierung</span>
<span class="fokus-nav-link" data-target="3">04 — Global Trade & Zoll</span>
```

- [ ] **Schritt 3: Sektion 01 — Industrielle Transformation**

Ersetze die gesamte Sektion `id="transformation"` (Zeilen 60–87):
```html
<section class="fokus-section reveal" id="transformation" aria-labelledby="fokus1-heading">
  <div class="fokus-content">
    <span class="fokus-num-large" aria-hidden="true">01</span>
    <h2 id="fokus1-heading">Industrielle Transformation</h2>
    <span class="fokus-sub">ERP Transformation Industrie · Digitalisierung · Change Management</span>
    <p>Transformationsprojekte scheitern selten an Technologie — sie scheitern an Strukturen, Silodenken und fehlendem Change Management. Wir begleiten Industrieunternehmen durch ERP-Transformationen, Digitalisierungsinitiativen und operative Neuausrichtungen mit klarem Fokus auf Ergebnisse.</p>
    <p>Von der Prozessaufnahme über die Systemauswahl bis zur Go-Live-Begleitung: Wir stellen sicher, dass Ihre Investition in Transformation einen messbaren ROI liefert — in Maschinenbau, Automotive Supply Chain, Elektronikfertigung und Anlagenbau.</p>
    <ul class="fokus-bullets">
      <li>ERP-Auswahl und Implementierungsbegleitung (SAP, Microsoft Dynamics, Oracle)</li>
      <li>Prozessanalyse und -modellierung für Manufacturing & Produktion</li>
      <li>Digitale Reifegradbewertung und Roadmap-Entwicklung</li>
      <li>Change Management und Mitarbeiterentwicklung in der Industrie</li>
      <li>KPI-Systeme und Performance-Tracking für industrielle Prozesse</li>
      <li>Post-Merger Integration und operative Neuausrichtung</li>
    </ul>
    <div class="fokus-keywords" aria-label="Relevante Keywords">
      <span class="profil-tag">ERP Transformation Industrie</span>
      <span class="profil-tag">Digitalisierung Manufacturing</span>
      <span class="profil-tag">Industrial Manufacturing</span>
      <span class="profil-tag">Prozessoptimierung Produktion</span>
    </div>
  </div>
  <div class="fokus-visual" aria-hidden="true">
    <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:260px;width:100%">
      <rect x="40" y="40" width="220" height="220" stroke="#C8A96A" stroke-width="1" opacity="0.4"/>
      <rect x="80" y="80" width="140" height="140" stroke="#005F6A" stroke-width="1" opacity="0.5"/>
      <line x1="40" y1="150" x2="260" y2="150" stroke="#C8A96A" stroke-width="1" opacity="0.3"/>
      <line x1="150" y1="40" x2="150" y2="260" stroke="#C8A96A" stroke-width="1" opacity="0.3"/>
      <circle cx="150" cy="150" r="30" stroke="#005F6A" stroke-width="1" opacity="0.6"/>
      <circle cx="150" cy="150" r="6" fill="#005F6A" opacity="0.8"/>
      <polyline points="60,220 100,160 140,180 180,120 240,80" stroke="#C8A96A" stroke-width="1" opacity="0.5"/>
    </svg>
  </div>
</section>
```

- [ ] **Schritt 4: Sektion 02 — Supply Chain & Logistik**

Ersetze die gesamte Sektion `id="zoll"` (Zeilen 89–120) — und ändere die ID auf `id="supplychain"`:
```html
<section class="fokus-section reveal" id="supplychain" aria-labelledby="fokus2-heading">
  <div class="fokus-content">
    <span class="fokus-num-large" aria-hidden="true">02</span>
    <h2 id="fokus2-heading">Supply Chain & Logistik</h2>
    <span class="fokus-sub">End-to-End Supply Chain · Logistikkosten · Einkauf & Beschaffung</span>
    <p>Intransparente Lieferketten, hohe Logistikkosten, fehlende KPI-Steuerung: Die meisten Industrieunternehmen zahlen zu viel — und wissen es nicht genau. Wir machen Ihre Supply Chain transparent, steuerbar und kosteneffizient.</p>
    <p>Unsere Expertise reicht von der Logistik- und Transportkostenanalyse über strategischen Einkauf bis zur End-to-End Planung und Bestandsoptimierung — für Serienproduktion, High-Mix/Low-Volume und globale Liefernetzwerke.</p>
    <ul class="fokus-bullets">
      <li>Logistikkosten reduzieren: Frachtanalyse, Routenoptimierung, Bündelung</li>
      <li>Einkauf optimieren: Beschaffungskosten senken, strategischer Lieferantenaufbau</li>
      <li>Bestandsoptimierung: Disposition verbessern, Materialengpässe eliminieren</li>
      <li>Produktionsplanung: MRP/ERP-Planung statt Excel-Steuerung</li>
      <li>End-to-End Supply Chain Design und Netzwerkoptimierung</li>
      <li>KPI-basierte Steuerung und Supply Chain Performance Management</li>
    </ul>
    <div class="fokus-keywords" aria-label="Relevante Keywords">
      <span class="profil-tag">Logistikkosten reduzieren</span>
      <span class="profil-tag">End-to-End Supply Chain</span>
      <span class="profil-tag">Beschaffungskosten senken</span>
      <span class="profil-tag">Bestandsoptimierung</span>
    </div>
  </div>
  <div class="fokus-visual" aria-hidden="true">
    <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:260px;width:100%">
      <circle cx="150" cy="150" r="110" stroke="#C8A96A" stroke-width="1" opacity="0.3"/>
      <circle cx="80"  cy="120" r="18" stroke="#005F6A" stroke-width="1" opacity="0.6"/>
      <circle cx="150" cy="80"  r="18" stroke="#005F6A" stroke-width="1" opacity="0.6"/>
      <circle cx="220" cy="120" r="18" stroke="#005F6A" stroke-width="1" opacity="0.6"/>
      <circle cx="200" cy="200" r="18" stroke="#005F6A" stroke-width="1" opacity="0.6"/>
      <circle cx="100" cy="200" r="18" stroke="#005F6A" stroke-width="1" opacity="0.6"/>
      <line x1="80"  y1="120" x2="150" y2="80"  stroke="#C8A96A" stroke-width="1" opacity="0.4"/>
      <line x1="150" y1="80"  x2="220" y2="120" stroke="#C8A96A" stroke-width="1" opacity="0.4"/>
      <line x1="220" y1="120" x2="200" y2="200" stroke="#C8A96A" stroke-width="1" opacity="0.4"/>
      <line x1="200" y1="200" x2="100" y2="200" stroke="#C8A96A" stroke-width="1" opacity="0.4"/>
      <line x1="100" y1="200" x2="80"  y2="120" stroke="#C8A96A" stroke-width="1" opacity="0.4"/>
    </svg>
  </div>
</section>
```

- [ ] **Schritt 5: Sektion 03 — Produktionsoptimierung**

Ersetze die gesamte Sektion `id="mittelstand"` (Zeilen 122–153) — ID wird zu `id="produktion"`:
```html
<section class="fokus-section reveal" id="produktion" aria-labelledby="fokus3-heading">
  <div class="fokus-content">
    <span class="fokus-num-large" aria-hidden="true">03</span>
    <h2 id="fokus3-heading">Produktions- & Prozessoptimierung</h2>
    <span class="fokus-sub">Operative Exzellenz · Lean Manufacturing · KPI-Steuerung</span>
    <p>Ineffiziente Produktionsprozesse, zu hohe Lagerbestände, gleichzeitig Materialengpässe, fehlende KPI-Strukturen: Diese Probleme kosten täglich Geld. Wir analysieren Ihre Produktion, identifizieren Verschwendung und implementieren nachhaltige Verbesserungen.</p>
    <p>Von Lean Manufacturing über Six Sigma bis zur KPI-basierten Steuerung — wir steigern Ihre operative Exzellenz messbar. Ergebnis: 30–60% Kostenreduktion in fokussierten Bereichen, schnellere Entscheidungen, klare Governance-Strukturen.</p>
    <ul class="fokus-bullets">
      <li>Produktionsoptimierung: Lean, Six Sigma, Value Stream Mapping</li>
      <li>Kapazitätsplanung und Engpassanalyse (Serienproduktion, High-Mix/Low-Volume)</li>
      <li>KPI-Dashboard und Performance Management für Produktion & Fertigung</li>
      <li>Silodenken auflösen: Zusammenarbeit zwischen Einkauf, Produktion, Logistik</li>
      <li>Prozessautomatisierung und digitale Workflows in der Fertigung</li>
      <li>Governance-Strukturen und klare Entscheidungsprozesse etablieren</li>
    </ul>
    <div class="fokus-keywords" aria-label="Relevante Keywords">
      <span class="profil-tag">Produktionsoptimierung</span>
      <span class="profil-tag">Operative Exzellenz Industrie</span>
      <span class="profil-tag">30–60% Kostenreduktion</span>
      <span class="profil-tag">KPI-basierte Steuerung</span>
    </div>
  </div>
  <div class="fokus-visual" aria-hidden="true">
    <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:260px;width:100%">
      <rect x="40"  y="60"  width="60" height="40" stroke="#C8A96A" stroke-width="1" opacity="0.4"/>
      <rect x="120" y="60"  width="60" height="40" stroke="#C8A96A" stroke-width="1" opacity="0.4"/>
      <rect x="200" y="60"  width="60" height="40" stroke="#C8A96A" stroke-width="1" opacity="0.4"/>
      <rect x="80"  y="160" width="60" height="40" stroke="#005F6A" stroke-width="1" opacity="0.6"/>
      <rect x="160" y="160" width="60" height="40" stroke="#005F6A" stroke-width="1" opacity="0.6"/>
      <line x1="100" y1="100" x2="110" y2="160" stroke="#C8A96A" stroke-width="1" opacity="0.4"/>
      <line x1="150" y1="100" x2="150" y2="160" stroke="#C8A96A" stroke-width="1" opacity="0.4"/>
      <line x1="200" y1="100" x2="190" y2="160" stroke="#C8A96A" stroke-width="1" opacity="0.4"/>
      <polyline points="40,240 100,210 160,225 220,190 260,200" stroke="#005F6A" stroke-width="1.5" opacity="0.7"/>
      <circle cx="100" cy="210" r="4" fill="#C8A96A" opacity="0.8"/>
      <circle cx="160" cy="225" r="4" fill="#C8A96A" opacity="0.8"/>
      <circle cx="220" cy="190" r="4" fill="#C8A96A" opacity="0.8"/>
    </svg>
  </div>
</section>
```

- [ ] **Schritt 6: Sektion 04 — Global Trade & Zoll**

Ersetze die gesamte Sektion `id="nonprofit"` (Zeilen 155–184) — ID wird zu `id="zoll"`:
```html
<section class="fokus-section reveal" id="zoll" aria-labelledby="fokus4-heading">
  <div class="fokus-content">
    <span class="fokus-num-large" aria-hidden="true">04</span>
    <h2 id="fokus4-heading">Global Trade & Zolloptimierung</h2>
    <span class="fokus-sub">Zollkosten optimieren · Präferenzursprung · Trade Compliance</span>
    <p>Falsche Zolltarifnummern, ungenutzte Freihandelsabkommen, fehlende Trade Compliance — diese Fehler kosten Industrieunternehmen täglich Geld und bergen erhebliche Risiken. Wir machen Ihre globalen Handelsprozesse transparent, compliant und kosteneffizient.</p>
    <p>Von der TARIC-Analyse über Incoterms-Optimierung bis zur CBAM/EUDR-Compliance: Wir integrieren Zoll und Global Trade als strategischen Hebel in Ihre Supply Chain — statt als Pflichtaufgabe zu behandeln.</p>
    <ul class="fokus-bullets">
      <li>Zollkosten optimieren: TARIC-Analyse, Zolltarifnummer-Optimierung</li>
      <li>Incoterms & Lieferstruktur: EXW vs. DDP, Kostenkontrolle zurückgewinnen</li>
      <li>Präferenzursprung: Freihandelsabkommen nutzen, Ursprung berechnen</li>
      <li>Trade Compliance: Exportkontrolle, CBAM, EUDR, Zollprüfung-Vorbereitung</li>
      <li>Systemintegration: SAP GTS, Oracle GTM, AEB — strategisch nutzen statt verwalten</li>
      <li>Aufbau interner Compliance-Strukturen und AEO-Zertifizierung</li>
    </ul>
    <div class="fokus-keywords" aria-label="Relevante Keywords">
      <span class="profil-tag">Zollkosten optimieren</span>
      <span class="profil-tag">Global Trade & Zoll</span>
      <span class="profil-tag">Trade Compliance</span>
      <span class="profil-tag">Präferenzursprung</span>
    </div>
  </div>
  <div class="fokus-visual" aria-hidden="true">
    <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:260px;width:100%">
      <circle cx="150" cy="150" r="110" stroke="#C8A96A" stroke-width="1" opacity="0.3"/>
      <ellipse cx="150" cy="150" rx="55" ry="110" stroke="#005F6A" stroke-width="1" opacity="0.4"/>
      <line x1="40" y1="150" x2="260" y2="150" stroke="#C8A96A" stroke-width="1" opacity="0.3"/>
      <line x1="150" y1="40" x2="150" y2="260" stroke="#C8A96A" stroke-width="1" opacity="0.3"/>
      <circle cx="90"  cy="110" r="5" fill="#C8A96A" opacity="0.8"/>
      <circle cx="210" cy="110" r="5" fill="#C8A96A" opacity="0.8"/>
      <circle cx="150" cy="200" r="5" fill="#C8A96A" opacity="0.8"/>
      <line x1="90" y1="110" x2="210" y2="110" stroke="#005F6A" stroke-width="1" opacity="0.5"/>
      <line x1="90" y1="110" x2="150" y2="200" stroke="#005F6A" stroke-width="1" opacity="0.5"/>
      <line x1="210" y1="110" x2="150" y2="200" stroke="#005F6A" stroke-width="1" opacity="0.5"/>
    </svg>
  </div>
</section>
```

- [ ] **Schritt 7: CSS für fokus-keywords Tags**

In `styles.css` — suche `.profil-tag` (bereits definiert für profil.html). Nutze dieselbe Klasse — kein neues CSS nötig.

- [ ] **Schritt 8: fokus.html Links in index.html anpassen**

In `index.html` — Karte 02 Link zeigt auf `fokus.html#supplychain` (bereits in Task 3 gesetzt), Karte 03 auf `fokus.html#produktion`, Karte 04 auf `fokus.html#zoll`. Prüfe alle `href`-Attribute in den 4 Fokus-Karten.

- [ ] **Schritt 9: Visuell prüfen**

Browser: fokus.html aufrufen, alle 4 Sektionen durchscrollen. Erwartung: 4 Industrie-Sektionen mit petrol/gold SVGs und Keyword-Tags.

---

## Task 5: profil.html — Entpersonalisieren & neu positionieren

**Files:**
- Modify: `profil.html`

- [ ] **Schritt 1: Meta & Page-Header**

Zeile 6:
```html
<meta name="description" content="Georalis Consulting — Unser Ansatz, unsere Werte und unsere Expertise in industrieller Transformation und Supply Chain. Order in Motion.">
```

Ersetze `<header class="page-header reveal">` Block:
```html
<header class="page-header reveal">
  <span class="label">Unser Ansatz</span>
  <h1>Order in Motion.<br>Ergebnisse, keine Folien.</h1>
  <p>Wir beraten nicht für Berichte — wir begleiten Industrieunternehmen bis zur messbaren Veränderung.</p>
</header>
```

- [ ] **Schritt 2: Bio-Section ersetzen**

Ersetze die gesamte `<!-- Bio Section -->` bis zum Ende von `</section>` (Zeilen 43–78) mit:
```html
<section class="section" aria-labelledby="ansatz-heading">
  <div class="section-header reveal">
    <span class="label">Philosophie</span>
    <h2 id="ansatz-heading">Was uns unterscheidet.</h2>
  </div>
  <div class="models-grid reveal">
    <div class="model-item">
      <svg class="model-icon" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">
        <circle cx="18" cy="18" r="14"/>
        <polyline points="10,18 15,23 26,13"/>
      </svg>
      <span class="model-sub">Prinzip 01</span>
      <h3>Ergebnisse statt Empfehlungen</h3>
      <p>Wir liefern keine Präsentationen — wir begleiten die Umsetzung bis das Ergebnis messbar ist.</p>
    </div>
    <div class="model-item">
      <svg class="model-icon" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">
        <rect x="6" y="6" width="24" height="24"/>
        <line x1="6" y1="18" x2="30" y2="18"/>
        <line x1="18" y1="6" x2="18" y2="30"/>
      </svg>
      <span class="model-sub">Prinzip 02</span>
      <h3>Industrie-Tiefe</h3>
      <p>Kein generisches Consulting — tiefe Expertise in Manufacturing, Supply Chain und Global Trade.</p>
    </div>
    <div class="model-item">
      <svg class="model-icon" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">
        <polyline points="4,28 14,16 22,22 32,8"/>
      </svg>
      <span class="model-sub">Prinzip 03</span>
      <h3>Messbare Wirkung</h3>
      <p>30–60% Kostenreduktion in fokussierten Bereichen. KPI-Strukturen die funktionieren. Transparenz die bleibt.</p>
    </div>
    <div class="model-item">
      <svg class="model-icon" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">
        <circle cx="18" cy="12" r="5"/>
        <path d="M8 30 C8 24 28 24 28 30"/>
      </svg>
      <span class="model-sub">Prinzip 04</span>
      <h3>Auf Augenhöhe</h3>
      <p>Strategische Sparringspartner für Entscheider — direkt, ehrlich, ohne Agenda.</p>
    </div>
  </div>
</section>
```

- [ ] **Schritt 3: Timeline-Section entfernen**

Lösche den gesamten `<!-- Timeline -->` Abschnitt bis zum nächsten `<!-- CTA -->` oder `</main>`.

- [ ] **Schritt 4: Stats-Section hinzufügen**

Füge nach der models-grid Section (vor CTA) ein:
```html
<section class="section" style="padding-top: 0" aria-label="Kennzahlen">
  <div class="stats-grid">
    <div class="stat-item reveal">
      <span class="stat-number" data-count="15" data-suffix="+">0+</span>
      <p class="stat-label">Jahre Erfahrung in Industrie & Supply Chain</p>
    </div>
    <div class="stat-item reveal">
      <span class="stat-number" data-count="80" data-suffix="+">0+</span>
      <p class="stat-label">Projekte in D-A-CH und international</p>
    </div>
    <div class="stat-item reveal">
      <span class="stat-number" data-count="60" data-suffix="%">0%</span>
      <p class="stat-label">Kostenreduktion in fokussierten Bereichen</p>
    </div>
  </div>
</section>
```

- [ ] **Schritt 5: Branchen-Section hinzufügen**

Vor CTA-Section einfügen:
```html
<section class="section" aria-labelledby="branchen-heading">
  <div class="section-header reveal">
    <span class="label">Branchen</span>
    <h2 id="branchen-heading">Unsere Industrie-Expertise.</h2>
  </div>
  <div class="focus-grid reveal">
    <article class="focus-card">
      <div class="focus-card-inner">
        <h3>Maschinenbau & Anlagenbau</h3>
        <p>Komplexe Fertigungsprozesse, lange Lieferketten, hoher Individualisierungsgrad — wir kennen die Herausforderungen.</p>
      </div>
    </article>
    <article class="focus-card">
      <div class="focus-card-inner">
        <h3>Automotive Supply Chain</h3>
        <p>Just-in-time, globale Liefernetzwerke, strenge Compliance-Anforderungen — wir optimieren end-to-end.</p>
      </div>
    </article>
    <article class="focus-card">
      <div class="focus-card-inner">
        <h3>Elektronikfertigung</h3>
        <p>High-Mix/Low-Volume, volatile Märkte, kritische Komponenten — wir schaffen Stabilität und Steuerbarkeit.</p>
      </div>
    </article>
    <article class="focus-card">
      <div class="focus-card-inner">
        <h3>Produktion & Fertigung</h3>
        <p>Serienproduktion, Lean-Initiativen, operative Exzellenz — wir liefern nachhaltige Verbesserungen.</p>
      </div>
    </article>
  </div>
</section>
```

- [ ] **Schritt 6: Visuell prüfen**

Browser: profil.html aufrufen. Erwartung: Kein persönliches Bio, keine Timeline, stattdessen Prinzipien, Stats und Branchen.

---

## Task 6: service.html — Industrie-Fokus

**Files:**
- Modify: `service.html`

- [ ] **Schritt 1: service.html lesen und Meta anpassen**

Lese `service.html` komplett. Ersetze meta description (Zeile ~6):
```html
<meta name="description" content="Georalis Service: 4 Beratungsmodelle für Industrieunternehmen — von der Orientierung bis zum Executive Retainer. Order in Motion.">
```

- [ ] **Schritt 2: Zielgruppen-Beschreibungen anpassen**

In der Service-Tabelle (falls vorhanden): Ersetze "KMU", "Non-Profit", "Mittelstand" mit "Industrieunternehmen", "Manufacturing", "Produktionsunternehmen".

Suche und ersetze überall in service.html:
- "KMU und Familienunternehmen" → "Industrieunternehmen und Produktionsbetriebe"
- "Non-Profit" → entfernen oder ersetzen mit "Global Player"
- "Mittelstand" → "Manufacturing-Unternehmen"

- [ ] **Schritt 3: Page-Header**

Ersetze `<header class="page-header reveal">` Block in service.html:
```html
<header class="page-header reveal">
  <span class="label">Service</span>
  <h1>Vier Modelle.<br>Ein Ziel: Ihre Ergebnisse.</h1>
  <p>Maßgeschneiderte Beratungsformate für Industrieunternehmen — von der schnellen Lageeinschätzung bis zur langfristigen Transformationsbegleitung.</p>
</header>
```

- [ ] **Schritt 4: Visuell prüfen**

Browser: service.html aufrufen. Erwartung: Industrie-Sprache durchgängig, kein Mittelstand/Non-Profit mehr.

---

## Task 7: kontakt.html & bedarfsanalyse.html — Meta + Slogan

**Files:**
- Modify: `kontakt.html`, `bedarfsanalyse.html`

- [ ] **Schritt 1: kontakt.html Meta**

```html
<meta name="description" content="Georalis Consulting kontaktieren — Industrielle Transformation, Supply Chain Optimierung und Global Trade. Order in Motion.">
```

- [ ] **Schritt 2: bedarfsanalyse.html Meta**

```html
<meta name="description" content="Georalis Bedarfsanalyse — Analysieren Sie Ihren industriellen Optimierungsbedarf in 3 Schritten. Order in Motion.">
```

- [ ] **Schritt 3: Visuell prüfen**

Browser: beide Seiten aufrufen, Footer-Tagline prüfen ("Order in Motion."), Logo-Slogan prüfen.

---

## Task 8: Finale Qualitätsprüfung

- [ ] **Schritt 1: Alle "Mittelstand"/"Non-Profit"/"Familienunternehmen"/"KMU" Vorkommen finden**

```bash
grep -rn "Mittelstand\|Non-Profit\|Familienunternehmen\|KMU" /Users/philipppaizoni/georalis-website --include="*.html"
```

- [ ] **Schritt 2: Verbleibende Vorkommen bereinigen**

Jeden Fund manuell prüfen und mit industrie-relevantem Begriff ersetzen.

- [ ] **Schritt 3: Alle internen Links prüfen**

```bash
grep -rn 'href="fokus.html#' /Users/philipppaizoni/georalis-website --include="*.html"
```

Sicherstellen dass alle Links auf die richtigen neuen IDs zeigen: `#transformation`, `#supplychain`, `#produktion`, `#zoll`.

- [ ] **Schritt 4: Alle 7 Seiten im Browser durchklicken**

index.html → fokus.html (alle 4 Sektionen) → service.html → profil.html → kontakt.html → bedarfsanalyse.html

Checkliste pro Seite:
- Logo zeigt "Georalis" + "ORDER IN MOTION" in gold
- Footer sagt "Order in Motion."
- Petrol-farbige Buttons/CTAs
- Gold-farbige Borders
- Kein Mittelstand/Non-Profit/KMU Text

---
