/** Custom color palettes. */

/** Template literal type for the color properties */
export type ColorCustomProperty = `--${string}Color`;

/** Defined set of colors for the site. */
export type Palette = {
  name: string;
  /**
   * Controls the browser's built-in form control styling, scrollbars, etc.
   * This should reflect whether the palette is intended as a light or dark UI.
   * https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme
   */
  scheme: "light" | "dark";
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
    /** Light text color, minimum WCAG standard contrast. */
    textLowContrast: string;
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

/**
 * Default set of palettes to make available from the custom
 * color picker option.
 */
export const palettes = {
  defaultDark: {
    name: "Dark",
    scheme: "dark",
    colors: {
      background: "#2a363b",
      backgroundAccent: "#3c525c",
      secondaryBackground: "#faf9f9",
      titleText: "#faf9f9",
      subtitleText: "#dcdbd9",
      text: "#dcdbd9",
      textLowContrast: "#c8bfaf",
      accent1: "#359fb7",
      accent2: "#83cab2",
      accent3: "#f55a37",
      accent4: "#e5c76c",
      illustrations: "#dcdbd9",
    },
  },
  defaultLight: {
    name: "Light",
    scheme: "light",
    colors: {
      background: "#faf9f9",
      backgroundAccent: "#f5f2ef",
      secondaryBackground: "#2a363b",
      titleText: "#100b03",
      subtitleText: "#38332a",
      text: "#3f3b35",
      textLowContrast: "#7b7262",
      accent1: "#f55a37",
      accent2: "#359fb7",
      accent3: "#83cab2",
      accent4: "#e5c76c",
      illustrations: "#3f3b35",
    },
  },
};

export type PaletteId = keyof typeof palettes;

export const paletteIds = Object.keys(palettes) as PaletteId[];

export const paletteEntries = Object.entries(palettes) as Array<
  [PaletteId, (typeof palettes)[PaletteId]]
>;

/** Set an entire palette across the site. */
export const setPaletteCSS = (palette: Palette): void => {
  Object.entries(palette.colors).forEach(([colorName, colorValue]) => {
    document.documentElement.style.setProperty(
      `--${colorName}Color`,
      colorValue,
    );
  });
};
