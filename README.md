# U.S. Taiwan Tech Connect 2026

This is the public website for **U.S. Taiwan Tech Connect 2026**, an in-person tech conference hosted by the **NATEA Seattle Chapter** (North America Taiwanese Engineers’ Association).

NATEA brings together Taiwanese and Taiwanese-American professionals in engineering and technology. This event is the chapter’s yearly bridge between **Taiwan’s innovation ecosystem** and the **Seattle tech community**—sharing AI and industry insights, and opening space for career conversations and networking.

The site is a lightweight one-pager so attendees can learn about the program, see featured speakers and roundtable mentors, check the venue, and **RSVP / reserve a seat**.

## Docs

- [`DESIGN.md`](./DESIGN.md) — visual system (tokens, layout, motion)
- [`RULES.md`](./RULES.md) — content scope & implementation constraints

## Event

| | |
|---|---|
| **When** | Saturday, Oct 24, 2026 · 1:30 – 6:30 PM PT |
| **Where** | University of Washington — Oak Hall Denny Room |
| **Contact** | [uttc@natea.org](mailto:uttc@natea.org) |
| **RSVP** | Zeffy linked from the hero CTA and header |

## Run locally

```bash
python3 -m http.server 4173
```

Open http://localhost:4173

## Structure

```
index.html
css/styles.css
js/main.js
assets/          # hero, speakers, company logos, organizers, favicon
README.md
DESIGN.md
RULES.md
```

## Notes

- Static HTML / CSS / minimal JS — no build step.
- Current line: GitHub release **`v2.0.1`**.
