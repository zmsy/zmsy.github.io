import create from "zustand/esm";
import { ZmsyState } from "./types";

import { baseStore } from "./store";

export const useStore = create<ZmsyState>(baseStore);
