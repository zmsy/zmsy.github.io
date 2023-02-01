import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://zmsy.co',
	integrations: [mdx(), sitemap()],
	server: {
		// nostalgic for my hugo days i guess
		port: 1314,
	}
});
