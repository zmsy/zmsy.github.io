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
  redSox: {
    name: "Red Sox",
    scheme: "light",
    colors: {
      background: "#fdfbfa",
      backgroundAccent: "#f3ecea",
      secondaryBackground: "#0a2342",
      titleText: "#0a2342",
      subtitleText: "#2a3550",
      text: "#1e2330",
      textLowContrast: "#60677a",
      accent1: "#bd3039",
      accent2: "#1d3b73",
      accent3: "#c8a951",
      accent4: "#2a9d8f",
      illustrations: "#1e2330",
    },
  },
  nightdrive: {
    name: "Nightdrive",
    scheme: "dark",
    colors: {
      background: "#14070a",
      backgroundAccent: "#1f0b10",
      secondaryBackground: "#f7f8ff",
      titleText: "#f7f8ff",
      subtitleText: "#d9defe",
      text: "#b8c0ee",
      textLowContrast: "#8f97c9",
      accent1: "#ff2d55",
      accent2: "#ff7a18",
      accent3: "#ffb000",
      accent4: "#ff3b30",
      illustrations: "#c7cce8",
    },
  },
  miamiVice: {
    name: "Miami Vice",
    scheme: "dark",
    colors: {
      background: "#120a2a",
      backgroundAccent: "#1b0f3e",
      secondaryBackground: "#fff3fb",
      titleText: "#fff3fb",
      subtitleText: "#ffd0f0",
      text: "#f0bdf3",
      textLowContrast: "#c48acb",
      accent1: "#00f5ff",
      accent2: "#ff2a9d",
      accent3: "#b026ff",
      accent4: "#ffe600",
      illustrations: "#ffd0f0",
    },
  },
  babySteps: {
    name: "Baby Steps",
    scheme: "light",
    colors: {
      background: "#fffefc",
      backgroundAccent: "#f6f4fb",
      secondaryBackground: "#1f2937",
      titleText: "#2b2a42",
      subtitleText: "#4a4668",
      text: "#3a3656",
      textLowContrast: "#7a7397",
      accent1: "#5b8def",
      accent2: "#4fcbb8",
      accent3: "#ff8a65",
      accent4: "#f2d46d",
      illustrations: "#3a3656",
    },
  },
  frosted: {
    name: "Frosted",
    scheme: "light",
    colors: {
      background: "#f7fbff",
      backgroundAccent: "#e8f2fb",
      secondaryBackground: "#0f2a3a",
      titleText: "#0f2a3a",
      subtitleText: "#24495e",
      text: "#1c3b4c",
      textLowContrast: "#587486",
      accent1: "#2d9cdb",
      accent2: "#19b394",
      accent3: "#3ddc97",
      accent4: "#1f6feb",
      illustrations: "#1c3b4c",
    },
  },
} satisfies Record<string, Palette>;

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
