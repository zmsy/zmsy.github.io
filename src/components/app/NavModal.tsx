import type { FunctionComponent } from "preact";

import { Figure } from "./Figure";

import { useStore } from "@nanostores/preact";
import { navModalOpen } from "./store";

import blogIcon from "../../svg/icons/blog-icon.svg?raw";
import homeIcon from "../../svg/icons/home-icon.svg?raw";
import aboutIcon from "../../svg/icons/about-icon.svg?raw";
import recipesIcon from "../../svg/icons/recipes-icon.svg?raw";
import hrzSeparator from "../../svg/horizontal-separator.svg?raw";
import clsx from "clsx";

export const NavModal: FunctionComponent = () => {
  const $open = useStore(navModalOpen);
  const handleClickAway = () => navModalOpen.set(false);
  return (
    <div id="nav-modal" className={clsx("modal", $open && "is-active")}>
      <div class="modal-background" onClick={handleClickAway}></div>
      <div class="modal-content">
        <Figure
          additionalClass="modal-horizontal-separator"
          svg={hrzSeparator}
        />
        <ul>
          <li>
            <a href="/">
              <Figure additionalClass="modal-icon" svg={homeIcon} />
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="/blog">
              <Figure additionalClass="modal-icon" svg={blogIcon} />
              <span>Blog</span>
            </a>
          </li>
          <li>
            <a href="/recipes">
              <Figure additionalClass="modal-icon" svg={recipesIcon} />
              <span>Recipes</span>
            </a>
          </li>
          <li>
            <a href="/about">
              <Figure additionalClass="modal-icon" svg={aboutIcon} />
              <span>About</span>
            </a>
          </li>
        </ul>
        <Figure
          additionalClass="modal-horizontal-separator"
          svg={hrzSeparator}
        />
      </div>
    </div>
  );
};
