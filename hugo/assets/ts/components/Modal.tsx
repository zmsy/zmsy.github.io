import clsx from "clsx";
import { FunctionComponent } from "preact";

import { useStore } from "ts/store";
import { Figure } from "./Figure";

/** See note in Figure.tsx for why these are .txt files. */
import blogIcon from "../../img/icons/blog-icon.txt";
import homeIcon from "../../img/icons/home-icon.txt";
import aboutIcon from "../../img/icons/about-icon.txt";
import recipesIcon from "../../img/icons/recipes-icon.txt";
import hrzSeparator from "../../img/horizontal-separator.txt";

type ModalProps = {
  /** Must have a unique identifier. */
  id: string;
};

export const Modal: FunctionComponent<ModalProps> = ({ id }) => {
  const { navOpen, setNavOpen } = useStore();
  const handleClickAway = () => setNavOpen(false);
  return (
    <div id={id} class={clsx("modal", navOpen && "is-active")}>
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
      <button
        class="modal-close
        aria-label="close"
        onClick={handleClickAway}
      ></button>
    </div>
  );
};
