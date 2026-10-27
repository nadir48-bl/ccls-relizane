# Plan 001 — Close the reduced-motion gaps in the footer and the button sheen

- **Area:** `app/globals.css` only
- **Severity:** HIGH (accessibility — endless looped motion keeps running under `prefers-reduced-motion: reduce`)
- **Status:** READY
- **Baseline:** Working tree of 2026-10-27. This repo has no VCS, so verify identity of the code by matching the "current code" excerpts below before editing.

## The problem

The `@media (prefers-reduced-motion: reduce)` block in `app/globals.css` (starts at line 1019) was written before the footer redesign. Three footer layers and the button sheen animate forever today even when the user asked for reduced motion:

1. `.footer-bg-layer` — background photo drifts/scales in a 28s infinite loop (`animation: footerBgDrift 28s ease-in-out infinite alternate;`).
2. `.footer-glow-beam` — a glowing blur streak glides back and forth every 9s (`animation: footerBeamGlide 9s cubic-bezier(0.4, 0, 0.2, 1) infinite;`).
3. `.footer-particles` — 10 golden particles rise in 10–17s infinite loops, each with `will-change: transform, opacity`.
4. `.btn::before` — a highlight sweeps across every button on hover/focus (`transition: transform 0.65s var(--ease-out);` driving `translateX(-140%) → translateX(140%)`), still animated under reduced motion.

By contrast, the same block already correctly stops the marquee (`animation: none` + stacked fallback), the hero chip float, the hero photo parallax, and `news-slide-enter`. The footer additions simply missed the barrier.

## Scope

**In scope:** the four gaps above, as additions to the existing reduced-motion block.

**Out of scope (do not touch):**
- Hover feedback on `.footer-contact-card`, `.footer-icon-badge`, `.footer-link`, `.service-*`, `.shortcut-*` (small, user-triggered, the codebase's existing block deliberately keeps hover transitions).
- `will-change` declarations on already-static elements (the block leaves `will-change` alone elsewhere, e.g. `.hero-photo` at lines 1070–1072).
- Lenis/smooth scrolling (`components/motion/SmoothScroll.tsx:27` already sets `respectReducedMotion: true`).

## Steps

### Step 1 — Append to the reduced-motion block

In `app/globals.css`, find the end of the `@media (prefers-reduced-motion: reduce)` block. Current code immediately before its closing brace (lines 1083–1093):

```css
  .footer-top,
  .footer-top svg {
    transition: none;
  }

  .footer-top:hover,
  .footer-top:focus-visible,
  .footer-top:hover svg,
  .footer-top:focus-visible svg {
    transform: none;
  }
}
```

Insert the following directly above the final closing `}` of the media block (after the `.footer-top` rules, inside the block):

```css
  /* Ambient footer layers and the button sheen were added after this
     fallback existed; they must stay perfectly still too. */
  .footer-bg-layer {
    animation: none;
  }

  .footer-glow-beam {
    display: none;
  }

  .footer-particles {
    display: none;
  }

  .btn::before {
    transition: none;
  }
```

Do **not** add `!important` to these declarations. Rationale, so the executor doesn't "fix" this: the `.btn` styles live inside `@layer components` (line 242), so the unlayered rules at the bottom of the file win by cascade-layer precedence. The `.footer-*` base rules are unlayered; ours come later, so ordinary specificity/order already wins. The existing block uses `!important` only where needed — match that.

### Step 2 — Why each value (do not change them)

- `.footer-bg-layer { animation: none; }` — the base styles put it at `inset: -20px` with a static cover image, which safely covers the viewport; the rest state is a normal still photo.
- `.footer-glow-beam { display: none; }` — **not** `animation: none`: with no animation the beam would park at `inset-inline-start: 0; width: 25%` as a permanently visible glowing streak. The parent `.footer-glow-line` (a static 1px gradient rule at lines 834–842) remains as the still-state and looks correct on its own.
- `.footer-particles { display: none; }` — hides the container and removes all 10 composited particle layers (each carries `will-change: transform, opacity`) in one rule. Hiding each `.footer-particle` individually would also work but wastes the layer-cleanup benefit.
- `.btn::before { transition: none; }` — the sheen's base position is `translateX(-140%)` and its hover position is `translateX(140%)`; both are outside the button's `overflow: hidden` box (`.btn` line 253), so with the transition removed the sheen jumps invisibly between them. The button's color/geometry hovers keep working; only the decorative sweep is disabled.

## Verification

1. Identity check first: the excerpts above must match the file (this repo is not under version control).
2. Build check: `npm run lint` should stay clean.
3. Emulate reduced motion: DevTools → Rendering → `prefers-reduced-motion: reduce`, then open the site.
   - Footer: the background photo is still, there is no glowing streak on the top border line, and no particles rise.
   - Buttons (e.g. the header CTA, hero CTAs): hover and keyboard-focus them — the color changes still animate, no highlight sweep plays.
   - Regression: with emulation ON, the marquee still shows its stacked static fallback (lines 1034–1064) and hero content is fully visible.
4. Feel-check: with emulation OFF, all four behaviors return exactly as before (drift, beam, particles, sheen). With emulation ON, screenshot the footer region, wait 3 seconds, screenshot again — the two images must be pixel-identical.
