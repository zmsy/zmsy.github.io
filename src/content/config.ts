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
    updatedDate: z.date().optional(),
    /** Main image for the post, if there is one. */
    heroImage: z.string().optional(),
    /** seo keywords */
    keywords: z.array(z.string()).optional(),
  }),
});

const durationRegex =
  /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)?S)?$/;

const isoDuration = z
  .string()
  .regex(durationRegex, "Invalid ISO 8601 duration format");

const recipeFields = z.object({
  title: z.string(),
  description: z.string(),
  publishDate: z.date(),
  updatedDate: z.date().optional(),
  image: z.string().optional(),
  recipeIngredients: z.array(z.string()),
  recipeInstructions: z.array(z.string()),
  recipeYield: z.string(),
  cookTime: isoDuration,
  prepTime: isoDuration,
  totalTime: isoDuration,
  /** seo keywords */
  keywords: z.array(z.string()).optional(),
});

const drinkSchema = recipeFields.extend({
  kingdom: z.literal("drink"),
  category: z.union([
    z.literal("cocktails"),
    z.literal("non-alcoholic"),
    z.literal("hot"),
  ]),
});

const foodSchema = recipeFields.extend({
  kingdom: z.literal("drink"),
  category: z.union([z.literal("dessert"), z.literal("breads")]),
});

const recipes = defineCollection({
  schema: z.union([foodSchema, drinkSchema]),
});

export const collections = { blog, recipes };
