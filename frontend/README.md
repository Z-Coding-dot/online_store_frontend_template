# Arden House — white-label online store

A responsive React + TypeScript storefront foundation built for rebranding. The app uses a config/data layer, typed Redux cart and wishlist state, cookie-ready API boundaries, and locale-aware English, Dari, and Pashto UI.

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

Validation commands:

```bash
npm run typecheck
npm run lint
npm run build
```

The production build includes an installable PWA manifest, service worker, and app icons. Serve `dist/` over HTTPS (or localhost) to test installation from a supported browser.

## Rebrand for a new client

1. Edit only `src/data/siteConfig.ts` for the client name, logo text, palette, currency, contact details, social links, feature flags, payment methods, and shipping methods.
2. Replace images and fonts under `src/assets/` or update the client data image URLs in `src/data/`.
3. Update locale copy in `src/i18n/locales/` and keep the same keys across all enabled languages.
4. Replace products, categories, brands, hero slides, reviews, and editorial content in `src/data/`.
5. Set `VITE_USE_MOCK=false` and `VITE_API_BASE_URL` for production.
6. Adapt the `*.http.ts` service implementations to the backend response shapes while preserving the service interfaces and the contract in `docs/API_CONTRACT.md`.

No component should need to change for a new store identity. Keep product prices in integer minor units and use `formatPrice()` for every display.
