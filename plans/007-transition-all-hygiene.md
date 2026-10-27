# Plan 007 — Motion hygiene: explicit property lists, no dead rules

- **Areas:** `app/globals.css`, `components/sections/Footer.tsx`, `components/sections/Stats.tsx`
- **Severity:** LOW (robustness/cohesion — invisible today, a foot-gun tomorrow)
- **Status:** READY
- **Baseline:** Working tree of 2026-10-27. No VCS — match the excerpts below before editing.
- **Execution note:** run this plan **before** plan 006 — it rewrites lines that 006 then tokenizes. Its excerpts assume the original file text.

## The problem (evidence)

Four places transition `all`, contrary to the codebase's own convention of explicit property lists — `.btn` sets the exemplar (`app/globals.css:258-260`):

```css
    transition: transform 0.25s var(--ease-out),
      background-color 0.25s var(--ease-out), color 0.25s var(--ease-out),
      border-color 0.25s var(--ease-out), box-shadow 0.25s var(--ease-out);
```

`transition: all` silently animates any future property change (padding, max-height, filter…), can't be partially overridden, and hides intent. Offenders:

1. `globals.css:937-948` — `.footer-contact-card`:

```css
.footer-contact-card {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
  padding: 0.75rem 0.875rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(8px);
  transition: all 0.3s var(--ease-out);
}
```

2. `globals.css:957-968` — `.footer-icon-badge`:

```css
.footer-icon-badge {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  flex-shrink: 0;
  border-radius: 10px;
  background: rgba(240, 126, 31, 0.14);
  border: 1px solid rgba(240, 126, 31, 0.32);
  color: var(--orange);
  transition: all 0.3s var(--ease-out);
}
```

3. `components/sections/Footer.tsx:87` — Tailwind `transition-all` where only the background color changes:

```tsx
<span className="absolute -inset-1 -z-10 rounded-full bg-orange/20 blur-sm transition-all group-hover:bg-orange/40" />
```

4. `components/sections/Stats.tsx:69` — Tailwind `transition-all` driving width + color:

```tsx
className="h-px w-7 bg-orange/35 transition-all duration-500 group-hover:w-12 group-hover:bg-orange motion-reduce:transition-none"
```

Plus one dead rule: `globals.css:500-502`

```css
.hero-chip:nth-of-type(2) {
  animation-delay: -4s;
}
```

is unreachable — `Hero.tsx:176-178` puts an inline `style={{ animationDelay: `${-3.5 * index}s` }}` on every chip (`0s` on the first, `-3.5s` on the second), and inline styles always override the stylesheet. Deleting it is a visual no-op.

## Steps

### Step 1 — `.footer-contact-card`, explicit list

Replace only the `transition:` line with what the hover (`globals.css:950-955`) actually animates — background, border, transform, shadow:

```css
  transition: border-color 0.3s var(--ease-out),
    background-color 0.3s var(--ease-out), transform 0.3s var(--ease-out),
    box-shadow 0.3s var(--ease-out);
```

### Step 2 — `.footer-icon-badge`, explicit list

Its hover (globals.css:970-975) animates background, color, transform, shadow:

```css
  transition: background-color 0.3s var(--ease-out),
    color 0.3s var(--ease-out), transform 0.3s var(--ease-out),
    box-shadow 0.3s var(--ease-out);
```

### Step 3 — Footer.tsx brand glow, `transition-colors`

```tsx
<span className="absolute -inset-1 -z-10 rounded-full bg-orange/20 blur-sm transition-colors group-hover:bg-orange/40" />
```

(`transition-colors` covers `background-color`; the element only changes bg. Duration stays Tailwind's default 150ms — identical to what `transition-all` produced.)

### Step 4 — Stats hover rule, explicit arbitrary property list

```tsx
className="h-px w-7 bg-orange/35 transition-[width,background-color] duration-500 group-hover:w-12 group-hover:bg-orange motion-reduce:transition-none"
```

Only `width` and `background-color` changed on hover; `motion-reduce:transition-none` stays. The 500ms `width` motion on a 1px decorative rule is deliberately kept (near-zero cost, matches the site's growing-rule language); switching it to a transform is not part of this plan.

### Step 5 — Delete the dead chip delay rule

Remove the `.hero-chip:nth-of-type(2)` block quoted above (globals.css:500-502). The base `.hero-chip` rule and the `chip-float` keyframes are untouched.

## Scope

**In scope:** the four `transition` lines, one Tailwind class list, the deletion of one 3-line rule.

**Out of scope (do not change):** hover transforms/colors themselves, `will-change` usage, the `news-thumb` transition list (775-781 — it lists an unused `transform` but is harmless), and all duration values (plan 006 tokenizes durations afterwards — write literal `0.3s` here exactly as shown so 006's excerpts match).

## Verification

1. Identity check: excerpts match.
2. `npm run lint` passes; `npm run dev`.
3. Hover checks (desktop, real pointer): footer contact card still lifts with its bg/border/shadow change animated; the icon badge still fills orange; the footer brand glow still brightens on hover; the Stats hairline (1px line at the top-right of each stat card) still grows `w-7 → w-12` — 28px to 48px over 500ms. Confirm each of the four rewrites visually.
4. Keyboard check: Tab onto a footer contact card link — focus ring intact (unrelated to transition, but cheap to confirm nothing snapped).
5. Dead rule check: after editing, `grep -n "nth-of-type(2)" app/globals.css` must return nothing, and `grep -rn "transition-all" components/ app/` must not return any file you touched (other pre-existing `transition-all` usages outside this plan's scope stay untouched).
6. Feel-check: nothing should look different before/after — screenshot footer + Stats hover states in both builds and compare pixel-wise (the point of this plan is identical rendering with narrower blast radius).
