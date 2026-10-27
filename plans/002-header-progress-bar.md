# Plan 002 — Header progress bar: stop per-frame React re-renders and the transition fight

- **Area:** `components/sections/Header.tsx` only
- **Severity:** HIGH — the scroll progress bar is updated on every scroll frame; it currently forces a full Header React re-render per frame *and* its own CSS transition permanently lags behind the real scroll position.
- **Status:** READY
- **Baseline:** Working tree of 2026-10-27. No VCS in this repo — verify identity by matching the "current code" excerpts before editing.

## The problem (evidence)

`Header.tsx` measures scroll in a rAF-throttled handler and calls `setProgress(...)` every frame:

```tsx
const update = () => {
  frame.current = 0;
  const y = window.scrollY;
  const delta = y - lastY.current;
  const max =
    document.documentElement.scrollHeight - window.innerHeight;

  setSolid(y > 24);
  setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);
  ...
```

(line 20–37). Because `y / max` changes on every frame while scrolling, the entire `Header` subtree (brand, nav links, CTA) reconciles at up to 60fps.

The bar itself is rendered through state and carries a transition that fights the per-frame updates (lines 233–239):

```tsx
<div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-transparent">
  <div
    className="h-full w-full origin-right bg-orange transition-transform duration-150 ease-out"
    style={{ transform: `scaleX(${progress})` }}
    aria-hidden="true"
  />
</div>
```

Each frame's new `scaleX` interrupts the previous 150ms transform transition, so the bar constantly chases a target ~150ms behind the scroll position — the "rubber-band" feel. One of the two mechanisms (transition or per-frame update) is redundant; the direct-write approach wins on both cost and feel.

`progress` state is used nowhere else in the component, so removing the state is safe. `solid` and `hidden` stay as state: they are booleans (React bails out of re-rendering when the value is unchanged) and they flip rarely.

## Scope

**In scope:** the `update` handler, the `progress` state declaration, and the two-line progress bar markup.

**Out of scope (do not touch):**
- The hide/show (`setHidden`) logic and thresholds — unrelated to this finding.
- The scroll-spy IntersectionObserver or `active` state.
- The news carousel's own progress bar in `components/sections/News.tsx` — it already uses the exact pattern this plan adopts.

## Steps

### Step 1 — Replace the state with a ref

Current (lines 9–15):

```tsx
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>("top");
  const [progress, setProgress] = useState(0);
  const lastY = useRef(0);
  const frame = useRef(0);
```

Replace the `progress` state line with a ref (keep everything else identical):

```tsx
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>("top");
  const progressRef = useRef<HTMLDivElement>(null);
  const lastY = useRef(0);
  const frame = useRef(0);
```

### Step 2 — Write the transform directly in the rAF handler

In `update()`, replace this line:

```tsx
      setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);
```

with:

```tsx
      if (progressRef.current) {
        const progress =
          max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
```

Everything else in `update()` (`setSolid`, the `setHidden` branch, `lastY.current = y;`) stays exactly as it is.

### Step 3 — Detach the bar from React, keep the zero-width start

Replace the bar markup (lines 233–239) with:

```tsx
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-transparent">
        <div
          ref={progressRef}
          className="h-full w-full origin-right bg-orange"
          style={{ transform: "scaleX(0)" }}
          aria-hidden="true"
        />
      </div>
```

Three deliberate details:

- `transition-transform duration-150 ease-out` is removed entirely — updates are per-frame now; a transition would just add lag.
- The static `style={{ transform: "scaleX(0)" }}` stays. It is written once by React and never re-rendered, but it prevents a **full-width orange bar flash** between first paint and hydration (the default `transform: none` renders at full width). `Origin-right` (RTL-correct: the bar grows leftward from the right edge) is kept unchanged.
- Direct ref writes survive React re-renders because React diffs style objects, not the live DOM; since the style prop never changes, the imperative value persists. This is the repo's own established pattern — see `components/sections/News.tsx:86-89`, where the carousel progress bar is driven with `progressRef.current?.style.setProperty("--progress", ...)`.
- `update()` is already called once on mount (line 44), so the bar is synced to the actual scroll position immediately after hydration.

## Verification

1. Identity check: excerpts match before editing.
2. `npm run lint` stays clean; `npm run dev` starts.
3. Perf check: React DevTools → Profiler → record while scrolling through the whole page. The `Header` must no longer re-render on every scroll frame (it re-renders only when `solid`/`hidden`/`active`/`open` change — i.e. a handful of discrete times, not continuously).
4. Feel-check: scroll slowly to the bottom. The 2px orange bar must track the scroll 1:1 with zero perceived lag (no rubber-band), reach full width exactly at the document end, and grow **from the right edge leftward** (it is `origin-right` for RTL). Compare side-by-side with the news carousel's progress bar, which behaves the same way today.
5. Reduced motion: this bar is scroll-position feedback, not an animation, so nothing changes under `prefers-reduced-motion`; removing the transition only removes a lag.
