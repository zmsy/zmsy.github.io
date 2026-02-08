import { atom } from "nanostores";
import type { Palette } from "../palette";
import { palettes } from "../palette";
import { useStore } from "@nanostores/preact";

/** Active color palette for the site. */
export const palette = atom<Palette>(palettes.defaultLight);

export const useActivePalette = () => useStore(palette);
