# Bulma 1.x Compatibility Sheet

Intent: ship Bulma 1.x compatibility only (no theming work).

Non-goals (in this PR):
- No palette -> `--bulma-*` mapping.
- No new JS deps for color conversion.
- No refactors unrelated to Bulma 1.x compilation.

References:
- Bulma migration guide: https://bulma.io/documentation/start/migrating-to-v1/
- Bulma modular Sass (v1): https://bulma.io/documentation/customize/with-modular-sass/

## Definition Of Done (For This Repo)

- `npm run build` succeeds on Bulma 1.x.
- No Bulma v0.9-era Sass paths remain (`*.sass` imports, `@import`-driven Bulma entry).
- Only the Bulma modules we rely on are compiled (centralized in one entry).
- Visual smoke test passes: navbar, modal, card, content typography.

## Keep (PR #224)

- [x] Bump `bulma` to `^1.0.4` (`package.json`, `package-lock.json`)
- [x] Switch to Bulma v1 modular Sass entry (`src/styles/custom_bulma.scss`)
- [x] Fix inline mixin imports (`@use "bulma/sass/utilities/mixins"`)
- [x] Fix mixin API usage where needed (`mixins.from(...)` -> `mixins.tablet`)
- [x] Ensure card CSS comes from the central Bulma entry (no page-level Bulma component imports)

Verification still needed:
- [x] Run `npm run build`
- [ ] Run `npm run preview`, then smoke test the key pages
- [ ] Confirm `astro-purgecss` does not strip dynamic Bulma classes (only safelist if proven necessary)

## Remove From This PR (PR #224)

- [x] `src/components/head/BulmaVariables.astro` (delete)
- [x] `src/components/head/BaseHead.astro` (`BulmaVariables` import/usage)
- [x] `color-convert` (`package.json`, `package-lock.json`)
- [x] Revert `src/styles/variables.scss` back to pre-PR (don’t do theming cleanup here)
- [ ] Any other cosmetic-only diffs (keep PR focused)

## Bulma Usage Inventory (So We Keep Imports Tight)

- Global Bulma entry: `src/components/head/BaseHead.astro` imports `src/styles/custom_bulma.scss`
- Bulma modules relied on in markup today:
  - navbar: `src/components/Navigation.astro`
  - modal: `src/components/app/NavModal.tsx`, `src/components/app/PaletteModal.tsx`
  - card: `src/layouts/About.astro`
  - container/content: used widely

## Next Steps

- Apply the removals listed above, then re-run `npm run build`.
- If anything is visually broken: add the missing Bulma module to `src/styles/custom_bulma.scss` (avoid page-level Bulma CSS imports).
- If production builds drop modal/responsive styling: add a minimal PurgeCSS safelist in `astro.config.mjs` for the specific missing class names.
