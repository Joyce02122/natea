# DESIGN.md — U.S. Taiwan Tech Connect 2026

Visual design system for the NATEA Seattle conference site.  
**Source of truth for look and feel.** Align production CSS with this document when tokens or patterns change.

---

## 1. Design thesis

A light, airy, enterprise-tech conference surface. Premium feel comes from:

1. Deep indigo type on cool, near-white ground  
2. One full-bleed iridescent ribbon photograph as the hero visual (gentle warp motion only)  
3. Soft **tinted section gradients** with quiet bridges between blocks  
4. Airy spacing, flat speaker portraits with light surface elevation  

Tone: modern, Taiwan–U.S. tech bridge, AI-forward, professional — not playful, not dark-mode default, not purple-on-white cliché chrome.

---

## 2. Color

Define as CSS custom properties. Prefer tokens over one-off hex in components.

| Token | Value | Role |
|-------|--------|------|
| `--bg` | `#FAF9FC` | Page ground start |
| `--bg-speakers` | `#F7F5FC` | Speakers atmosphere |
| `--bg-agenda` | `#F3F8FC` | Agenda atmosphere |
| `--bg-roundtables` | `#FFFFFF` | Roundtables ground |
| `--bg-venue` | `#F4F8FC` | Venue atmosphere (cool **blue**, not mint green) |
| `--bg-footer` | `#1B1B63` | Dark footer bar |
| `--bg-elevated` | `#FFFFFF` | Elevated cards / light surfaces |
| `--ink` | `#1B1B63` | Primary UI ink, section titles |
| `--ink-soft` | `#2A2A78` | Secondary emphasis |
| `--muted` | `#5B6170` | Body / meta support |
| `--muted-icon` | `#8B909C` | Stroke icons |
| `--logo` | `#1B1B63` | Brand wordmark color context |
| `--photo-bg` | `#0C1140` | Speaker headshot stage |
| `--divider` | `#1B1B63` | Accents / rules |
| `--focus` | `#5B4FC7` | Focus rings |
| `--cta` | `#1B1B63` | Primary button fill |
| `--cta-text` | `#FFFFFF` | Primary button label |
| `--line` | `rgba(27, 27, 99, 0.12)` | Soft rules |
| `--hero-ink` | `#1C2390` | Hero title gradient start |
| `--hero-ink-mid` | `#52108C` | Hero title gradient end |
| `--hero-meta` | `#333333` | Hero date / venue line |

### Section atmospheres

Use soft radial washes + vertical gradients (lilac → sky → white → cool blue). Hand off colors with faint top/bottom fades so sections feel continuous, not hard striping.

### Ribbon palette (hero graphic only)

- Lavender / violet highlights  
- Soft pink / magenta  
- Pale cyan translucency  
- Bright specular whites  

Avoid as **page chrome**: full-page purple→indigo theme, dark mode default, glow stacks, multi-layer card shadows, warm-cream + terracotta + serif cliché.

---

## 3. Typography

| Role | Face | Fallback |
|------|------|----------|
| Body / UI | **Manrope** | `ui-sans-serif, sans-serif` |
| Display / hero | **Space Grotesk** | `ui-sans-serif, sans-serif` |

Load via Google Fonts (or self-host). Do not use Inter / Roboto / Arial / system-ui as the intentional brand face.

| Element | Treatment |
|---------|-----------|
| **Event title** | Two lines: `U.S. TAIWAN` / `TECH CONNECT 2026`. Bold display; gradient `--hero-ink` → `--hero-ink-mid`. Do not put a slash on the first line. |
| **Tagline** | One line when possible; lighter weight; light lavender / soft purple. |
| **Meta** | Icons + text; `--hero-meta` / muted. |
| **Section title** | Bold, ~`clamp(1.35rem, 2.5vw, 1.75rem)`, `--ink`. |
| **Speaker name** | Bold, larger; **single line** (`nowrap`) so all six names share one size. |
| **Speaker role** | Smaller, muted. |
| **Body** | 15–16px range, good line-height; calm max width for long copy. |

---

## 4. Logo & branding

| Surface | Asset |
|---------|--------|
| **Header** | Official **NATEA Seattle** wordmark (`assets/NATEA Seattle Black.png`) — top-left |
| **Favicon / tab** | Purple ribbon crop (`assets/favicon-ribbon.png`, `apple-touch-icon.png`) |
| **Hero brand signal** | Event name as hero-level display + ribbon photo behind |

Do not invent a second org lockup. Do not replace the header wordmark with the ribbon.

---

## 5. Hero composition

First viewport = **one composition**, full-bleed ribbon photo + type — not a dashboard.

### Allowed

1. Site header (logo + quiet nav)  
2. Event title (two lines)  
3. Tagline (one line)  
4. Venue + date meta  
5. One primary CTA: **Reserve your seat**  
6. Dominant edge-to-edge ribbon photo (single image; canvas warp optional)

