# CCLS Relizane — Prices, Network & Account Design

**Status:** Draft for approval
**Date:** 2026-10-28
**Project:** CCLS Relizane public website
**Stack:** Next.js 16 + Payload CMS 3 (one codebase, one admin dashboard)

**Human partner decisions:**
- Build all three journeys: today's price, nearest site, opening an account.
- Use Payload CMS with the same Next.js technology — no PHP admin.
- The cooperative team updates prices and site information from the Payload dashboard.
- Keep the existing five static detail pages plan and build on it.

**Builder's calls (change these if you disagree):**
- One Next.js app with Payload 3 mounted at `/admin`; no separate CMS.
- PostgreSQL for production; SQLite only as a small/cPanel Node fallback.
- Node 22.23.4+ in production.
- Reuse the existing detail chrome, content modules, and route helpers.
- Arabic-first. The Payload admin supports Arabic RTL; custom labels may be needed.
- Remove the dead FR switch until a real French version exists.
- Media on local disk for a VPS, or S3-compatible storage (Cloudflare R2 / S3) for a serverless/managed host.
- Email through Payload's email adapter (authenticated SMTP or Resend), not bare `mail()`.

---

## 1. Intent

Turn the current one-page brochure into a small, trusted service site that lets a farmer:

1. check today's purchase price,
2. find the nearest cooperative site,
3. start an account application.

The cooperative team must be able to keep prices and site information current from the Payload admin dashboard. The public site stays Arabic/RTL, fast on a phone, and usable on a weak connection.

## 2. Why now

The current site looks professional but is functionally a demo: contact details are still placeholders, several links go nowhere useful, and there is no real price, site list, or application path. These three journeys are the highest-value tasks for the audience:

- **Prices** create repeat visits.
- **The site locator** supports the visit and reduces phone calls.
- **The application wizard** converts the visit into a relationship.

Payload gives the cooperative a real dashboard without adding a second system or a PHP codebase. The public pages and the admin share one Next.js app, one deployment, and one data model.

## 3. Audience and jobs

**Primary:** farmers, breeders, and seed multipliers in the wilaya of Relizane. Often older, on a phone, Arabic-speaking, and on a weak connection.

**Secondary:** buyers and traders, institutional partners (OAIC, Ministry), cooperative staff.

**Jobs to be done:**

- "What is the price today, and is it worth bringing my crop?"
- "Where do I go, when is it open, and who do I call?"
- "What documents do I need, and can I start now?"
- "Is this cooperative legitimate, current, and reachable?"

## 4. Goals

- A farmer can see the current price in under 10 seconds on a phone.
- A farmer can find the nearest site and start directions or a call in under 15 seconds.
- A farmer can submit an account request in under 3 minutes and receive a reference number.
- Staff can update a price in under 2 minutes from `/admin` without a developer.
- No placeholder tokens, no dead links, no misleading controls.
- WCAG 2.2 AA for text and controls; reduced-motion preferences respected.
- LCP under 2.5s on a mid-range phone over 4G; CLS under 0.1.
- One Node deployment; no PHP, no second CMS, no static-export rebuild ritual.

## 5. Non-goals

- Customer login/portal, online payments, ERP or inventory integration.
- A real-time market feed. Prices are entered by staff.
- A full CMS for every string. Payload manages operational content; the design system stays in code.
- A French version at launch (pending decision; default is to remove the dead switch and add French later).
- A mobile app, SMS gateway, or AI chatbot.
- A visual redesign. The current editorial language stays.

## 6. Anti-goals

- Prices hidden behind a PDF, a login, or a phone call.
- A form longer than necessary, asking for data the cooperative will not use.
- Admin complexity leaking into the public experience.
- More decorative motion at the expense of speed and clarity.
- A generic government-portal look.
- Two systems (Next + PHP/WordPress) that drift apart.

## 7. Current state

