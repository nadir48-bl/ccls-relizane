# Plan 006 — Motion tokens: retune feel from one place

- **Areas:** `app/globals.css`, `components/sections/Header.tsx`, `components/sections/News.tsx`
- **Severity:** LOW (systemic cohesion — no behavior change today, single-point retuning afterwards)
- **Status:** READY
- **Baseline:** Working tree of 2026-10-27. No VCS — match the excerpts below before editing.
- **Prerequisite:** **execute plan 007 first.** Steps 3's replace-all assumes `.footer-contact-card`/`.footer-icon-badge` already carry explicit property lists written by 007. Excerpts below assume that state.

## The problem (evidence)

The repo has exactly one motion token — `app/globals.css:19`:

```css
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
```

Durations are scattered literals: `0.25s` ×20, `0.3s` ×16, `0.5s` ×1, `0.65s` ×1 (all CSS, all in `globals.css`), and the easing curve is re-inlined three times in JSX (`Header.tsx:101`, `Header.tsx:142`, `News.tsx:171` — the last grew to twice after plan 004's caption stack). Changing the site's hover feel today means editing 40 individual lines.

## Steps

### Step 1 — Define the duration scale in `:root`

`globals.css:19` is:

```css
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
```

Replace that single line with:

```css
  /* Motion scale — durations for UI transitions only. Ambient loop
     lengths (marquee, footer, chips) stay literal above. */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --duration-hover: 250ms;
  --duration-surface: 300ms;
  --duration-enter: 500ms;
  --duration-sheen: 650ms;
```

Value mapping (do not change any of them): 250ms = all hover micro-motion; 300ms = larger/surface transitions (service numbers, footer cards, footer-top); 500ms = content entrances/crossfades; 650ms = the btn sheen sweep.

### Step 2 — `0.25s` → `--duration-hover` (20 occurrences)

In `app/globals.css`, verify the count first: `grep -c "0.25s var(--ease-out)" app/globals.css` must return **20** at this point (before executing plans 004/009). Then replace every occurrence of the exact string

```
0.25s var(--ease-out)
```

with

```
var(--duration-hover) var(--ease-out)
```

The 20 live in exactly these selectors (for spot-checking, and for executors whose editor lacks replace-all):

| Selector | Lines (original) | Count |
|---|---|---|
| `.btn` | 258–260 | 5 |
| `.news-thumb` | 619–621 | 3 |
| `.news-pause` | 646–651 | 3 |
| `.service-arrow` | 767–771 | 3 |
| `.shortcut-arrow` | 787–790 | 2 |
| `.shortcut-row` | 779–781 | 1 |
| `.footer-link` | 913–915 | 2 |
| `.footer-link::after` | 925 | 1 |
| — total | | **20** |

If the count is not 20, stop and investigate instead of replacing.

### Step 3 — `0.3s` → `--duration-surface` (16 occurrences)

Verify: `grep -c "0.3s var(--ease-out)" app/globals.css` returns **16** (with plan 007 applied). Replace every occurrence of

```
0.3s var(--ease-out)
```

with

```
var(--duration-surface) var(--ease-out)
```

Inventory (lines assume post-007 state for the two rewrites):

| Selector | Lines (original) | Count |
|---|---|---|
| `.service-number` | 751–752 | 2 |
| `.footer-contact-card` (post-007 explicit list) | 948–952 | 4 |
| `.footer-icon-badge` (post-007 explicit list) | 969–972 | 4 |
| `.footer-top` | 989–991 | 5 |
| `.footer-top svg` | 1003 | 1 |
| — total | | **16** |

If 007 has **not** been executed, `.footer-contact-card`/`.footer-icon-badge` still read `transition: all 0.3s var(--ease-out);`, the count will be 8, and you must stop and run 007 first rather than force this.

### Step 4 — The two single-occurrence durations

`globals.css:281` (inside `.btn::before`):

```css
    transition: transform 0.65s var(--ease-out);
```

becomes

```css
    transition: transform var(--duration-sheen) var(--ease-out);
```

`globals.css:595` (`.news-slide-enter` — **this rule line is untouched by plan 004**, only the keyframe body below it changes):

```css
.news-slide-enter {
  animation: news-fade 0.5s var(--ease-out) both;
}
```

becomes

```css
.news-slide-enter {
  animation: news-fade var(--duration-enter) var(--ease-out) both;
}
```

After this step, `grep -nE "0\.(25|3|5|65)s var" app/globals.css` must return nothing.

### Step 5 — Stop re-inlining the bezier in JSX

Replace the inline arbitrary easing in three places. Tailwind v4 arbitrary values resolve CSS variables, so `ease-[var(--ease-out)]` generates `transition-timing-function: var(--ease-out)`.

`Header.tsx:101` — the header's className, fragment

```
duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
```

becomes

```
duration-300 ease-[var(--ease-out)]
```

`Header.tsx:142` — inside the nav-link className, the (unique in that file) fragment

```
after:ease-[cubic-bezier(0.22,1,0.36,1)]
```

becomes

```
after:ease-[var(--ease-out)]
```

`News.tsx:171` — replace every occurrence of

```
ease-[cubic-bezier(0.22,1,0.36,1)]
```

with

```
ease-[var(--ease-out)]
```

(one occurrence originally; plan 004 adds an identical one in the caption stack — both get replaced).

## Scope

**In scope:** the token block, the four duration literal groups in `globals.css`, three JSX easing fragments.

**Out of scope (do not change):**
- GSAP durations (`Reveal` 0.8/0.9s, `Counter` 1.8s, hero timeline beats, Lenis 1.15s) — those are one-off choreography with hand-tuned beats, not shared transition values; seconds-in-JS is where they belong.
- Ambient loop lengths (`--flash-duree: 24s`, 28s drift, 9s beam, 10–17s particles, 8s chip float) — intentionally literal.
- Tailwind `duration-*` utilities in JSX (150/200/300/500ms) — tokenizing them adds churn with no single-point-payoff today; revisit if a future redesign retunes classes.
- The mobile-nav durations written by plan 003 (0.16s/0.22s) — new code with hand-chosen enter/exit asymmetry.

## Verification

1. Identity checks per step (grep counts at exactly 20 / 16 / 1 / 1).
2. `npm run lint` passes; `npm run dev` — visually confirm zero differences: hover the buttons, nav links, service rows, footer cards; open the mobile menu (plan 003's rules untouched); watch a news crossfade.
3. Capability proof (the reason for the plan): in DevTools, set `--duration-hover: 600ms` on `:root` momentarily — every hover micro-motion on the site slows down together (buttons, arrows, footer links, marquee…); restore `:root` and everything springs back. That is the single-point-retuning payoff, working.
4. Reduced-motion regression: emulate `prefers-reduced-motion: reduce`; everything static as before — token renaming must not have disturbed the reduce-block overrides (they target properties/selectors, not durations).
