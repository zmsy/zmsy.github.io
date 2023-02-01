import { Palette } from "../app/colors";

/**
 * Parent state container for the entire app.
 */
export type ZmsyState = {
  navOpen: boolean;
  setNavOpen: (isOpen: boolean) => void;
  colorPalette: Palette;
  setColorPalette: (palette: Palette) => void;
};
