/**
 * State store for the website.
 */

import { getStartingPalette } from "../app/colors";
import create from "zustand/esm/vanilla";

import { ZmsyState } from "./types";

/**
 * Vanilla zustand store. This can be interacted with via
 * direct methods or consumed as a hook.
 */
export const baseStore = create<ZmsyState>((set, get) => ({
  navOpen: false,
  setNavOpen: (open) => set({ navOpen: open }),
  colorPalette: getStartingPalette(),
  setColorPalette: (palette) => set({ colorPalette: palette }),
}));
