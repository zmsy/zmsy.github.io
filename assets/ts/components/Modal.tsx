import clsx from "clsx";
import { FunctionComponent } from "preact";

import { useStore } from "ts/store";

type ModalProps = {
  /** Must have a unique identifier. */
  id: string;
};

export const Modal: FunctionComponent<ModalProps> = ({ id, children }) => {
  const { navOpen, setNavOpen } = useStore();
  const handleClickAway = () => setNavOpen(false);
  return (
    <div id={id} class={clsx("modal", navOpen && "is-active")}>
      <div class="modal-background" onClick={handleClickAway}></div>
      <div class="modal-content">
        <img
          class="modal-horizontal-separator"
          src="/img/horizontal-separator.svg"
        />
        <ul>
          <li>
            <a href="/">
              <img class="modal-icon" src="/img/icons/home-icon.svg" />
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="/">
              <img class="modal-icon" src="/img/icons/blog-icon.svg" />
              <span>Blog</span>
            </a>
          </li>
          <li>
            <a href="/">
              <img class="modal-icon" src="/img/icons/recipes-icon.svg" />
              <span>Recipes</span>
            </a>
          </li>
          <li>
            <a href="/">
              <img class="modal-icon" src="/img/icons/about-icon.svg" />
              <span>About</span>
            </a>
          </li>
        </ul>
        <img
          class="modal-horizontal-separator"
          src="/img/horizontal-separator.svg"
        />
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        onClick={handleClickAway}
      ></button>
    </div>
  );
};
