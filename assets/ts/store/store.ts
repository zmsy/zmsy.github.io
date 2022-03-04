/**
 * State store for the website.
 */

import { Palette, getStartingPalette } from "../app/colors";
import create from "zustand";

/**
 * Parent state container for the entire app.
 */
type ZmsyState = {
  navOpen: boolean;
  setNavOpen: (isOpen: boolean) => void;
  colorPalette: Palette;
  setColorPalette: (palette: Palette) => void;
};

export const useStore = create<ZmsyState>((set) => ({
  navOpen: false,
  setNavOpen: (open) => set({ navOpen: open }),
  colorPalette: getStartingPalette(),
  setColorPalette: (palette) => set({ colorPalette: palette }),
}));