- Next.js 16.4.3 App Router, TypeScript, Tailwind CSS v4, GSAP, Lenis.
- Static export is supported through `STATIC_EXPORT=1`, but it is no longer the production target once Payload is added.
- One page: tutelle bar, header, hero, flash marquee, CTA band, news, shortcuts, services, stats, footer.
- Content lives in `lib/content.ts`; several values are still `[[PLACEHOLDER]]` tokens.
- Working-tree changes already turn some dead links into anchors and add scrollspy attributes. Preserve them.
- There is an existing approved design and plan for five static detail pages — `/prix`, `/calendrier`, `/documents`, `/reseau`, `/materiel` — in `docs/superpowers/specs/2026-10-28-shortcut-detail-pages-design.md` and `docs/superpowers/plans/2026-10-28-shortcut-detail-pages.md`. Treat them as a prerequisite public layer, not as work to replace.
- No `/adhesion` page. No dashboard. No forms. No map.

## 8. Architecture

### One Next.js app, two route groups

Payload 3 installs directly into the Next.js `app/` folder:

- `app/(frontend)/` — the public Arabic site, with its own layout, header, footer, fonts, and motion.
- `app/(payload)/` — Payload's admin and API files, imported from `@payloadcms/next`. Do not edit generated files.
- `/admin` — the Payload dashboard.
- `/api/*` — Payload REST/GraphQL endpoints, plus our small public form endpoints.

The existing public chrome moves into `(frontend)`. Avoid duplicate `<html>`/`<body>` layouts; the frontend layout owns the public document, Payload's layout owns the admin.

### Versions and runtime

- Next.js **16.4.3** installed; Payload requires **16.4.0+** (not every Next 16 release is supported).
- Payload **3.92.1** (current stable), with `@payloadcms/next`, `@payloadcms/ui`, `@payloadcms/richtext-lexical`, `@payloadcms/db-postgres`, `sharp`.
- Node **24.22.1+** recommended (the package engine allows `^22.23.4 || >=24.22.1`). The current local Node is **22.23.1**, below both floors, so upgrade before installing Payload.
- TypeScript **6.0.3+** required. The project currently has **5.9.3**, so the TS upgrade is part of phase 1 and may surface type errors to fix.
- PostgreSQL 16 in production (recommended), or SQLite for a small single-server deployment, or MongoDB if there is already a cluster. **MySQL is not supported by Payload.**
- `next.config` becomes ESM and is wrapped with `withPayload`.
- `tsconfig` gets the `@payload-config` path.

### Data access

- Server Components use the Payload Local API (`getPayload`) for fresh data with no HTTP hop.
- Client components use Payload REST or server-provided props.
- Payload `afterChange` hooks call `revalidatePath` / `revalidateTag` for `/`, `/prix`, `/reseau`, and the sitemap when content changes.
- Public reads are allowed for products, prices, sites, news, documents, FAQs, and settings. Account requests and contact messages are create-only for the public and admin-only for reads.
- No personal data in `localStorage`.

### Email

- Payload's `email` adapter with authenticated SMTP (cPanel mailbox or an external provider) or Resend.
- Account requests and contact messages trigger an email to staff from an `afterChange` hook or a server action.
- A reference number is generated server-side and shown on the success screen.
- If email fails, the record is still stored; the admin inbox is the source of truth and the success screen says so.
- Verify SPF/DKIM and test delivery to the destination mailbox before launch.

### Media

- Payload `media` upload collection with `sharp` image sizes.
- On a VPS: local disk under a persistent volume, included in backups.
- On a serverless/managed host: S3-compatible storage (Cloudflare R2 or S3), because local disk is ephemeral.
- Every image has alt text in Arabic; no decorative image is announced twice.

### Map

- Leaflet + OpenStreetMap tiles, loaded only on `/reseau` and `/contact`.
- Site coordinates come from Payload (`lat`, `lng` number fields for portability).
- The list is always present; the map is an enhancement with an accessible fallback.
- No paid map key. Respect OSM tile usage policy.

