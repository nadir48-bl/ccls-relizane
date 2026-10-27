# Plan 009 — Missed opportunity: a live pulse on the flash badge

- **Areas:** `components/sections/FlashMarquee.tsx`, `app/globals.css`
- **Severity:** LOW (additive micro-delight — turns the announcement badge into a proper live indicator)
- **Status:** READY
- **Baseline:** Working tree of 2026-10-27. No VCS — match the excerpts below before editing.

## The opportunity

The red badge at the head of the ticker (`FlashMarquee.tsx:7-9`) is static:

```tsx
        <span className="shrink-0 rounded-full bg-red px-2.5 py-1 text-[10.5px] font-semibold leading-none text-white">
          {flash.label}
        </span>
```

(`flash.label` is "جديد"). The site already speaks the language of tiny colored status dots — `.kicker::before` renders exactly one (`globals.css:208-216`). A small breathing dot + a ping ring communicates "this band is live" the way broadcast badges do, using transform+opacity only (nothing painted per-frame).

## Steps

### Step 1 — Add the badge dot markup

In `FlashMarquee.tsx`, replace the badge span with (adds the `.flash-live` dot, `aria-hidden`, inside the badge; outer classes unchanged):

```tsx
        <span className="flash-badge shrink-0 rounded-full bg-red px-2.5 py-1 text-[10.5px] font-semibold leading-none text-white">
          <span className="flash-live" aria-hidden="true" />
          {flash.label}
        </span>
```

### Step 2 — The CSS

In `app/globals.css`, add a new subsection inside the existing `/* Flash marquee */` section — directly above the `.marquee` rule (currently at lines 534-537):

```css
.flash-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.flash-live {
  position: relative;
  width: 6px;
  height: 6px;
  flex: 0 0 auto;
  border-radius: 999px;
  background: var(--white);
  opacity: 0.85;
}

.flash-live::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: var(--white);
  animation: flash-ping 2s var(--ease-out) infinite;
}

@keyframes flash-ping {
  from {
    transform: scale(1);
    opacity: 0.45;
  }

  to {
    transform: scale(2.8);
    opacity: 0;
  }
}
```

Mechanics: a 6px white dot on the red pill; every 2s a twin ring scales out to 2.8× while fading to transparent. Only `transform` and `opacity` animate (composited; the ring is 6px before scaling — trivially small layer). The dot itself stays still; the badge pill never changes size. If plan 006 executes after this, `var(--ease-out)` already resolves (the token exists today at `globals.css:19`); the 2s period stays literal like every other ambient loop.

### Step 3 — Reduced motion: still, but readable

Append inside the existing `@media (prefers-reduced-motion: reduce)` block (`globals.css:1019`), directly above its closing brace — **after** the additions of plans 001 and 003 if they have been executed, leaving them intact:

```css
  .flash-live::after {
    display: none;
  }

  .flash-live {
    animation: none;
  }
```

Result under reduced motion: a plain static white dot next to the label — a live indicator without motion. (`animation: none` on `.flash-live` guards against future direct animations on the dot itself; today only the `::after` ring animates, which `display: none` removes cleanly — no parked mid-state.)

## Scope

**In scope:** the badge markup, the new CSS subsection, one reduce-block addition.

**Out of scope (do not change):** the marquee track and its pause mechanics (`globals.css:534-588`), the band colors, the `flash.*` content, and any plan-006 duration tokenization (the 2s loop stays literal like the other ambient loops).

## Verification

1. Identity check: excerpts match.
2. `npm run lint` passes; `npm run dev` — the badge shows a white dot with a soft white ring expanding out of it every 2s; the pill's size and the ticker's rhythm are unchanged; nothing jumps when the marquee pauses on hover (dot independent of track state).
3. Feel-check: it should register at the edge of vision, not compete with the ticker text — if you find yourself watching the badge instead of reading the announcements, drop the ring's `opacity: 0.45` start to `0.3` and re-check (record the decision in this plan file).
4. Reduced motion: emulate `prefers-reduced-motion: reduce` — static dot, no ring, marquee stacked fallback still intact.
5. Screenshots: badge region at 1× and 200% zoom — the ring extends past the pill edge onto the dark green band (the badge has no `overflow: hidden`, which is intentional: it reads as a live ping, not a clipped animation). Confirm no aliasing artifacts at the `opacity: 0` end of the loop. If a future pass decides to clip the ring onto the pill instead, add `overflow: hidden;` to `.flash-badge` — but as shipped here the ring rides slightly outside, which is the look of live broadcast dots.
