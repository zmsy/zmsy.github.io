import { useStore } from "@nanostores/preact";
import { atom, computed } from "nanostores";

import type { PaletteId } from "@src/components/app/palette";

import { paletteStorageKey } from "./constants";

export { paletteStorageKey };

export const readStoredPalette = (): string | null => {
  try {
    return localStorage.getItem(paletteStorageKey);
  } catch {
    return null;
  }
};

export const writeStoredPalette = (palette: string): void => {
  try {
    localStorage.setItem(paletteStorageKey, palette);
  } catch {
    // ignore
  }
};

export const clearStoredPalette = (): void => {
  try {
    localStorage.removeItem(paletteStorageKey);
  } catch {
    // ignore
  }
};

/** Explicit palette selection set by the user (persisted). */
export const palettePreferenceId = atom<PaletteId | null>(null);

/** System-derived palette id when there is no explicit preference. */
export const systemPaletteId = atom<PaletteId>("defaultLight");

/** Effective active palette id for the UI. */
export const activePaletteId = computed(
  [palettePreferenceId, systemPaletteId],
  (preference, system) => preference ?? system,
);

export const setPalettePreferenceId = (palette: PaletteId | null): void => {
  palettePreferenceId.set(palette);
};

export const useActivePaletteId = (): PaletteId => useStore(activePaletteId);
