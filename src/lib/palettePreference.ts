export const paletteStorageKey = "zmsy:palette";

export type PaletteId = "defaultLight" | "defaultDark";

export const isPaletteId = (value: unknown): value is PaletteId =>
  value === "defaultLight" || value === "defaultDark";

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

export const applyPaletteToDocument = (palette: PaletteId): void => {
  document.documentElement.dataset.palette = palette;
};

/** Apply palette instantly and persist to localStorage. */
export const setPalettePreference = (palette: PaletteId): void => {
  applyPaletteToDocument(palette);
  writeStoredPalette(palette);
};
