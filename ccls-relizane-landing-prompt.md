# PROMPT — CCLS RELIZANE Landing Page
# Copy everything below the line and paste it into your code agent (Claude Code / Cursor / Codex)

---

## ROLE & STACK

You are a senior front-end designer-developer with award-winning taste. Build a complete, production-ready, **single-page landing site** using **Next.js (App Router) + TypeScript + Tailwind CSS v4** — latest stable version. Scaffold with `create-next-app` (TypeScript, Tailwind, App Router, no src dir). Keep dependencies minimal: `gsap`, `lenis`, `lucide-react` — nothing else.

Architecture rule: the page itself stays a **server component**; only interactive parts (smooth scroll provider, reveals, marquee controls, slideshow, counters, sticky header) are small `"use client"` components.

## PROJECT

Landing page for **CCLS RELIZANE — تعاونية الحبوب والبقول الجافة غليزان**: the cereals and dry-legumes cooperative of the wilaya of Relizane, Algeria, operating under **OAIC (الديوان الجزائري المهني للحبوب)** and the Ministry of Agriculture.

Audience: farmers (فلاحون), livestock breeders (مربّو الماشية), seed multipliers (مكثّفو البذور), and dry-legume buyers (مشيرو البقول الجافة). The site must feel institutional and trustworthy, yet modern and premium.

**Brand asset:** the official logo is a **golden wheat spike standing over a red ring** (client-provided image). Use it as the header/footer brand mark and favicon via `public/logo.png`; until the file is added, draw a clean wheat-spike-over-ring SVG placeholder in the same spirit.

**The Arabic copy in this brief is OFFICIAL — use it verbatim.** Do not rewrite it, do not add invented text, no lorem ipsum anywhere. Items marked `[[LIKE_THIS]]` are placeholders: keep them in the code exactly as written (a page listing them is at the bottom).

## LANGUAGE & DIRECTION (NON-NEGOTIABLE)

- Root: `<html lang="ar" dir="rtl">`. All visible copy = the Arabic provided below.
- **`letter-spacing: 0` on ALL Arabic text** — it breaks Arabic letter connections.
- Western numerals (1, 2, 3) for dates, stats and prices; phone numbers and emails get `dir="ltr"`.
- Metadata via the Next.js **Metadata API** in `app/layout.tsx`: title `تعاونية الحبوب والبقول الجافة غليزان` · description `تعاونية الحبوب والبقول الجافة غليزان: بذور مصادَق عليها، أسمدة، جمع المحاصيل، تكثيف البذور وكراء العتاد الفلاحي.` · OpenGraph card, with `<html lang="ar" dir="rtl">`.
- Arabic spelling: use **غليزان** (official). Latin brand is always **CCLS RELIZANE** with `dir="ltr"`.

## DESIGN SYSTEM

**Style: "soft gradient / premium editorial"** carrying the logo's identity in a modern way — **wheat orange + fresh green + the ring's red as micro-accent**. Calm, airy, institutional-modern. NOT the generic AI look.

**Palette (CSS custom properties) — inspired by the logo, modernized:**
- `--bg: #FFFDF8` (warm off-white) · `--bg-alt: #FAF6EE`
- `--ink: #221A10` (warm near-black) · `--muted: #6B6257`
- `--orange: #F07E1F` (PRIMARY accent, from the golden wheat — CTAs, links, active states, `<em>` highlights) · `--orange-deep: #D96A0E` (hover)
- `--green: #1E8A4C` (fresh modern green — identity color: tints, icons, secondary surfaces) · `--green-deep: #0F4D2A` (dark bands: hero veil, flash, stats, CTA, footer)
- `--red: #D8442E` (the logo ring — MICRO-ACCENT ONLY, ~5% max: `جديد` pill, news badges, active dots, tiny underlines — never large surfaces, never buttons)
- Tints for gradients & soft cards: `--tint-orange: #FDEEDC` · `--tint-green: #E7F4EC` · `--tint-red: #FBE8E5`
- Gradients: 135° blends of the tints only, low saturation, large blurred blobs. On photos: `--green-deep` gradient veil.
- Buttons: orange fill with `--ink` text (modern + accessible); white fills on green bands. White text only on green surfaces.

