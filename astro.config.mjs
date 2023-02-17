import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import image from "@astrojs/image";

// https://astro.build/config
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: 'https://zmsy.co',
  output: "static",
  integrations: [mdx(), sitemap(), preact(), image()],
  server: {
    // nostalgic for my hugo days i guess
    port: 1314
  },
  ssr: {
    noExternal: ['bulma']
  },
  markdown: {
    syntaxHighlight: 'prism'
  }
});