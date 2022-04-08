/**
 * State store for the website.
 */

import { Palette, getStartingPalette } from "../app/colors";
import create from "zustand/vanilla";
import createStore, { SetState, GetState } from "zustand";
import { devtools, persist, StoreApiWithPersist } from "zustand/middleware";

/**
 * Parent state container for the entire app.
 */
type ZmsyState = {
  navOpen: boolean;
  setNavOpen: (isOpen: boolean) => void;
  colorPalette: Palette;
  setColorPalette: (palette: Palette) => void;
};

/**
 * Bare zustand store (without react)
 */
export const store = create<ZmsyState>((set: SetState<ZmsyState>) => ({
  navOpen: false,
  setNavOpen: (open) => set({ navOpen: open }),
  colorPalette: getStartingPalette(),
  setColorPalette: (palette) => set({ colorPalette: palette }),
}));

/**
 * useStore is used for consuming within react as a hook.
 */
export const useStore = create<
ZmsyState,
SetState<ZmsyState>,
GetState<ZmsyState>,
StoreApiWithPersist<ZmsyState>
>(
  devtools(store, { name: "ZmsyStateDevTools" })
);
