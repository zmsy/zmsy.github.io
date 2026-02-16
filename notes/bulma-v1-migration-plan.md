# Bulma v1.x Migration Plan (Working Doc)

Goal: upgrade this site from `bulma@0.9.x` to `bulma@1.x` while moving as much customization as possible from Sass variable overrides to runtime CSS variables (so our existing palette system can drive Bulma too).

References:
- Bulma migration guide: https://bulma.io/documentation/start/migrating-to-v1/
- Bulma modular Sass (v1): https://bulma.io/documentation/customize/with-modular-sass/
- Bulma themes/CSS vars: https://bulma.io/documentation/features/themes/ and https://bulma.io/documentation/features/css-variables/

## Current State (Repo Inventory)

### Where Bulma is used

- Dependency: `bulma@^0.9.4` in `package.json`
- Main import point: `src/components/head/BaseHead.astro` imports `src/styles/custom_bulma.scss`
- Bulma Sass utilities/mixins used in many inline `<style lang="scss">` blocks via `@use "bulma/sass/utilities/mixins.sass" as mixins;`
- Bulma components currently relied on in markup:
  - Navbar: `src/components/Navigation.astro` (`.navbar`, `.navbar-item`, `.navbar-burger`, etc.)
  - Modal: `src/components/app/NavModal.tsx`, `src/components/app/PaletteModal.tsx` (`.modal`, `.modal-background`, `.modal-content`, `.is-active`)
  - Card: `src/layouts/About.astro` (`.card`, `.card-image`, `.card-content`)
  - Container/Content: used widely (`.container`, `.content`)

### Current Bulma build entry

`src/styles/custom_bulma.scss` (Bulma 0.x style) does:
- `@import` initial vars + functions
- imports `src/styles/variables.scss` to override Bulma Sass variables (mostly color tokens)
- `@import` a small subset of Bulma modules:
  - base: minireset, generic
  - utilities: derived-variables, controls, extends
  - components: modal, navbar
  - elements: container, content

Also note:
- `src/layouts/About.astro` directly imports a Bulma component stylesheet (`@import "bulma/sass/components/card.sass";`) inside a page-level `<style lang="scss">` block.
- Many components/pages `@use "bulma/sass/utilities/mixins.sass" as mixins;` for responsive mixins.

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

## Migration Strategy (Phases)

### Phase 0: Establish a baseline

- Record current Bulma version and the Bulma modules we rely on (done above).
- Manually spot-check key pages/components before changes:
  - Home: navbar layout + container sizing
  - About: card styling
  - Any modal (nav modal + palette modal)

### Phase 1: Upgrade to Bulma v1 with minimal visual change

Primary goal: get Bulma v1 compiling and rendering correctly, even if we still customize via Sass initially.

Planned mechanical steps:

1) Dependency bump
- Update `package.json` from `bulma@^0.9.4` -> `bulma@^1.x`.

2) Replace `@import`-driven Bulma entry with v1 modular Sass
- Rewrite `src/styles/custom_bulma.scss` to follow v1 modular Sass:
  - Use `@use "bulma/sass/utilities" with (...)` (and optionally `@use "bulma/sass/form" with (...)` if needed)
  - Use `@forward` for only the Bulma modules we need
  - Import themes (see Phase 1 decision below)

3) Update any inline Bulma imports in `.astro` files
- Replace any `@import "bulma/sass/components/<x>.sass";` with v1-compatible `@forward` usage in the centralized Bulma entry, or convert them to `@use`/`@forward` locally (prefer centralizing).

Make this explicit for this repo:
- Remove the page-level `@import "bulma/sass/components/card.sass";` from `src/layouts/About.astro`.
- Add `@forward "bulma/sass/components/card";` to the centralized Bulma entry.

Phase 1 decision: which Bulma theme files to include
- Recommended default: only include the light theme as Bulma's baseline (so Bulma doesn't auto-switch on `prefers-color-scheme`). Then we override needed `--bulma-*` vars via our own palette CSS.
- Alternative: include both light+dark themes and also set `data-theme` in lockstep with `data-palette`. This is workable, but it duplicates our theme logic.