**Typography (via `next/font/google` — never `<link>` tags; exposes zero layout shift):**
- Headings: **"Alexandria"** 600/700 · Body: **"IBM Plex Sans Arabic"** 400/500 — load both as CSS variables and map them to Tailwind font tokens.
- Fluid `clamp()` scale; body line-height 1.8, headings 1.25.

**Shapes & depth:** cards `border-radius: 20px`, pills 999px, `1px solid #EEE6D9` borders, layered soft shadow `0 1px 2px rgba(34,26,16,.05), 0 12px 32px rgba(34,26,16,.07)` — deepen on hover.

**Icons:** `lucide-react` package, strokeWidth 1.75, single color (ink / orange / green). **FORBIDDEN: emoji as icons, multicolor icon packs.**

**Imagery:** real agriculture photos from Unsplash (wheat field, grain silo, tractor sowing, seed bags) — never gray boxes; serve through `next/image` with proper `sizes` and lazy loading below the fold; Arabic `alt` on every image.

**ANTI-GENERIC RULES (strict):**
- NO purple/blue gradients, NO glassmorphism, NO neon glows, NO dark "AI SaaS" aesthetic.
- NO perfectly-centered everything: asymmetric grids (6/5, 7/4 splits), alternating section rhythm.
- NO uniform repeated card rows everywhere: the services section is a **full-width ruled list with numbers, not a card grid** (five services never fill three columns cleanly); shortcuts are compact rows; vary backgrounds by alternating `--bg` / `--bg-alt` / tints / green bands.
- Micro-details: custom `::selection` (orange tint), subtle custom scrollbar, favicon cut from the logo, 1px hairline dividers.

## SECTIONS (in this exact order, with the official copy)

### 1. Tutelle bar (institutional strip, very top)
Muted strip, small type, items separated by `·`; on the other end a language group (`ع` active, `FR` — plain links, `href="#"` for FR):
- `الجمهورية الجزائرية الديمقراطية الشعبية` · `وزارة الفلاحة والتنمية الريفية والصيد البحري` · `الديوان الجزائري المهني للحبوب (OAIC)`
On mobile keep only the OAIC line.

### 2. Header (below the strip, sticky)
Brand block: official logo (`public/logo.png` — wheat spike + red ring; SVG fallback) + `CCLS RELIZANE` (`dir="ltr"`) + subtitle `تعاونية الحبوب والبقول الجافة — غليزان`.
Right side: solid orange pill button (ink text) `فضاء الزبون` → `[[LINK-ESPACE]]`; burger on mobile.
Nav links (anchor mapping): الرئيسية `#top` · التعاونية `#chiffres` · شبكتنا `#reseau` · الخدمات `#services` · الأسعار والرزنامة `[[LINK-PRIX]]` · الإرشاد الفلاحي `[[LINK-CONSEILS]]` · فضاء الزبون `[[LINK-ESPACE]]` · تواصل `#contact`.
Sticky behavior: transparent over hero → cream with bottom hairline + blur after 24px; hides on scroll down, shows on scroll up.

### 3. Hero
Full-width wheat-field photo, deep green (`--green-deep`) gradient veil closing from the bottom.
- H1: `تعاونية الحبوب والبقول الجافة غليزان`
- CTA1 (solid white pill): `كيف أفتح حسابي في التعاونية؟` → `#adhesion`
- CTA2 (ghost): `اكتشف خدماتنا` → `#services`

### 4. Flash announcements marquee
Deep green band (`--green-deep`). Label pill: `جديد` in red (the logo-ring red as micro-accent) · region `aria-label="آخر الإعلانات"`. Infinite CSS marquee: the `<ul>` content is written **twice** (second copy `aria-hidden="true"`), the track advances exactly one half of itself then loops (`--flash-duree: 24s`), pauses on hover; under `prefers-reduced-motion` the marquee is disabled and items show as stacked static lines.
Items:
- `انطلاق حملة الحرث والبذر 2026/2027 في 01 أكتوبر`
- `مختلف المدخلات الفلاحية متوفرة لدى تعاونيتكم`
- `العتاد الفلاحي متوفر تحت تصرفكم`

