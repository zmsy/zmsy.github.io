import type { FunctionComponent } from "preact";
import { activeModal } from "./store";

/**
 * Toggle button in the nav to display the nav modal when clicked.
 */
export const NavModalToggle: FunctionComponent = () => {
  return (
    <span
      className="navbar-burger"
      style={{ color: "var(--textColor)", height: "3rem" }}
      onClick={() => {
        activeModal.set("nav");
      }}
    >
      <span style={"top: calc(50% + 6px);"}></span>
      <span style={"top: calc(50% + 10px);"}></span>
      <span style={"top: calc(50% + 14px);"}></span>
    </span>
  );
};
