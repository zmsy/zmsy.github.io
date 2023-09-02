/**
 * SVG component.
 */

import clsx from "clsx";
import type { FunctionComponent } from "preact";
import styles from "../../styles/modules/figure.module.scss";

type FigureProps = {
  /** Text source of the SVG file. */
  svg: string;
  /** Any additional class name to add to the <figure> */
  className?: string;
  /** Id to add to the <figure> element, for narrower CSS scoping. */
  id?: string;
  /** Alt text for accesibility. */
  alt?: string;
};

/**
 * Figure component is used to inline SVG files and have the outputs
 * be color-responsive on the website.
 *
 * NOTE: There's a small nit issue in Hugo where js can't import .svg files
 * as text, because there's no defined loader in esbuild. Opened this
 * issue to resolve, fix when possible:
 * https://github.com/gohugoio/hugo/issues/9978
 */
export const Figure: FunctionComponent<FigureProps> = ({
  svg,
  className,
  id,
  alt,
}) => {
  // only set the id of the element if it's been passed
  const idProps = { ...(id !== undefined && { id }) };

  return (
    <figure
      {...idProps}
      alt={alt ?? ""}
      class={clsx(styles.coloredsvg, className)}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
