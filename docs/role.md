ROLE
You are a senior art director + frontend architect. Build a production-grade, white-label E-commerce / Online Store frontend template that I will resell to multiple clients. Rebranding for a new client must require editing ONLY: src/data/siteConfig.ts (name, logo, colors, currency, contact, socials, SEO, payment/shipping options), src/assets/, and src/i18n locale files. No component code changes. The result must look like a professionally designed, agency-made store, not an AI-generated template.

TECH STACK
- React 18 + TypeScript (strict mode) + Vite, path alias "@/" â†’ src/
- Tailwind CSS (latest stable) with design tokens via CSS variables
- react-i18next + i18next-browser-languagedetector: languages "en", "fa-AF" (Dari), "ps" (Pashto). Max 3.
- react-router-dom (lazy-loaded routes)
- Redux Toolkit + react-redux (auth, cart, wishlist, UI), with persistence of cart and wishlist only (localStorage, versioned)
- React Context (only i18n/direction and theme)
- Framer Motion (animations), embla-carousel-react (sliders/carousels)
- react-hook-form + zod (forms/validation)
- axios (API layer), lucide-react (icons), clsx + tailwind-merge, react-helmet-async
- ESLint + Prettier
No other UI kit (no MUI/Chakra). All UI is custom-built.

FOLDER STRUCTURE (follow exactly, TypeScript versions)
frontend/
â”œâ”€ public/
â”œâ”€ src/
â”‚  â”œâ”€ api/            client.ts (axios), endpoints.ts, types.ts (types + zod schemas)
â”‚  â”œâ”€ assets/         logo, images, fonts, icons
â”‚  â”œâ”€ components/
â”‚  â”‚  â”œâ”€ layout/      Navbar, TopBar, Footer, Container, Section, PageLayout, PageHeader, LanguageSwitcher, ScrollToTop, ScrollProgress, MegaMenu, MobileDrawer, Breadcrumbs
â”‚  â”‚  â””â”€ ui/          Button, Card, Input, Textarea, Select, Checkbox, Radio, Modal, Drawer, Badge, Accordion, Tabs, Avatar, Skeleton, Toast, Rating, Pagination, QuantityStepper, PriceTag, SectionHeading, ProductCard, CategoryCard, CartItem, CartDrawer, OrderSummary, FilterSidebar, SortDropdown, PriceRangeSlider, ProductGallery, VariantSelector, ReviewCard, TestimonialCard, BlogCard, FeatureItem, PromoBanner, Newsletter, Hero, HeroSlider, CTASection, AnimatedWrapper, EmptyState
â”‚  â”œâ”€ context/        ThemeContext, LanguageContext (sets dir="rtl"/"ltr" and lang on <html>)
â”‚  â”œâ”€ data/           siteConfig.ts, navigation.ts, static content (products, categories, brands, reviews, FAQs, blog posts, hero slides, promo banners, shipping methods, payment methods)
â”‚  â”œâ”€ hooks/          useScrollPosition, useMediaQuery, useDebounce, useInView, useAuth, useDirection, useCart, useWishlist, useProductFilters (syncs filters with URL query params), useFormatPrice
â”‚  â”œâ”€ i18n/           index.ts + locales/en.json, fa-AF.json, ps.json
â”‚  â”œâ”€ pages/          one folder per page
â”‚  â”œâ”€ redux/          store.ts, slices (auth, cart, wishlist, ui), typed hooks
â”‚  â”œâ”€ services/       auth, products, categories, cart, orders, reviews, contact, newsletter, payment (each with .mock.ts and .http.ts, factory in index.ts)
â”‚  â”œâ”€ utils/          helpers, constants, validators, cn(), formatPrice, formatNumber
â”‚  â”œâ”€ App.tsx
â”‚  â”œâ”€ main.tsx
â”‚  â””â”€ index.css       â† the ONE global stylesheet
â”œâ”€ .env.example
â”œâ”€ eslint.config.js
â”œâ”€ index.html
â”œâ”€ package.json
â””â”€ .gitignore

