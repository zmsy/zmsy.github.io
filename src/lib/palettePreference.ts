import { paletteIds, type PaletteId } from "@src/components/app/palette";

export const paletteStorageKey = "zmsy:palette";

export const isPaletteId = (value: unknown): value is PaletteId => {
  if (typeof value !== "string") return false;
  return (paletteIds as readonly string[]).includes(value);
};

export const readStoredPalette = (): PaletteId | null => {
  try {
    const value = localStorage.getItem(paletteStorageKey);
    return isPaletteId(value) ? value : null;
  } catch {
    return null;
  }
};

export const writeStoredPalette = (palette: PaletteId): void => {
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

/**
 * Sets the `data-palette` attribute on the root `<html>` element.
 *
 * `document.documentElement.dataset.palette = "defaultDark"` becomes:
 * `<html data-palette="defaultDark">`
 *
 * That attribute is what `src/components/head/Variables.astro` matches
 * (`html[data-palette="..."]`) to swap the site's CSS variables instantly.
 */
export const applyPaletteToDocument = (palette: PaletteId): void => {
  document.documentElement.dataset.palette = palette;
};

export const clearPaletteFromDocument = (): void => {
  delete document.documentElement.dataset.palette;
};
