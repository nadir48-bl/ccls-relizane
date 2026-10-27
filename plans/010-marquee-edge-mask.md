# Plan 010 — Missed opportunity: soft edge mask on the flash marquee

- **Area:** `app/globals.css`
- **Severity:** LOW (additive polish — the ticker currently runs hard against its container edges)
- **Status:** READY
- **Baseline:** Working tree of 2026-10-27. No VCS — match the excerpts below before editing.

## The opportunity

The announcement band is a full-width strip (`FlashMarquee.tsx:5-6` classes `band-green border-y`, inner padding `py-3`), and its scrolling track sits inside `.marquee`, which is plain clipped:

```css
.marquee {
  overflow: hidden;
  min-width: 0;
}
```

Items appear and vanish at hard clip lines against the dark green — the only edge treatment on the site's most-visible continuous motion. A small directional mask makes items melt away into the band instead, while fade length stays comfortably smaller than the 1.15rem/1.6rem item padding so titles never start mid-fade.

## Steps

### Step 1 — Mask the `.marquee` container

Replace the rule above with:

```css
.marquee {
  overflow: hidden;
  min-width: 0;
  mask-image: linear-gradient(
    to right,
    transparent 0,
    #000 32px,
    #000 calc(100% - 32px),
    transparent 100%
  );
}
```

Details an executor must not "simplify":

- `mask-image` (unprefixed) is fine — this codebase already targets evergreen browsers (it ships `backdrop-filter`, `text-wrap: balance`, `-webkit-text-stroke` with `@supports` fallbacks). If Chromium support < 120 ever matters, add the `-webkit-mask-image` duplicate; do **not** replace this with overlay gradient divs — a mask keeps the band textures and darkens nothing twice.
- The band is `dir="ltr"` (`FlashMarquee.tsx:13`) yet the mask is symmetric left/right, so RTL page context never matters.
- 32px fade per edge. Track item spacing is `padding-inline: 1.6rem` (~26px) desktop / 1.15rem mobile — an item's text starts no closer than one padding to the edge, so at 32px only the dot + trailing padding sit inside the fade zone, not readable text. Keep 32px.

### Step 2 — Reduced-motion: unmask the stacked fallback

Under `prefers-reduced-motion: reduce` the track becomes a stacked static list (`globals.css:1034-1047`) whose items are `padding-inline: 0` (`globals.css:1049-1051`) — the first characters of Arabic lines would fall inside the 32px fade and become partially illegible. Append inside the same `@media (prefers-reduced-motion: reduce)` block (`globals.css:1019`), directly above its closing brace — **after** plans 001/003/009's additions if present, leaving them intact:

```css
  .marquee {
    mask-image: none;
  }
```

## Scope

**In scope:** the `.marquee` rule and one reduce-block reset.

**Out of scope (do not change):** the marquee keyframes/durations, hover pause, the flash band colors, and plan 006's token work (a mask gradient has no duration).

## Verification

1. Identity check: excerpts match.
2. `npm run dev` — items now soften into the band at both edges over ~32px; nothing readable ever materializes half-faded; the seam at the loop point (`-50%` keyframe) still shows no jump.
3. Mobile viewport (≤767px): fade still 32px — confirm visually that a shrinking item is fully transparent before its text zone begins.
4. Reduced motion: emulate `prefers-reduced-motion: reduce` — the stacked fallback text is fully opaque at every character; `mask-image` returning `none` can be confirmed in the inspector.
5. Feel-check: watch the ticker for a full 24s loop twice. The disappearance should read as the text merging into the distance, not as a crop. If it still reads as a crop (long titles touch the fade), raise to 48px — but only if step 3 still holds, and record the value in this plan file.
