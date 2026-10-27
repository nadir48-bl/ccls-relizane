# Plan 005 — Instant scroll for keyboard-activated anchors + offset derived from the header height

- **Area:** `components/motion/SmoothScroll.tsx`
- **Severity:** LOW·MED (accessibility + a real-but-small positioning mismatch)
- **Status:** READY
- **Baseline:** Working tree of 2026-10-27. No VCS — match the excerpts below before editing.

## The problem (evidence)

`SmoothScroll.tsx` intercepts every `#` fragment click and animates it at a fixed 1.15s (`SmoothScroll.tsx:39-73`):

```tsx
const onAnchorClick = (event: MouseEvent) => {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }
  ...
  event.preventDefault();
  lenis.scrollTo(target, {
    offset: -96,
    duration: 1.15,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    onComplete: () => {
      window.history.pushState(null, "", hash);
    },
  });
};
```

Two issues:

1. **Keyboard users pay the full animation.** The skip link (`app/page.tsx:16-21`, `href="#main-content"`) and any keyboard-activated anchor (`Enter`/`Space` on a focused link, screen-reader activation) should *not* take 1.15 seconds — keyboard-triggered navigation is the case where animated waiting is least justified. Keyboard/synthetic clicks arrive as `MouseEvent` with `detail === 0`; pointer clicks have `detail ≥ 1`.
2. **The landing offset contradicts the stylesheet.** The hard-coded `offset: -96` disagrees with `app/globals.css:123-125`:

```css
[id] {
  scroll-margin-top: calc(var(--header-h) + 24px);
}
```

where `--header-h` is 76px desktop and 66px mobile (`globals.css:18`, 1096-1099), i.e. the CSS contract says 100px/90px. Lenis ignores `scroll-margin-top`, so today targets land ~4–10px off depending on viewport.

## Steps

### Step 1 — Compute the offset from `--header-h`

In `SmoothScroll.tsx`, add above `onAnchorClick` (inside the `useEffect`, next to the existing helper code):

```tsx
    const anchorOffset = () => {
      const header = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--header-h",
        ),
      );
      return -((Number.isFinite(header) ? header : 76) + 24);
    };
```

The `+ 24` mirrors the `scroll-margin-top` formula exactly, `76` is the stylesheet's fallback value, and reading the computed value picks up the 66px mobile override automatically on resize.

### Step 2 — Skip the animation for keyboard activations

Replace the `scrollTo` call inside `onAnchorClick` (quoted above) with:

```tsx
      event.preventDefault();
      lenis.scrollTo(target, {
        offset: anchorOffset(),
        duration: 1.15,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        onComplete: () => {
          window.history.pushState(null, "", hash);
        },
        immediate: event.detail === 0,
      });
```

One-line change plus the offset swap. `immediate: true` is Lenis's documented jump mode (it still honors `offset` and fires `onComplete`), kept as a computed option so the pointer path is byte-identical to today. `event.detail === 0` distinguishes keyboard and programmatic activations from real pointer clicks.

The rest of `onAnchorClick` — modifier-key bail-outs, the `a[href^="#"]` closest, the `hash === "#"` guard, decoding — is unchanged.

## Scope

**In scope:** the offset helper and the `scrollTo` options object.

**Out of scope (do not change):** the Lenis initialization (`SmoothScroll.tsx:21-28`, `respectReducedMotion` already set), the 1.15s duration and its `cubic-out` easing for pointer clicks (channeled, deliberate, unchanged), `history.pushState` handling, `ScrollTrigger` wiring, and the CSS `scroll-margin-top` rule (which stays as the stylesheet's own contract — this plan makes JS honor it, not duplicate it elsewhere).

## Verification

1. Identity check: excerpts match.
2. `npm run lint` passes.
3. Keyboard test: Tab until the skip link is focused, press `Enter` — the page must jump instantly to `#main-content`, no 1.15s glide. Tab into the header nav, press `Enter` on a link — instant arrival.
4. Pointer test: click nav links, the hero CTAs, and the footer back-to-top — smooth 1.15s glide exactly as before.
5. Offset check: after navigating to `#services` and `#stats`, measure the section heading's distance from the viewport top — ≈100px on a ≥768px-wide viewport, ≈90px when the mobile header is active (resize below 768px and retest). It must match the CSS `scroll-margin-top` rule, and land consistently before **and** after moving the window width across the 767px breakpoint (the old hard-coded −96 landed wrong on one side).
6. Feel-check: nothing about the pointer glide should change; verify by clicking through all six section links twice quickly and confirming rhythm is identical to the pre-change build.
