# Georalis Consulting GmbH — Website Design Spec
_2026-04-01_

## Overview
Production-ready multi-page B2B consulting website. Pure HTML/CSS/JS, no frameworks, locally openable. Mobile-first, GSAP-animated, premium black/white design.

## Design System
- **Palette:** bg `#0A0A0A`, surface `#111111`, border `#222222`, text `#FFFFFF`, secondary `#888888`, accent `#F5F4F0`, CTA `#FFFFFF / #000000`
- **Fonts:** Playfair Display (headings, serif) + Inter (body, sans) via Google Fonts
- **Scale:** clamp() throughout, CSS custom properties for all tokens
- **Language:** No colors, no gradients, no shadows. 1px borders, generous whitespace.

## Animations
- GSAP + ScrollTrigger via CDN
- Hero: word-by-word fade-up (stagger 0.12s)
- Scroll: every section .reveal fades+slides up (start: "top 80%")
- Nav: shrinks + border-bottom on scroll down
- Links: clip-path underline left→right on hover
- Cards: white border traces on hover (CSS)
- CTA button: white↔black invert on hover
- Strip: infinite CSS scroll left (duplicated content)
- Page transitions: JS fade out/in
- Counters: GSAP count-up on scroll enter
- Cursor: dot (8px) + ring (32px) with lerp, disabled on touch

## File Structure
```
~/georalis-website/
  index.html         # Home
  fokus.html         # Focus areas (sticky sidebar)
  service.html       # Service cards + comparison table
  profil.html        # Bio + timeline
  kontakt.html       # Contact form
  bedarfsanalyse.html # 3-step form
  styles.css         # Shared styles
  main.js            # Shared JS (GSAP, cursor, nav, forms)
```

## Pages
1. **index.html** — Hero · credibility strip · 4 focus cards · 4 Beratungsmodelle · stats · quote · CTA
2. **fokus.html** — sticky sidebar nav + 4 full sections (Transformation, Zoll, Mittelstand, Non-Profit)
3. **service.html** — 2×2 service cards + comparison table (4 models × criteria)
4. **profil.html** — 2-col layout, SVG "GB" placeholder, expertise tags, animated timeline
5. **kontakt.html** — split layout, underline-only form fields
6. **bedarfsanalyse.html** — 3-step form with progress bar, GSAP slide transitions

## Mobile
- Single-column at 768px, hamburger overlay menu, hero SVG hidden, cursor off, clamp() fonts, 48px touch targets, no horizontal overflow