Exit criteria:
- Build succeeds (`npm run build`).
- Navbar, modal, container/content, and about card still look acceptable.

Known interaction to watch:
- We already override scrolling/layout in `src/components/head/GlobalStyles.astro` (`html { overflow: hidden !important; }`, `body { overflow: auto; }`). Bulma v1 also sets `html/body` defaults. Confirm our globals still win where intended.

### Phase 2: Move customization from Sass variables -> runtime CSS variables

Primary goal: stop overriding Bulma colors in Sass and instead set Bulma CSS variables from our palette system.

Plan:

1) Add a Bulma-variable mapping layer driven by palettes
- Extend `src/components/head/PaletteVariables.astro` (or add a new sibling component like `src/components/head/BulmaVariables.astro`) to emit `--bulma-*` overrides inside the same scopes we already generate (`html`, dark preference, `html[data-palette=...]`).

Recommendation:
- Create a dedicated component (e.g. `src/components/head/BulmaVariables.astro`) that consumes the same palette definitions and emits only `--bulma-*` tokens. This keeps the mapping isolated and makes it easy to remove/adjust without touching the site's own `--*Color` contract.

2) Implement a small hex -> HSL converter at build time (in the Astro component)
- Bulma v1 uses many `--bulma-*-h/s/l` variables (e.g. `--bulma-primary-h`).
- Since our palettes are hex strings, compute HSL in JS/TS and output the required `deg/%/%` values.

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

Exit criteria:
- Changing palettes updates Bulma components without rebuilding.
- `src/styles/variables.scss` no longer overrides Bulma's core color tokens.

### Phase 3: Cleanup + hardening

- Reduce Bulma module surface area if v1 migration accidentally pulled in more than we need.
- Verify PurgeCSS does not remove needed Bulma selectors for dynamically applied classes.
- Consider aligning our palette switching with Bulma's `data-theme` attribute only if it becomes useful.

PurgeCSS hardening (make this actionable):
- We rely on runtime-toggled Bulma classes (e.g. `is-active` for modals) and responsive helpers (e.g. `is-hidden-mobile`, `is-hidden-tablet`). Ensure these are safelisted in the `astro-purgecss` integration config in `astro.config.mjs`.
- Start with a small explicit list (`is-active`, `is-hidden-mobile`, `is-hidden-tablet`, `navbar-burger`) and expand only if we see purged styling in production builds.

## Concrete File Checklist

- `package.json`: bump `bulma` to `^1.x`
- `src/styles/custom_bulma.scss`: rewrite to Bulma v1 modular Sass entry (`@use`/`@forward`)
- `src/styles/variables.scss`: separate "site selector constants" from "Bulma overrides"; migrate the latter to CSS vars
- `src/components/head/PaletteVariables.astro`: add Bulma CSS variable overrides (or create `src/components/head/BulmaVariables.astro`)
- Inline `<style lang="scss">` blocks importing Bulma bits:
  - `src/layouts/About.astro` (currently imports `bulma/sass/components/card.sass`)
  - Anywhere else that `@import`s Bulma directly

## Open Questions / Decisions

1) Should we treat Bulma dark theme as disabled (recommended) and fully own theme switching via palettes, or wire `data-theme` + `data-palette` together?

Recommendation:
- Keep `data-palette` as the single source of truth.
- Do not rely on Bulma's built-in dark-mode/theme switching (avoid double logic).
- Import Bulma with a stable baseline theme (prefer light-only) and override the relevant `--bulma-*` variables inside our existing palette scopes.
- Optional: set `data-theme` as an alias to `data-palette` for compatibility with Bulma selectors (`[data-theme=...]`), but keep all switching logic and token values owned by palettes.

2) Do we want Bulma `--bulma-family-*` font variables to reflect our font stacks (e.g. `--readingFonts`, `--displayFonts`), or leave Bulma defaults and continue styling typography ourselves?

