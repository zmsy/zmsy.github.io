import type { FunctionComponent } from "preact";

import { Figure } from "./Figure";

import clsx from "clsx";

import styles from "../../styles/modules/nav-modal.module.scss";

import { useCloseModal } from "./hooks/useCloseModal";

import hrzSeparator from "../../svg/horizontal-separator.svg?raw";
import aboutIcon from "../../svg/icons/about-icon.svg?raw";
import blogIcon from "../../svg/icons/blog-icon.svg?raw";
import homeIcon from "../../svg/icons/home-icon.svg?raw";
import recipesIcon from "../../svg/icons/recipes-icon.svg?raw";
import { useIsModalActive } from "./store/modal";

export const NavModal: FunctionComponent = () => {
  const open = useIsModalActive("nav");
  const close = useCloseModal(open);

  return (
    <div className={clsx("modal", styles.container, open && "is-active")}>
      <div class="modal-background" onClick={close}></div>
      <div className={clsx("modal-content", styles.content)}>
        <Figure className={styles.horizontalsep ?? ""} svg={hrzSeparator} />
        <ul>
          <li>
            <a href="/">
              <Figure className={styles.icon ?? ""} svg={homeIcon} />
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="/blog">
              <Figure className={styles.icon ?? ""} svg={blogIcon} />
              <span>Blog</span>
            </a>
          </li>
          <li>
            <a href="/recipes">
              <Figure className={styles.icon ?? ""} svg={recipesIcon} />
              <span>Recipes</span>
            </a>
          </li>
          <li>
            <a href="/about">
              <Figure className={styles.icon ?? ""} svg={aboutIcon} />
              <span>About</span>
            </a>
          </li>
        </ul>
        <Figure className={styles.horizontalsep ?? ""} svg={hrzSeparator} />
      </div>
    </div>
  );
};
