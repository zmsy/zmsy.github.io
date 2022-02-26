/** Custom color palettes. */

import { Palette } from "./types";

/** Default set of colors for the site */
export const defaultPaletteLight: Palette = {
  name: "Default Light",
  colors: {
    background: "#faf9f9",
    backgroundAccent: "#dcdbd9",
    secondaryBackground: "#2a363b",
    titleText: "#100b03",
    subtitleText: "#38332a",
    text: "#3f3b35",
    accent1: "#d85d44",
    accent2: "#3a89c9",
    accent3: "#9665c7",
    accent4: "#fbd136",
    illustrations: "#3f3b35",
  },
};

/** Opposite set of colors for the site. */
export const defaultPaletteDark: Palette = {
  name: "Default Dark",
  colors: {
    background: "#2a363b",
    backgroundAccent: "#3c525c",
    secondaryBackground: "#faf9f9",
    titleText: "#faf9f9",
    subtitleText: "#dcdbd9",
    text: "#dcdbd9",
    accent1: "#3a89c9",
    accent2: "#d85d44",
    accent3: "#fbd136",
    accent4: "#9665c7",
    illustrations: "#dcdbd9",
  },
};

/**
 * Default set of palettes to make available from the custom
 * color picker option.
 */
export const paletteList: Array<Palette> = [
  defaultPaletteLight,
  defaultPaletteDark,
];
