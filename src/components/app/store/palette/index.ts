// Public API for palette behavior.
// Keep this surface area small: UI should use hooks/actions, not internals.

export { initPalette } from "./init";
export { paletteStorageKey } from "./constants";

export { setPalettePreferenceId, useActivePaletteId } from "./store";
export { useActivePalette } from "./preference";
