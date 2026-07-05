import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// Repo name for GitHub Pages project site: https://cash2dan.github.io/reseguide/
// If you rename the repo, change BASE to match ("/<repo-name>/").
const BASE = "/reseguide/";

export default defineConfig({
  base: BASE,
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "apple-touch-icon.png"],
      manifest: {
        lang: "sv",
        name: "Reseguide – Europa 2026",
        short_name: "Reseguide",
        description: "Bilsemester i Europa 10–19 juli 2026. Dag-för-dag med kartrutter och laddstopp.",
        theme_color: "#2E5339",
        background_color: "#FBF9F5",
        display: "standalone",
        orientation: "portrait",
        scope: BASE,
        start_url: BASE,
        icons: [
          { src: "icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,woff2}"],
        navigateFallback: BASE + "index.html",
      },
    }),
  ],
});