### Hosting reality

Payload cannot run on a static/shared cPanel account. It needs a Node process and one of its supported databases. The options are:

**Option A — Node VPS (recommended).** Ubuntu VPS with Docker Compose: Next/Payload, PostgreSQL, Caddy or Nginx, media volume, nightly backups. cPanel can remain for DNS, email, and SSL if desired. This is the simplest reliable path.

**Option B — cPanel with Node.js application support.** Only viable if the host provides Node `24.22.1+`, a persistent Node process (Passenger or equivalent), and PostgreSQL/MongoDB/SQLite. Most cPanel accounts provide MySQL and Node 18/20, which is not enough. Verify before committing.

**Option C — Hybrid.** Payload admin + API on a small Node host; the public site static-exported to cPanel and rebuilt on publish through GitHub Actions/CI. This keeps cPanel for the public site but adds a second host, rebuilds, and stale-data risk. Use only if the public site must stay on cPanel.

**Default:** Option A. The dashboard is Payload at `/admin`; cPanel is infrastructure, not the content dashboard.

### Deployment

- Docker Compose: `web` (Next/Payload), `db` (Postgres), `caddy` (HTTPS reverse proxy), `media` volume.
- Environment: `DATABASE_URI`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SITE_URL`, SMTP/Resend keys, S3/R2 keys if used.
- Migrations: Payload/Postgres migrations run on deploy; never auto-push in production without a backup.
- Backups: nightly `pg_dump` plus media; 7 daily and 4 weekly copies; restore tested once before launch.
- Staging: a password-protected subdomain with a copy of the database and media.
- Health check: `/api/health` or a simple page that checks the database.

### Content flow

1. Staff logs in at `/admin`.
2. They update a price with an effective date, or edit a site's hours/coordinates.
3. Payload saves the document and triggers revalidation.
4. The public page shows the new data and the `updated_at` timestamp.
5. A farmer submits an application; it is stored in Payload, emailed to staff, and a reference is shown.
6. Payload versions record content changes; request status changes are timestamped.

## 9. Pages and routes

| Route | Purpose | Data |
|---|---|---|
| `/` | Home: live price strip, quick actions, news, services, network teaser, CTA | Payload |
| `/prix` | Full price board, filters, history, print/PDF, calculator | Payload + static shell |
| `/reseau` | Map + list of sites, filters, geolocation, directions | Payload + static shell |
| `/adhesion` | Account application wizard | Payload create + email |
| `/a-propos` | History/timeline, mission, tutelle, real photos | static or Payload pages |
| `/calendrier` | Season calendar | static (detail plan) |
| `/documents` | Required documents and checklists | static, later Payload |
| `/materiel` | Equipment catalog and rental conditions | static, later Payload |
| `/actualites` | News list | Payload |
| `/actualites/[slug]` | Article | Payload |
| `/faq` | FAQ by category | static, later Payload |
| `/contact` | Contact form, map, phone/WhatsApp, hours | Payload create + static |
| `/confidentialite` | Privacy and consent | static |
| `/admin` | Payload dashboard | Payload |

The five routes `/prix`, `/calendrier`, `/documents`, `/reseau`, and `/materiel` are already covered by the shortcut detail pages plan. This design layers live Payload data and the map on `/prix` and `/reseau`, and adds `/adhesion`, `/actualites`, `/faq`, `/contact`, and the trust/legal pages. Do not rebuild the existing five from scratch.

**Navigation:** five primary items maximum — الرئيسية، الأسعار، شبكتنا، الخدمات، تواصل — plus the CTA "افتح حسابك". Move about, news, FAQ, and legal links to the footer or a secondary menu. The current eight items are too many.

## 10. Payload collections and globals

| Collection | Key fields | Access |
|---|---|---|
| `users` | name, email, password, role (`admin`/`editor`), active | admin only; auth enabled |
| `media` | file, alt, caption, focal point | public read; editor write |
| `products` | name_ar, slug, category, grade, unit, active, sort_order | public read; editor write |
| `price-entries` | product (relationship), price_dzd, effective_date, note_ar, status, updated_by | public read; editor write |
| `sites` | name_ar, slug, commune, address_ar, lat, lng, phone, hours_ar, capacity_quintals, services (select), active, sort_order | public read; editor write |
| `account-requests` | reference, applicant_type, full_name, phone, email, commune, activity, area_ha, site (relationship), documents_ack, notes, consent, status, created_at | public create; admin read/update |
| `contact-messages` | full_name, phone, email, subject, message, consent, status, created_at | public create; admin read/update |
| `documents` | title_ar, category, file, updated_at | public read; editor write |
| `faqs` | question_ar, answer, category, sort_order | public read; editor write |
| `news` | slug, title_ar, excerpt, content (Lexical), image, category, published_at, pinned, status | public read published; editor write |
| `settings` (global) | contact, hours, headquarters address + lat/lng, campaign dates, social links, announcement | public read; admin write |
| `pages` (optional global/collection) | about/history/timeline content | public read; editor write |

Payload features to use:

- `auth: true` on `users`; roles field with field-level access.
- `versions: { drafts: true }` on `news` and optional pages; `versions` on `price-entries` for history.
- `admin.useAsTitle` and `defaultColumns` so lists are readable.
- `access` functions for public read and create-only forms.
- `hooks.afterChange` for revalidation and staff email.
- `upload` with `imageSizes` and `focalPoint` on `media`.
- Localization only if/when French is added; the public site is Arabic-only at launch.
- Payload's admin i18n supports Arabic RTL; verify all custom labels and the login screen.

## 11. UX detail

### Price board (`/prix`)

- The existing shortcut detail page provides the static reference shell. This design adds live Payload data, the last-updated timestamp, filters, history, print/PDF, and the calculator without replacing the shell.
- Header: "أسعار الشراء — موسم 2026/2027", last updated timestamp, source note.
- Filter pills: الكل، قمح صلب، قمح لين، شعير، تريتيكال، بقول جافة.
- Desktop: ruled table with a sticky header. Mobile: readable cards.
- Each row: product, grade, price in DZD per quintal, unit, note, and a trend indicator against the previous price.
- Actions: print, PDF (print stylesheet), call, WhatsApp.
- Optional calculator: quantity in quintals × price = estimate, with a clear "estimate only" disclaimer.
- Empty state: "لا توجد أسعار منشورة اليوم — اتصل" with a phone link.
- If the data is more than 7 days old, show a warning banner.

### Network (`/reseau`)

- The existing shortcut detail page provides the seven-site list. Add the map without removing the list.
- Header: "7 مواقع في خدمتك".
- Toggle between map and list; on mobile, map above the list.
- Filters by service: seeds, collection, storage, equipment.
- Map: Leaflet + OSM, custom green markers with an orange active state; popups with name, phone, and directions.
- List: commune, address, hours, phone, services, capacity; "الأقرب إليّ" sorts by geolocation.
- If geolocation is denied, let the user choose a commune.
- Directions: Google Maps or Waze deep link from coordinates.
- The list is always present; the map is an enhancement, not the only way to find a site.

### Account wizard (`/adhesion`)

- Steps: applicant type → activity → documents → site → contact → review.
- Progress: "الخطوة 2 من 5"; back/next; no data lost when going back.
- Documents: checklist based on applicant type, downloadable PDF, "لدي كل الوثائق" confirmation.
- Site: choose from the list sorted by commune; show hours and phone.
- Contact: name, phone (required), email (optional), commune, notes, consent.
- Inline validation and an error summary at the top; large tap targets.
- Submit: spinner; success screen with reference number, next steps, call/WhatsApp actions, and a print option.
- Failure: keep the entered data, show a phone/WhatsApp fallback.
- Spam protection: honeypot, time trap, rate limit. Avoid CAPTCHA unless abuse appears.
- Privacy: consent text, link to the privacy page, and a stated retention period.

### Contact (`/contact`)

- A short form: name, phone, subject, message, consent. Stored in `contact-messages` and emailed to staff.
- Phone, WhatsApp, email, hours, and the headquarters map remain visible without using the form.
- Same spam protection and validation as the account request. If email fails, the message is still stored and the admin inbox is the source of truth.
- The form is a message channel, not an application. The wizard remains the path for opening an account.

### Home changes

- Hero primary CTA: "افتح حسابك" → `/adhesion`; secondary: "أسعار اليوم" → `/prix`.
- Add "منذ 1927" heritage line and a compact stats row on mobile.
- Add a live price strip under the marquee.
- Turn the shortcut cards into real quick actions with live micro-data.
- Add a network teaser (map or three nearest sites) and an about/timeline teaser.
- Make service rows expandable or link them to detail pages.
- Link news to `/actualites` and add swipe/keyboard support.
- Footer: real contact data, working links, privacy.

## 12. Admin experience (Payload)

- `/admin` is the cooperative dashboard; no cPanel content editing.
- Arabic RTL admin, branded with the cooperative logo and colors. Payload's i18n sets RTL for Arabic; custom field labels are translated.
- Roles:
  - **Admin:** all collections, users, settings, exports.
  - **Editor:** prices, sites, news, requests, media; no users/settings.
- Dashboard widgets or default collections for: latest prices, new account requests, new contact messages, sites missing coordinates.
- Price update flow: choose product → enter price and effective date → save. The public page revalidates.
- Site update flow: edit hours/phone → set coordinates on a map picker → save.
- Request inbox: list with status filters, detail view, call/WhatsApp links, CSV export.
- Media library: upload, alt text, focal point, image sizes.
- Live preview for news/pages (optional).
- Audit: Payload versions for content; request status history via a `statusLog` array or timestamps.
- Staff training: a one-page Arabic guide with screenshots for the five most common tasks.

## 13. Visual and motion direction

- Keep cream, green, orange, Alexandria/Plex, editorial rules, rings, and grain.
- Interior pages get a compact hero (240–320px) with breadcrumbs, not a full-screen hero.
- The price board should feel like an official ledger: warm paper, ruled rows, green header, tabular numbers, a stamp-like "آخر تحديث".
- The map should feel like a field map: green pins, orange active state, calm popups.
- The wizard should feel calm: one column, clear progress, large fields, no decoration competing with the form.
- **One signature moment:** a scroll-driven "season" story. A wheat stalk grows from seed to full ear as the visitor scrolls; five chapters light up (البذر، التسميد، الحصاد، الجمع، التخزين), each showing the cooperative's role and a real photo. At the end, the stalk resolves into the brand mark. Provide a static reduced-motion fallback.
- Reuse the existing reveal system. Add page transitions when routes exist. Add subtle icon micro-interactions. Do not add another carousel.
- Typography: microcopy minimum 12px; body 15–16px; headings clamp; Arabic letter-spacing remains 0.
- Contrast: use `#B45309` for small orange text; audit white/xx text on dark green.
- Add print styles for prices and calendars.

