# Bulma v1.x Migration Plan (Working Doc)

Goal: upgrade this site from `bulma@0.9.x` to `bulma@1.x` while moving as much customization as possible from Sass variable overrides to runtime CSS variables (so our existing palette system can drive Bulma too).

References:
- Bulma migration guide: https://bulma.io/documentation/start/migrating-to-v1/
- Bulma modular Sass (v1): https://bulma.io/documentation/customize/with-modular-sass/
- Bulma themes/CSS vars: https://bulma.io/documentation/features/themes/ and https://bulma.io/documentation/features/css-variables/

## Current State (Repo Inventory)

### Where Bulma is used

- Dependency: `bulma@^1.0.4` in `package.json`
- Main import point: `src/components/head/BaseHead.astro` imports `src/styles/custom_bulma.scss`
- Bulma Sass utilities/mixins used in many inline `<style lang="scss">` blocks via `@use "bulma/sass/utilities/mixins" as mixins;`
- Bulma components currently relied on in markup:
  - Navbar: `src/components/Navigation.astro` (`.navbar`, `.navbar-item`, `.navbar-burger`, etc.)
  - Modal: `src/components/app/NavModal.tsx`, `src/components/app/PaletteModal.tsx` (`.modal`, `.modal-background`, `.modal-content`, `.is-active`)
  - Card: `src/layouts/About.astro` (`.card`, `.card-image`, `.card-content`)
  - Container/Content: used widely (`.container`, `.content`)

### Current Bulma build entry

`src/styles/custom_bulma.scss` (Bulma v1 modular Sass) does:
- `@use "bulma/sass/utilities";`
- `@forward` only the CSS-producing modules we rely on:
  - base
  - layout: container
  - elements: content
  - components: navbar, modal, card
- Emits a light-only Bulma baseline theme (no `prefers-color-scheme` auto switching). Actual colors/fonts are driven via runtime CSS variables (see `src/components/head/BulmaVariables.astro`).

Also note:
- `src/layouts/About.astro` no longer imports Bulma card styles locally (card is forwarded from `src/styles/custom_bulma.scss`).
- Many components/pages `@use "bulma/sass/utilities/mixins" as mixins;` for responsive mixins.

### Existing site theming system

- Palette-driven custom properties are generated at runtime in `src/components/head/PaletteVariables.astro`.
- Palettes are defined in `src/components/app/palette.ts` and expose keys like `background`, `text`, `accent1`, etc.
- These palette keys are mapped to site variables like `--backgroundColor`, `--textColor`, `--accent1Color`, ...

Implication: we already have a strong CSS-variable theme engine; Bulma v1's CSS-variable theme model should be compatible if we map our palette variables onto `--bulma-*` variables.

## Desired End State

- `bulma@1.x` installed and compiled successfully with Dart Sass.
- No (or minimal) Sass color overrides in `src/styles/variables.scss`.
- Bulma's theme variables (`--bulma-*`) are derived from our palettes at runtime, so switching `data-palette` updates Bulma components immediately.
- Bulma module imports remain selective (we do not need the whole framework unless it meaningfully simplifies maintenance).
- Dark/light behavior is owned by our palette system (to avoid double theme logic between Bulma and our own palettes).
- Bulma typography uses our font stacks via `--bulma-family-*` overrides.

## Current Status (As Implemented)

- Bulma: `bulma@^1.0.4` installed
- Build: `npm run build` passes
- Bulma CSS build entry: `src/styles/custom_bulma.scss` (v1 modular Sass)
- Bulma runtime theming: `src/components/head/BulmaVariables.astro` (palette-driven `--bulma-*`)
- Site runtime theming: `src/components/head/PaletteVariables.astro` (palette-driven `--*Color`)
- Sass selector constants: `src/styles/variables.scss` now only contains SVG selector constants (no Bulma overrides)

Notes on `src/components/head/BulmaVariables.astro`:

