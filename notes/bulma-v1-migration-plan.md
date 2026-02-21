# Bulma 1.x Migration Sheet

Intent: make the repo 100% Bulma 1.x compatible with the smallest possible surface area of change.

Non-goals (for now):
- Do not migrate the site theming/palette engine to be Bulma-first.
- Do not switch the customization strategy to “CSS variables only”; keep Sass overrides/config where it reduces churn.

References:
- Bulma migration guide: https://bulma.io/documentation/start/migrating-to-v1/
- Bulma modular Sass (v1): https://bulma.io/documentation/customize/with-modular-sass/

## Definition Of Done (For This Repo)

- `npm run build` succeeds on Bulma 1.x.
- No Bulma v0.9-era Sass paths remain (`*.sass` imports, `@import`-driven Bulma entry).
- Only the Bulma modules we rely on are compiled (centralized in one entry).
- Visual smoke test passes: navbar, modal, card, content typography.

## Where We Are (PR #224)

Required for Bulma 1.x compatibility:
- [x] Dependency bump to `bulma@^1.0.4` (`package.json`, `package-lock.json`)
- [x] Replace legacy `@import` entry with Bulma v1 modular Sass (`src/styles/custom_bulma.scss`)
- [x] Update Bulma mixin imports in inline SCSS (`@use "bulma/sass/utilities/mixins"`)
- [x] Update mixin API usage where needed (`mixins.from(...)` -> named breakpoints like `mixins.tablet`)
- [x] Centralize Bulma component CSS output (forward `navbar`, `modal`, `card`, plus base/layout/content)

Verification still needed:
- [ ] Run `npm run build` and `npm run preview`, then smoke test the key pages
- [ ] Confirm `astro-purgecss` does not strip dynamic Bulma classes (only safelist if proven necessary)

## Optional / Deferred (Do Later, Not Required For Compatibility)

These are explicitly out of scope for the “minimal surface area” migration:
- Palette-driven Bulma theming (`--bulma-*` mapping) and any hex->HSL plumbing
- Aligning `data-palette` and Bulma `data-theme`
- Removing/reworking Sass overrides purely to match Bulma’s CSS-variable theming model

Note: PR #224 currently includes some of these deferred pieces (e.g. `src/components/head/BulmaVariables.astro` + `color-convert`). Keep them only if we decide they are worth the added maintenance surface; they are not required to be Bulma 1.x compatible.

## Bulma Usage Inventory (So We Keep Imports Tight)

- Global Bulma entry: `src/components/head/BaseHead.astro` imports `src/styles/custom_bulma.scss`
- Bulma modules relied on in markup today:
  - navbar: `src/components/Navigation.astro`
  - modal: `src/components/app/NavModal.tsx`, `src/components/app/PaletteModal.tsx`
  - card: `src/layouts/About.astro`
  - container/content: used widely

## Next Steps

- If anything is visually broken: add the missing Bulma module to `src/styles/custom_bulma.scss` first (avoid page-level Bulma CSS imports).
- If production builds drop modal/responsive styling: add a minimal PurgeCSS safelist in `astro.config.mjs` for the specific missing class names.