## 14. Accessibility

- Target WCAG 2.2 AA.
- Keyboard access for navigation, mobile menu, carousel, accordions, map list, and wizard.
- Visible focus, skip link, landmarks, one H1 per page, logical heading order.
- Forms: labels, descriptions, `aria-invalid`, error messages, error summary.
- Map: always provide the list alternative and text directions.
- Carousel: pause control, swipe, arrow keys, polite live region.
- Reduced motion: no parallax or auto-rotation; static states.
- Contrast fixes for small text and muted text.
- Touch targets at least 44px.
- `lang="ar"`, `dir="rtl"`; isolate Latin labels and numbers.
- Admin: keyboard-operable forms, clear validation, Arabic labels.

## 15. Performance

- Next.js server rendering with Payload Local API; cache public pages and revalidate on publish.
- Keep the public pages statically generated where possible; use dynamic rendering only for the price/network data and forms.
- Lazy-load Leaflet and map tiles only on pages that need them.
- Optimize images through Next/Image and Payload sizes; use AVIF/WebP.
- Fonts through `next/font`, subset, `display: swap`.
- JS budget: under 200KB gzip for public pages, excluding the map page.
- Prefer CSS/IntersectionObserver for new motion; reuse GSAP only where it earns its weight.
- Test on a throttled 4G connection and a mid-range Android phone.
- Database indexes on `slug`, `effective_date`, `status`, and `published_at`.

