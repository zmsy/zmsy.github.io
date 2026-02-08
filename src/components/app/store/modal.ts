import { useStore } from "@nanostores/preact";
import { atom } from "nanostores";

export type ActiveModal = "nav" | "palette" | null;

/** Single source of truth for which modal is open. */
export const activeModal = atom<ActiveModal>(null);

export const useIsModalActive = (modal: ActiveModal) => {
  const active = useStore(activeModal);
  return modal === active;
};