### 5. News — آخر الأخبار والإعلانات
Kicker: `آخر الأخبار والإعلانات` · H2: `مستجدات <em>التعاونية</em>` (the `<em>` in orange).
Layout: main slide (2/3 width) + summary list (1/3). Each summary entry is a `<button>` that brings its news item to the main stage (fade transition). Autoplay 7s with pause button + thin progress bar; stops on hover, keyboard focus, hidden tab; never starts under reduced motion (first slide stays, list still works).
Slides (official text):
1. Badge `إعلان هام` · 29 سبتمبر 2026 · **انطلاق حملة الحرث والبذر 2026/2027** · تُفتح جميع نقاط بيع البذور ابتداءً من 01 أكتوبر، والتعاونية في خدمة الفلاحين طوال الحملة.
2. 1 أكتوبر 2026 · **اليوم الوطني للإرشاد الفلاحي** · احتضنت الولاية فعاليات اليوم الوطني للإرشاد الفلاحي المصادف للفاتح أكتوبر، بمشاركة الفلاحين والمؤسسات الفلاحية. *(neutral wording — original mentioned Tiaret officials; swap in a real Relizane item when available)*
3. Badge `توعية ميدانية` · 29 سبتمبر 2026 · **تسخير العتاد الفلاحي** · تضع التعاونية عتادها الفلاحي من جرارات وآلات البذر في خدمة الفلاحين لضمان السير الحسن للحملة.
4. Badge `توفر البذور` · 29 سبتمبر 2026 · **البذور متوفرة لدى التعاونية** · كميات معتبرة من البذور متوفرة حاليا بمخازن التعاونية.

### 6. Shortcuts — ما تبحث عنه غالباً
Kicker-style title: `ما تبحث عنه غالباً`. Five compact rows (icon → text → left arrow), Lucide icons (tag, calendar, file-text, map-pin, tractor):
1. `أسعار الشراء` — `قمح صلب، ليّن، شعير وبقول جافة` → `[[LINK-PRIX]]#collecte`
2. `رزنامة موسم 2026/2027` — `مواعيد الحرث والبذر والحصاد` → `[[LINK-PRIX]]#cal`
3. `الوثائق المطلوبة` — `ملف فتح حساب لدى التعاونية` → `#adhesion`
4. `أقرب موقع إليك` — `[[N_SITES]] موقعاً عبر الولاية` → `#reseau`
5. `كراء العتاد الفلاحي` — `جرارات، حاصدات وباذرات` → `#services`

### 7. Stats band — id `chiffres` (deep green `--green-deep` bg, white text, orange numbers) — also id `reseau` anchor
Four count-up figures (once, in view; `dir="ltr"` on the numbers; thin separators between):
- `52+` — `سنة في خدمة الفلاح`  [[STAT-YEARS]]
- `6 000+` — `زبون من فلاحين ومربّين`  [[STAT-CLIENTS]]
- `20` — `موقعاً عبر الولاية`  [[STAT-SITES]]
- `1,2 مليون` — `قنطار من قدرة التخزين`  [[STAT-CAPACITY]]
⚠️ These figures come from the Tiaret site — placeholders until Relizane's real numbers are confirmed.

### 8. Services — id `services`
Kicker: `خدماتنا` · H2: `موسمك يبدأ من هنا: كل ما تحتاجه في تعاونيتك` · Lede: `خمس خدمات كبرى تغطي الموسم كاملاً، من تحضير الأرض إلى جمع محاصيلك.`
**Full-width ruled list** (number `01`–`05` in Alexandria outline style, title + description, left arrow on hover) — NOT a card grid:
- `01 — البذور والأسمدة` — بذور مصادَق عليها من القمح الصلب واللين والشعير والتريتيكال والخرطال، وبذور البقول الجافة، وأسمدة القاعدة والتغطية.
- `02 — جمع المحاصيل` — استلام القمح والشعير والبقول عبر مواقعنا، وزن وتحليل شفاف ودفع وفق أسعار الشراء.
- `03 — برنامج تكثيف البذور` — عقود تكثيف مع متابعة القطع الأرضية، مراقبة الأجيال، والمصادقة على البذور المنتَجة.
- `04 — كراء العتاد الفلاحي` — حظيرة جرارات وحاصدات وباذرات بالكراء، مع سائق أو بدونه.
- `05 — بيع وتسويق المحاصيل` — تموين المطاحن المتعاقدة بالقمح، وبيع البقول الجافة للمحوّلين وتجار الجملة، مع التوضيب والبيع بالتجزئة.

