# Tohlda Fitness Gym Bagumbong — Website

A fast, mobile-first, single-page website for **Tohlda Fitness Gym Bagumbong**
(3rd Floor, #536 Ramos Compound, Bagumbong Road, Caloocan City).

No build step, no framework, no dependencies — plain HTML, CSS and JavaScript.
Open `index.html` in a browser and it works.

---

## ⚠️ Before this goes live — things I could not verify

These need a real answer from the gym. Everything is in one place and easy to edit.

| # | What | Where to edit | Status |
|---|------|---------------|--------|
| 1 | **Membership rates** | `index.html` → `#rates` section, the four `.price-card` blocks | **Placeholder figures — must be replaced** |
| 2 | **Phone / mobile number** | `index.html` → `.quickbar` third `.qb-item` | Currently points to Facebook instead |
| 3 | **Exact Google Maps pin** | `index.html` → `#location` `<iframe src>` | Uses a name search; see below to pin it exactly |
| 4 | **Opening hours** | `index.html` `#hours` table **and** `assets/js/main.js` `HOURS` array **and** the JSON-LD block | Sourced from a public listing — please confirm |
| 5 | **Shower facilities** | `index.html` hero badges + FAQ | Lockers confirmed from photos; showers assumed |
| 6 | **Equipment counts** ("40+ machines") | `index.html` → `.stats` | Estimated from photos |

Items 1–4 are the ones that will cause real-world problems if wrong.

### Pinning the map exactly

1. Open Google Maps and search for the gym's own listing.
2. **Share → Embed a map → Copy HTML**.
3. Replace the `src="..."` value on the `<iframe>` in the `#location` section.

While you're there, grab the latitude/longitude and add them to the JSON-LD
block at the bottom of `index.html` so the business shows up correctly in search:

```json
"geo": { "@type": "GeoCoordinates", "latitude": 14.xxxxx, "longitude": 120.xxxxx }
```

The **Directions**, **View on Google Maps** and **Waze** buttons use text search,
so they already work — they just get more precise once the listing is claimed.

---

## What's on the page

| Section | Contents |
|---------|----------|
| Hero | Full-bleed photo, "Challenge Accepted", directions + rates CTAs |
| Quick bar | Address, hours, contact, Google Maps button — always above the fold on scroll |
| About | The gym's story, floor layout, headline stats |
| Facilities | 8 cards covering free weights, machines, cables, cardio, lockers, refuel station, security, PT |
| Rates | 4 membership tiers |
| Gallery | 9 real photos with a keyboard- and swipe-navigable lightbox |
| Hours | Full weekly table, today's row highlighted, live **Open now / Closed** badge |
| Location | Embedded Google Map, Directions / Maps / Waze / Copy-address buttons, travel notes |
| FAQ | 8 common questions |
| Footer | Sitemap, address, socials |

## Features

- **Google Maps everywhere** — embedded interactive map, one-tap Directions,
  View-on-Maps, Waze deep link, copy-address button, and `HealthAndBeautyBusiness`
  JSON-LD structured data with opening hours so Google can surface the gym in
  local search and the Maps knowledge panel.
- **Live opening-hours logic** — the "Open now" badge and highlighted row are
  computed in **Asia/Manila time**, so they stay correct for visitors abroad.
- **Responsive** — the photo grid reflows 4 → 3 → 2 columns with no gaps at any width.
- **Accessible** — skip link, focus-visible outlines, focus-trapped lightbox,
  ARIA labelling, semantic landmarks, and full `prefers-reduced-motion` support.
- **Fast** — 9 photos re-encoded from ~11 MB each down to ~3.9 MB total, lazy-loaded
  below the fold, hero image preloaded. No JS framework.
- **Prints cleanly** and degrades gracefully with JavaScript disabled (the hours
  table, map and all content still work).

## Structure

```
index.html              Whole site
assets/css/style.css    All styling
assets/js/main.js       Nav, scroll-spy, hours logic, lightbox, copy-address
assets/img/             9 optimised photos (full + -sm thumbnails) and the favicon
robots.txt, sitemap.xml SEO
404.html                Fallback page
```

## Running it locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Publishing on GitHub Pages

Repository **Settings → Pages → Source: Deploy from a branch**, pick the branch
and the `/ (root)` folder. The site will be served at
`https://<user>.github.io/Tohlda-Gym-Bagumbong/`.

If you use a custom domain later, update the `canonical`, `og:url`, `url` and
`sitemap.xml` values to match.

## Editing common things

- **Change a rate** — `index.html`, `#rates`, edit the number inside `<p class="price">`.
- **Change hours** — three places, all noted in the table above. They must agree.
- **Swap a photo** — drop a new file in `assets/img/`, keep both a full-size and a
  `-sm` version, then update the `src` and `data-full` attributes on that `.g-item`.
- **Change the accent colour** — `assets/css/style.css`, the `--accent` variable at the top.
