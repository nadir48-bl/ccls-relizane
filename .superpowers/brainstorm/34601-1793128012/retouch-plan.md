# Retouch plan — keep palette & design, polish execution

Decision from user (2026-10-27): previous photo led to "no, keep current colors and
design, just retouch". Browser click explored direction B (industrial boldness) —
fold in only a hint of contrast boldness, nothing structural.

## In
- Only `app/globals.css` + micro-changes in section components.
- Depth: crisper two-layer shadows (`--shadow-soft`/`--shadow-lift`).
- Contrast: `--orange-deep` #d96a0e → #b45309 (3.43:1 → 4.94:1 on cream; AA for
  small kicker text). Same orange family, deeper.
- Hero: cleaner veil stops (less mid haze), grain 0.16 → 0.1, chip gets blur.
- Ornament denoise: soft-blob opacity .68→.55, ring-mark alpha .24→.18.
- band-green: soften radials slightly; flash band gets its own darker base
  (#0c3d20) to separate it from stats/cta/footer bands.
- .hairline → gradient fade; .stat-number → tabular-nums; button shadows →
  inset highlight + offset color shadow (modern, same shapes/colors).
- Consistency: text-white/82→85 (Stats), footer /60→65 and /50→60 (readability),
  news stage radius → var(--radius-card).

## Out (explicitly not changing)
- Palette, fonts (Alexandria + IBM Plex Sans Arabic), all sections and their
  order, motion language (GSAP reveals, marquee, counters), RL layout, content,
  buttons' pill shape and sheen, red-dot ornament motif.

## Verify
- `npm run build` (static export) passes; dev-server screenshots of hero,
  news, stats, footer compared before/after.