### 9. Account CTA — id `adhesion` (deep green band `--green-deep`, orange primary button)
- H2 (white): `فلاح، مربّي ماشية، مكثّف بذور أو شريك في بيع البقول الجافة؟`
- Paragraph (white @ 85% opacity): `افتح حسابك لدى التعاونية واستفد من التموين المضمون وأسعار الشراء والبيع ودفع المستحقات في الآجال.`
- Buttons: white solid `دليل فتح الحساب والوثائق المطلوبة` → `#contact` · ghost `اتصل بنا` → `#contact`

### 10. Footer — id `contact`
Four columns:
1. Brand: official logo + `CCLS RELIZANE` + `تعاونية الحبوب والبقول الجافة لولاية غليزان، في خدمة الفلاحين من الحقل إلى المخزن.`
2. `روابط سريعة`: التعاونية · شبكتنا · الخدمات · الأسعار والرزنامة · الإرشاد الفلاحي · تواصل
3. `الفضاءات`: `فضاء منتجي الحبوب والبقول الجافة` → `[[LINK-ESPACE-PROD]]` · `فضاء مشتري البقول الجافة` → `[[LINK-ESPACE-ACHETEUR]]`
4. `تواصل`: `[[ADDRESS]]` · `[[PHONE]]` (`dir="ltr"`, orange link) · `[[EMAIL]]` (`dir="ltr"`, orange link) · `الأحد – الخميس : 08:00 – 16:30`
Bottom bar: `© 2026 تعاونية الحبوب والبقول الجافة غليزان. جميع الحقوق محفوظة.`
Credit line (keep only if confirmed): `تصميم وتطوير : براهيم محمد، رئيس مصلحة الإعلام الآلي بالتعاونية`

## MOTION SPEC — smooth, modern & engaging (make the visitor want to stay)

Goal: a calm, continuous flow — nothing jumpy, nothing boring. Every scroll and click feels buttery; the page feels alive and invites exploring.

- **Smooth scrolling:** Lenis (`lerp: 0.1`) synced with the GSAP ticker — initialized once in a client `<SmoothScroll>` provider mounted in `layout.tsx`.
- **GSAP + ScrollTrigger** (npm packages, registered inside client components only).
- **Reveal system (one cohesive language):** elements rise `y 32→0` + fade `0→1`, `duration 0.9`, `ease power3.out`; grouped children stagger `0.08–0.12`; fire once at 75% viewport. Inside each section the order is always kicker → title → lede → content (top-down storytelling).
- **Hairline draws:** service rows and shortcut rows draw their bottom borders `scaleX 0→1` as they enter — quiet editorial elegance.
- **Hero entrance timeline (≤1s, on load):** headline lines mask-reveal (slide up inside `overflow: hidden` wrappers), then CTAs fade-rise, while the photo settles `scale 1.06→1` under its veil. No preloader.
- **Subtle depth:** hero photo drifts with scroll (gentle parallax, ~8% range); floating stat chips loop ±6px very slowly.
- **Sticky header:** transparent → warm white + blur + hairline after 24px; hides on scroll down, returns on scroll up; a 2px orange scroll-progress line runs along its bottom edge.
- **Scroll-spy nav:** the link of the section currently in view gets an orange underline — orients the visitor, invites exploration.
- **Anchor clicks glide:** nav links call Lenis `scrollTo` with easing — the page NEVER teleports to a section, it always glides. This single detail is what makes the site feel premium.
- **Counters** count up once in view; flash marquee = seamless pure-CSS loop (duplicated `aria-hidden` copy), pauses on hover; news slideshow crossfades 0.5s with 7s autoplay, pause button + progress bar.
- **Hover micro-interactions:** buttons lift + deepen with a soft shine sweep; cards `translateY(-4px)` + deeper shadow; service rows: number turns orange, arrow slides left — all `0.25s cubic-bezier(0.22, 1, 0.36, 1)`.
- **Discipline:** animate `transform`/`opacity` only; `will-change` sparingly; 60fps target; no bounce, no elastic, no 3D flips.
- **`prefers-reduced-motion` disables everything** (marquee → stacked lines, slideshow → first slide, reveals visible immediately, parallax + smooth scroll off).

