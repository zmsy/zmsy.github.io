import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
		/**
		 * Title, displays in link previews and tab header. Prefixed with 'zmsy | '
		 */
    title: z.string(),
		/** HTTP <head> description for the post, shows up in short links. */
    description: z.string(),
		/** Date when blog post was first published. */
    publishDate: z.date(),
		/** Last date of this blog post being updated. */
    updatedDate: z
      .date()
      .optional(),
		/** Main image for the post, if there is one. */
    heroImage: z.string().optional(),
    /** seo keywords */
    keywords: z.array(z.string()).optional(),
  }),
});

// const recipes = defineCollection({

// })

export const collections = { blog };