Recommendation:
- Yes: set Bulma's font family variables to match our existing font stacks.
- Do it via CSS variables (not Sass) so fonts remain palette/theme independent and can be changed without rebuilding.
- Implement by emitting overrides at the global scope (once), e.g. in `src/components/head/StaticVariables.astro` or a new `src/components/head/BulmaFontVariables.astro`:
  - `--bulma-family-primary: var(--readingFonts);`
  - `--bulma-family-secondary: var(--subtitleFonts);` (or `--displayFonts`, depending on how we want Bulma headings/components to read)
  - `--bulma-family-code: var(--codeFonts);`
- Keep existing explicit typography rules where we want deliberate divergence from Bulma defaults (example: our `h1` styling in `src/components/head/GlobalStyles.astro`).

3) Do we want to keep `src/styles/custom_bulma.scss` as the single place Bulma modules are imported (recommended), or allow page-level Bulma imports for rarely-used components?

Recommendation (optimize for minimal CSS + minimal blast radius):
- Keep a single global Bulma entry that is the only place we `@forward` CSS-producing Bulma modules (components/elements/layout/themes).
- Allow page/component styles to `@use` Bulma utility-only modules (mixins/functions) locally. `@use "bulma/sass/utilities/mixins"` should not emit CSS and is safe to use anywhere.
- Avoid page-level `@forward`/`@import` of Bulma components (e.g. `card`, `navbar`): it duplicates output and makes changes hard to reason about.
- Use "modular Sass" to minimize what we compile. There is no true tree-shaking for Sass/CSS, but selective module forwarding + PurgeCSS gives a similar outcome.
- Make PurgeCSS robust for Bulma by safelisting any dynamically-toggled classes we rely on (example: `is-active`, responsive helpers, etc.).

## Executable Checklist (Suggested Order)

- Update dependency: `npm i bulma@^1`
- Rewrite `src/styles/custom_bulma.scss` to v1 modular Sass (`@use` + `@forward`)
- Centralize Bulma CSS output: add `card` to the Bulma entry; remove the page-level Bulma import from `src/layouts/About.astro`
- Add Bulma variable overrides driven by palettes (new `src/components/head/BulmaVariables.astro` or extend `src/components/head/PaletteVariables.astro`)
- Add font-family overrides for Bulma (`--bulma-family-*`) near `src/components/head/StaticVariables.astro`
- Build + spot-check: `npm run build` then `npm run preview`
- PurgeCSS audit: confirm modals (`is-active`) and responsive helpers (`is-hidden-*`) still work in the built output; add safelist entries if needed

## Target Bulma Entry (Draft)

Draft structure for `src/styles/custom_bulma.scss` after moving to Bulma v1 modular Sass. Treat this as a starting point to iterate on:

```scss
// Central Bulma build entry (v1 modular Sass).
// This file should be the only place we `@forward` CSS-producing Bulma modules.

// 1) Configure Bulma's Sass-side defaults (only what can't be done via CSS vars).
@use "bulma/sass/utilities";

// 2) Forward only the modules we actually rely on.
@forward "bulma/sass/base";
@forward "bulma/sass/elements/container";
@forward "bulma/sass/elements/content";
@forward "bulma/sass/components/navbar";
@forward "bulma/sass/components/modal";
@forward "bulma/sass/components/card";

// 3) Provide Bulma's baseline theme variables.
// Recommendation: prefer light-only baseline to avoid Bulma auto-switching themes.
// (Exact import may be `bulma/sass/themes` or `bulma/sass/themes/light` depending on Bulma's v1 structure.)
@forward "bulma/sass/themes";
```

Notes:
- Keep palette-driven values (colors, fonts) out of this file; they should be runtime CSS variables emitted in `src/components/head/*Variables.astro`.
- If any local page/component needs responsive helpers, it should `@use "bulma/sass/utilities/mixins" as mixins;` (utility-only, no CSS output).