## 16. SEO

- Per-page metadata from Payload or static modules; canonical, Open Graph.
- `sitemap.ts` and `robots.ts` query Payload.
- Structured data: `Organization`/`GovernmentOrganization` with address and phone; `FAQPage`; `NewsArticle`; `BreadcrumbList`.
- `hreflang` only when a French version exists.
- Prices page: server-rendered current data for crawlers; no client-only table.
- News: server-rendered articles with `published_at`, author, and image.
- Arabic content with Latin slugs.

## 17. Security and privacy

- HTTPS and HSTS.
- Payload authentication with secure cookies, CSRF protection, password hashing, and optional TOTP for admins.
- Role-based access control; field-level restrictions where needed.
- Public forms: server-side validation, honeypot, time trap, IP rate limit, and a size limit. No secrets in the client.
- Uploads: MIME/size validation, image processing through `sharp`, no executable files.
- Secrets in environment variables; never committed.
- Account requests: consent, minimal data, retention period, restricted access.
- Privacy page; no third-party trackers by default; privacy-friendly analytics only if approved and disclosed.
- Backups protected; restore tested once before launch.
- A documented way to disable public form endpoints quickly if abuse appears.
- Keep Payload/Next dependencies patched; subscribe to security advisories.

## 18. Content operations

- Two roles: admin and editor.
- Weekly price update ritual with effective dates and notes.
- Site information changes, including map coordinates.
- Account request follow-up within two working days.
- Monthly backup check.
- A named content owner at the cooperative.
- A named technical owner for deployments, dependency/security updates, monitoring, and backup restore. If no technical owner exists, automate deploys and backups and simplify the stack; decide before the plan is final.
- A fallback phone/WhatsApp contact if the dashboard is unavailable.

