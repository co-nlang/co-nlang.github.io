# co-nlang website

The official website for **n/** (n-slash) — an observation-centric semantic
operating system. Static site built with [Astro](https://astro.build), deployed
to GitHub Pages at **https://co-nlang.org**.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # → dist/
npm run preview    # serve the built dist/
```

## Honesty gate — verify every n/ snippet

Every n/ example shown on the site must reproduce on a real `oo` engine
(stale docs drift: e.g. an old `/fib 6 → 8` now yields `_|_`). The verifier runs
each claimed result through `oo eval` and fails on any mismatch:

```bash
# defaults to ../nlang-tools/target/release/oo
npm run verify:snippets
# or point at a specific binary
OO_BIN=/path/to/oo npm run verify:snippets
```

Keep the table in `scripts/verify-snippets.mjs` in sync with the snippets in
`src/i18n/landing.ts`. In CI, enable the commented `verify:snippets` step in
`.github/workflows/deploy.yml` once an `oo` binary is available on the runner.

## Structure

```
src/
  i18n/          ui.ts (nav/footer/page meta + routing helpers), landing.ts (landing copy, both langs)
  lib/           highlight.ts (dependency-free n/ syntax highlighter)
  components/    HeroCanvas · StoneTablet · CodeBlock · Header · Footer · Landing · DimensionPage
  layouts/       BaseLayout.astro (head, theme init, header/footer)
  pages/         zh-TW at root, en under /en/
  styles/        global.css (design tokens + components; light/dark)
```

## i18n

Route-based: **zh-TW** (default) at `/`, **en** at `/en/`. UI strings live in
`src/i18n/ui.ts`; landing content in `src/i18n/landing.ts`. The header language
button links to the current page's counterpart locale.

## Design tokens

Defined as CSS custom properties in `src/styles/global.css`:
`--gold` = convergence / atom / truth (`&`), `--indigo` = superposition /
possibility (`|`, `_|_` — rendered calm, not alarm-red), on cool neutrals.
Both light and dark themes are first-class; the viewer's toggle persists to
`localStorage`.

## Status

Wave 1 skeleton: Landing (both langs) + placeholder dimension pages. Dimension
inner pages, the blog system, and CI verification land in later waves.
