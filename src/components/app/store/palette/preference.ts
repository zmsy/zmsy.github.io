import { useStore } from "@nanostores/preact";

import {
  palettes,
  paletteIds,
  type PaletteId,
} from "@src/components/app/palette";

import { activePaletteId } from "./store";

export const isPaletteId = (value: unknown): value is PaletteId => {
  if (typeof value !== "string") return false;
  return (paletteIds as readonly string[]).includes(value);
};

export const coercePaletteId = (value: unknown): PaletteId | null =>
  isPaletteId(value) ? value : null;

export const readPaletteFromDocument = (): PaletteId | null => {
  if (typeof document === "undefined") return null;
  return coercePaletteId(document.documentElement.dataset.palette);
};

/** Sets the `data-palette` attribute on the root `<html>` element. */
export const applyPaletteToDocument = (palette: PaletteId): void => {
  document.documentElement.dataset.palette = palette;
};

export const clearPaletteFromDocument = (): void => {
  delete document.documentElement.dataset.palette;
};

export const useActivePalette = () => {
  const id = useStore(activePaletteId);
  return palettes[id];
};
