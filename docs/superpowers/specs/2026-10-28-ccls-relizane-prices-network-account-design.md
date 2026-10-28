# CCLS Relizane — Prices, Network & Account Design

**Status:** Draft for approval
**Date:** 2026-10-28
**Project:** CCLS Relizane public website
**Human partner decisions:**
- Build all three journeys: today's price, nearest site, opening an account.
- Keep the site on the cooperative's cPanel hosting.
- The cooperative team updates prices and site information from a simple admin screen.

**Builder's calls (change these if you disagree):**
- Keep the public site as a static Next.js export; add a small PHP 8 + MySQL admin/API on the same cPanel account.
- Treat "open an account" as an application request, not a customer login/portal.
- Arabic-first. Remove the dead FR switch until a real French version exists.
- Admin v1 manages prices, sites, account requests, and settings. News, documents, and FAQs can follow.
- Use Leaflet + OpenStreetMap for maps; no paid map key.
- Use Latin URL slugs (`/prices`, `/network`, `/join`) with Arabic content.
- Keep the current visual identity; new pages extend it rather than redesigning it.

---

## 1. Intent

Turn the current one-page brochure into a small, trusted service site that lets a farmer:

1. check today's purchase price,
2. find the nearest cooperative site,
3. start an account application.

The cooperative team must be able to keep prices and site information current from a simple admin screen. The public site stays on cPanel, loads fast on a phone, works in Arabic/RTL, and remains usable on a weak connection.

## 2. Why now

The current site looks professional but is functionally a demo: contact details are still placeholders, several links go nowhere useful, and there is no real price, site list, or application path. These three journeys are the highest-value tasks for the audience:

- **Prices** create repeat visits.
- **The site locator** supports the visit and reduces phone calls.
- **The application wizard** converts the visit into a relationship.

The admin screen is what keeps the data alive after launch. Without it, the price page becomes stale and loses trust.

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
- Staff can update a price in under 2 minutes without a developer.
- No placeholder tokens, no dead links, no misleading controls.
- WCAG 2.2 AA for text and controls; reduced-motion preferences respected.
- LCP under 2.5s on a mid-range phone over 4G; CLS under 0.1.
- Public site stays static on cPanel; no Node runtime required in production.

## 5. Non-goals

- Customer login/portal, online payments, ERP or inventory integration.
- A real-time market feed. Prices are entered by staff.
- A full CMS for every string. Only operational data is admin-managed.
- A French version at launch (pending decision; default is to remove the dead switch and add French later).
- A mobile app, SMS gateway, or AI chatbot.
- A visual redesign. The current editorial language stays.

## 6. Anti-goals

- Prices hidden behind a PDF, a login, or a phone call.
- A form longer than necessary, asking for data the cooperative will not use.
- Admin complexity leaking into the public experience.
- More decorative motion at the expense of speed and clarity.
- A generic government-portal look.

## 7. Current state

- Next.js 16 App Router, TypeScript, Tailwind CSS v4, GSAP, Lenis.
- Static export is already supported through `STATIC_EXPORT=1` and `npm run build:static`.
- One page: tutelle bar, header, hero, flash marquee, CTA band, news, shortcuts, services, stats, footer.
- Content lives in `lib/content.ts`; several values are still `[[PLACEHOLDER]]` tokens.
- Working-tree changes already turn some dead links into anchors and add scrollspy attributes. Preserve them.
- No `/prices`, `/network`, or `/join` pages. No admin. No forms. No map.

## 8. Architecture

### Public site

- Next.js static export to `out/`.
- Existing sections stay static. New pages are static shells; live data (prices, sites) is fetched from same-origin PHP JSON endpoints at runtime.
- A build-time snapshot of prices and sites is embedded in the static HTML for first paint and SEO. The client refreshes from the API and shows the `updated_at` value. If the API fails, the snapshot remains with a note.
- No client-side secrets. No personal data in `localStorage`.
- Leaflet is lazy-loaded only on pages that need a map.

### Data and API (PHP 8.1+, MySQL/MariaDB)

- `GET /api/public/prices.php` — active products, latest effective price, optional history, `updated_at`.
- `GET /api/public/sites.php` — active sites, coordinates, services, hours, phone.
- `GET /api/public/settings.php` — contact details, hours, campaign dates.
- `POST /api/public/account-request.php` — validates, stores, emails staff, returns a reference number.
- `POST /api/public/contact.php` — short contact message; validates, stores, emails staff.
- JSON, UTF-8, `Cache-Control: public, max-age=60, stale-while-revalidate=300`, ETag.
- Errors return a generic JSON message; details are logged server-side only.

