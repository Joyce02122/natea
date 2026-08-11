# RULES.md — Implementation rules

Source of truth for **structure, content scope, and engineering constraints**.  
Pair with `DESIGN.md` for visual tokens. If a choice is unspecified, prefer the simpler option.

**Existing content source**  
https://natea-seattle.my.canva.site/us-taiwan-tech-connect/

**Visual direction**  
`docs/references/hero-speakers.png`, `docs/references/hero-detail.png`, and `DESIGN.md`  
Do **not** copy the Canva site’s dark gradient / circular-panel aesthetic.

---

## 1. Content scope (do not invent)

Only include content present on the existing site. Content may be rearranged for clarity, but titles, names, times, and facts must not be invented.

### Allowed sections (in order)

| # | Section | Source content |
|---|---------|----------------|
| 1 | **Header** | NATEA SEATTLE mark + wordmark; optional in-page nav to sections |
| 2 | **Hero** | Event title, theme line, date, venue, primary CTA |
| 3 | **Featured speakers** | The six headliners with title/org |
| 4 | **Agenda** | Full schedule with times (PT) and session labels |
| 5 | **Panels** | Panel titles, moderators, panelists (text list OK) |
| 6 | **Venue & parking** | Event venue, dinner venue, parking notes |
| 7 | **Register / contact** | CTA + contact email + social links from existing site |
| 8 | **Footer** | Org credit, email, minimal legal/quiet footer |

### Fixed content facts (from live site)

- **Page / org title:** 2025 NATEA Seattle Chapter  
- **Event name:** 2025 U.S. Taiwan Tech Connect  
- **Theme line:** AI Trends & Industry Insights  
- **When:** Saturday, Nov 15, 2025  
- **Where:** University of Washington  
- **Event venue:** Physics and Astronomy Auditorium (PAA 102)  
- **Dinner venue:** William H. Foege Genome Science Building (Vista Cafe)  
- **CTA:** Reserve Your Seat → Google Form on existing site  
- **Contact:** uttc@natea.org  
- **Social:** NATEA LinkedIn company page; Facebook group `natea.seattle`

### Featured speakers (hero grid order)

1. Ethan Tu — Founder, Taiwan AI Labs  
2. Elaine Lu — VP of Engineering Operations, CoreWeave  
3. Shyam Gollakota — Professor of CSE, UW · Co-founder of Hearvana AI  
4. Kwok Cheung — Founder and CEO, KC-Exousia Consulting  
5. Miriam Teng — Principal Accounting Manager, Amazon  
6. Hubert Tsai — Co-Founder & CTO, Cheehoo (Spuree)

### Agenda sessions (keep all)

Use existing times and labels, including:

- Check-in & Networking  
- Opening Remarks & VIP Speech & Group Photo (Host: Josephine Lin, Amazon)  
- Keynotes #1–#3 with titles and speakers  
- Coffee breaks  
- Lightning talks (three talks with titles and speakers)  
- Panel discussions block (intro copy + panels)  
- Closing & Networking  

### Panels (keep all)

1. Startup Journeys & Lessons Learned (+ moderator / panelists)  
2. Career Transitions & Networking (+ moderator / panelists)  
3. Leadership & Management (+ panelists)  
4. From Sensing to Action: The Closed-Loop Revolution of AIoT (+ panelists)  

### Explicitly out of scope

- New marketing sections (sponsors tier tables, blog, news ticker, fake stats)  
- Auth, accounts, cart, live chat  
- Invented speakers, dates, venues, or partner logos not on source content  
- Dark full-bleed recreation of the Canva template  
- Embedding Canva pages/iframes as the site shell  

---

## 2. Page structure rules

1. **Single page** application-style landing: all sections on `index.html` (or equivalent).  
2. **One job per section:** one heading, supporting copy, then content.  
3. **Semantic HTML:** `header`, `main`, `section` (with `id` + `aria-labelledby`), `footer`, lists for agenda/panels.  
4. **Landmarks readable** without CSS (logical document order = reading order).  
5. **Nav links** (if present) only scroll to real section `id`s. No dead menu items.  
6. **External links** (`target="_blank"`) include `rel="noopener noreferrer"`.  
7. **Primary CTA** opens the existing registration URL; do not fake confirmation UI.

---

## 3. Implementation rules

### Stack

- Static **HTML + CSS + minimal JS** (no framework unless required later).  
- No build step required for v1; keep runnable via local static server or file open.  
- Tokens from `DESIGN.md` as CSS custom properties in one stylesheet.

### Assets

- Prefer local assets under `assets/`.  
- Speaker photos: consistent crop, navy photo stage per design.  
- Ribbon: local WebP/PNG/SVG (or CSS approximation of reference). Decorative only (`alt=""`).  
- Company logos: only if available and presentable; otherwise omit logo row rather than inventing marks.

### Behavior

- Soft load animation + ribbon motion per `DESIGN.md` § Motion.  
- Respect `prefers-reduced-motion: reduce`.  
- Focus styles on interactive controls.  
- No scroll hijacking, no autoplaying audio, no forced video background required.

### Code hygiene

- Prefer clarity over abstraction.  
- No unused libraries, analytics SDKs, or leftover Canva script.  
- Keep copy in HTML (not buried only in JS) so content is easy to update later.

---

## 4. Responsive rules

| Viewport | Layout |
|----------|--------|
| **≥1100px** | Hero: type left, ribbon right; speakers up to 6-up; agenda readable multi-column time/content if needed |
| **768–1099px** | Hero compresses; speakers 3-up or 2-up; sections stack cleanly |
| **&lt;768px** | Single column; speakers 2-up if legible else 1-up; nav collapses (simple menu or skip to sections); horizontal overflow forbidden |

### Hard constraints

- Touch targets ≥ 44×44px for primary controls.  
- Body text remains readable over any ribbon overlap (solid type area or sufficient scrim).  
- Images must never force horizontal scroll.  
- Test at ~375px and ~1280px widths as the acceptance pair.

---

## 5. Accessibility rules

- Color contrast ≥ WCAG AA for text.  
- Visible keyboard focus (`--focus` token).  
- Icon-only controls need accessible names.  
- Decorative SVG/images: `aria-hidden="true"` or empty `alt`.  
- Form-less page: still provide skip link to `#main` if useful.  
- Do not convey information by color alone in the agenda.

---

## 6. Visual anti-patterns (avoid)

- Canva dark purple full-bleed panels as the global theme  
- Dashboard heroes (stats rows, multi-widget clutter)  
- Card chrome everywhere (borders + heavy shadows on static copy)  
- Floating badges/chips stuck on top of the ribbon  
- Purple→indigo page gradients as the entire identity (ribbons may be iridescent; page ground stays light)  
- Default font stacks as the intentional brand face (Inter / Roboto / Arial / system-ui as the chosen display)  
- Emoji decoration  
- Invented content “to make it feel fuller”

---

## 7. When content is missing

If a photo, logo, or URL is unavailable:

1. Use a navy photo stage with initials for speakers (**do not** invent fake faces).  
2. Drop company logo slots rather than invent marks.  
3. Keep the textual fact; leave media empty.

User will update content later — structure must make copy swaps easy.

---

## 8. Definition of done

- [ ] `DESIGN.md` + `RULES.md` present and followed  
- [ ] Desktop + mobile layouts work without horizontal scroll  
- [ ] All existing sections rendered; no invented sections  
- [ ] Registration + contact + social links functional  
- [ ] Motion respects reduced-motion  
- [ ] Site is a polished light / indigo / ribbon reinterpretation — not a Canva clone  
