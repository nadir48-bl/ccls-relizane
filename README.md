# CCLS RELIZANE — Landing Page

Single-page site for **CCLS RELIZANE — تعاونية الحبوب والبقول الجافة غليزان**, the cereals and dry-legumes cooperative of Relizane, Algeria, operating under OAIC and the Ministry of Agriculture.

The page is built as a **server component** (`app/page.tsx`); only the small pieces that need the browser — smooth scrolling, reveals, counters, the news slideshow, the marquee and the sticky header — are client components.

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS v4** with design tokens in `app/globals.css`
- **GSAP + ScrollTrigger** for reveals, counters and the hero entrance
- **Lenis** for smooth scrolling and gliding anchor navigation
- **lucide-react** icons
- **Alexandria** (headings) and **IBM Plex Sans Arabic** (body) via `next/font/google`

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

### Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Production build for a Node host (Vercel, VPS) |
| `npm start` | Serve the production build |
| `npm run build:static` | Static export into `out/` for Apache/cPanel hosting |
| `npm run lint` | ESLint |

## Deployment

### 1. Node host (Vercel / VPS)

```bash
npm run build
npm start
```

### 2. Static hosting (Apache / cPanel)

```bash
npm run build:static
```

Upload the generated `out/` folder to the web root. The page is fully static and needs no Node runtime. The `STATIC_EXPORT` flag in `next.config.ts` turns on `output: 'export'` and unoptimized `next/image` output for this mode.

Set `NEXT_PUBLIC_SITE_URL` before building so OpenGraph/canonical URLs use the production domain:

```bash
NEXT_PUBLIC_SITE_URL=https://example.dz npm run build
```

## Content and placeholders

**All visible strings live in `lib/content.ts`.** Components do not contain copy, so updating the site means editing that one file.

The brief's placeholder tokens are intentionally preserved:

- `[[ADDRESS]]`, `[[PHONE]]`, `[[EMAIL]]` — cooperative contact details
- `[[LINK-PRIX]]`, `[[LINK-CONSEILS]]`, `[[LINK-ESPACE]]`, `[[LINK-ESPACE-PROD]]`, `[[LINK-ESPACE-ACHETEUR]]` — future pages; they currently resolve to `#`
- `[[STAT-YEARS]]`, `[[STAT-CLIENTS]]`, `[[STAT-SITES]]`, `[[STAT-CAPACITY]]`, `[[N_SITES]]` — figures still to be confirmed for Relizane

Replace the values in `lib/content.ts` when the cooperative supplies the real data. Do not invent copy.

## Structure

```text
app/
  layout.tsx            RTL shell, fonts, Metadata API, SmoothScroll
  page.tsx              server component assembling the sections
  globals.css           Tailwind v4, design tokens, motion, reduced motion
components/
  sections/             TutelleBar, Header, Hero, FlashMarquee, News,
                        Shortcuts, Stats, Services, CtaBand, Footer
  motion/               SmoothScroll, Reveal, Counter
  BrandMark.tsx         official logo tile with the SVG fallback
lib/
  content.ts            every Arabic string + placeholder tokens
public/                 logo, hero/news photography, favicon, apple icon
assets/                 original image sources kept for reference
```

## Design and accessibility notes

- `<html lang="ar" dir="rtl">`; Arabic text keeps `letter-spacing: 0`.
- Logical properties (`ms-*`, `me-*`, `start-*`, `end-*`, `text-start`) are used for RTL layout; arrows point left.
- `CCLS RELIZANE`, phone numbers and emails are rendered with `dir="ltr"`.
- Motion uses `transform`/`opacity`. Every animation has a `prefers-reduced-motion` fallback: the marquee becomes a static list, the slideshow stays on the first slide, and reveals/parallax are disabled.
- The news slideshow pauses on hover, keyboard focus and hidden tabs, and exposes a pause/play button plus a progress bar.
- The page passes `npm run build` and `npm run lint`; no horizontal overflow at 360px, 768px or 1440px.

## Assets

The official logo is `public/logo.png` (wheat spike over the red ring). `public/logo.svg` is the drawn fallback, and `public/favicon.svg` / `public/apple-icon.png` are cropped from the mark. Photography is stored locally under `public/` and served through `next/image` with Arabic `alt` text.