### Admin (PHP)

- `/admin/` login, dashboard, prices, sites, account requests, settings, users, audit log.
- Server-rendered forms with POST/redirect/GET. No SPA build step.
- Arabic RTL, same palette, large controls, mobile-friendly.
- Password hashing, secure sessions, CSRF tokens, login rate limiting, prepared statements, audit log.
- Map picker for site coordinates.
- CSV export of requests; mailto and WhatsApp links.
- Start with one role if that is simpler, but design for **admin** (everything) and **editor** (prices, sites, requests; no users/settings).

### Deployment

- Build locally or in CI: `npm run build:static`.
- Upload `out/` to `public_html/`, plus `server/api/` and `server/admin/`.
- Keep configuration and database credentials above the web root.
- `.htaccess`: HTTPS redirect, security headers, static asset caching, deny access to config/backups, block PHP execution in `/uploads`.
- Backups: nightly database dump plus uploads; keep 7 daily and 4 weekly copies.
- Environments: local (PHP built-in server + MySQL), staging (password-protected subdomain), production.
- If PHP/MySQL is unavailable: fall back to static JSON edited by a developer (no admin), or move to a Node host. This is a risk, not the plan.

### Content flow

1. Staff logs in, updates a price with an effective date, and saves.
2. The public API returns the new price within the cache window; the page shows the new `updated_at`.
3. Staff edits a site; the map and list update.
4. A farmer submits an application; it is stored, emailed to staff, and a reference is shown.
5. The audit log records who changed what and when.

## 9. Pages and routes

| Route | Purpose | Data |
|---|---|---|
| `/` | Home: live price strip, quick actions, news, services, network teaser, CTA | build-time + live prices |
| `/prices` | Full price board, filters, history, print/PDF, calculator | live API |
| `/network` | Map + list of sites, filters, geolocation, directions | live API |
| `/join` | Account application wizard | API POST |
| `/about` | History/timeline, mission, tutelle, real photos | static |
| `/news` | News list | static (phase 1); admin later |
| `/news/[slug]` | Article | static |
| `/faq` | FAQ by category | static (admin later) |
| `/contact` | Contact form, map, phone/WhatsApp, hours | static + API POST |
| `/privacy` | Privacy and consent | static |
| `/admin` | Staff admin | PHP |

**Navigation:** five primary items maximum — الرئيسية، الأسعار، شبكتنا، الخدمات، تواصل — plus the CTA "افتح حسابك". Move about, news, FAQ, and legal links to the footer or a secondary menu. The current eight items are too many.

## 10. Data model

| Table | Key fields |
|---|---|
| `products` | id, slug, name_ar, name_fr, category, grade, unit, active, sort_order |
| `price_entries` | id, product_id, price_dzd, effective_date, note_ar, created_by, created_at |
| `sites` | id, slug, name_ar, commune, address_ar, lat, lng, phone, hours_ar, capacity_quintals, active, sort_order |
| `site_services` | site_id, service_key |
| `account_requests` | id, reference, applicant_type, full_name, phone, email, commune, activity, area_ha, site_id, documents_ack, notes, consent, status, created_at, updated_at, ip_hash |
| `contact_messages` | id, full_name, phone, email, subject, message, status, created_at, ip_hash |
| `settings` | key, value (contact details, hours, campaign dates, social links) |
| `admins` | id, username, password_hash, role, created_at, last_login |
| `audit_log` | id, admin_id, action, entity, entity_id, before_json, after_json, created_at |
| `documents` | id, title_ar, category, file_path, updated_at (phase 2) |
| `faqs` | id, question_ar, answer_ar, category, sort_order (phase 2) |
| `news` | id, slug, title_ar, excerpt, body, image, category, published_at, pinned (phase 2) |

## 11. UX detail

### Price board (`/prices`)

