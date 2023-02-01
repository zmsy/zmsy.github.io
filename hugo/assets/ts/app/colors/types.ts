/** Types for the color picker. */

/** Template literal type for the color properties */
export type ColorCustomProperty = `--${string}Color`;

/** Defined set of colors for the site. */
export type Palette = {
  name: string;
  colors: {
    /** Main backgorund color of the site. */
    background: string;
    /** Slightly off-shade of the same background color. */
    backgroundAccent: string;
    /**
     * Background for elements that don't share the common background
     * color. Normally contrasting.
     */
    secondaryBackground: string;
    /** h1-2 */
    titleText: string;
    /** h3-6 */
    subtitleText: string;
    /** Main body text. */
    text: string;
    /** Fun colors, clicked links, etc. */
    /** Links, warnings, admonitions. */
    accent1: string;
    /** Hovered links, hovered icons. */
    accent2: string;
    /** Inline code. */
    accent3: string;
    /** Warnings. */
    accent4: string;
    /** SVG illustrations stroke color. */
    illustrations: string;
  };
};
