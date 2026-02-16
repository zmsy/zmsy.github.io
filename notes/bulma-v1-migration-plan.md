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

Phase 1 decision: which Bulma theme files to include
- Recommended default: only include the light theme as Bulma's baseline (so Bulma doesn't auto-switch on `prefers-color-scheme`). Then we override needed `--bulma-*` vars via our own palette CSS.
- Alternative: include both light+dark themes and also set `data-theme` in lockstep with `data-palette`. This is workable, but it duplicates our theme logic.

Exit criteria:
- Build succeeds (`npm run build`).
- Navbar, modal, container/content, and about card still look acceptable.

### Phase 2: Move customization from Sass variables -> runtime CSS variables

Primary goal: stop overriding Bulma colors in Sass and instead set Bulma CSS variables from our palette system.

Plan:

1) Add a Bulma-variable mapping layer driven by palettes
- Extend `src/components/head/PaletteVariables.astro` (or add a new sibling component like `src/components/head/BulmaVariables.astro`) to emit `--bulma-*` overrides inside the same scopes we already generate (`html`, dark preference, `html[data-palette=...]`).

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

2) Do we want Bulma `--bulma-family-*` font variables to reflect our font stacks (e.g. `--readingFonts`, `--displayFonts`), or leave Bulma defaults and continue styling typography ourselves?

3) Do we want to keep `src/styles/custom_bulma.scss` as the single place Bulma modules are imported (recommended), or allow page-level Bulma imports for rarely-used components?
