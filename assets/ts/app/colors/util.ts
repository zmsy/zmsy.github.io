/**
 * Color utility functions.
 */

import { ColorCustomProperty, Palette } from "./types";

/** Set a single color property. */
export const setCustomColor = (
  colorProp: ColorCustomProperty,
  value: string
): void => {
  document.documentElement.style.setProperty(colorProp, value);
};

/** Set an entire palette across the site. */
export const setPaletteCSS = (palette: Palette): void => {
  Object.entries(palette.colors).forEach(([colorName, colorValue]) => {
    setCustomColor(`--${colorName}Color`, colorValue);
  });
};