### Not in first viewport

- Speakers grid, agenda list, roundtable lists, venue blocks  
- Stats, badges, chips, floating stickers on the photo  

### Technical notes

- One photo layer only (`hero-base.jpg`); warp draws to canvas when motion is allowed.  
- Base fades into the speakers lilac mist at the bottom seam.  
- Desktop: type left; ribbon can dominate center–right. Mobile: crop photo so type stays readable.  

---

## 6. Speakers

- Up to **6** in a grid (desktop multi-column; tablet/mobile fewer).  
- Block: portrait → name → role → company logo in a **fixed** logo box (`object-fit: contain`).  
- Soft surface (light elevation) is OK; avoid heavy multi-shadow “cards as marketing fluff.”  
- Photos consistent crop; missing photo → navy stage + initials — never fake faces.  

---

## 7. Page sections

| Section | Treatment |
|---------|-----------|
| Header | Transparent over hero; NATEA wordmark; nav + **RSVP** button |
| Hero | §5 |
| Speakers | Lilac / soft purple paper |
| Agenda | Sky / cool blue list of time + session rows |
| Roundtables | White / airy; horizontal themes; mentor name + role only |
| Venue | Soft **blue** gradient (not green); place + link |
| Footer | White strip: organizer logos (narrow); dark bar: email + social |

Vertical padding: `clamp(3.5rem, 8vw, 6.5rem)`. One job per section.

---

## 8. Components

### Primary button

- Fill `--cta`, text `--cta-text`, radius `--radius-control` (~10px)  
- Hover: slight lift/darken, no neon glow  
- Focus: `--focus` ring  

### Icons

- Stroke style, muted  

### Scroll reveal

- Section heads and content units fade / rise once on intersect  
- Soft sibling stagger for speakers, agenda rows, roundtables  
- `prefers-reduced-motion: reduce` → fully visible, no transition  

---

## 9. Motion

Intentional motions only:

1. Hero ribbon warp (single-layer grid; frozen left/type/bottom seams) — static when reduced motion  
2. Scroll reveal on section content (once)  
3. Optional light header / CTA hover (subtle)

Avoid: scroll-jacking, continuous spinning, glare stacks, multi-layer parallax.

---

## 10. Responsive

| Guide | Behavior |
|-------|----------|
| ≥1100px | Hero type left; multi-col speakers; full nav |
| 768–1099px | Hero compressed; mid speaker columns |
| &lt;768px | Compact type; collapsible nav; touch targets ≥44px |

No horizontal overflow. Title must not clip clumsily.

---

## 11. Imagery & assets

| Asset | Notes |
|-------|--------|
| `hero-base.jpg` | Production hero photo |
| Speaker headshots | Local under `assets/speakers/` |
| Company logos | `assets/company_logo/` — fixed logo frame |
| Organizers | `assets/organize/` — footer white strip |
| Favicon ribbon | Square crop of purple ribbon |

---

## 12. Accessibility

- Text contrast ≥ WCAG AA  
- Decorative hero: empty `alt`  
- Visible focus on controls  
- Semantic landmarks: `header`, `main`, `section`, `footer`  
- Respect reduced motion  

---

## 13. Do / don’t

**Do**

- Light field, indigo type, one ribbon hero system  
- Soft blue venue wash; lilac speakers; sky agenda  
- Header wordmark + ribbon favicon  

**Don’t**

- Dashboard / multi-widget hero  
- Cardification of every static block  
- Mint / green venue as the default wash  
- New illustration styles competing with the ribbon  
- Emoji decoration  

---

## 14. Implementation tokens (align with `css/styles.css`)

```css
:root {
  --bg: #faf9fc;
  --bg-speakers: #f7f5fc;
  --bg-agenda: #f3f8fc;
  --bg-roundtables: #ffffff;
  --bg-venue: #f4f8fc;
  --bg-footer: #1b1b63;
  --bg-elevated: #ffffff;
  --ink: #1b1b63;
  --ink-soft: #2a2a78;
  --muted: #5b6170;
  --muted-icon: #8b909c;
  --logo: #1b1b63;
  --photo-bg: #0c1140;
  --divider: #1b1b63;
  --focus: #5b4fc7;
  --cta: #1b1b63;
  --cta-text: #ffffff;
  --line: rgba(27, 27, 99, 0.12);
  --font: "Manrope", ui-sans-serif, sans-serif;
  --font-display: "Space Grotesk", ui-sans-serif, sans-serif;
  --hero-ink: #1c2390;
  --hero-ink-mid: #52108c;
  --hero-meta: #333333;
  --space-section: clamp(3.5rem, 8vw, 6.5rem);
  --space-page-x: clamp(1.35rem, 5.5vw, 4.5rem);
  --radius-photo: 0;
  --radius-control: 10px;
  --max-width: 1180px;
  --header-h: 4.75rem;
}
```

Update this file when tokens change in production CSS.