PAGES
1. Home (hero slider, quick benefits strip, categories, featured products, promo banners, best sellers, new arrivals, brands, testimonials, newsletter)
2. Shop (product listing: search, filters by category/brand/price/rating/availability, sort, grid/list toggle, pagination or load more, filters synced to URL)
3. Category (same listing component, category header)
4. Product Details (gallery with zoom, variants (size/color), price/discount, stock state, quantity, add to cart, add to wishlist, tabs: description/specs/reviews, related products, recently viewed)
5. Cart (page + slide-over CartDrawer; quantity edit, remove, coupon field, shipping estimate, order summary)
6. Checkout (multi-step: contact â†’ shipping address â†’ shipping method â†’ payment method â†’ review; guest and logged-in; validation; order summary sidebar)
7. Order Success (order number, summary)
8. Order Tracking (order number + phone lookup, status timeline)
9. Wishlist
10. About
11. Contact (form, info, map placeholder, hours)
12. Blog list + Blog detail (optional, behind a siteConfig feature flag)
13. FAQ / Shipping & Returns / Privacy / Terms (one reusable ContentPage component)
Account (protected): Dashboard, My Orders, Order Detail, Profile, Addresses, Change Password.
Auth: Login, Sign Up, Forgot Password. Plus 404.
Feature flags in siteConfig: wishlist, reviews, blog, coupons, guestCheckout, recentlyViewed, newsletter, compare (off by default).

REUSABILITY RULES
- Every UI piece is a typed, reusable component with props and variants (size, variant, color) via a variant map. No copy-pasted markup.
- Pages contain only composition of components + data from src/data. No hardcoded text: every string comes from i18n keys.
- Layout primitives: Container, Section (spacing, background variants, id), SectionHeading (title, subtitle, alignment).
- Content lives in src/data and locale files, never inside components. Product and category content is translatable per locale (name, description) in data files and API types.
- ProductCard, ProductGrid and FilterSidebar are reused by Shop, Category, Search, Wishlist, Related, Home sections.

COMMERCE RULES
- Money: store prices as integers in the smallest unit; format only through formatPrice() using Intl.NumberFormat with currency and locale from siteConfig. Never use floating-point math for totals.
- Cart: add/update/remove, variant-aware line items (productId + variantId), stock limits, max quantity per item, persisted. Cart totals shown in the UI come from a pure function calculateTotals() in utils; when the backend is active, the server response is the source of truth and replaces local totals.
- Price display: current price, compare-at price with discount badge computed from data. No fake countdowns, no fake "only 2 left" or "12 people viewing" urgency. Low-stock text only if real stock data exists and is below a threshold set in siteConfig.
- Coupons: validated through the service layer, never in components.
- Checkout validation with zod per step; payment methods and shipping methods come from siteConfig/services. Default payment: Cash on Delivery; others (card, bank transfer, mobile wallet) are provider implementations behind one PaymentProvider interface. No card data is ever handled or stored by the frontend; card payments redirect to or embed the provider's hosted fields.
- Order placement is idempotent (client-generated idempotency key), disables the submit button while pending, and handles failure states.
- Stock/price changes between cart and checkout: re-validate on checkout and show a clear message.

API & SERVICES
- .env.example: VITE_API_BASE_URL= and VITE_USE_MOCK=true
- src/api/client.ts: axios instance using VITE_API_BASE_URL, withCredentials: true, interceptors, centralized error normalization, 401 handling (logout + redirect), timeout, retry for idempotent GET only.
- src/api/endpoints.ts: typed endpoint constants. src/api/types.ts: types + zod schemas; validate all responses with zod.
- Each service exposes ONE interface with two implementations (*.mock.ts using src/data with simulated latency, *.http.ts using the api client). A factory in src/services/index.ts selects by VITE_USE_MOCK. Components and hooks never know which is active.
- In-memory cache with TTL for GET responses in the services layer.
- Include docs/API_CONTRACT.md listing every endpoint, method, query params (pagination, filters, sort), request body, response shape and error format so any backend developer can implement it. Include products list/detail, categories, cart validation, coupons, shipping quote, orders (create/list/detail/track), reviews, auth, profile, addresses, contact, newsletter.

AUTH
- Designed for httpOnly-cookie sessions (default). Do NOT store JWTs in localStorage.
- Redux keeps only non-sensitive user info (name, role).
- Endpoints: POST /auth/login, /auth/register, /auth/logout, /auth/forgot-password, GET /auth/me. Protected route wrapper calls /auth/me on app load.
- Beautiful split-screen Login and Sign Up (real photo side + form side), zod validation, show/hide password, loading and error states, social-login placeholders, mock auth service.
- Guest cart merges into the user cart after login.

STYLING RULES
- ALL styles live in src/index.css: Tailwind directives, CSS variable design tokens (colors, radius, shadows, fonts) that siteConfig overrides at runtime, and reusable classes with @layer components + @apply (.btn, .btn-primary, .card, .container-app, .section, .input, .heading-1...). Components use these classes; avoid long inline utility strings.
- Use logical properties (ms-, me-, ps-, pe-, start-, end-) so RTL/LTR works without duplicate styles.
- Fully responsive, mobile-first (most store traffic is mobile): sticky mobile bottom bar for Add to cart on product pages, filter drawer on mobile, thumb-friendly 48px targets.

