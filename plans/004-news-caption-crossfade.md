# Plan 004 — Crossfade the news slide captions in sync with the images

- **Areas:** `components/sections/News.tsx`, `app/globals.css`
- **Severity:** MEDIUM (feel-breaking on the most-watched moving element of the page)
- **Status:** READY
- **Baseline:** Working tree of 2026-10-27. No VCS — match the excerpts below before editing.
- **Prerequisites:** none. Note for the README order: plan 006 rewrites the `.news-slide-enter` animation line afterwards; it is written to be compatible regardless.

## The problem (evidence)

The image slides already crossfade as stacked layers, `News.tsx:167-185`:

```tsx
{news.slides.map((item, slideIndex) => (
  <div
    key={item.id}
    aria-hidden={slideIndex !== index}
    className={`absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
      slideIndex === index
        ? "opacity-100"
        : "pointer-events-none opacity-0"
    }`}
  >
    <Image
      src={item.image.src}
      alt={item.image.alt}
      fill
      sizes="(min-width: 1024px) 66vw, 100vw"
      className="object-cover"
    />
  </div>
))}
```

But the caption is a separate block keyed by `slide.id`, `News.tsx:234-244`:

```tsx
<div
  key={slide.id}
  className="news-slide-enter absolute inset-x-0 bottom-0 z-10 p-4 pb-6 sm:p-6 sm:pb-8 lg:p-8 lg:pb-10"
>
  <h3 className="display max-w-3xl text-[clamp(1.55rem,3vw,2.55rem)] leading-[1.3] text-white">
    {slide.title}
  </h3>
  <p className="mt-3 max-w-2xl text-[13.5px] leading-[1.9] text-white/80 sm:text-[14.5px]">
    {slide.excerpt}
  </p>
</div>
```

On every slide change the key flips: the outgoing caption **unmounts instantly** (hard cut) while the incoming one fades in via `.news-slide-enter` — and that animation also scale-zooms the text between `scale(1.012)` and `scale(1)`, `app/globals.css:594-608`:

```css
.news-slide-enter {
  animation: news-fade 0.5s var(--ease-out) both;
}

@keyframes news-fade {
  from {
    opacity: 0;
    transform: scale(1.012);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

Net effect every 7 seconds: images crossfade smoothly while the headline pops off then pops back, with subpixel text blur during the scale part.

## Target behavior

All captions render stacked (one per slide) and crossfade with the **same 500ms opacity transition** already used by the images, so text and image travel together. The `scale` is removed from `news-fade`; the keyframe stays in the codebase only for the top badge/date cluster (also in this plan).

## Steps

### Step 1 — Add the caption stack

In `News.tsx`, directly **after** the radial gradient veil and **before** the top bar. Anchors: the veil ends at line 194 with

```tsx
<div
  aria-hidden="true"
  className="absolute inset-0 bg-[radial-gradient(80%_70%_at_88%_8%,rgba(240,126,31,0.2),transparent_55%)]"
/>
```

and the top bar starts at line 196 with

```tsx
<div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 sm:p-5">
```

Insert between them (note: per-slide `item`, not `slide`):

```tsx
{news.slides.map((item, slideIndex) => (
  <div
    key={item.id}
    aria-hidden={slideIndex !== index}
    className={`absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
      slideIndex === index
        ? "opacity-100"
        : "pointer-events-none opacity-0"
    }`}
  >
    <div className="absolute inset-x-0 bottom-0 z-10 p-4 pb-6 sm:p-6 sm:pb-8 lg:p-8 lg:pb-10">
      <h3 className="display max-w-3xl text-[clamp(1.55rem,3vw,2.55rem)] leading-[1.3] text-white">
        {item.title}
      </h3>
      <p className="mt-3 max-w-2xl text-[13.5px] leading-[1.9] text-white/80 sm:text-[14.5px]">
        {item.excerpt}
      </p>
    </div>
  </div>
))}
```

The classes mirror the image layers exactly (same transition, same opacity swap). The wrapper div the old block used for typography and padding is preserved inside each layer; the layer being `pointer-events-none` and `opacity-0` when inactive means hidden captions can't be selected or read by a screen reader (`aria-hidden` mirrors the image layers).

### Step 2 — Delete the keyed caption block

Remove `News.tsx:234-244` (the `<div key={slide.id} className="news-slide-enter …">` block quoted above). Nothing else in the stage references it.

### Step 3 — Trigger the caption animation only on slide change (top-left cluster)

The badge and date in the top bar (`News.tsx:196-206`) currently swap instantly. Wrap the left cluster with the slide id so `.news-slide-enter` runs on mount — i.e. on every slide change:

```tsx
<div
  key={slide.id}
  className="news-slide-enter flex min-h-7 flex-wrap items-center gap-2.5"
>
  {slide.badge ? (
    <span className="rounded-full bg-red px-2.5 py-1 text-[10.5px] font-semibold leading-none text-white">
      {slide.badge}
    </span>
  ) : null}
  <span className="text-[11.5px] font-medium text-white/80">
    {slide.date}
  </span>
</div>
```

Only the wrapper gains `key` and `news-slide-enter`; children stay identical. **Do not** key the top bar's outer flex container — it would also remount the interactive pause button (hover/press state loss). Enter-only (no exit) is correct here: this is small text appearing over the arriving image.

### Step 4 — Remove the text scale from `news-fade`

In `app/globals.css`, replace the keyframe body (lines 598-608 quoted above) with an opacity-only version. The `.news-slide-enter` rule line itself stays untouched:

```css
@keyframes news-fade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
```

Rationale: scale on text causes subpixel blur mid-animation, and a 1.012 zoom reads as a rendering artifact rather than motion. Reduced motion is already covered (`globals.css:1074-1076` disables `.news-slide-enter`) — no reduce-block edit needed in this plan.

## Scope

**In scope:** the caption stack insert, the keyed-caption deletion, the top-left cluster keying, the keyframe body.

**Out of scope (do not change):** the image layers, the autoplay logic and progress writes (`News.tsx:74-98`), the 500ms crossfade durations (they are fine — that's what we're syncing to), the footer/carousel keyboard behavior, and the reduced-motion block. Under reduced motion the image crossfade transition still runs exactly as it did before this plan (out of scope by choice).

## Verification

1. Identity check: excerpts match.
2. `npm run lint` passes; `npm run dev` and watch the news section for a full 7s cycle.
3. Feel-check: on every slide change, image and caption must now dissolve **together** — no instant pop-out of the outgoing headline, no zoom on the incoming one. Pause the carousel (or hover it) and click a thumbnail: same crossfade behavior, none of the old cut.
4. RTL check: Arabic headline fades in place, no horizontal shift of the text block.
5. A11y check: inactive slides' titles are exposed exactly once (the stack hides non-current captions via `aria-hidden` — mirror of the image layers).
6. Reduced-motion: emulate `prefers-reduced-motion: reduce` — captions show without the fade, badge/date appear instantly, nothing is broken.
