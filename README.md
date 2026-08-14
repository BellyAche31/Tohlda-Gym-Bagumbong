# Tohlda Fitness Gym Bagumbong — Website

A fast, mobile-first, single-page website in the gym's own black-and-white identity, for **Tohlda Fitness Gym Bagumbong**
(3rd Floor, #536 Ramos Compound, Bagumbong Road, Caloocan City).

No build step, no framework, no dependencies — plain HTML, CSS and JavaScript.
Open `index.html` in a browser and it works.

---

## ⚠️ Before this goes live — still outstanding

| # | What | Where to edit | Status |
|---|------|---------------|--------|
| 1 | **Phone / mobile number** | `index.html` → `.quickbar` third `.qb-item` | Missing — currently points to Facebook |
| 2 | **Google Maps embed URL** | `index.html` → `#location` `<iframe src>` | Buttons use the official share link; the iframe still uses a name search |
| 3 | **Opening hours** | `index.html` `#hours` table **and** `assets/js/main.js` `HOURS` array **and** the JSON-LD block | From a public listing — please confirm |
| 4 | **Heading font** | `assets/css/style.css` → `--f-display` | Archivo Black, matched to the "Challenge Accepted" wall lettering. The logo itself is the real artwork, so no font substitution there. |
| 5 | **Equipment count** ("40+") | `index.html` → `.stats` | Estimated from photos |

### Confirmed and already in the site

- **All rates**, taken from the front-desk rate card: annual membership ₱300
  (waived on the 3- and 6-month rates); member ₱80/session, ₱650/10 sessions,
  ₱800/month, ₱2,200/3 months, ₱3,700/6 months; non-member ₱100/session,
  ₱950/month; personal training ₱300 / ₱1,300 / ₱2,300 / ₱3,200 for
  1 / 5 / 10 / 15 sessions.
- **Free WiFi.**
- **Water** — unlimited purified water is ₱10, paid at the front desk
  (not free, per the sign on the post).
- **House rules** — transcribed from the board on the floor.
- **24 numbered lockers** with a changing area. *(Showers are not claimed
  anywhere on the site, since they weren't visible in the photos.)*

### Getting the exact map embed

The Directions / View-on-Maps / Waze buttons already use the gym's own
Google listing, so they land on the right pin. Only the embedded iframe still
searches by name. To fix it:

1. Open the gym's Google Maps listing.
2. **Share → Embed a map → Copy HTML**.
3. Replace the `src="..."` on the `<iframe>` in the `#location` section.

While there, grab the coordinates and add them to the JSON-LD block:

```json
"geo": { "@type": "GeoCoordinates", "latitude": 14.xxxxx, "longitude": 120.xxxxx }
```

## What's on the page

| Section | Contents |
|---------|----------|
| Hero | Full-bleed photo, "Challenge Accepted", directions + rates CTAs |
| Quick bar | Address, hours, contact, Google Maps button — always above the fold on scroll |
| About | The gym's story, floor layout, headline stats |
| Facilities | 9 cards covering free weights, machines, cables, cardio, lockers, refuel station, security, PT, free WiFi |
| Rates | Annual membership banner + Member / Non-Member / Personal Training rate cards |
| Gallery | 9 real photos with a keyboard- and swipe-navigable lightbox |
| Hours | Full weekly table, today's row highlighted, live **Open now / Closed** badge |
| Location | Embedded Google Map, Directions / Maps / Waze / Copy-address buttons, travel notes |
| FAQ | 9 common questions plus the gym house rules |
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
- **The real logo** — extracted from the supplied artwork into transparent
  `logo-white.png` / `logo-black.png` for either ground, plus `logo-square.png`
  as the favicon and touch icon.
- **Strictly black and white** — matching the gym's own identity. Every photo is
  rendered in greyscale, and the accent colour flips from black to white inside
  dark sections via a single CSS variable, so contrast holds everywhere.
- **Prints cleanly** and degrades gracefully with JavaScript disabled (the hours
  table, map and all content still work).

## Structure

```
index.html              Whole site
assets/css/style.css    All styling
assets/js/main.js       Nav, scroll-spy, hours logic, lightbox, copy-address
assets/img/             9 optimised photos (full + -sm thumbnails) and the logo set
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

- **Change a rate** — `index.html`, `#rates`, edit the `<b>` value in the relevant `.rate-list` row.
- **Change hours** — three places, all noted in the table above. They must agree.
- **Swap a photo** — drop a new file in `assets/img/`, keep both a full-size and a
  `-sm` version, then update the `src` and `data-full` attributes on that `.g-item`.
- **Change the display font** — `assets/css/style.css`, the `--f-display` variable at the top,
  and the Google Fonts `<link>` in `index.html`.
- **Resize the logo** — `assets/css/style.css`, `.brand-logo` height. It's a three-line
  stacked lockup, so `--header-h` needs to stay comfortably taller than it.
