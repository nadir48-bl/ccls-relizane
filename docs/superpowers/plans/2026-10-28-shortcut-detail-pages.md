# Shortcut Detail Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give each shortcut card a real, indexable detail page that answers the card's promise.

**Architecture:** Five static App Router routes under a shared `(details)` layout. A content module drives page metadata and page-specific blocks. Shared `components/detail/*` primitives provide the dark hero, section headings, contact aside and previous/next pager. Header/footer hash links become route-aware so they work from any page.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Lucide icons, existing GSAP/Reveal motion.

**Spec:** `docs/superpowers/specs/2026-10-28-shortcut-detail-pages-design.md`

## Global Constraints

- Arabic RTL only; `letter-spacing: 0` for Arabic; logical CSS properties (`ms-*`, `me-*`, `start-*`, `end-*`).
- Reuse existing tokens: `bg`, `bg-alt`, `ink`, `muted`, `orange`, `orange-deep`, `green`, `green-deep`, `line`, `tint-*`, `font-display`, `font-sans`.
- Every new interactive element: visible focus, ≥44px target, `aria-hidden` on decorative icons.
- No request-time APIs; `npm run build:static` must emit all five routes.
- Each page exports `metadata` with title, description, canonical and Open Graph.
- No test runner exists. Verification per task is `npx tsc --noEmit` + `npm run lint`; final verification adds static build and browser checks.
- Sample/reference prices, site names and document lists are content, not claims of official data; keep the on-page disclaimers.

---

### Task 1: Detail content model and route helper

**Files:**
- Create: `lib/routes.ts`
- Create: `lib/detail-pages.ts`
- Modify: `lib/content.ts` (shortcut hrefs only)

**Interfaces:**
```ts
// lib/routes.ts
export function homeHash(pathname: string, hash: string): string;

// lib/detail-pages.ts
export type DetailIcon = "tag" | "calendar" | "file-text" | "map-pin" | "tractor";
export type DetailPage = {
  slug: string; href: string; number: string; icon: DetailIcon;
  title: string; subtitle: string; lede: string;
  image: { src: string; alt: string }; chips: string[];
};
export const detailPages: DetailPage[];
export function getDetailPage(slug: string): DetailPage;
export const pricePage: { notice: string; rows: PriceRow[]; criteria: Criterion[]; steps: Step[] };
export const calendarPage: { notice: string; stages: Stage[]; keyDates: KeyDate[]; advice: string[] };
export const documentsPage: { notice: string; groups: DocumentGroup[]; steps: Step[] };
export const networkPage: { notice: string; sites: Site[] };
export const equipmentPage: { notice: string; items: Equipment[]; conditions: string[]; steps: Step[] };
```
- [ ] Write `homeHash` returning `hash` when `pathname === "/"`, else `/${hash}`.
- [ ] Define the five `detailPages` entries in card order, with Arabic title, subtitles matching the cards, a lede, image, and 3 chips each.
- [ ] Add the page content arrays above with Arabic copy; keep the disclaimers from the spec.
- [ ] Change `shortcuts.items[].href` to `/prix`, `/calendrier`, `/documents`, `/reseau`, `/materiel`.
- [ ] Run `npx tsc --noEmit`; expected: pass.

### Task 2: Shared detail chrome and components

**Files:**
- Create: `app/(details)/layout.tsx`
- Create: `components/detail/DetailHero.tsx`
- Create: `components/detail/DetailSection.tsx`
- Create: `components/detail/ContactAside.tsx`
- Create: `components/detail/ShortcutPager.tsx`
- Create: `components/detail/PrintButton.tsx`
- Modify: `app/globals.css`

**Interfaces:**
```tsx
<DetailHero slug="prix" />
<DetailSection number="01" kicker="…" title="…" description="…">children</DetailSection>
<ContactAside links={[{ label: "…", href: "/reseau" }]} />
<ShortcutPager slug="prix" />
<PrintButton label="طباعة القائمة" />
```
- [ ] `layout.tsx`: skip link, `TutelleBar`, `Header`, `<main id="main-content">`, `Footer`.
- [ ] `DetailHero`: dark `band-green` band, `-mt-[var(--header-h)]`, background image with veil, breadcrumb (`الرئيسية` → `/#top`, `وصول سريع` → `/#shortcuts`), kicker with number, `h1`, lede, chips; decorative shortcut card on `lg`.
- [ ] `DetailSection`: section header using `.kicker` + display title, optional number and description.
- [ ] `ContactAside`: contact rows from `footer.contact`, placeholder-safe phone/email (same logic as Footer), links list, CTA to `/#contact`.
- [ ] `ShortcutPager`: previous/next card from `detailPages`, with ArrowRight/ArrowLeft, `nav aria-label`.
- [ ] `PrintButton`: `"use client"`, calls `window.print()`, prints icon + label.
- [ ] Append CSS: `.detail-hero`, `.detail-watermark`, `.detail-panel`, `.detail-timeline*`, `.detail-table*`, `.checklist*`, `.shortcut-pager-card`, print rules; reduced-motion fallbacks.
- [ ] Run `npx tsc --noEmit`; expected: pass.