- Purpose: map the site's palette system (`--*Color`) onto Bulma's theme variables (`--bulma-*`) so Bulma components follow `data-palette` at runtime.
- Implementation: it currently generates a `<style>` tag by building a CSS string (mirrors `PaletteVariables.astro` scoping: default, `prefers-color-scheme: dark` fallback, and `html[data-palette=...]`).
- Why it does hex->HSL: Bulma v1 derives many colors from `--bulma-*-h/s/l` inputs; providing H/S/L keeps those derived colors coherent.
  - Implementation detail (this repo): uses `color-convert` to convert palette hex colors to HSL.
- Acceptable alternative (less templating): set only higher-level computed vars (e.g. `--bulma-link`, `--bulma-scheme-main`, `--bulma-text`) to `var(--*Color)` in a static stylesheet and skip the HSL inputs; this is simpler but may require more manual tweaks for hover/active/derived colors.

## Migration Strategy (Phases)

### Phase 0: Establish a baseline

- Record current Bulma version and the Bulma modules we rely on (done above).
- Manually spot-check key pages/components before changes:
  - Home: navbar layout + container sizing
  - About: card styling
  - Any modal (nav modal + palette modal)

### Phase 1: Upgrade to Bulma v1 with minimal visual change

Primary goal: get Bulma v1 compiling and rendering correctly, even if we still customize via Sass initially.

Progress (this repo):

- [x] 1) Dependency bump (`bulma@^1.0.4`) - updated `package.json` + `package-lock.json`
- [x] 2) Replace `@import`-driven Bulma entry with v1 modular Sass - rewrote `src/styles/custom_bulma.scss`
- [x] 3) Update any inline Bulma imports in `.astro` files - removed page-level Bulma imports and updated `.sass` -> `.scss` paths

Planned mechanical steps:

1) Dependency bump
- Update `package.json` from `bulma@^0.9.4` -> `bulma@^1.x`.
  - Done: bumped to `bulma@^1.0.4` and updated `package-lock.json`.

2) Replace `@import`-driven Bulma entry with v1 modular Sass
- Rewrite `src/styles/custom_bulma.scss` to follow v1 modular Sass:
  - Use `@use "bulma/sass/utilities" with (...)` (and optionally `@use "bulma/sass/form" with (...)` if needed)
  - Use `@forward` for only the Bulma modules we need
  - Import themes (see Phase 1 decision below)
  - Done: switched to `@use`/`@forward` and added a light-only Bulma theme baseline.

3) Update any inline Bulma imports in `.astro` files
- Replace any `@import "bulma/sass/components/<x>.sass";` with v1-compatible `@forward` usage in the centralized Bulma entry, or convert them to `@use`/`@forward` locally (prefer centralizing).

Make this explicit for this repo:
- Remove the page-level `@import "bulma/sass/components/card.sass";` from `src/layouts/About.astro`.
- Add `@forward "bulma/sass/components/card";` to the centralized Bulma entry.
  - Note: Bulma v1 Sass files are `.scss`, so any `*.sass` paths need updating.

Phase 1 decision: which Bulma theme files to include
- Recommended default: only include the light theme as Bulma's baseline (so Bulma doesn't auto-switch on `prefers-color-scheme`). Then we override needed `--bulma-*` vars via our own palette CSS.
- Alternative: include both light+dark themes and also set `data-theme` in lockstep with `data-palette`. This is workable, but it duplicates our theme logic.

Exit criteria:
- Build succeeds (`npm run build`).
- Navbar, modal, container/content, and about card still look acceptable.

Status (this repo):
- `npm run build` passes (Bulma Sass compiles; some upstream Sass deprecation warnings are emitted by Bulma v1).

Known interaction to watch:
- We already override scrolling/layout in `src/components/head/GlobalStyles.astro` (`html { overflow: hidden !important; }`, `body { overflow: auto; }`). Bulma v1 also sets `html/body` defaults. Confirm our globals still win where intended.

