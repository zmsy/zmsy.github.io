export {
  activePaletteId,
  clearStoredPalette,
  palettePreferenceId,
  readStoredPalette,
  setPalettePreferenceId,
  systemPaletteId,
  useActivePaletteId,
  writeStoredPalette,
} from "./store";

export { initPalette } from "./init";

export {
  applyPaletteToDocument,
  clearPaletteFromDocument,
  coercePaletteId,
  isPaletteId,
  readPaletteFromDocument,
  useActivePalette,
} from "./preference";

export { paletteStorageKey } from "./constants";
