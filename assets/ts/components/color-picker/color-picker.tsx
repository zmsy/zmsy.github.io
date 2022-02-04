/**
 *  picker utility for the site.
 */

import { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";

import { setPaletteCSS } from "./color-util";
import { defaultPaletteDark, defaultPaletteLight } from "./palette";

export const ColorPicker: FunctionComponent = () => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const toggleDarkMode = () => {
    setDarkModeEnabled((e) => !e);
  };

  useEffect(() => {
    darkModeEnabled
      ? setPaletteCSS(defaultPaletteDark)
      : setPaletteCSS(defaultPaletteLight);
  }, [darkModeEnabled]);

  return (
    <button class="button dark-mode-selector" onClick={toggleDarkMode}>
      Toggle Dark Mode
    </button>
  );
};
