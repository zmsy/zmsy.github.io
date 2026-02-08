import { atom, computed } from "nanostores";
import { palettes, type PaletteId } from "../palette";
import { useStore } from "@nanostores/preact";

import {
  applyPaletteToDocument,
  clearPaletteFromDocument,
  clearStoredPalette,
  isPaletteId,
  readStoredPalette,
  writeStoredPalette,
} from "@src/lib/palettePreference";

const getSystemPaletteId = (): PaletteId => {
  if (typeof window === "undefined") return "defaultLight";
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
    ? "defaultDark"
    : "defaultLight";
};

const getInitialPreferenceId = (): PaletteId | null => {
  if (typeof window === "undefined") return null;

  const fromDataset = document.documentElement.dataset.palette;
  if (isPaletteId(fromDataset)) return fromDataset;

  return readStoredPalette();
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

export const useActivePalette = () => {
  const id = useStore(activePaletteId);
  return palettes[id];
};

if (typeof window !== "undefined") {
  setTimeout(() => {
    const syncPreference = (preference: PaletteId | null) => {
      if (preference) {
        applyPaletteToDocument(preference);
        writeStoredPalette(preference);
        return;
      }

      clearPaletteFromDocument();
      clearStoredPalette();
    };

    systemPaletteId.set(getSystemPaletteId());
    palettePreferenceId.set(getInitialPreferenceId());

    // Only user-driven updates should sync to document/storage.
    palettePreferenceId.listen(syncPreference);
  }, 0); // Defer init to avoid SSR/client hydration mismatch.
}
