import { atom } from "nanostores";

/** Control nav modal open/close from the hamburger menu in the navbar. */
export const navModalOpen = atom(false);

// revert back to closed when
// document.addEventListener("astro:after-swap", () => {
//   navModalOpen.set(false);
// });
