# Reseguide – Europa 2026

Mobil PWA-reseföljeslagare för bilsemestern 10–19 juli 2026. Dag-för-dag med
färgkodade dagskort, kartrutter rakt in i Google Maps (laddstopp som waypoints),
etapp-för-etapp-körschema, avbockning som sparas lokalt, och offline-stöd.

Byggd med **Vite + React + Tailwind** och **vite-plugin-pwa**. All reseplansdata
ligger i `src/data/trip.js` – redigera den filen för att uppdatera innehållet.

## Kom igång lokalt

```bash
npm install
npm run dev
```

Öppna adressen som visas (t.ex. http://localhost:5173/reseguide/).

## Bygg

```bash
npm run build      # bygger till dist/
npm run preview    # förhandsgranska produktion lokalt
```

## Deploy till GitHub Pages (auto)

1. Skapa ett repo som heter **`reseguide`** under kontot `cash2dan` och pusha koden till `main`.
2. Gå till repo → **Settings → Pages → Build and deployment → Source = GitHub Actions**.
3. Varje push till `main` bygger och publicerar automatiskt via `.github/workflows/deploy.yml`.
4. Sajten hamnar på **https://cash2dan.github.io/reseguide/**

> Byter du reponamn: ändra `base` i `vite.config.js` och sökvägarna i `index.html`
> till `/<nytt-namn>/`, annars bryts CSS/JS-länkarna på Pages.

## Installera som app (PWA)

Öppna sajten i mobilen → dela/meny → **Lägg till på hemskärmen**. Efter första
besöket cachas allt av service workern och guiden fungerar offline i bilen.

## Struktur

```
src/
  data/trip.js          # ← allt innehåll (dagar, rutter, laddstopp, länkar)
  lib/palette.js        # färger + rgba-hjälpare
  hooks/useChecklist.js # avbockning i localStorage
  components/
    RouteRail.jsx       # dagväljare högst upp
    DayCard.jsx         # dagskort (banner, karta, schema, avbockning)
    Collapsible.jsx     # hopfällbar sektion
    MapButton.jsx       # stor Google Maps-knapp
  App.jsx               # skal, sticky header, navigering
  main.jsx              # mount + SW-registrering
```

## Vanliga ändringar

- **Ändra en tid, laddstopp eller länk:** redigera dagen i `src/data/trip.js`.
- **Lägg till en dag:** lägg till ett objekt i `DAYS` (glöm inte `iso`-datum och `icon`-nyckel).
- **Byt ikon för en dag:** sätt `icon` till en nyckel i `ICONS` i `DayCard.jsx`.
