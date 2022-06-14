/**
 * Store initializer.
 */
import { getStartingPalette } from "ts/app";
import { navModalControls } from "./nav-modal";
import { ZmsyStateKey, ZmsyStateValue } from "./types";

/**
 * Custom, type-enforced Alpine store function.
 */
export const set = (key: ZmsyStateKey, value: ZmsyStateValue): void => {
  Alpine.store(key, value);
};

export const get = (key: ZmsyStateKey): ZmsyStateValue => {
  return Alpine.store(key) as ZmsyStateValue;
};

export const initialize = () => {
  set("nav", navModalControls);
  set("colorPalette", getStartingPalette());
};
