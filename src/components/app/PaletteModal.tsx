import type { FunctionComponent } from "preact";

import clsx from "clsx";

import styles from "../../styles/modules/palette-modal.module.scss";

import type { PaletteId } from "@src/lib/palettePreference";
import {
  readStoredPalette,
  setPalettePreference,
} from "@src/lib/palettePreference";

import { useCloseModal } from "./hooks/useCloseModal";
import { useIsModalActive } from "./store/modal";

export const PaletteModal: FunctionComponent = () => {
  const open = useIsModalActive("palette");
  const active =
    (typeof window !== "undefined" ? readStoredPalette() : null) ?? null;

  const close = useCloseModal(open);

  const choose = (palette: PaletteId) => {
    setPalettePreference(palette);
    close();
  };

  return (
    <div className={clsx("modal", styles.container, open && "is-active")}>
      <div class="modal-background" onClick={close}></div>
      <div
        className={clsx("modal-content", styles.content)}
        role="dialog"
        aria-modal="true"
        aria-label="Color scheme picker"
      >
        <div className={styles.headerRow}>
          <h2 className={styles.title}>Color scheme</h2>
          <button
            className={styles.close}
            type="button"
            aria-label="Close"
            onClick={close}
          />
        </div>
        <div className={styles.options}>
          <button
            type="button"
            className={clsx(
              styles.option,
              active === "defaultLight" && styles.active,
            )}
            onClick={() => choose("defaultLight")}
          >
            <span className={styles.optionName}>Default Light</span>
            <span className={styles.swatches} aria-hidden="true">
              <span
                className={styles.swatch}
                style={{ background: "#faf9f9" }}
              />
              <span
                className={styles.swatch}
                style={{ background: "#f5f2ef" }}
              />
              <span
                className={styles.swatch}
                style={{ background: "#f55a37" }}
              />
              <span
                className={styles.swatch}
                style={{ background: "#359fb7" }}
              />
            </span>
          </button>
          <button
            type="button"
            className={clsx(
              styles.option,
              active === "defaultDark" && styles.active,
            )}
            onClick={() => choose("defaultDark")}
          >
            <span className={styles.optionName}>Default Dark</span>
            <span className={styles.swatches} aria-hidden="true">
              <span
                className={styles.swatch}
                style={{ background: "#2a363b" }}
              />
              <span
                className={styles.swatch}
                style={{ background: "#3c525c" }}
              />
              <span
                className={styles.swatch}
                style={{ background: "#359fb7" }}
              />
              <span
                className={styles.swatch}
                style={{ background: "#83cab2" }}
              />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
