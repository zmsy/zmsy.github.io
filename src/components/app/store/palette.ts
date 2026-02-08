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
    systemPaletteId.set(getSystemPaletteId());
    palettePreferenceId.set(getInitialPreferenceId());

    const mql = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (mql) {
      const onChange = () => {
        if (palettePreferenceId.get() !== null) return;
        systemPaletteId.set(mql.matches ? "defaultDark" : "defaultLight");
      };

      if ("addEventListener" in mql) {
        mql.addEventListener("change", onChange);
      } else {
        // Safari
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mql as any).addListener(onChange);
      }
    }

    const syncPreference = (preference: PaletteId | null) => {
      if (preference) {
        applyPaletteToDocument(preference);
        writeStoredPalette(preference);
        return;
      }

      clearPaletteFromDocument();
      clearStoredPalette();
    };

    syncPreference(palettePreferenceId.get());
    palettePreferenceId.listen(syncPreference);
  }, 0);
}
