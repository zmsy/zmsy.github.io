/**
 *  picker utility for the site.
 */

import { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";

import { setPaletteCSS } from "./color-util";
import { defaultPaletteDark, defaultPaletteLight } from "./palette";

// Check to see if the user has dark mode enabled in CSS. First need
// to check if the `matchMedia` is defined because otherwise the browser
// doesn't support dark mode.
let darkModeCssEnabled = false;
if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  darkModeCssEnabled = true;
}

export const ColorPicker: FunctionComponent = () => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(darkModeCssEnabled);

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
