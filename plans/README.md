# Animation Plans — CCLS Relizane web page

Produced by the animation audit of 2026-10-27 (senior motion advisor workflow, Emil Kowalski's animation philosophy as the bar). The repo has no VCS, so every plan validates its starting state by matching file excerpts rather than a commit SHA.

## How to run a plan

These plans are written for an executor with zero context. `improve-animations execute <plan-file>` (or hand the plan file to any agent) and let it follow the steps verbatim. Each plan ends with a verification section including a feel-check — that section is not optional.

## Findings still unplanned

None — every accepted corrective finding and missed opportunity from the audit has a plan (001–010).

## Execution order & status

**Recommended single order: 001 → 002 → 003 → 007 → 004 → 005 → 008 → 009 → 010 → 006.** Two pairings are strict, the rest is friction preference:

- **007 before 006 (strict):** 006's replace-all step assumes the `.footer-contact-card`/`.footer-icon-badge` explicit lists written by 007 (its grep count of 16 × `0.3s` depends on it), and 006's excerpts quote the post-007 state.
- **004 before 006 (recommended):** 004's caption stack duplicates the inline bezier in `News.tsx`; 006 then dedupes both in one pass. Not breaking, just tidy.
- Everything else: execute in the listed order or in whatever subset you choose — each plan is otherwise self-contained. 001/003/009/010 all append to the *same* `@media (prefers-reduced-motion: reduce)` block in `app/globals.css`; each plan says to append after the previously added rules, which the order above satisfies mechanically.

| # | Plan | Files touched | Kind | Severity | Depends on | Status |
|---|---|---|---|---|---|---|
| 001 | [Reduced-motion gaps (footer ambient layers + button sheen)](001-reduced-motion-gaps.md) | `app/globals.css` | corrective | HIGH | — | READY |
| 002 | [Header progress bar: direct DOM writes, remove transition fight](002-header-progress-bar.md) | `components/sections/Header.tsx` | corrective | HIGH | — | READY |
| 003 | [Mobile menu entrance/exit](003-mobile-menu-entrance.md) | `app/globals.css`, `components/sections/Header.tsx` | corrective | MEDIUM | — | READY |
| 007 | [Motion hygiene: explicit transition lists, no dead rules](007-transition-all-hygiene.md) | `app/globals.css`, `Footer.tsx`, `Stats.tsx` | corrective | LOW | — | READY |
| 004 | [News caption crossfade in sync with images](004-news-caption-crossfade.md) | `components/sections/News.tsx`, `app/globals.css` | corrective | MEDIUM | — | READY |
| 005 | [Instant scroll for keyboard anchors + offset from `--header-h`](005-anchor-keyboard-instant-offset.md) | `components/motion/SmoothScroll.tsx` | corrective | LOW·MED | — | READY |
| 008 | [Hero chip count-up (reuse Counter)](008-hero-chip-countup.md) | `Counter.tsx`, `Hero.tsx`, `lib/content.ts`, `app/globals.css` | additive | LOW | — | READY |
| 009 | [Live pulse on the flash badge](009-flash-badge-pulse.md) | `FlashMarquee.tsx`, `app/globals.css` | additive | LOW | — | READY |
| 010 | [Soft edge mask on the marquee](010-marquee-edge-mask.md) | `app/globals.css` | additive | LOW | — | READY |
| 006 | [Motion tokens: one place to retune feel](006-motion-tokens.md) | `app/globals.css`, `Header.tsx`, `News.tsx` | corrective | LOW | **007 first** | READY |

After execution: run `reconcile` from the improve-animations workflow to mark plans DONE against the current code and refresh stale references.

## Share-file map (for executors doing multiple plans at once)

- `app/globals.css`: touched by 001, 003, 004, 006, 008, 009, 010 — disjoint regions except the shared reduce block (headers/footers of the block are append-only; no rule overlaps).
- `components/sections/Header.tsx`: touched by 002 (scroll effect + bottom progress bar) and 003 (mobile-nav render block) — disjoint regions.
- `components/sections/News.tsx`: touched by 004 (caption stack + cluster key + spans later 006) — single region, one plan + one-line follow-up from 006.
