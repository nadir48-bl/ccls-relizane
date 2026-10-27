# Plan 008 — Missed opportunity: count the hero chip figures up on load

- **Areas:** `components/motion/Counter.tsx`, `components/sections/Hero.tsx`, `lib/content.ts`, `app/globals.css`
- **Severity:** LOW (additive, delight — ties the hero's live-looking figures to the Stats section below)
- **Status:** READY
- **Baseline:** Working tree of 2026-10-27. No VCS — match the excerpts below before editing.

## The opportunity

The stats section has a lovely scroll-triggered count-up (`components/motion/Counter.tsx`, 1.8s `power2.out`), while the hero chips — which display *live-numbered* figures — render their values as static text (`Hero.tsx:182-196`).

```tsx
                  <span className="flex flex-col leading-tight">
                    <span className="flex items-baseline gap-1">
                      <span dir="ltr" className="chip-value">
                        {chip.value}
                      </span>
                      <span className="text-[11px] font-medium text-muted">
                        {chip.unit}
                      </span>
                    </span>
                    <span className="text-[10.5px] text-muted">
                      {chip.label}
                    </span>
                  </span>
```

Reusing `Counter` inside the chips costs three small props and makes the two number moments speak the same language.

Three groundwork facts (verified):

- `lib/content.ts:89-102` stores chip values as **formatted strings** (`"20"`, `"6 000+"`); `Counter` needs numeric `value` (+ optional `suffix`). The `token` fields beside them are inert documentation (`lib/content.ts:27` comment: tokens stay ready for the real data) — nothing substitutes them at runtime, so reshaping is safe.
- `Counter`'s `format()` already produces the space-thousands style `"6 000"` (`Counter.tsx:16-27`), so `"6 000+"` maps to `value: 6000, suffix: "+"` with no formatting change.
- The chip entrance starts at 0.42s in the hero timeline (`Hero.tsx:63-68`); the count should start just as the chip appears → `delay: 0.45`.

## Steps

### Step 1 — Teach `Counter` two presentation props and a delay

`components/motion/Counter.tsx:9-14` — the props type:

```tsx
type CounterProps = {
  value: number;
  suffix?: string;
  decimals?: number;
  unit?: string;
};
```

becomes

```tsx
type CounterProps = {
  value: number;
  suffix?: string;
  decimals?: number;
  unit?: string;
  delay?: number;
  className?: string;
  unitClassName?: string;
};
```

The component signature (`Counter.tsx:29-34`):

```tsx
export default function Counter({
  value,
  suffix,
  decimals = 0,
  unit,
}: CounterProps) {
```

becomes

```tsx
export default function Counter({
  value,
  suffix,
  decimals = 0,
  unit,
  delay = 0,
  className,
  unitClassName,
}: CounterProps) {
```

The tween configuration inside the effect (`Counter.tsx:53-61`) gains one line:

```tsx
    const tween = gsap.to(state, {
      value,
      duration: 1.8,
      delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: wrapper,
        start: "top 86%",
        once: true,
      },
```

(everything else in the tween is unchanged). The reduced-motion branch (`Counter.tsx:45-48`) stays as is — it already writes the final value instantly.

The root span (`Counter.tsx:77`) and its unit span (`Counter.tsx:84-91`) become overridable without changing the Stats call site (no existing caller passes the new props, so rendering there is byte-identical):

```tsx
    <span
      ref={wrapperRef}
      className={className ?? "inline-flex items-baseline gap-2"}
    >
```

and

```tsx
        <span
          aria-hidden="true"
          className={unitClassName ?? "text-[0.42em] font-medium opacity-75"}
        >
          {unit}
        </span>
```

### Step 2 — Numeric chip values in content

`lib/content.ts:89-102` — replace the chips array with (both objects keep identical keys so TypeScript stays homogeneous):

```tsx
  chips: [
    {
      value: 20,
      suffix: "",
      unit: "موقعاً",
      label: "عبر الولاية",
      token: placeholders.STAT_SITES,
    },
    {
      value: 6000,
      suffix: "+",
      unit: "زبون",
      label: "من فلاحين ومربّين",
      token: placeholders.STAT_CLIENTS,
    },
  ],
```

`suffix: ""` on the first chip renders nothing in Counter (`suffix ? … : null`). The `token`/`placeholders` block above (lines 8–27) is untouched. The `token`/`placeholders` block above (lines 8–27) is untouched.

### Step 3 — Use Counter in the Hero chips

`components/sections/Hero.tsx` — add the import next to the existing ones:

```tsx
import Counter from "@/components/motion/Counter";
```

Replace the chip content block quoted above with:

```tsx
                  <span className="flex flex-col leading-tight">
                    <Counter
                      value={chip.value}
                      suffix={chip.suffix}
                      unit={chip.unit}
                      className="flex items-baseline gap-1 chip-value"
                      unitClassName="text-[11px] font-medium text-muted"
                      delay={0.45}
                    />
                    <span className="text-[10.5px] text-muted">
                      {chip.label}
                    </span>
                  </span>
```

Why it looks identical to today's rest state: `chip-value` on the Counter root cascades color/size/weight/line-height into the number and `+` suffix (both inside the `dir="ltr"` cluster Counter already renders), while `unitClassName` reproduces the old 11px muted unit; `dir="ltr"` on the number is built into Counter, so `"6 000+"` renders exactly as before.

### Step 4 — Tabular digits, in the codebase's own style

`app/globals.css:504-511` — `.chip-value` currently:

```css
.chip-value {
  direction: ltr;
  font-family: var(--font-alexandria), "Alexandria", sans-serif;
  font-size: 1.35rem;
  font-weight: 700;
  line-height: 1;
  color: var(--orange-deep);
}
```

Add one line so digit widths don't jitter while counting (same convention as `.stat-number`, `globals.css:694` which uses `font-variant-numeric: tabular-nums`):

```css
.chip-value {
  direction: ltr;
  font-family: var(--font-alexandria), "Alexandria", sans-serif;
  font-size: 1.35rem;
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  color: var(--orange-deep);
}
```

## Scope

**In scope:** `Counter` (three props), the chips content array, the Hero chip block, one CSS property.

**Out of scope (do not change):** the Stats `Counter` call sites (must end up byte-identical), the hero entrance timeline, mobile behavior (the chips are `hidden` below `lg` — `Counter` still mounts there and counts invisibly for ~2s; harmless and not worth gating), the `token`/`placeholders` machinery, and the reduced-motion block (Counter already bypasses animation there).

## Verification

1. Identity check: excerpts match.
2. `npm run lint` passes (watch for unused-prop/untyped-object errors on the chips array).
3. `npm run dev` at ≥1280px: the hero chips fade in at ~0.42s and their numbers tick 0 → `20` / 0 → `6 000+` over 1.8s, thousands spaced exactly like the static string was, `+` immediately after the digits, no digit-width wobble.
4. Regression: the four stats cards below still count up exactly as before on scroll.
5. SSR/no-JS: view page source — the final values (`20`, `6 000+`) are present in the markup (Counter renders the final value server-side), so nothing depends on JS to be readable.
6. Reduced-motion: emulate `prefers-reduced-motion: reduce` — chips show final values immediately, no ticking.
