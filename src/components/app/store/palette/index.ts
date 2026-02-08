export {
  activePaletteId,
  palettePreferenceId,
  setPalettePreferenceId,
  systemPaletteId,
  useActivePaletteId,
} from "./store";

export {
  clearStoredPalette,
  readStoredPalette,
  writeStoredPalette,
} from "./local-storage";

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