### Phase 2: Move customization from Sass variables -> runtime CSS variables

Primary goal: stop overriding Bulma colors in Sass and instead set Bulma CSS variables from our palette system.

Progress (this repo):

- [x] 1) Add a Bulma-variable mapping layer driven by palettes
- [x] 2) Implement a small hex -> HSL converter at build time (in the Astro component)
- [x] 3) Map our palette tokens onto Bulma theme tokens
- [x] 4) Remove Sass color overrides once CSS-variable mapping is stable

Plan:

1) Add a Bulma-variable mapping layer driven by palettes
- Extend `src/components/head/PaletteVariables.astro` (or add a new sibling component like `src/components/head/BulmaVariables.astro`) to emit `--bulma-*` overrides inside the same scopes we already generate (`html`, dark preference, `html[data-palette=...]`).

Recommendation:
- Create a dedicated component (e.g. `src/components/head/BulmaVariables.astro`) that consumes the same palette definitions and emits only `--bulma-*` tokens. This keeps the mapping isolated and makes it easy to remove/adjust without touching the site's own `--*Color` contract.

Status (this repo):
- Implemented `src/components/head/BulmaVariables.astro` and wired it into `src/components/head/BaseHead.astro`.

2) Implement a small hex -> HSL converter at build time (in the Astro component)
- Bulma v1 uses many `--bulma-*-h/s/l` variables (e.g. `--bulma-primary-h`).
- Since our palettes are hex strings, compute HSL in JS/TS and output the required `deg/%/%` values.

Status (this repo):
- Implemented a small `hex -> HSL` converter in `src/components/head/BulmaVariables.astro`.

3) Map our palette tokens onto Bulma theme tokens
- Start with a minimal set that affects the components we actually use:
  - `primary` / `link`
  - body background + text
  - borders / background accents
  - modal background / overlays if needed

Suggested first mapping (initial, adjust after visual checks):

| Site palette key | Site CSS var | Bulma vars to drive |
|---|---|---|
| `accent1` | `--accent1Color` | `--bulma-primary-h/s/l`, `--bulma-link-h/s/l` |
| `accent2` | `--accent2Color` | `--bulma-link-hover-h/s/l` (or `--bulma-link-hover` if present) |
| `background` | `--backgroundColor` | `--bulma-scheme-main`, `--bulma-body-background-color` |
| `backgroundAccent` | `--backgroundAccentColor` | `--bulma-scheme-main-bis`, `--bulma-background`, `--bulma-border` |
| `text` | `--textColor` | `--bulma-text-h/s/l`, `--bulma-body-color` |
| `textLowContrast` | `--textLowContrastColor` | `--bulma-text-weak` (and/or its `-h/s/l` if needed) |
| `subtitleText` | `--subtitleTextColor` | `--bulma-text-strong` (optional) |

Notes:
- Bulma also derives many helper shades from `--bulma-text-h/s/l` and scheme variables; we can expand the mapping incrementally if something looks off.
- It is OK to override higher-level computed vars (like `--bulma-text`) first, then later make it more consistent by also overriding the underlying `-h/s/l` inputs.

Be explicit about minimum viable Bulma vars to override for this site:
- `--bulma-body-background-color`, `--bulma-body-color`, `--bulma-family-primary`, `--bulma-family-code`
- `--bulma-link-h/s/l` (and optionally hover/active if needed)
- `--bulma-primary-h/s/l`
- `--bulma-scheme-h/s` + `--bulma-scheme-main-l` (or override `--bulma-scheme-main` directly if that proves simpler)

4) Remove Sass color overrides once CSS-variable mapping is stable
- Gradually delete or reduce the Bulma color overrides in `src/styles/variables.scss`.
- Keep Sass-only variables that are genuinely needed for selectors/build-time loops (example: the SVG color selector constants in `src/styles/variables.scss`).