## 19. Rollout

The existing shortcut detail pages plan delivers the public shells for `/prix`, `/calendrier`, `/documents`, `/reseau`, and `/materiel`. Execute or verify it first; this design then adds Payload, live data, the map, the wizard, and the dashboard. Do not rebuild those pages.

| Phase | Scope | Estimate |
|---|---|---|
| 0 | Foundation and trust fixes: real contact data, working links, mobile call/WhatsApp, text size and contrast, honest service rows, news swipe, updated date | 1–2 days |
| 1 | Payload setup: Node 24 and TypeScript 6 upgrades, packages, ESM config, route groups, Postgres, users/auth, media, base collections, admin branding in Arabic | 3–5 days |
| 2 | Prices and sites in Payload; public `/prix` and `/reseau` read from Payload; revalidation; dashboard flows | 3–5 days |
| 3 | Network map, geolocation, directions; site data quality | 2–3 days |
| 4 | `/adhesion` wizard, account requests, email/WhatsApp handoff, request inbox | 3–5 days |
| 5 | Contact form, about/timeline, FAQ, news pages, privacy, trust assets | 3–5 days |
| 6 | Season scroll story, SEO, analytics, QA, deployment, backups, staff guide | 3–5 days |

Roughly 3–4 weeks for one developer, depending on hosting, data, and asset availability. The hosting migration and Node upgrade are prerequisites, not part of the estimate.

