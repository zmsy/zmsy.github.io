import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function get() {
  const posts = await getCollection("blog");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: "https://zmsy.co",
    items: posts.map((post) => ({
      ...post.data,
      pubDate: post.data.publishDate,
      link: `/blog/${post.slug}/`,
    })),
  });
}
