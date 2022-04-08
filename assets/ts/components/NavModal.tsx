/**
 * A modal for moving around the site in mobile view.
 */

import { FunctionComponent } from "preact";
import { useStore } from "ts/store";
import clsx from "clsx";

export const NavModal: FunctionComponent = () => {
  const { navOpen, setNavOpen } = useStore();

  const closeNav = () => setNavOpen(false);
  return (
    <div id="nav-modal" class={clsx("modal", navOpen && "is-active")}>
      <div
        id="nav-modal-background"
        class="modal-background"
        onClick={closeNav}
      ></div>

      <div class="nav-modal-content">
        <div class="box">
          <p>Modal!</p>
        </div>
      </div>
    </div>
  );
};
