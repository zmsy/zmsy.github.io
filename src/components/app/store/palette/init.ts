import type { PaletteId } from "@src/components/app/palette";

import {
  applyPaletteToDocument,
  clearPaletteFromDocument,
  coercePaletteId,
  readPaletteFromDocument,
} from "./preference";
import {
  clearStoredPalette,
  palettePreferenceId,
  readStoredPalette,
  systemPaletteId,
  writeStoredPalette,
} from "./store";

const getSystemPaletteId = (): PaletteId => {
  if (typeof window === "undefined") return "defaultLight";
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
    ? "defaultDark"
    : "defaultLight";
};

const getInitialPreferenceId = (): PaletteId | null => {
  if (typeof window === "undefined") return null;

  // Preferred source: pre-paint dataset from BaseHead.astro.
  const fromDocument = readPaletteFromDocument();
  if (fromDocument) return fromDocument;

  // Fallback: localStorage.
  return coercePaletteId(readStoredPalette());
};

let didInit = false;

/**
 * Client-side init for palette state + side effects.
 *
 * Idempotent: safe to call multiple times.
 */
export const initPalette = (): void => {
  if (didInit) return;
  didInit = true;

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
};