Status (this repo):
- Removed Bulma Sass color overrides from `src/styles/variables.scss` (kept only SVG selector constants).

Exit criteria:
- Changing palettes updates Bulma components without rebuilding.
- `src/styles/variables.scss` no longer overrides Bulma's core color tokens.

### Phase 3: Cleanup + hardening

Progress (this repo):

- [ ] Reduce Bulma module surface area (only if we accidentally pulled in too much)
- [ ] PurgeCSS safelist for dynamic Bulma classes
- [ ] Decide whether to wire Bulma `data-theme` (currently not used)

- Reduce Bulma module surface area if v1 migration accidentally pulled in more than we need.
- Verify PurgeCSS does not remove needed Bulma selectors for dynamically applied classes.
- Consider aligning our palette switching with Bulma's `data-theme` attribute only if it becomes useful.

PurgeCSS hardening (make this actionable):
- We rely on runtime-toggled Bulma classes (e.g. `is-active` for modals) and responsive helpers (e.g. `is-hidden-mobile`, `is-hidden-tablet`). Ensure these are safelisted in the `astro-purgecss` integration config in `astro.config.mjs`.
- Start with a small explicit list (`is-active`, `is-hidden-mobile`, `is-hidden-tablet`, `navbar-burger`) and expand only if we see purged styling in production builds.

Status (this repo):
- `astro-purgecss` is enabled, but no safelist is configured yet.

Suggested starting config (add to `astro.config.mjs`):

```js
purge({
  safelist: [
    "is-active",
    "is-hidden-mobile",
    "is-hidden-tablet",
    "navbar-burger",
  ],
})
```

## Concrete File Checklist

- [x] `package.json`: bump `bulma` to `^1.x`
- [x] `src/styles/custom_bulma.scss`: rewrite to Bulma v1 modular Sass entry (`@use`/`@forward`)
- [x] `src/styles/variables.scss`: keep only "site selector constants"; remove Bulma Sass color overrides
- [x] `src/components/head/BulmaVariables.astro`: emit palette-driven `--bulma-*` overrides
- [x] Inline `<style lang="scss">` blocks importing Bulma bits:
  - Removed the page-level `card` import from `src/layouts/About.astro`
  - Updated `@use "bulma/.../*.sass"` -> `@use "bulma/..."` for Bulma v1

## Open Questions / Decisions

1) Should we treat Bulma dark theme as disabled (recommended) and fully own theme switching via palettes, or wire `data-theme` + `data-palette` together?

Recommendation:
- Keep `data-palette` as the single source of truth.
- Do not rely on Bulma's built-in dark-mode/theme switching (avoid double logic).
- Import Bulma with a stable baseline theme (prefer light-only) and override the relevant `--bulma-*` variables inside our existing palette scopes.
- Optional: set `data-theme` as an alias to `data-palette` for compatibility with Bulma selectors (`[data-theme=...]`), but keep all switching logic and token values owned by palettes.

Status (this repo):
- We treat Bulma's built-in theme switching as disabled (light-only baseline); palette system owns theme switching and sets `--bulma-*` directly.

2) Do we want Bulma `--bulma-family-*` font variables to reflect our font stacks (e.g. `--readingFonts`, `--displayFonts`), or leave Bulma defaults and continue styling typography ourselves?

Recommendation:
- Yes: set Bulma's font family variables to match our existing font stacks.
- Do it via CSS variables (not Sass) so fonts remain palette/theme independent and can be changed without rebuilding.
- Implement by emitting overrides at the global scope (once), e.g. in `src/components/head/StaticVariables.astro` or a new `src/components/head/BulmaFontVariables.astro`:
  - `--bulma-family-primary: var(--readingFonts);`
  - `--bulma-family-secondary: var(--subtitleFonts);` (or `--displayFonts`, depending on how we want Bulma headings/components to read)
  - `--bulma-family-code: var(--codeFonts);`