## RTL IMPLEMENTATION RULES

- CSS logical properties everywhere — with Tailwind v4 that means `ms-*` / `me-*` / `ps-*` / `pe-*` / `start-*` / `end-*` / `text-start` utilities. Never hardcode `left`/`right` for layout.
- Directional icons/arrows point **LEFT**.
- Phone numbers, emails and `CCLS RELIZANE` lines are `dir="ltr"`.
- Verify marquee direction and arrow directions visually in RTL.

## FILE STRUCTURE

```
app/
  layout.tsx            — <html lang="ar" dir="rtl">, next/font loading, Metadata, <SmoothScroll>
  page.tsx              — assembles sections in order (server component); exactly one h1 (Hero)
  globals.css           — Tailwind v4 + design tokens as @theme CSS variables
components/
  sections/             — TutelleBar, Header, Hero, FlashMarquee, News, Shortcuts,
                          Stats, Services, CtaBand, Footer  (client only where interactive)
  motion/               — SmoothScroll provider, Reveal (GSAP wrapper), Counter
lib/
  content.ts            — ALL Arabic copy + [[PLACEHOLDER]] tokens (single source of truth)
public/                 — favicon.svg (wheat spike), local images
```

**Hard rule: every visible string lives in `lib/content.ts`** — never hardcode Arabic text inside components. Swapping `[[PLACEHOLDER]]` tokens for real Relizane data must require editing one file only.

## PLACEHOLDERS — keep tokens in `lib/content.ts`, do not invent values

| Token | Meaning |
|---|---|
| `[[ADDRESS]]` | Cooperative HQ address in Relizane (format: street, غليزان 48000 — الجزائر) |
| `[[PHONE]]` | Landline, 046 area code expected — confirm |
| `[[EMAIL]]` | e.g. ccls.relizane@oaic.dz — confirm |
| `[[LINK-PRIX]]`, `[[LINK-CONSEILS]]`, `[[LINK-ESPACE]]`, `[[LINK-ESPACE-PROD]]`, `[[LINK-ESPACE-ACHETEUR]]` | Future pages — use `href="#"` for now |
| `[[STAT-YEARS]]`, `[[STAT-CLIENTS]]`, `[[STAT-SITES]]`, `[[STAT-CAPACITY]]`, `[[N_SITES]]` | Figures inherited from the Tiaret site — replace with Relizane's real figures |
| News item 2 | Tiaret officials removed; neutral copy provided — replace with a real Relizane item |

## DEPLOYMENT NOTE

Two hosting options — pick at build time, no code changes:
1. **Node host** (Vercel, VPS): `npm run build` + `npm start`.
2. **Existing Apache/cPanel hosting** (like the current cooperative site): set `output: 'export'` in `next.config` and upload the generated `out/` folder — the page is fully static, so the export needs zero server requirements.

## FINISH CHECKLIST (verify before declaring done)

- [ ] Zero horizontal scroll at 360px, 768px, 1440px
- [ ] **No trace of "تيارت" / "TIARET" anywhere** — brand is CCLS RELIZANE / غليزان consistently
- [ ] All official Arabic copy used verbatim; no lorem ipsum, no invented sentences
- [ ] Marquee loop is seamless; slideshow pause/progress works; counters animate once
- [ ] Fully keyboard accessible; visible focus states; slideshow buttons use `aria-controls`/`aria-current`
- [ ] Body text contrast ≥ 4.5:1 (white on `--green-deep` passes; orange buttons use ink text)
- [ ] Red appears ONLY as micro-accent (badges, pills, dots) — no large red surfaces; zero leftovers of the old palette (`#123723`, wheat gold)
- [ ] `npm run dev` runs with zero console errors; `npm run build` passes cleanly (no TS/lint errors)
- [ ] All copy rendered from `lib/content.ts`; no hardcoded strings in components
- [ ] Every animation has a reduced-motion fallback
