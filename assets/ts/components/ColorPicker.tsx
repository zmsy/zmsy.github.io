/**
 *  picker utility for the site.
 */

import { FunctionComponent } from "preact";
import { useEffect } from "preact/hooks";
import { useStore } from "ts/store";

import {
  setPaletteCSS,
  defaultPaletteDark,
  defaultPaletteLight,
} from "ts/app/colors";

export const ColorPicker: FunctionComponent = () => {
  const { colorPalette, setColorPalette } = useStore();
  const darkModeEnabled = () =>
    colorPalette.name.toLowerCase().endsWith("dark");

  const toggleDarkMode = () => {
    darkModeEnabled()
      ? setColorPalette(defaultPaletteLight)
      : setColorPalette(defaultPaletteDark);
  };

  // set the palette CSS upon toggle
  useEffect(() => setPaletteCSS(colorPalette), [colorPalette]);

  return (
    <button class="button dark-mode-selector" onClick={toggleDarkMode}>
      <p id="rainbow-label">Choose Color Theme</p>
      <p id="rainbow" />
    </button>
  );
};
