import { atom } from "nanostores";
import type { Palette } from "../palette";
import { palettes } from "../palette";

/** Active color palette for the site. */
export const palette = atom<Palette>(palettes.defaultLight);
