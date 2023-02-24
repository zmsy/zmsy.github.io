import type { FunctionComponent } from "preact";
import { navModalOpen } from "./store";

/**
 * Toggle button in the nav to display the nav modal when clicked.
 */
export const NavModalToggle: FunctionComponent = () => {
  return (
    <span class="navbar-burger" onClick={() => navModalOpen.set(true)}>
      <span style={"top: calc(50% + 6px);"}></span>
      <span style={"top: calc(50% + 10px);"}></span>
      <span style={"top: calc(50% + 14px);"}></span>
    </span>
  );
};