DESIGN DIRECTION
BANNED (delete anywhere they exist):
- Pill/badge above headlines; floating cards overlapping images; fake stats, ratings, reviews, urgency or social-proof claims
- Gradient blobs, blurred color washes, glassmorphism, gradient text, glow shadows
- Negative letter-spacing below -0.02em; font-weight 800/900 headlines
- Gray body text on gray/tinted backgrounds; low-contrast text
- Emoji, decorative sparkle icons, "icon in colored rounded square" on every card
- Three identical cards in a row as the default layout for every section
- Generic AI copy and taglines ("elevate your lifestyle", "curated just for you")
- AI-generated images; two-column hero (text left, image right)

COLOR (tokens in index.css; rebranded via siteConfig)
- Backgrounds: #FFFFFF default, #F5F5F4 as the only alternate tint, one primary-dark or black band per page (promo/footer). No gray washes.
- Text: headings #0B1220, body #1F2937 (min 7:1 on white), muted #4B5563 (min 4.5:1). Never lighter.
- One primary color + one accent (accent only for sale badges, price discounts and primary CTA). Default palette: neutral black/white with one warm accent. Provide 3 preset palettes in siteConfig.
- Borders 1px solid #E5E7EB instead of heavy shadows. Shadows only on dropdowns, drawers, modals.
- Dark mode: off by default, optional via siteConfig flag. Do not ship it half-finished.

TYPOGRAPHY (self-host via @fontsource, font-display: swap)
- English headings: "Fraunces" or "Playfair Display" (client-switchable in siteConfig), weight 500-600. Body/UI: "Figtree", 400/500/600.
- Dari/Pashto: "Noto Sans Arabic" for headings and body. Verify Pashto letters (Ù¼ Ú‰ Ú“ Ú– Úš Ú¼) render; if not, use "Noto Naskh Arabic".
- Scale: H1 clamp(2.5rem, 5vw, 4rem), line-height 1.1, letter-spacing -0.01em max. H2 clamp(2rem, 3.5vw, 2.75rem). Body 16-17px (product UI) / 18px (editorial), line-height 1.6. Max text width 65ch.
- Arabic-script: line-height 1.8, letter-spacing 0, no uppercase/tracking, +1-2px larger than Latin.
- Prices use tabular numerals. Eyebrow labels max one per section, never in Arabic-script languages.

HOME HERO = CENTERED AUTO SLIDER
- Full-width, height min(85vh, 760px), 3-5 slides from data (hero_slides: image, headline, subtitle, primary CTA, secondary CTA, order, active, translatable).
- Each slide: real full-bleed photography (products in context, consistent color grading) with a uniform dark overlay (rgba(11,18,32,0.5)) so white text passes AA. Content CENTERED horizontally and vertically: headline (max 10 words), one subtitle line, two buttons side by side (solid primary + outline white). Single column only. No cards, badges, or side image.
- Behavior: autoplay 6s, pause on hover/focus, crossfade + subtle 1.05â†’1 scale, prev/next arrows at vertical middle edges (mirrored in RTL), centered dots with progress indicator, keyboard arrows, touch swipe, preload only first image, lazy-load the rest, pause when tab hidden, autoplay disabled under prefers-reduced-motion.
- Directly below: a benefits strip (shipping, returns, support, secure payment) as one bordered full-width bar with plain text and thin line icons, content from siteConfig.

INNER PAGE HERO
- Not a slider. Compact centered banner (200-280px): photo with uniform overlay or solid primary band, centered H1, breadcrumbs below. One PageHeader component for all pages, content from props. On Shop/Category, keep it very compact so products appear above the fold.

LAYOUT VARIETY (no repeating card grids)
- Home: hero slider â†’ benefits strip â†’ category tiles as large photo mosaic (mixed sizes) â†’ featured products grid (4-col desktop, 2-col mobile) â†’ full-width promo banner (photo, centered text) â†’ best sellers carousel â†’ split feature/story block (photo + text) â†’ new arrivals grid â†’ brands row (logos, plain) â†’ one large testimonial â†’ newsletter band â†’ footer.
- Alternate white / #F5F5F4 sections. Section spacing 96-128px desktop, 64px mobile. 12-column grid, container 1280px, consistent gutters.
- Product card: portrait photo 4:5 with second image on hover, name, price, compare-at price, rating only if real data. Quick add button appears on hover (desktop) and always visible on mobile. One consistent card across the site.
- Radius: 8px for cards/buttons/inputs, 999px only for avatars/badges count. Buttons: solid primary, outline secondary, 48px height, medium weight.
- Navbar: solid white, thin TopBar (shipping notice, phone, language switcher, currency if enabled), main bar with logo, search (debounced with suggestions dropdown), account, wishlist, cart with count; mega menu for categories on desktop, drawer on mobile. Sticky on scroll with reduced height.
- Footer: link columns, newsletter, payment icons (plain), contact, social, copyright from siteConfig.
- Every page has a distinct composition: Product Details = gallery left sticky + info right (this two-column layout is allowed here, it is a product page, not a hero); Cart = line items + sticky summary; Checkout = steps + summary sidebar; Account = sidebar nav + content; Auth = split screen with photo; Blog = editorial layout.

