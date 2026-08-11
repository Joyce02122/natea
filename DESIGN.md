# DESIGN.md — US Taiwan Tech Connect 2025

Visual design system for the NATEA Seattle conference site.  
**Source of truth for look and feel.** Content may change later; this document stays fixed until the design direction changes.

**Reference images**

| File | Use |
|------|-----|
| `docs/references/hero-speakers.png` | Full composition: logo, hero, speaker grid language |
| `docs/references/hero-detail.png` | Hero type, metadata, tagline bar, iridescent ribbons |

**Existing site (content only)**  
https://natea-seattle.my.canva.site/us-taiwan-tech-connect/

Do **not** recreate the Canva site’s dark / circular-panel look. Keep purpose and copy; rebuild UI from this document and the references.

Note: References may show alternate year/copy in mockups. **Live content** in the build comes from the existing 2025 site (see `RULES.md`). Visual language still follows these references.

---

## 1. Design thesis

A light, airy, enterprise-tech conference surface. Premium feel comes from:

1. Deep indigo type on near-white ground  
2. One dominant iridescent ribbon graphic (glass / holographic 3D)  
3. Generous whitespace and calm vertical rhythm  
4. Flat speaker portraits — no card chrome  

Tone: modern, bilingual-region bridge, AI-forward, professional — not playful, not dark-mode, not startup purple-on-white cliché chrome.

---

## 2. Color

Define as CSS custom properties. Prefer tokens over one-off hex in components.

| Token | Value | Role |
|-------|--------|------|
| `--bg` | `#F7F8FA` | Page background |
| `--bg-elevated` | `#FFFFFF` | Optional subtle sections |
| `--ink` | `#2B1B63` | Primary headings, brand emphasis, speaker names |
| `--ink-soft` | `#3D2B7A` | Tagline / secondary headline |
| `--muted` | `#6B7280` | Meta (venue, date), body support |
| `--muted-icon` | `#9CA3AF` | Line icons |
| `--logo` | `#4B5563` | NATEA SEATTLE wordmark |
| `--photo-bg` | `#0B0F2A` | Speaker headshot backdrop |
| `--divider` | `#2B1B63` | Vertical rule beside tagline / accents |
| `--focus` | `#5B4FC7` | Focus rings / a11y |
| `--cta` | `#2B1B63` | Primary button fill |
| `--cta-text` | `#FFFFFF` | Primary button label |
| `--line` | `rgba(43, 27, 99, 0.12)` | Soft section rules |

### Ribbon palette (graphic only — not UI chrome)

Use inside the hero asset or SVG mesh / gradient, not as solid section backgrounds:

- Violet / indigo highlights  
- Soft pink / magenta  
- Cyan / teal  
- Pale blue translucency  

Avoid:

