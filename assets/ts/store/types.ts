import { PaletteKey } from "../app/colors";
import { NavModalControls } from "./nav-modal";

/**
 * Parent state container for the entire app.
 */
export type ZmsyState = {
  nav: NavModalControls;
  colorPalette: PaletteKey;
};

export type ZmsyStateKey = keyof ZmsyState;
export type ZmsyStateValue = ZmsyState[ZmsyStateKey];
