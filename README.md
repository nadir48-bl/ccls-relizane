# CCLS RELIZANE — تعاونية الحبوب والبقول الجافة غليزان

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=flat-square&logo=greensock)](https://greensock.com/gsap/)
[![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-orange?style=flat-square)](https://lenis.darkroom.engineering/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

Production-ready, high-performance landing page for **CCLS RELIZANE (تعاونية الحبوب والبقول الجافة غليزان)** — the cereals and dry-legumes cooperative of the wilaya of Relizane, Algeria, operating under the Algerian Interprofessional Cereals Office (**OAIC - الديوان الجزائري المهني للحبوب**) and the Ministry of Agriculture and Rural Development.

---

## 🌾 نبذة عن المشروع (Overview)

موقع تعريفي ومؤسساتي رسمي مصمم خصيصاً لخدمة فلاحي ومربّي ومكثّفي بذور ولاية غليزان والمتعاملين في شعبة الحبوب والبقول الجافة. يتميز الموقع بتصميم تحريري عصري يجمع بين الهوية البصرية الرسمية (سنبلة القمح الذهبية والحلقة الحمراء) مع أعلى معايير تجربة المستخدم الرقمية والأداء التقني السريع والمتوافق كلياً مع الاتجاه من اليمين إلى اليسار (RTL).

---

## ✨ Features (المميزات الرئيسية)

- **RTL-First Architecture**: Strictly adheres to Arabic typography (`letter-spacing: 0` to preserve Arabic cursive ligature connectivity), logical CSS properties (`ms-*`, `me-*`, `start-*`, `end-*`), and left-pointing directional iconography.
- **Server Component Foundation**: Core page structure is rendered server-side (`app/page.tsx`), keeping client bundles lightweight. Only interactive components (smooth scroll, reveals, counters, header, slideshow) run on the client.
- **Editorial Design System**:
  - Warm, institutional color palette: Wheat Orange (`#F07E1F`), Deep Green (`#0F4D2A`), Warm Cream (`#FFFDF8` / `#FAF6EE`), and Red Micro-accent (`#D8442E`).
  - Web fonts loaded via `next/font/google`: **Alexandria** for bold, balanced headings and **IBM Plex Sans Arabic** for legible body typography.
- **Smooth Motion & Micro-interactions**:
  - Lenis smooth scroll synchronized with GSAP ticker for gliding anchor links.
  - Sticky glass header with auto-hide on downward scroll, reveal on upward scroll, and reading progress bar.
  - Pure CSS infinite flash announcement marquee.
  - Interactive news slideshow with 7-second auto-rotation, play/pause controls, and progress indicator.
  - Scroll-triggered numeric counters and hairline reveals.
  - Comprehensive `prefers-reduced-motion` fallbacks across all animations.
- **Dual Deployment Ready**:
  - **Node.js Hosts** (Vercel, Railway, VPS): Standard server-rendered deployment.
  - **Static Apache / cPanel Hosting**: Generates standalone static HTML/CSS/JS export in `out/` with zero server runtime dependencies.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| --- | --- |
| **Next.js 16 (App Router)** | Framework, server rendering, routing, and Turbopack bundler |
| **TypeScript** | Type safety and structured data modeling |
| **Tailwind CSS v4** | Modern CSS architecture and design tokens (`@theme inline`) |
| **GSAP & ScrollTrigger** | High-performance entrance timelines and scroll triggers |
| **Lenis** | Smooth momentum-based scrolling |
| **Lucide React** | Clean, accessible iconography with consistent 1.75 stroke width |
| **Google Fonts** | Alexandria & IBM Plex Sans Arabic (zero layout shift) |

---

## 🚀 Quick Start (التشغيل المحلي)

### Prerequisites

- Node.js 18.18+ or 20+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/nadir48-bl/ccls-relizane.git
cd ccls-relizane

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts Next.js development server at port 3000 |
| `npm run build` | Compiles an optimized production build for Node environments |
| `npm start` | Runs the compiled production server |
| `npm run build:static` | Builds a fully static HTML export into the `out/` directory |
| `npm run lint` | Runs ESLint checks |

---

## 🌐 Deployment (النشر والاستضافة)

### Option 1: Static cPanel / Apache Hosting (Cooperative Server)

```bash
npm run build:static
```

- Upload all files from the generated `out/` directory directly to your web root (`public_html/`).
- No Node.js runtime or server daemon is required.
- Images are automatically optimized for static export.

### Option 2: Modern Node.js Host (Vercel / VPS)

```bash
npm run build
npm start
```

Set the production canonical URL in your environment:
```bash
NEXT_PUBLIC_SITE_URL=https://ccls-relizane.dz
```

---

## 📝 Content Management & Placeholders

All website text and official copy are centralized in a single configuration file:
**[`lib/content.ts`](lib/content.ts)**

To update contact information, phone numbers, or statistics, modify the corresponding entry in `lib/content.ts`:

| Placeholder Token | Description | Expected Value |
| --- | --- | --- |
| `[[ADDRESS]]` | Headquarter address | Street, غليزان 48000 — الجزائر |
| `[[PHONE]]` | Cooperative telephone | Landline (046 area code) |
| `[[EMAIL]]` | Contact email | `ccls.relizane@oaic.dz` |
| `[[STAT-*]]` | Wilaya figures | Capacity, storage sites, clients |

---

## 📁 Project Structure

```text
ccls-relizane/
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI workflow (lint & build verification)
├── app/
│   ├── globals.css            # Tailwind v4 theme tokens, design variables & animations
│   ├── layout.tsx             # Root layout (<html lang="ar" dir="rtl">, SEO metadata)
│   └── page.tsx               # Server page assembling sections in sequential order
├── components/
│   ├── BrandMark.tsx          # Official wheat-spike logo component with SVG fallback
│   ├── motion/
│   │   ├── Counter.tsx        # Animated scroll-triggered count-up figures
│   │   ├── Reveal.tsx         # GSAP ScrollTrigger wrapper for staggered entrances
│   │   └── SmoothScroll.tsx   # Lenis smooth-scroll provider synced to GSAP ticker
│   └── sections/
│       ├── TutelleBar.tsx     # Institutional tutelle strip (OAIC & Ministry)
│       ├── Header.tsx         # Responsive sticky navigation with scroll-spy & progress
│       ├── Hero.tsx           # Hero section with mask reveals & wheat imagery
│       ├── FlashMarquee.tsx   # Infinite announcement ticker
│       ├── News.tsx           # News & updates slideshow with interactive controls
│       ├── Shortcuts.tsx      # Quick links & operational guides
│       ├── Stats.tsx          # Key cooperative figures band (id: chiffres / reseau)
│       ├── Services.tsx       # Ruled editorial list of key cooperative services
│       ├── CtaBand.tsx        # Farmer onboarding & registration CTA band
│       └── Footer.tsx         # Comprehensive 4-column footer with contact details
├── lib/
│   └── content.ts             # Single source of truth for all Arabic copy & tokens
├── public/                    # Optimized WebP photography, brand assets, and icons
├── .env.example               # Environment variables template
├── next.config.ts             # Next.js configuration supporting dynamic & static export
└── package.json               # Dependencies and build scripts
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
