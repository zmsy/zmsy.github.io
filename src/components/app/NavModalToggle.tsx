import type { FunctionComponent } from "preact";
import { navModalOpen } from "./store";

/**
 * Toggle button in the nav to display the nav modal when clicked.
 */
export const NavModalToggle: FunctionComponent<{}> = () => {
  return (
    <span class="navbar-burger" onClick={() => navModalOpen.set(true)}>
      <span></span>
      <span></span>
      <span></span>
    </span>
  );
};
