import type { FunctionComponent } from "preact";

import navbarLogoSvg from "@src/svg/navbar-logo.svg?raw";
import { activeModal } from "@src/store";
import { Figure } from "./Figure";

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
