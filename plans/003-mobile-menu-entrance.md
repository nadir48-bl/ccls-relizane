# Plan 003 — Give the mobile menu a proper entrance and exit

- **Areas:** `components/sections/Header.tsx` + `app/globals.css`
- **Severity:** MEDIUM — the mobile menu, the highest-frequency motion on phones, mounts and unmounts with zero transition: it pops in and vanishes out beneath a header that itself transitions colors smoothly. A visible discontinuity against the site's otherwise polished motion.
- **Status:** READY
- **Baseline:** Working tree of 2026-10-27. No VCS — match the excerpts below before editing.

## The problem (evidence)

`Header.tsx` lines 188–191 render the menu conditionally:

```tsx
      {open ? (
        <div
          id="mobile-nav"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-var(--header-h))] overflow-y-auto border-b border-line bg-bg text-ink shadow-[0_24px_50px_rgba(34,26,16,0.12)] xl:hidden"
        >
```

and the block ends at lines 229–231:

```tsx
          </nav>
        </div>
      ) : null}
```

Mount ⇒ appears instantly; `setOpen(false)`, Escape, or link click ⇒ unmounts instantly. No enter, no exit.

## Design values (use exactly these)

The menu is absolutely positioned below the sticky header bar, so its entrance/exit affects no surrounding layout — a fade + slight vertical settle is the right vocabulary:

- **Enter:** 220ms, `var(--ease-out)` — emerges *downward from the header*, so start 8px above the final position (`translateY(-8px)` → `translateY(0)`).
- **Exit:** 160ms (faster than the enter, ~0.7×; exits should be quicker than entrances), same easing.
- **Mechanism:** keep the element always mounted; toggle a `data-open` attribute. The standard `visibility`-transition technique hides it from pointer events, the tab order, and the accessibility tree once the exit finishes — no conditional rendering needed and `aria-controls="mobile-nav"` / `aria-expanded` stay correct.

## Steps

### Step 1 — Add the CSS block to `app/globals.css`

Insert a new section directly **above** the `/* News */` section comment (currently at line 590, immediately after the `marquee-slide` keyframes that end at line 588). The file is organized as labeled sections, so add it with the same comment style:

```css
/* ------------------------------------------------------------------ */
/* Mobile nav                                                          */
/* ------------------------------------------------------------------ */

.mobile-nav {
  position: absolute;
  inset-inline: 0;
  top: 100%;
  max-height: calc(100dvh - var(--header-h));
  overflow-y: auto;
  visibility: hidden;
  opacity: 0;
  transform: translateY(-8px);
  transition: opacity 0.16s var(--ease-out), transform 0.16s var(--ease-out),
    visibility 0s linear 0.16s;
}

.mobile-nav[data-open="true"] {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.22s var(--ease-out), transform 0.22s var(--ease-out),
    visibility 0s;
}
```

Why this construction (do not rework it):

- On the closed state, `visibility 0s linear 0.16s` flips `visibility: hidden` exactly when the 160ms opacity/transform exit finishes; on the open state it flips instantly. `visibility` alone already blocks interaction and removes the element from the a11y tree, so no `pointer-events` juggling is needed.
- The base styles absorb the geometry Tailwind classes previously provided (`absolute inset-x-0 top-full max-h-[...] overflow-y-auto` — they are removed from the JSX in Step 2). `border-b border-line bg-bg text-ink` and the shadow stay as Tailwind in the JSX.
- `var(--ease-out)` is the repo's one easing token: `cubic-bezier(0.22, 1, 0.36, 1)` (`globals.css:19`).

### Step 2 — Reduced motion: instant open/close

Append inside the existing `@media (prefers-reduced-motion: reduce)` block (which starts at `globals.css` line 1019), directly above its closing brace:

```css
  .mobile-nav {
    transition: none;
  }
```

If Plan 001 has been executed already, its additions sit at the end of the same block — append **after** them and leave them intact. Result under reduced motion: opening/closing is instant (identical to today's behavior) while the element stays mounted.

### Step 3 — Render the menu unconditionally with `data-open`

In `Header.tsx`, replace the whole wrapper (lines 188–191 opening, 229–231 closing). The opening:

```tsx
      {open ? (
        <div
          id="mobile-nav"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-var(--header-h))] overflow-y-auto border-b border-line bg-bg text-ink shadow-[0_24px_50px_rgba(34,26,16,0.12)] xl:hidden"
        >
```

becomes:

```tsx
      <div
        id="mobile-nav"
        data-open={open ? "true" : "false"}
        className="mobile-nav border-b border-line bg-bg text-ink shadow-[0_24px_50px_rgba(34,26,16,0.12)] xl:hidden"
      >
```

The closing (lines 229–231):

```tsx
          </nav>
        </div>
      ) : null}
```

becomes:

```tsx
          </nav>
        </div>
```

The inner `<nav>` and all of its link JSX are changed not at all.

### Step 4 — Leave the logic alone

`setOpen(true/false)`, the Escape handler (`Header.tsx:80-82`), the ≥1280px auto-close (`84-86`), and the per-link `onClick={() => setOpen(false)}` all keep working unchanged: closing now plays the 160ms exit instead of an unmount. Focusing a link inside a just-closed menu is impossible (`visibility: hidden` removes it from the tab order) — identical to today's unmount behavior.

## Scope

**In scope:** the menu wrapper div, the two CSS additions, nothing else.

**Out of scope (do not touch):** the header's own hide/show transition (`translate-y-full` at line 101–102), the hamburger button, focus trapping (none exists today, none added), and scroll locking (not present today).

## Verification

1. Identity check: excerpts match before editing.
2. `npm run lint` stays clean; run `npm run dev` and test at a phone viewport (≤1279px, e.g. 390px wide).
3. Interaction: tap the hamburger — the panel fades in while settling down 8px, 220ms; tap any link, Escape, the hamburger again, or resize ≥1280px — it fades out over 160ms and then disappears from the tab order (Tab from the page body must not land inside the closed menu).
4. A11y check: with the menu closed, a screen reader / the browser's document order must not offer `#mobile-nav` (visibility hides it). `aria-expanded` on the button still toggles.
5. Reduced-motion check (emulate `prefers-reduced-motion: reduce`): opening and closing are instant; elements never flash invisible-but-blocking.
6. Feel-check: open and close the menu 5× in a row quickly (faster than the animations). It must never get stuck half-visible and must always end fully open or fully closed — that is what the visibility-delay construction guarantees. Compare in RTL context: the panel must settle straight down from the header bar, with no horizontal shift.
