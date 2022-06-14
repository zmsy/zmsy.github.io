/**
 * Nav modal logic.
 */
export const navModalControls = {
  open: false,
  toggle() {
    this.open = !this.open;
  },
};

export type NavModalControls = typeof navModalControls;
