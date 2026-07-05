# CLAUDE.md – Reseguide

Kontext för Claude Code-sessioner på det här projektet.

## Vad det är
Mobil PWA-reseföljeslagare för en bilsemester i Europa 10–19 juli 2026
(Audi A6 e-tron). Statisk sajt, ingen backend. All data i `src/data/trip.js`.

## Stack
- Vite + React 18 + Tailwind CSS 3
- vite-plugin-pwa (Workbox) för manifest + service worker
- lucide-react för ikoner
- Avbockning sparas i `localStorage` (`useChecklist`)
- Ingen backend, inga nätanrop – funkar offline när den cachats

## Deploy
- GitHub Pages via Actions (`.github/workflows/deploy.yml`), auto vid push till `main`
- URL: https://cash2dan.github.io/reseguide/
- `base` i `vite.config.js` MÅSTE matcha reponamnet (`/reseguide/`)

## Viktiga konventioner
- Färger ligger i `src/lib/palette.js`; dagsspecifika färger i `trip.js` (`color`)
- Färgsättning görs med inline-style (inte Tailwind arbitrary values) för att
  hålla parity med den ursprungliga prototypen
- Varje dag har: `n, date, iso, color, icon, title, base, drive, vibe, map,
  mapLabel, see[], plan[[tid,text]], links[[text,url]]`; transportdagar har även
  `legs[]` och ibland `note`
- Google Maps-länkar byggs med `gmap([adresser])` i `trip.js`; laddstopp läggs in
  som waypoints i punktlistan

## Att göra / idéer (backlog)
- [ ] Väder per dag (kräver antingen förhämtad statisk data eller ett API-anrop)
- [ ] "Nästa laddstopp"-genväg
- [ ] Boendeadresser + incheckningstider per bas
- [ ] Dela-knapp / export av avbockad status

## Bygg/kör
```bash
npm install
npm run dev      # lokalt
npm run build    # dist/
```
Deploya ALDRIG manuellt – push till main sköter det via Actions.