- Header: "أسعار الشراء — موسم 2026/2027", last updated timestamp, source note.
- Filter pills: الكل، قمح صلب، قمح لين، شعير، تريتيكال، بقول جافة.
- Desktop: ruled table with a sticky header. Mobile: readable cards.
- Each row: product, grade, price in DZD per quintal, unit, note, and a trend indicator against the previous price.
- Actions: print, PDF (print stylesheet), call, WhatsApp.
- Optional calculator: quantity in quintals × price = estimate, with a clear "estimate only" disclaimer.
- Empty state: "لا توجد أسعار منشورة اليوم — اتصل" with a phone link.
- If the data is more than 7 days old, show a warning banner.

### Network (`/network`)

- Header: "7 مواقع في خدمتك".
- Toggle between map and list; on mobile, map above the list.
- Filters by service: seeds, collection, storage, equipment.
- Map: Leaflet + OSM, custom green markers with an orange active state; popups with name, phone, and directions.
- List: commune, address, hours, phone, services, capacity; "الأقرب إليّ" sorts by geolocation.
- If geolocation is denied, let the user choose a commune.
- Directions: Google Maps or Waze deep link from coordinates.
- The list is always present; the map is an enhancement, not the only way to find a site.

### Account wizard (`/join`)

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

- A short form: name, phone, subject, message, consent. Stored in `contact_messages` and emailed to staff.
- Phone, WhatsApp, email, hours, and the headquarters map remain visible without using the form.
- Same spam protection and validation as the account request. If email fails, the message is still stored and the admin inbox is the source of truth.
- The form is a message channel, not an application. The wizard remains the path for opening an account.

### Home changes

- Hero primary CTA: "افتح حسابك" → `/join`; secondary: "أسعار اليوم" → `/prices`.
- Add "منذ 1927" heritage line and a compact stats row on mobile.
- Add a live price strip under the marquee.
- Turn the shortcut cards into real quick actions with live micro-data.
- Add a network teaser (map or three nearest sites) and an about/timeline teaser.
- Make service rows expandable or link them to detail pages.
- Link news to `/news` and add swipe/keyboard support.
- Footer: real contact data, working links, privacy.

## 12. Visual and motion direction

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

## 13. Accessibility

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

## 14. Performance

- Static HTML; no Node runtime in production.
- Lazy-load Leaflet and map tiles only on pages that need them.
- Keep API responses small; cache with ETag and a short max-age.
- Optimize images to WebP/AVIF and serve responsive sizes. Static export uses `unoptimized: true`, so pre-optimize assets at build time.
- Fonts through `next/font`, subset, `display: swap`.
- JS budget: under 200KB gzip for public pages, excluding the map page.
- Prefer CSS/IntersectionObserver for new motion; reuse GSAP only where it earns its weight.
- Test on a throttled 4G connection and a mid-range Android phone.

## 15. SEO

- Per-page metadata, canonical, Open Graph.
- `sitemap.ts` and `robots.ts`.
- Structured data: `Organization`/`GovernmentOrganization` with address and phone; `FAQPage`; `NewsArticle`; `BreadcrumbList`.
- `hreflang` only when a French version exists.
- Prices page: static metadata and static snapshot; live data refreshed client-side.
- Arabic content with Latin slugs.

## 16. Security and privacy

- HTTPS and HSTS.
- Admin authentication with `password_hash`, HttpOnly/Secure/SameSite session cookies, CSRF tokens, rate limiting, optional TOTP.
- Outbound mail uses authenticated SMTP (a cPanel mailbox or an external provider) through PHPMailer, not bare `mail()`. Verify SPF/DKIM and test delivery. If mail is unreliable, the admin inbox is the primary notification and the success screen says so.
- Prepared statements, server-side validation, output escaping.
- Uploads: validate MIME and size, random file names, no PHP execution in the upload directory.
- Config and database credentials above the web root; secrets never committed.
- Public endpoints are read-only; the POST endpoint is rate-limited and origin-checked.
- Account requests: consent, minimal data, retention period, restricted access.
- Privacy page; no third-party trackers by default; privacy-friendly analytics only if approved and disclosed.
- Backups protected; restore tested once before launch.
- A documented way to disable the admin/API quickly if something goes wrong.

## 17. Content operations

- Two roles: admin and editor.
- Weekly price update ritual with effective dates and notes.
- Site information changes, including map coordinates.
- Account request follow-up within two working days.
- Monthly backup check.
- A named content owner at the cooperative.
- A named technical owner for rebuilds, deployment, dependency/security updates, API monitoring, and backup restore. If no technical owner exists, expand the admin scope and automate rebuilds; decide this before the plan is final.
- A fallback phone/WhatsApp contact if the admin is unavailable.

