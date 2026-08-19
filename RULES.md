# RULES.md — Implementation rules

Source of truth for **structure, content scope, and engineering constraints**.  
Pair with `DESIGN.md` for visual tokens. If a choice is unspecified, prefer the simpler option.

**Live content source of truth:** `index.html` (and linked assets).  
**Visual direction:** `DESIGN.md` + production CSS.

---

## 1. Content scope (do not invent)

Do not invent speakers, times, venues, partners, or URLs. Rearrange only for clarity. Update facts in HTML first, then docs.

### Allowed sections (in order)

| # | Section | Notes |
|---|---------|--------|
| 1 | **Header** | NATEA wordmark; in-page nav; **RSVP** → registration form |
| 2 | **Hero** | Title, tagline, date + UW, **Reserve your seat** |
| 3 | **Featured speakers** | Six headliners + roles + company logos when assets exist |
| 4 | **Event agenda** | Full schedule, PT times, panel labels + people lines |
| 5 | **Career Roundtables** | Three themes; small mentor photo + **name + role** (no long Career Focus bios) |
| 6 | **Venue** | Oak Hall Denny Room + official UW link |
| 7 | **Footer** | Organizer logos strip; email; Facebook; LinkedIn |

### Fixed content facts (2026)

- **Event:** U.S. Taiwan Tech Connect 2026  
- **Title lines:** `U.S. TAIWAN` / `TECH CONNECT 2026`  
- **Tagline:** Bridging AI: Taiwan innovation meets Seattle Tech  
- **When:** Saturday, October 24, 2026 · 1:30 – 6:30 PM PT  
- **Campus:** University of Washington  
- **Event venue:** Oak Hall Denny Room  
- **Hero CTA:** Reserve your seat → Google Form  
- **Nav CTA:** RSVP → same form  
- **Contact:** uttc@natea.org  
- **Social:** Facebook group `natea.seattle`; NATEA LinkedIn company page  

### Featured speakers (order)

1. JC Pan — VP, Cloud Supply Chain Sourcing  
2. Frank Wang — Director, Deep Learning & CV  
3. Wee Hyong Tok — Partner Director, Data & AI  
4. Jenny Jau — Director, Generative AI Visual Media  
5. Denny Lee — PM Director, Developer Relations, Data & AI  
6. Robert Chen — CTO, AI & Agentic Systems  

### Agenda sessions (keep labels accurate)

- Speaker Arrival & Networking  
- Welcome & Opening Remarks  
- Panel 1: Talent Evolution — Skills & Profiles in the AI Era  
- Break  
- Panel 2: Product Evolution — From LLMs to Agentic AI  
- Break  
- Career Roundtables  
- Open Networking & Closing  

### Career Roundtable themes

1. Engineering & Technical Leadership  
2. Product & AI Transformation  
3. Design, UX & Human-Centered AI  

### Explicitly out of scope

- Networking mini-app / secondary products on this page  
- Auth, accounts, cart, live chat  
- Invented speakers, dates, venues, or logos  
- Sponsor matrix, blog, news ticker, or fake stats “to fill space”  
- Separate dark template as the global skin  

---

## 2. Page structure rules

1. **Single page** on `index.html`.  
2. **One job per section:** one heading, short lead when needed, then content.  
3. **Semantic HTML:** `header`, `main`, `section` (`id` + `aria-labelledby`), `footer`.  
4. Document order = reading order without CSS.  
5. Nav only to real `id`s (`#speakers`, `#agenda`, `#roundtables`, `#venue`).  
6. External links: `target="_blank"` + `rel="noopener noreferrer"`.  
7. Primary CTAs open the real registration URL — no fake “success” UI.  

---

## 3. Implementation rules

### Stack

- Static **HTML + CSS + minimal JS** (no framework unless required later).  
- No build step required; run with a local static server.  
- Tokens in `css/styles.css` as CSS custom properties; keep `DESIGN.md` in sync.  

### Assets

- Live under `assets/` (hero, speakers, company logos, organizers, favicon).  
- Hero: one production photo (`hero-base.jpg`); warp via canvas in `js/main.js`.  
- Do not ship unused multi-megabyte source dumps by default.  
- **Header logo:** NATEA wordmark. **Tab icon:** ribbon favicon.  

### Behavior

- Hero warp + scroll reveal per `DESIGN.md` motion.  
- Respect `prefers-reduced-motion: reduce`.  
- Focus styles on interactive controls.  
- No scroll hijacking; no autoplay audio/video requirement.  

### Code hygiene

- Clarity over abstraction.  
- No unused libraries or analytics unless product asks.  
- Keep copy in HTML so content edits stay easy.  

---

## 4. Responsive rules

| Viewport | Layout |
|----------|--------|
| **≥1100px** | Hero type left; speakers multi-up; full nav |
| **768–1099px** | Hero compresses; fewer speaker columns |
| **&lt;768px** | Single column content; collapse nav; no horizontal overflow |

### Hard constraints

- Touch targets ≥ 44×44px for primary controls.  
- Type remains legible over ribbon photo.  
- Images must never force horizontal scroll.  
- Acceptance pair: ~375px and ~1280px widths.  

---

## 5. Accessibility rules

- Text contrast ≥ WCAG AA.  
- Visible keyboard focus.  
- Icon-only controls need accessible names.  
- Decorative images: empty `alt` / `aria-hidden`.  
- Skip link to `#main`.  
- Do not convey agenda only by color.  

---

## 6. Visual anti-patterns (avoid)

- Dashboard heroes (stats rows, multi-widget clutter)  
- Heavy card chrome on non-interactive blocks  
- Floating badges/chips on the hero photo  
- Full-page purple gradient as the only identity  
- Mint/green venue wash (use soft **blue**)  
- Inter / Roboto / Arial / system-ui as the chosen display face  
- Emoji decoration  
- Invented content “to make it feel fuller”  

---

## 7. When content is missing

1. Speaker photo missing → navy stage + initials (never fake faces).  
2. Company logo missing → omit the logo, keep text.  
3. Keep the factual string; leave media empty.  

---

## 8. Definition of done

- [ ] `DESIGN.md` + `RULES.md` match production  
- [ ] Desktop + mobile layouts work without horizontal scroll  
- [ ] Only allowed sections; no invented content  
- [ ] RSVP / Reserve your seat + contact + social work  
- [ ] Motion respects reduced-motion  
- [ ] Header wordmark + ribbon favicon as specified  
- [ ] Light / indigo / ribbon composition reads as one polished site  
