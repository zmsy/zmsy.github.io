import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import image from "@astrojs/image";
import preact from "@astrojs/preact";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://zmsy.co",
  output: "static",
  integrations: [mdx(), sitemap(), preact(), image(), partytown()],
  server: {
    // nostalgic for my hugo days i guess
    port: 1314,
  },
  ssr: {
    noExternal: ["bulma"],
  },
  markdown: {
    syntaxHighlight: "prism",
  },
});