## 18. Rollout

| Phase | Scope | Estimate |
|---|---|---|
| 0 | Foundation and trust fixes: real contact data, working links, mobile call/WhatsApp, text size and contrast, honest service rows, news swipe, updated date | 1–2 days |
| 1 | Data layer and admin: auth, prices, sites, settings, audit | 3–5 days |
| 2 | Prices page and home price strip | 2–3 days |
| 3 | Network page and map | 3–4 days |
| 4 | Account wizard, requests admin, email/WhatsApp handoff | 3–5 days |
| 5 | About, FAQ, news pages, contact, privacy, trust assets | 3–5 days |
| 6 | Season scroll story, SEO, analytics, QA, deployment | 3–5 days |

Roughly 3–4 weeks for one developer, depending on data and asset availability.

The season story is the largest phase 6 item. It can launch with an SVG/CSS stalk and the existing field photography; real site/farmer photos can replace them later. If it is not launch-critical, move it after launch without blocking the three journeys.

## 19. Acceptance criteria

- No `[[...]]` tokens remain in rendered pages.
- No `href="#"` remains unless it is a real no-op control with a label.
- The price page shows current price, last-updated time, filters, print, and mobile cards.
- An admin can update a price and the public page reflects it without a rebuild; the change is audited.
- The network page shows all 7 sites on a map and in a list; geolocation and commune selection work; call and directions links work.
- The join wizard submits successfully, staff receives an email, the farmer sees a reference number, validation is clear, and failure keeps the data with a phone/WhatsApp fallback.
- Axe reports zero critical issues; keyboard navigation passes; contrast passes.
- LCP and CLS targets are met on a throttled mobile profile.
- Metadata, sitemap, and structured data validate.
- Backup and restore are tested.
- The cooperative content owner signs off on the copy and data.

## 20. Open questions for the human partner

Ranked by importance:

1. **Maintenance after launch:** who rebuilds and deploys the static site, patches Next/PHP, monitors the API, and tests backups? Is there a maintenance agreement, or is the cooperative expecting no developer?
2. **Content ownership:** who supplies and approves the history/timeline, mission, FAQ procedures, privacy/legal text, and the official document list? The builder can draft, but cannot invent institutional facts.
3. **Hosting capability:** does the cPanel account support PHP 8.1+ and MySQL/MariaDB? If not, we need a fallback.
4. **Real data:** do you have the current prices, the 7 site addresses/coordinates/phones/hours/services, the document list, and the official contact/legal details?
5. **Mail and WhatsApp:** which mailbox receives account requests and contact messages, can the account send authenticated SMTP, and which WhatsApp number should the handoff use?
6. **Season story:** is the scroll-driven season story required at launch, and are real photos available? The fallback is an SVG/CSS stalk with the existing field photography, or a later enhancement.
7. **Admin users:** who will use the admin screen, how many people, and can any editor publish a price or does a manager approve it?
8. **Existing portal:** is there already a customer portal we should link to instead of building an application wizard?
9. **French at launch:** full French version, key pages only, or remove the FR switch for now?
10. **Deployment access:** domain, SSL, and SSH/FTP/Git access to cPanel.
11. **Privacy:** consent text, data retention period, and any legal requirements.
12. **Assets:** real photos and partner logos with permission; launch target date.

## 21. What is left to the builder

- Exact admin layout, CSS, and component structure.
- Whether to use a JSON column or a join table for site services, based on the MySQL version.
- Exact caching and ETag strategy.
- PDF generation method: print stylesheet or server-side PDF.
- Map marker design and geolocation UX details.
- Copywriting for new pages within the provided content.
- Choice of privacy-friendly analytics, if approved.
- Whether `/services` is a separate page or a home section.
- Whether news, documents, and FAQs are admin-managed in v1 or a later phase.
- Contact is a stored form (`contact_messages`) plus visible phone/WhatsApp/email, not a link-only page.
- Outbound mail uses authenticated SMTP through PHPMailer; if delivery fails, the admin inbox remains the source of truth.
- The season story is implemented as an SVG/CSS stalk with the existing photography, not video or Lottie.
- The static build embeds a price/site snapshot; the client refreshes it from the API without a rebuild.