- Full-page purple → indigo gradients as the page theme  
- Dark mode as default  
- Glow stacks, neon, multi-layer card shadows  
- Warm cream (#F4F1EA) + terracotta + display-serif combo  

---

## 3. Typography

### Font stack

Geometric, professional sans with strong bold caps — **not** default system stacks (Inter, Roboto, Arial, system-ui) as the intentional brand face.

| Role | Face | Fallback |
|------|------|----------|
| Display / UI | **Plus Jakarta Sans** | `ui-sans-serif, sans-serif` |

One family site-wide is enough. Load via Google Fonts or self-host.

### Scale & treatment

| Element | Treatment |
|---------|-----------|
| **Event title** | Large, bold, **ALL CAPS**, tracking `-0.02em` to `0`. Color `--ink`. Desktop roughly `clamp(2rem, 4.2vw, 3.35rem)`; line-height ~1.08–1.15. |
| **Theme line** | Medium weight, smaller than title, `--ink-soft` or `--muted`. |
| **Tagline / CTA copy** | Sentence case; optional left border accent. |
| **Meta** | Regular, ~14–16px, `--muted`. Icon + text, gap ~0.5rem. |
| **Section title** | Bold, ~clamp(1.35rem, 2.5vw, 1.75rem), `--ink`. |
| **Speaker name** | **ALL CAPS**, bold, `--ink`, ~12–14px. |
| **Speaker title** | Regular, 2–3 lines, `--muted`, ~12–13px, line-height ~1.35. |
| **Logo type** | Small, semibold, slight tracking, `--logo`, uppercase. |
| **Body** | 15–16px, `--muted` or soft ink for long paras; max-width ~65ch. |

No decorative serifs. No gradient text on headings.

---

## 4. Logo & branding

- **Logo:** Geometric mark (four chevrons / arrows forming an X) + **NATEA SEATTLE** wordmark  
- Placement: top-left in header / hero  
- Brand must read clearly in the first viewport (logo present; event name is the hero title under it)  
- Do not invent a second brand system  

Recreate the mark in monochrome SVG if no official vector is available.

---

## 5. Hero composition

First viewport = **one composition**, not a dashboard.

### Allowed in first viewport

1. NATEA SEATTLE logo  
2. Event title (**2025 U.S. TAIWAN TECH CONNECT** or source wording)  
3. Theme line (**AI Trends & Industry Insights**)  
4. Venue + date (icons + text)  
5. One primary CTA group (Reserve Your Seat)  
6. Dominant iridescent ribbon (edge-influencing background / midground)

### Not in first viewport

- Stat strips, speaker grid, full agenda, partner walls, forms embedded  
- Floating badges / chips / stickers on the ribbon  
- Inset “rounded media cards” as the hero image  

### Layout

- **Desktop:** Left-aligned type stack; ribbons sweep center–right (may pass behind type with opacity if contrast holds)  
- **Mobile:** Type stays left or slight tighten; ribbon scales / crops so type stays readable  
- Hero min height about `min(100svh, 720px)` — do not force empty scroll only for height  

### Tagline accent (from hero-detail reference)

- Vertical bar `3–4px`, color `--divider`  
- Use for short slogan / CTA supporting line when present  

### Meta row

Outline icons only (stroke ~1.5–2px):

- Pin → University of Washington  
- Calendar → Saturday, Nov 15, 2025  

Horizontal on desktop; wrap cleanly on small screens. No pill containers.

### Background

- Base: soft `--bg` (faint cool mist OK)  
- Iridescent ribbon: high-quality image **or** SVG/CSS that reads glassy and layered  
- Prefer absolute positioned graphic; keep file weight reasonable  

---

## 6. Speakers

### Layout

- Desktop: up to **6 columns** in one row when space allows; otherwise 3×2  
- Tablet: 2–3 columns  
- Mobile: prefer **2-wide** if photos remain legible  

### Card structure (flat — not “cards”)

Each speaker block:

1. Portrait (fixed aspect, e.g. 3:4 or 1:1) on solid `--photo-bg`  
2. Name (all caps, bold)  
3. Role / title (centered, grey)  
4. Optional company mark only if asset exists  

### Visual rules

- No borders, no shadows, no rounded chrome boxes (photo radius `4–8px` max OK)  
- Photos crop consistently (head/shoulders)  
- Text under photo is center-aligned  
- Column gap ~24–40px desktop  

Placeholder initials on navy OK if photo missing.

---

## 7. Page sections (visual treatment)

Only implement sections listed in `RULES.md`.

| Section | Treatment |
|---------|-----------|
| Header | Quiet; transparent/light, no solid dark bar |
| Hero | Per §5 |
| Speakers | Per §6; optional quiet section heading |
| Agenda | Light ground; time + session as calm list or two-column rows; thin rules not heavy boxes |
| Panels | One heading; each panel is a simple block (title + people text), not colorful Canva cards |
| Venue | One headline + paragraphs; optional map link later only if already in content |
| CTA / contact | Clear button or link, email link, social icons as simple line/marks |
| Footer | Minimal muted type |

Vertical padding: `clamp(3rem, 8vw, 6rem)` between major blocks. One job per section.

---

## 8. Components

### Primary button

- Fill `--cta`, text `--cta-text`  
- Padding ~0.9rem 1.4rem; radius 4–8px  
- Hover: slightly lighter/darker ink (not neon glow)  
- Focus: outline with `--focus`  

### Secondary link

- Text link in `--ink` with underline on hover  

### Icons

- Stroke icons, 20–22px, `--muted-icon`  

### Section label (optional)

- Small uppercase tracking for quiet labels — use sparingly  

---

## 9. Motion

Ship **2–3 intentional motions** only:

1. Hero ribbon slight float / ambient drift (slow; `prefers-reduced-motion: reduce` → static)  
2. Fade / rise of hero text on load (~400–600ms)  
3. Soft opacity or translate on speaker row entrance (once, light stagger)

Avoid: parallax overload, continuous spinning, hover glow explosions, scroll-jacking.

---

## 10. Responsive principles

| Breakpoint (guide) | Behavior |
|--------------------|----------|
| ≥1100px | Hero split (type left / ribbon right); 6 speakers |
| 768–1099px | Hero compressed; 3 speakers per row |
| &lt;768px | Single column content; 2-col speakers if OK; touch targets ≥44px |

- Test type contrast on ribbon overlap  
- Never clip title mid-word without a plan  
- Horizontal overflow forbidden  

---

## 11. Imagery & assets

| Asset | Notes |
|-------|--------|
| Iridescent ribbons | Primary visual anchor |
| Speaker headshots | Navy stage; consistent crop |
| Company logos | Only if presentable; mono OK |
| Favicon | NATEA mark |

Do not use generic AI stock clutter (phone mockups, fake dashboards) in the hero.

---

## 12. Accessibility

- Text contrast ≥ WCAG AA on background  
- Decorative ribbon: empty `alt` or CSS-only  
- Focus visible for interactive elements  
- Respect `prefers-reduced-motion`  
- Semantic landmarks: `header`, `main`, `section`, `footer`  

---

## 13. Do / don’t (visual)

**Do**

- Light field, indigo type, one ribbon system  
- Flat speakers  
- Airy spacing  

**Don’t**

- Copy Canva dark full-bleed purple pages as the new skin  
- Dashboard layout, multi-stat hero  
- Cardification of static content  
- Unrelated new illustration styles beside the ribbon  
- Emoji as decoration  

---

## 14. Implementation tokens (starter CSS)

```css
:root {
  --bg: #f7f8fa;
  --bg-elevated: #ffffff;
  --ink: #2b1b63;
  --ink-soft: #3d2b7a;
  --muted: #6b7280;
  --muted-icon: #9ca3af;
  --logo: #4b5563;
  --photo-bg: #0b0f2a;
  --divider: #2b1b63;
  --focus: #5b4fc7;
  --cta: #2b1b63;
  --cta-text: #ffffff;
  --line: rgba(43, 27, 99, 0.12);
  --font: "Plus Jakarta Sans", ui-sans-serif, sans-serif;
  --space-section: clamp(3rem, 8vw, 6rem);
  --space-page-x: clamp(1.25rem, 5vw, 4rem);
  --radius-photo: 6px;
  --radius-control: 6px;
  --max-width: 1200px;
}
```

Update this file when tokens change in production CSS.