- Keep existing explicit typography rules where we want deliberate divergence from Bulma defaults (example: our `h1` styling in `src/components/head/GlobalStyles.astro`).

Status (this repo):
- Implemented via `src/components/head/BulmaVariables.astro` (`--bulma-family-primary/secondary/code`).

3) Do we want to keep `src/styles/custom_bulma.scss` as the single place Bulma modules are imported (recommended), or allow page-level Bulma imports for rarely-used components?

Recommendation (optimize for minimal CSS + minimal blast radius):
- Keep a single global Bulma entry that is the only place we `@forward` CSS-producing Bulma modules (components/elements/layout/themes).
- Allow page/component styles to `@use` Bulma utility-only modules (mixins/functions) locally. `@use "bulma/sass/utilities/mixins"` should not emit CSS and is safe to use anywhere.
- Avoid page-level `@forward`/`@import` of Bulma components (e.g. `card`, `navbar`): it duplicates output and makes changes hard to reason about.
- Use "modular Sass" to minimize what we compile. There is no true tree-shaking for Sass/CSS, but selective module forwarding + PurgeCSS gives a similar outcome.
- Make PurgeCSS robust for Bulma by safelisting any dynamically-toggled classes we rely on (example: `is-active`, responsive helpers, etc.).

## Executable Checklist (Suggested Order)

- Update dependency: `npm i bulma@^1` (done: `bulma@^1.0.4`)
- Rewrite `src/styles/custom_bulma.scss` to v1 modular Sass (`@use` + `@forward`) (done)
- Centralize Bulma CSS output: add `card` to the Bulma entry; remove the page-level Bulma import from `src/layouts/About.astro` (done)
- Add Bulma variable overrides driven by palettes (done: `src/components/head/BulmaVariables.astro`)
- Add font-family overrides for Bulma (`--bulma-family-*`) (done via `src/components/head/BulmaVariables.astro` using existing `--readingFonts`/`--subtitleFonts`/`--codeFonts`)
- Build + spot-check: `npm run build` then `npm run preview` (build done; preview + manual spot-check pending)
- PurgeCSS audit: confirm modals (`is-active`) and responsive helpers (`is-hidden-*`) still work in the built output; add safelist entries if needed (pending)

## Target Bulma Entry (Draft)

Draft structure for `src/styles/custom_bulma.scss` after moving to Bulma v1 modular Sass. Treat this as a starting point to iterate on:

```scss
// Central Bulma build entry (v1 modular Sass).
// This file should be the only place we `@forward` CSS-producing Bulma modules.

// 1) Configure Bulma's Sass-side defaults (only what can't be done via CSS vars).
@use "bulma/sass/utilities";

// 2) Forward only the modules we actually rely on.
@forward "bulma/sass/base";
@forward "bulma/sass/layout/container";
@forward "bulma/sass/elements/content";
@forward "bulma/sass/components/navbar";
@forward "bulma/sass/components/modal";
@forward "bulma/sass/components/card";

// 3) Provide a stable baseline theme without Bulma auto-switching.
// In this repo we include a light-only baseline and then override `--bulma-*`
// at runtime via `src/components/head/BulmaVariables.astro`.
```

Notes:
- Keep palette-driven values (colors, fonts) out of this file; they should be runtime CSS variables emitted in `src/components/head/*Variables.astro`.
- If any local page/component needs responsive helpers, it should `@use "bulma/sass/utilities/mixins" as mixins;` (utility-only, no CSS output).

## What Still Needs Doing

- Manual spot-check in dev/preview: navbar, modals, about card, markdown content styling
- PurgeCSS hardening: add a safelist in `astro.config.mjs` for dynamic classes (`is-active`, `is-hidden-*`, `navbar-burger`, etc.) if any styling is missing in production builds
- Iterate Bulma variable mapping in `src/components/head/BulmaVariables.astro` if any Bulma-derived colors look off (common tweaks: `--bulma-link-*` hover/active, `--bulma-border`, modal overlay alpha)
