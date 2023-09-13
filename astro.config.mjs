import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import preact from "@astrojs/preact";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://zmsy.co",
  output: "static",
  scopedStyleStrategy: "where",
  integrations: [
    mdx(),
    sitemap(),
    preact(),
    partytown({
      // Adds gtag's dataLayer.push as a forwarding-event.
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
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
