# 2025 U.S. Taiwan Tech Connect

Static conference site for NATEA Seattle, rebuilt from the [existing Canva page](https://natea-seattle.my.canva.site/us-taiwan-tech-connect/) with a new visual system.

## Docs

- [`DESIGN.md`](./DESIGN.md) — visual system
- [`RULES.md`](./RULES.md) — structure & implementation rules

## Run locally

```bash
python3 -m http.server 4173
```

Open http://localhost:4173 (event site) or http://localhost:4173/network.html (attendee networking app).

## Structure

```
index.html          — conference landing
network.html        — attendee networking (recommended + browse/filter)
css/styles.css
css/network.css
js/main.js
js/network.js
assets/
docs/references/
DESIGN.md
RULES.md
```