The season story is the largest phase 6 item. It can launch with an SVG/CSS stalk and the existing field photography; real site/farmer photos can replace them later. If it is not launch-critical, move it after launch without blocking the three journeys.

## 20. Acceptance criteria

- No `[[...]]` tokens remain in rendered pages.
- No `href="#"` remains unless it is a real no-op control with a label.
- Payload `/admin` is reachable, Arabic RTL, and usable on a phone.
- An editor can update a price and the public `/prix` page reflects it without a rebuild; the change is versioned.
- An editor can edit a site's hours/coordinates and `/reseau` reflects it.
- The network page shows all 7 sites on a map and in a list; geolocation and commune selection work; call and directions links work.
- The `/adhesion` wizard submits successfully, staff receives an email, the farmer sees a reference number, validation is clear, and failure keeps the data with a phone/WhatsApp fallback.
- Axe reports zero critical issues on public pages and the admin; keyboard navigation passes; contrast passes.
- LCP and CLS targets are met on a throttled mobile profile.
- Metadata, sitemap, and structured data validate.
- Backup and restore are tested.
- The cooperative content owner signs off on the copy and data.

## 21. Open questions for the human partner

Ranked by importance:

1. **Hosting:** is the current account a shared cPanel account (no Node 24 / no supported database), a cPanel VPS with Node.js application support, or can we use a Node VPS/managed host? Payload cannot run on a static cPanel account, and MySQL is not supported.
2. **Existing shortcut plan:** confirm we build on the five static detail pages (`/prix`, `/calendrier`, `/documents`, `/reseau`, `/materiel`) rather than replace them. Recommended: build on them.
3. **Maintenance after launch:** who deploys, patches Node/Next/Payload, monitors the API, and tests backups? If no one, we need to automate and simplify.
4. **Content ownership:** who supplies and approves the history/timeline, mission, FAQ procedures, privacy/legal text, and the official document list?
5. **Database:** PostgreSQL (recommended), SQLite (small single server), or MongoDB (if a cluster already exists)? MySQL is not an option.
6. **Prices scope:** is there one purchase price per product/grade for the whole cooperative, or do prices differ by site? The design assumes cooperative-wide; per-site pricing adds a site relationship, a site selector, and different trend queries.
7. **Real data:** do you have the current prices, the 7 site addresses/coordinates/phones/hours/services, the headquarters coordinates, the document list, and the official contact/legal details?
8. **Mail and WhatsApp:** which mailbox receives account requests and contact messages, can it send authenticated SMTP, and which WhatsApp number should the handoff use?
9. **Season story:** is the scroll-driven season story required at launch, and are real photos available? The fallback is an SVG/CSS stalk with the existing field photography, or a later enhancement.
10. **Admin users:** who will use `/admin`, how many people, and can any editor publish a price or does a manager approve it?
11. **Existing portal:** is there already a customer portal we should link to instead of building an application wizard?
12. **French at launch:** full French version, key pages only, or remove the FR switch for now?
13. **Deployment access:** domain, SSL, DNS, and SSH access to the chosen host.
14. **Privacy:** consent text, data retention period, and any legal requirements.
15. **Assets:** real photos and partner logos with permission; launch target date.

## 22. What is left to the builder

- Exact Payload collection fields, admin layout, and access-control functions.
- Postgres vs SQLite/Mongo final choice, based on the host.
- Next.js route-group restructuring and the `withPayload` config conversion.
- Revalidation strategy for each collection.
- Map marker design and geolocation UX details.
- PDF generation method: print stylesheet or server-side PDF.
- Copywriting for new pages within the provided content.
- Choice of privacy-friendly analytics, if approved.
- Whether `/services` is a separate page or a home section.
- Whether news, documents, and FAQs are fully Payload-managed in v1 or a later phase.
- The staff training guide and the one-page operational runbook.