### Task 3: Route-aware header, footer and card affordance

**Files:**
- Modify: `components/sections/Header.tsx`
- Modify: `components/sections/Footer.tsx`
- Modify: `components/sections/Shortcuts.tsx`

**Interfaces:** no new exports; `homeHash(pathname, hash)` consumed.
- [ ] Header: `usePathname`; wrap nav, logo, CTA and mobile links with `homeHash`; map detail paths to section spies for the active state; keep `aria-current` valid.
- [ ] Footer: `usePathname`; wrap quick links, spaces, logo and back-to-top with `homeHash`.
- [ ] Shortcuts: render cards with `next/link`; add a small «عرض التفاصيل» cue beside the rule/arrow; `aria-label` includes the destination.
- [ ] Run `npx tsc --noEmit`; expected: pass.

### Task 4: `/prix`

**Files:** Create `app/(details)/prix/page.tsx`
- [ ] Export metadata (`أسعار الشراء | CCLS RELIZANE`, canonical `/prix`).
- [ ] Hero + intro notice; reference price table (desktop) / cards (mobile) with crop, Latin name, grade, price, note.
- [ ] Quality criteria grid; payment steps ordered list; `ContactAside` with links to `/documents` and `/reseau`; pager.
- [ ] Check mobile widths at 375px (no overflow); run typecheck.

### Task 5: `/calendrier`

**Files:** Create `app/(details)/calendrier/page.tsx`
- [ ] Metadata, hero.
- [ ] Timeline `<ol>` with period, stage title, description and tasks; key dates cards; advice list; aside; pager.
- [ ] Verify RTL timeline line/dots at 375px and 1440px; typecheck.

### Task 6: `/documents`

**Files:** Create `app/(details)/documents/page.tsx`
- [ ] Metadata, hero.
- [ ] Two grouped checklists (`الفلاح الفردي`, `المؤسسة الفلاحية`) with native checkboxes, unique ids, `accent-green-deep`; steps; note; `PrintButton`; aside; pager.
- [ ] Add `data-print-hide` to chrome pieces that must not print (hero action card, aside, pager).
- [ ] Verify print preview hides chrome and shows both checklists; typecheck.

### Task 7: `/reseau`

**Files:** Create `app/(details)/reseau/page.tsx`
- [ ] Metadata, hero.
- [ ] Seven-site card grid with number, name, type, service chips and hours; intro notice; contact aside with `/documents` and `/prix`; pager.
- [ ] Verify 1/2-column grid and focus states; typecheck.

### Task 8: `/materiel`

**Files:** Create `app/(details)/materiel/page.tsx`
- [ ] Metadata, hero.
- [ ] Equipment card grid (icon, name, use, specs, rate note); rental conditions; request steps; aside with `/documents` and `/reseau`; pager.
- [ ] Verify hover/focus and reduced-motion fallbacks; typecheck.

### Task 9: Copy and consistency pass

**Files:**
- Modify: `README.md`
- Review: all new pages and `lib/detail-pages.ts`
- [ ] Update README's content-management note to point official detail copy at `lib/detail-pages.ts`.
- [ ] Read every page at 375px, 768px and 1440px in the browser; fix wrapping, contrast, orphan headings and inconsistent Arabic terminology.
- [ ] Confirm each card link, breadcrumb, pager link and header/footer hash link resolves.

### Task 10: Verification

- [ ] `npm run lint` — expected: no errors.
- [ ] `npx tsc --noEmit` — expected: no errors.
- [ ] `npm run build:static` — expected: success; `out/prix/index.html`, `out/calendrier/index.html`, `out/documents/index.html`, `out/reseau/index.html`, `out/materiel/index.html` exist.
- [ ] Start `npm run dev`; visit `/`, `/prix`, `/calendrier`, `/documents`, `/reseau`, `/materiel` with browser automation; assert 200, one `h1`, expected title, no console errors, no horizontal overflow at 390px and 1440px.
- [ ] Screenshot each page desktop + mobile; inspect and fix visual defects.
- [ ] Confirm homepage cards navigate to the five routes and `/#shortcuts` returns from a detail page.
- [ ] Commit.
