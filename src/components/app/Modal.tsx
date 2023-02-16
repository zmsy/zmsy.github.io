import type { FunctionComponent } from "preact";

import { Figure } from "../../../hugo/assets/ts/components/Figure";

/** See note in Figure.tsx for why these are .txt files. */
import blogIcon from "../../img/icons/blog-icon.txt";
import homeIcon from "../../img/icons/home-icon.txt";
import aboutIcon from "../../img/icons/about-icon.txt";
import recipesIcon from "../../img/icons/recipes-icon.txt";
import hrzSeparator from "../../img/horizontal-separator.txt";
import { useStore } from "@nanostores/preact";
import { navModalOpen } from "./store";
import clsx from "clsx";

type ModalProps = {
  /** Must have a unique identifier. */
  id: string;
};

export const Modal: FunctionComponent<ModalProps> = ({ id }) => {
  const $navModalOpen = useStore(navModalOpen);
  const handleClickAway = () => navModalOpen.set(false);
  return (
    <div id={id} className={clsx(["modal", $navModalOpen && "is-active"])}>
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
      <button class="modal-close" onClick={handleClickAway} />
    </div>
  );
};
