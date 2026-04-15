# Bulma v1 CSS Variables Migration Plan

Goal: migrate Bulma customization away from v0-style Sass variable overrides and into Bulma v1 CSS custom properties, while preserving the site's palette system.

References:
- https://bulma.io/documentation/start/migrating-to-v1/
- https://bulma.io/documentation/customize/with-css-variables/

## Current State (Repo Snapshot)

- Bulma is already on `^1.0.4` and loaded from `src/styles/custom_bulma.scss`.
- `src/styles/custom_bulma.scss` already uses modular Sass (`@use`/`@forward`) and initializes the light theme.
- Runtime color tokens are driven by `src/components/head/PaletteVariables.astro` via custom properties like `--backgroundColor`, `--textColor`, and `--accent1Color`.
- A small Bulma CSS var override already exists in `src/components/head/BulmaOverrides.astro` (`--bulma-navbar-burger-color`).
- Legacy Sass color variables still exist in `src/styles/variables.scss`; these should be minimized to non-Bulma use only.

## Migration Strategy

1. Keep Bulma module composition in Sass (`custom_bulma.scss`), but move theme/color decisions to CSS vars.
2. Introduce a single Bulma token bridge layer that maps site palette tokens (`--*Color`) to Bulma vars (`--bulma-*`).
3. Remove Sass-era Bulma color overrides once equivalent CSS var mappings are in place and verified.
4. Keep Sass variables only where CSS vars cannot replace them (compile-time-only module toggles/config).

## Phase Plan

### Phase 1 - Inventory and Mapping Draft

- [ ] Inventory every Bulma-related Sass variable currently customized (source of truth: `custom_bulma.scss`, `variables.scss`, and any legacy partials).
- [ ] Inventory Bulma components actually used in markup (navbar, modal, card, content, container already known).
- [ ] Build first-pass mapping table from site palette tokens to Bulma vars.
- [ ] Flag items that are not directly mappable (require HSL channels, derived values, or component-scoped vars).

### Phase 2 - Create Bulma Token Bridge

- [ ] Expand `src/components/head/BulmaOverrides.astro` (or new dedicated file) into a central mapping layer.
- [ ] Start with global semantic tokens:
  - background/surface (`--bulma-scheme-main`, `--bulma-background`, etc.)
  - text (`--bulma-text`, `--bulma-text-strong`, `--bulma-title-color`)
  - links/interactive (`--bulma-link`, `--bulma-focus-h/s/l` where needed)
  - status/accent colors (`--bulma-primary`, `--bulma-info`, `--bulma-success`, `--bulma-warning`, `--bulma-danger`)
- [ ] Add component-level vars only when visual parity requires them (navbar/modal/card first).

### Phase 3 - Migrate Off Sass Color Overrides

- [ ] Remove Bulma color overrides from Sass files after CSS var equivalents are active.
- [ ] Keep `variables.scss` only for non-Bulma Sass consumers (for example SVG replacement inputs in module styles).
- [ ] Ensure `custom_bulma.scss` remains focused on module forwarding and minimal compile-time setup.

### Phase 4 - Verification and Hardening

- [ ] Visual smoke test key pages/components in at least one light and one dark palette.
- [ ] Verify states: hover/focus/active for links, navbar items, modal controls, card content.
- [ ] Run `npm run build` and `npm run preview`.
- [ ] Confirm no regressions from PurgeCSS in dynamically-applied Bulma classes.

## Initial Mapping Draft (Iteration 0)

This is intentionally a draft to refine during implementation.

| Site token | Candidate Bulma var(s) | Notes |
| --- | --- | --- |
| `--backgroundColor` | `--bulma-scheme-main`, `--bulma-body-background-color` | Primary page background |
| `--backgroundAccentColor` | `--bulma-background`, `--bulma-border-weak` | Secondary surface and subtle separators |
| `--titleTextColor` | `--bulma-title-color`, `--bulma-text-strong` | Heading/text hierarchy |
| `--subtitleTextColor` | `--bulma-text`, `--bulma-text-weak` | Mid-contrast text |
| `--textColor` | `--bulma-text`, `--bulma-body-color` | Base readable text |
| `--accent1Color` | `--bulma-link`, `--bulma-primary` | Main interactive/action color |
| `--accent2Color` | `--bulma-info` | Secondary interactive highlight |
| `--accent3Color` | `--bulma-success` or code-related vars | Validate against current code styling intent |
| `--accent4Color` | `--bulma-warning` | Alerts and stronger emphasis |
| `--secondaryBackgroundColor` | `--bulma-scheme-invert`, component vars | Inverse surfaces (verify scope) |

## Definition of Done

- Bulma visual customization comes primarily from `--bulma-*` CSS vars, not Sass color overrides.
- Palette switching updates Bulma-driven components consistently.
- `custom_bulma.scss` stays minimal (module composition + required setup only).
- Any remaining Sass Bulma overrides are documented with explicit "why CSS var is insufficient" rationale.

## Open Questions for Next Iteration

- Exact canonical mapping for each legacy Sass color variable to Bulma v1 semantic var(s).
- Whether to expose Bulma mappings in `PaletteVariables.astro` directly vs. keep a separate `BulmaOverrides.astro` bridge.
- Whether we need per-palette tuning for contrast-sensitive vars (focus, borders, and muted text).
