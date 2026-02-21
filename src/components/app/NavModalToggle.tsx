import type { FunctionComponent } from "preact";
import { activeModal } from "@src/state";

/**
 * Toggle button in the nav to display the nav modal when clicked.
 */
export const NavModalToggle: FunctionComponent = () => {
  const onClick = () => activeModal.set("nav");

  return (
    <a
      role="button"
      onClick={onClick}
      className="navbar-burger burger"
      aria-label="Open navigation metnu"
      aria-expanded="false"
    >
      <span className="burger-span" aria-hidden="true"></span>
      <span className="burger-span" aria-hidden="true"></span>
      <span className="burger-span" aria-hidden="true"></span>
      <span className="burger-span" aria-hidden="true"></span>
    </a>
  );
};
