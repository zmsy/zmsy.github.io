import { useCallback, useEffect } from "preact/hooks";

import { activeModal } from "../store";

/**
 * Shared close behavior for site modals.
 * - Returns a stable close handler
 * - Closes on Escape when `open` is true
 */
export const useCloseModal = (open: boolean): (() => void) => {
  const close = useCallback(() => {
    activeModal.set(null);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      close();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  return close;
};