IMAGERY
- Real photographs only (client's own or licensed Unsplash/Pexels; verify license), consistent grade. Aspect ratios: product 4:5, category 3:4 or 1:1, hero 16:9, banner 21:9.
- Ship local sample photos and sample products (at least 24 products, 6 categories, 6 brands) in src/data and src/assets, all replaceable. Where no image exists use a neutral solid tone, never a fake illustration.
- Optimized: webp, srcset/sizes, width/height set (no layout shift), blur-up placeholder, lazy loading below the fold.

MOTION (restrained)
- Reveal: opacity 0â†’1 + translateY 12pxâ†’0, 400ms, cubic-bezier(0.22,1,0.36,1), once per element, stagger max 60ms, max 2 animated elements per viewport at once.
- Hover: image scale 1.03, second-image swap, link underline slide. Add-to-cart feedback: button state change + cart count update + drawer opens. Nothing bounces, floats, pulses or glows.
- Page transition: 200ms fade only. Respect prefers-reduced-motion. Keep ScrollToTop, back-to-top button, 2px progress bar.

i18n
- Language switcher in navbar, persisted in localStorage; auto-set document dir and lang.
- Complete translations in en, fa-AF, ps for every page and component (no missing keys; fallback en).
- Prices, dates, numbers, and plurals formatted per locale with Intl and i18next plurals. Digit style (Latin vs Arabic-Indic) configurable in siteConfig.

SYSTEM-DESIGN PRINCIPLES (frontend-relevant only, github.com/karanpratapsingh/system-design)
- Layered architecture: UI â†’ hooks â†’ services â†’ api. Separation of concerns.
- Route-level code splitting; lazy images; prefetch product page data on card hover.
- Caching in the services layer (TTL); memoization only where measured.
- Debounce search; throttle scroll handlers; virtualization not needed unless lists exceed 200 items.
- Centralized error handling (interceptors, ErrorBoundary, toast); skeletons for all loading states; empty states for empty cart, wishlist, no results, no orders.
- Config-driven design (siteConfig) for white-label reuse.
- SEO: react-helmet-async per page, JSON-LD Product schema on product pages, Open Graph tags, semantic HTML, canonical URLs, accessible (aria, keyboard nav, focus states, labels on all inputs).

COPY
- Short, concrete, specific text. Max 10 words per headline. No invented statistics, reviews, or testimonials in production: sample data is clearly marked "sample" in the data files.

DELIVERABLES
1. Working scaffold with all folders/files above, install/run instructions, .env.example.
2. Complete code for every component, page, slice, service, hook, and locale file. No placeholders or "..." omissions.
3. docs/API_CONTRACT.md as described.
4. README with "How to rebrand for a new client" (step by step: siteConfig, logo, palette, fonts, currency, languages, products/categories, hero slides, payment/shipping options, VITE_USE_MOCK=false + VITE_API_BASE_URL to go live, adapting *.http.ts if the backend shapes differ).
5. Everything passes tsc --noEmit, ESLint, and vite build with no errors. Lighthouse mobile: performance â‰¥ 85, accessibility â‰¥ 95 on Home and Product Details.

WORKFLOW
Before coding, list in 10 lines: tokens, fonts, and the layout used per page. Build in this order and confirm each step compiles before moving on: (1) scaffold + config + index.css tokens, (2) i18n + contexts + redux (cart/wishlist/auth), (3) layout + ui components, (4) services + mock data + API contract, (5) Home + Shop + Category + Product Details, (6) Cart + Checkout + Order Success + Tracking, (7) Auth + Account pages, (8) remaining pages, (9) animation/polish, (10) screenshots at 1440/768/390 in LTR (en) and RTL (fa-AF, ps), self-review against the BANNED list, fix violations, (11) README.
If any requirement is ambiguous, ask me one precise question before proceeding.
