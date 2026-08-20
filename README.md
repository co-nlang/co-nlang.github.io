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

Every `;; → X` claimed on the site must reproduce on a real `oo` engine.

```bash
# defaults to ../nlang-tools/target/release/oo
npm run verify:snippets
# or point at a specific binary
OO_BIN=/path/to/oo npm run verify:snippets
```

**The gate derives its cases from what the site renders.** Inline claims come
from files under `src/i18n/`; multi-file examples are shared JSON artifacts
under `src/snippets/` imported by rendered Astro components. The verifier
discovers both recursively. There is no parallel table to keep in sync — the
first version had one, and it passed 7/7 while the
site shipped `5 |> /double |> /inc ;; → 11` with `/inc` never defined (the
engine yields `10`). A gate that covers a different set than the site renders
can be green and wrong at the same time.

Two independent detectors run per block: every claim is evaluated in isolation
and compared exactly, and `oo lint` must not report a morphism used without a
definition. Undefined *type markers* are open-world by design, so those are
reported without failing.

**The footer's verification stamp is derived from the gate's receipt**
(`src/i18n/verified.json`, gitignored), not written into the copy. No gate run,
no receipt, no claim — a build without one renders no verification line at all.
That is why the stamp can never go stale: it says whatever engine actually ran.

CI builds `oo` from `co-nlang/nlang-tools` at the tag pinned in `OO_TAG`
(`.github/workflows/deploy.yml`) and fails the deploy if any claim does not
reproduce.

## Structure

```
src/
  i18n/          ui, landing, and Quick Start copy in both languages
  snippets/      rendered multi-file examples; the honesty gate runs these exact artifacts
  lib/           highlight.ts (dependency-free n/ syntax highlighter)
  components/    HeroCanvas · StoneTablet · CodeBlock · Header · Footer · Landing · QuickStart
  layouts/       BaseLayout.astro (metadata, theme init, header/footer)
  pages/         zh-TW at root, en under /en/
  i18n/verified.json  honesty-gate receipt (generated; footer stamp reads it)
  styles/        global.css (design tokens + components; light/dark)
```

## i18n

Route-based: **zh-TW** (default) at `/`, **en** at `/en/`. UI strings live in
`src/i18n/ui.ts`; page content has one module per surface. The header language
button links to the current page's counterpart locale.

## Design tokens

Defined as CSS custom properties in `src/styles/global.css`:
`--gold` = convergence / atom / truth (`&`), `--indigo` = superposition /
possibility (`|`, `_|_` — rendered calm, not alarm-red), on cool neutrals.
Both light and dark themes are first-class; the viewer's toggle persists to
`localStorage`.

## Status

Wave 2 landing: a verifiable two-program composition leads into the shared
question (identify / observe / compose), method, evidence, and honest paths.
`/tools/` is now a bilingual Quick Start built around the same verified
composition artifact. Canonical and locale metadata, `robots.txt`, and a
sitemap cover the mature routes; unfinished inner routes remain reachable but
are `noindex,follow`. The documentation surfaces, blog renderer, and playground
remain later waves and are not presented as finished destinations.
