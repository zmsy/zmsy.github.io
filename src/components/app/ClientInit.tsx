import type { FunctionComponent } from "preact";
import { useEffect } from "preact/hooks";

import { initPalette } from "./store/palette/init";

/**
 * Client-only initialization entrypoint.
 *
 * This should be mounted once (e.g. from BaseHead) so app init doesn't depend
 * on opening a modal or importing a specific component.
 */
export const ClientInit: FunctionComponent = () => {
  useEffect(() => {
    initPalette();
  }, []);

  return null;
};
