import { paletteStorageKey } from "./constants";

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
