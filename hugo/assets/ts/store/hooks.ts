import create from "zustand";
import { ZmsyState } from "./types";

import { baseStore } from "./store";

export const useStore = create<ZmsyState>(baseStore);
