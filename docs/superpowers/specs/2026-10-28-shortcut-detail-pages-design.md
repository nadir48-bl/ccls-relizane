# Shortcut Detail Pages — Design

**Date:** 2026-10-28
**Status:** Approved in conversation ("go with pages")

## Intent

The five cards in the homepage section «ما تبحث عنه غالباً» currently jump to
unrelated homepage anchors, so the visitor gets no answer. Each card gets a
dedicated page with the information it promises.

## Goals

- A real destination behind every card: prices, season calendar, required
  documents, site directory, equipment rental.
- Pages feel like the same site: same header, footer, typography, color,
  motion and RTL rules.
- Shareable URLs and per-page SEO metadata.
- Print-friendly documents page.
- Work with both deployment targets (Node server and static export).

## Non-goals

- No backend, booking engine, payment, or user accounts.
- No live price feed. Prices are reference values; official figures come from
  OAIC and are flagged as indicative on the page.
- No map embed; the site directory is a list, not a geographic map.
- No French translation of the new pages.

## Routes

| Route | Card | Page content |
|---|---|---|
| `/prix` | أسعار الشراء | Reference price table, quality criteria, payment steps |
| `/calendrier` | رزنامة موسم 2026/2027 | Month-by-month season timeline, key dates, advice |
| `/documents` | الوثائق المطلوبة | Individual/company checklists, opening steps, print |
| `/reseau` | أقرب موقع إليك | Seven site cards with services and hours |
| `/materiel` | كراء العتاد الفلاحي | Equipment catalog, rental conditions, request steps |

## Page shell

```
TutelleBar
Header (transparent over the dark detail hero, solid on scroll)
main
  DetailHero      dark green band, breadcrumb, number, icon, title, lede, chips
  Detail body     8-col main + 4-col sticky aside (contact card, facts, links)
  ShortcutPager   previous/next shortcut
Footer
```

- `DetailHero` uses `-mt-[var(--header-h)]`, exactly like the homepage hero,
  so the sticky header sits over it.
- Content blocks use a shared `DetailSection` header (kicker, number, title,
  lede) and existing design tokens.
- The aside reuses `footer.contact`, including the existing placeholder
  handling for phone/email.

## Content decisions

- **Prices:** labelled «أسعار مرجعية إرشادية». Official prices are set by
  OAIC and announced at collection points. The data lives in one array so the
  cooperative can replace the values without touching markup.
- **Calendar:** month ranges, explicitly marked as indicative and subject to
  weather and official notices. Uses the campaign date already on the site
  (01 October).
- **Sites:** the seven communes already implied by the site (Relizane, Oued
  Rhiou, Mazouna, Zemmoura, Ammi Moussa, El Matmar, Djidiouia). No invented
  street addresses; the central placeholder address stays in the aside.
- **Documents:** standard individual/company lists plus a note that extra
  papers may be requested. Checkboxes are native and print cleanly.
- **Equipment:** no invented rates. Each item says the rate is set by duration
  and asks the visitor to contact the cooperative for availability.

## Navigation

- Card links change from `#anchors` to the five routes.
- Header/footer section links stay native hash links on `/` and become
  `/#section` on detail pages, so they return to the homepage section.
- The header highlights the matching section when on a detail page
  (`/prix` and `/calendrier` → «الأسعار والرزنامة», `/documents` →
  «فضاء الزبون», `/reseau` → «شبكتنا», `/materiel` → «الخدمات»).

## Quality constraints

- Arabic-first RTL; no letter-spacing on Arabic text.
- Minimum 44px touch targets, visible focus, `aria-hidden` on decorative icons.
- No horizontal page overflow at 375px; the price table becomes cards on mobile.
- Reduced-motion fallbacks for every new transition.
- Static export safe: no request-time APIs.
- Per-page `title`, `description`, canonical URL and Open Graph data.
- Print styles hide the site chrome and the aside on `/documents`.

## Files

- `lib/content.ts` — shortcut hrefs; nav/footer stay the source for global copy.
- `lib/detail-pages.ts` — detail page metadata and page content.
- `lib/routes.ts` — home-hash helper used by Header and Footer.
- `app/(details)/layout.tsx` — shared chrome.
- `app/(details)/{prix,calendrier,documents,reseau,materiel}/page.tsx`.
- `components/detail/*` — hero, section, contact aside, pager, print button.
- `app/globals.css` — timeline, table, checklist, pager, print styles.
- `components/sections/Header.tsx`, `Footer.tsx`, `Shortcuts.tsx` — routing and
  affordance updates.
- `README.md` — note where detail-page copy lives.
