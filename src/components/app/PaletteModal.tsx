import type { FunctionComponent } from "preact";
import { useEffect } from "preact/hooks";

import clsx from "clsx";

import styles from "../../styles/modules/palette-modal.module.scss";

import { palettes, type PaletteId } from "./palette";

import { useCloseModal } from "./hooks/useCloseModal";
import { useIsModalActive } from "./store/modal";
import {
  initPalette,
  setPalettePreferenceId,
  useActivePalette,
  useActivePaletteId,
} from "./store/palette/index";

export const PaletteModal: FunctionComponent = () => {
  useEffect(() => {
    initPalette();
  }, []);

  const open = useIsModalActive("palette");
  const active = useActivePaletteId();
  const activePalette = useActivePalette();

  const close = useCloseModal(open);

  const choose = (palette: PaletteId) => {
    // Ensure side-effect subscriptions are active before updating preference.
    initPalette();
    setPalettePreferenceId(palette);
    close();
  };

  return (
    <div className={clsx("modal", styles.container, open && "is-active")}>
      <div class="modal-background" onClick={close}></div>
      <div
        className={clsx("modal-content", styles.content)}
        role="dialog"
        aria-modal="true"
        aria-label={`Color scheme picker. Current: ${activePalette.name}`}
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
          {Object.entries(palettes).map(([name, palette]) => {
            return (
              <button
                key={name}
                type="button"
                className={clsx(
                  styles.option,
                  active === name && styles.active,
                )}
                onClick={() => choose(name as PaletteId)}
              >
                <span className={styles.optionName}>{palette.name}</span>
                <span className={styles.swatches} aria-hidden="true">
                  <span
                    className={styles.swatch}
                    style={{ background: palette.colors.background }}
                  />
                  <span
                    className={styles.swatch}
                    style={{ background: palette.colors.backgroundAccent }}
                  />
                  <span
                    className={styles.swatch}
                    style={{ background: palette.colors.accent1 }}
                  />
                  <span
                    className={styles.swatch}
                    style={{ background: palette.colors.accent2 }}
                  />
                  <span
                    className={styles.swatch}
                    style={{ background: palette.colors.accent3 }}
                  />
                  <span
                    className={styles.swatch}
                    style={{ background: palette.colors.accent4 }}
                  />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
