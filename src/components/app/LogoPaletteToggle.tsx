import type { FunctionComponent } from "preact";

import navbarLogoSvg from "@src/svg/navbar-logo.svg?raw";
import { Figure } from "./Figure";
import { activeModal } from "./store";

/** Navbar logo that opens the palette picker modal. */
export const LogoPaletteToggle: FunctionComponent = () => {
  const onClick = () => activeModal.set("palette");
  return (
    <button
      type="button"
      className="navbar-item"
      aria-label="Open color scheme picker"
      onClick={onClick}
      style={{ background: "transparent", border: 0, cursor: "pointer" }}
    >
      <Figure svg={navbarLogoSvg} className="logo-img" alt="Site logo" />
    </button>
  );
};
