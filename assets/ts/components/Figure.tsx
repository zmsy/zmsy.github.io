/**

*/

import clsx from "clsx";
import { FunctionComponent } from "preact";

type FigureProps = {
  /** Text source of the SVG file. */
  svg: string;
  /** Any additional class name to add to the <figure> */
  additionalClass?: string;
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
  additionalClass,
}) => {
  return (
    <figure
      class={clsx("color-responsive-svg", additionalClass)}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
