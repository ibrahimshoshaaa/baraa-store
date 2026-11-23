# Baraa — Islamic Clothing Store

**Baraa (براء)** — Modest. Elegant. Timeless.

A premium Islamic clothing storefront: thobes, kurtas, panjabis, abayas and hijabs, with worldwide shipping and cash on delivery. A clean-room rebuild of a reference design (dark emerald green + gold + cream), built for Ibrahim's portfolio.

## Features

- **Bilingual, English + Arabic** — a clear `EN | عربي` toggle in the header. The Arabic version is a full translation (header, hero, sections, products, blog, reviews, newsletter, footer, shop, product, checkout, thank-you, about and contact pages) with full RTL (`dir="rtl"`) and Cairo Arabic typography. The choice is saved in `localStorage` and can be deep-linked with `?lang=ar` / `?lang=en`.
- **Home page** with every section of the design: hero, trust strip, shop-by-category, featured products, "Dress with Faith" banner, newsletter strip, why-choose-us, 20%-off offer banner, blog, testimonials, join-our-community, footer.
- **Shop** with category filters, live search and sorting (featured / price / name).
- **Product pages** (`/product/[slug]`) with colour + size selector, quantity, add to cart and related products.
- **Cart drawer** persisted in `localStorage`, quantity controls, free-shipping progress ($75+).
- **Checkout** — cart summary + customer form (name / phone / address / city) with **cash on delivery**; places the order and generates an order code (e.g. `B-XXXX-XXXX`) shown on the thank-you page.
- **About, Blog (3 posts with full articles) and Contact** pages.
- Prices in **USD** in both languages (as in the original design).
- No database, no admin, no secrets — the catalog is a static file (`src/lib/catalog.ts`) and all 14 photos are local AI-generated images under `public/images/`.

## Tech stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- `next/image` for local images, Google Fonts (Playfair Display, Jost, Cairo)

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm start
```

## Live demo

_TODO: add the Vercel URL after deploying._

## Project structure

```
src/
  app/            # /, /shop, /product/[slug], /checkout, /thank-you, /about, /blog, /blog/[slug], /contact
  components/     # Header, Footer, ProductCard, BagDrawer, CartProvider, ShopClient, ProductDetail, NewsletterForm, BlogPostClient
  lib/
    catalog.ts    # products, categories, blog posts (EN + AR)
    i18n.ts       # bilingual dictionary + LanguageProvider (localStorage + ?lang=)
public/images/    # 14 AI-generated photos
```
