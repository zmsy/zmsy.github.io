import type { FunctionComponent } from "preact";

import { Figure } from "./Figure";

import { useStore } from "@nanostores/preact";
import clsx from "clsx";

import { navModalOpen } from "./store";
import styles from "../../styles/nav-modal.module.scss";

import hrzSeparator from "../../svg/horizontal-separator.svg?raw";
import aboutIcon from "../../svg/icons/about-icon.svg?raw";
import blogIcon from "../../svg/icons/blog-icon.svg?raw";
import homeIcon from "../../svg/icons/home-icon.svg?raw";
import recipesIcon from "../../svg/icons/recipes-icon.svg?raw";

export const NavModal: FunctionComponent = () => {
  // const t = navModalStyles.test;
  const $open = useStore(navModalOpen);
  const handleClickAway = () => navModalOpen.set(false);
  return (
    <div className={clsx("modal", styles.container, $open && "is-active")}>
      <div class="modal-background" onClick={handleClickAway}></div>
      <div className={clsx("modal-content", styles.content)}>
        <Figure
          additionalClass={styles.horizontalsep ?? ""}
          svg={hrzSeparator}
        />
        <ul>
          <li>
            <a href="/">
              <Figure additionalClass={styles.icon ?? ""} svg={homeIcon} />
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="/blog">
              <Figure additionalClass={styles.icon ?? ""} svg={blogIcon} />
              <span>Blog</span>
            </a>
          </li>
          <li>
            <a href="/recipes">
              <Figure additionalClass={styles.icon ?? ""} svg={recipesIcon} />
              <span>Recipes</span>
            </a>
          </li>
          <li>
            <a href="/about">
              <Figure additionalClass={styles.icon ?? ""} svg={aboutIcon} />
              <span>About</span>
            </a>
          </li>
        </ul>
        <Figure
          additionalClass={styles.horizontalsep ?? ""}
          svg={hrzSeparator}
        />
      </div>
    </div>
  );
};
