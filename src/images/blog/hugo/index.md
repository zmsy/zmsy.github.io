---
title: Switching to Hugo
description: >-
  Modernizing my blog and making it much faster/simpler by moving to Hugo to do
  static-site generation.
publishDate: 2020-02-24T00:00:00.000Z
draft: false
image: hugo.png
---

{{< image src="hugo.png" alt="Hugo bills itself as 'The world’s fastest framework for building websites'" >}}

One of the biggest changes for this blog happened just now - this blog switched from Lektor to [Hugo](https://gohugo.io/). For me, it's been a revolution in how personally productive I can be. I'm expecting that this will improve how quickly I can write and publish blog articles here and, maybe, even lead to me publishing more than 1x per ~3-6month period. I don't intend this to be a dead blog, and I'm putting in the work to make that the case.

I choose technologies in a very safe way, following a pattern:

1. Choose technologies that already have strong adoption as opposed to niche or cutting-edge.
2. Use technologies the way that others use them. Look for examples, re-use resources where possible.

My original system didn't meet either of these. This is a long-overdue follow up to my first post [about the technologies I chose the first time around](/blog/blog-versions).

## Choosing a New Static-Site Generator

Primary resource used: [staticgen.com](https://www.staticgen.com)

Background, I don't particularly love being in the React ecosystem for scenarios when the value of React likely won't be realized (which is to say, highly interactive sites that benefit from one-way data flow). This site is primarily data and not interactivity, so doesn't necessarily lend itself to using it.

### Why Hugo?

- It's a single binary I can install anywhere.
- I'm learning Go, and it reuses much of the Go ecosystem (notably, templating).
- It's fast.
- It takes a simple approach to the web; that it's a static set of HTML, CSS, and JS files. While you can wrap a build system like Webpack or Gulp in, it provides enough out-of-the-box features using [Hugo Pipes](https://gohugo.io/hugo-pipes/) that it may not be necessary.
- Batteries included: Useful shortcodes, deployment targets, integrations.
- It's one of the supported static site generators for [Netlify CMS](https://www.netlifycms.org/), which is what I intend to use to write content from here on out.
- The other obvious options, considering their popularity, are Gatsby and Next.js, but this site is largely static content and doesn't necessitate the React ecosystem.
- Support for some automatic content systems like [Taxonomies](https://gohugo.io/content-management/taxonomies) and [Archetypes](https://gohugo.io/content-management/archetypes/#readout).

### Why _Not_ Hugo?

In building the site on Hugo, there were a number of things that I encountered that I didn't love; they were few and far between though.

- Examples. The biggest single deficiency of Hugo as a static-site generator is that the examples provided by the documentation aren't great. I've got [strong feelings about this](/blog/example-first-documentation) and I'm going to try to see if I can note times where this is missing and submit those as MRs.
- Template debugging. Aside from `printf`ing a bunch of variables, I didn't find the mechanisms for figuring out what data is available where to be particularly useful (not that other SSGs have this down, though).
- Template Lookup Order. Error messages are confusing and it's hard to figure out where things slot into. The warnings that the hugo builder provides could be so much more useful.
- As of writing, Netlify CMS doesn't yet support page bundles (although this should be available soon).

### Why Not Lektor (any more)?

My needs for the website have changed pretty drastically from when I first built it in 2016 and wrote things for it in 2018.

- It's not popular (ranked ~30th on StaticGen for static-site generators), and it's not growing in popularity.
- I don't really use Python for anything web-facing, which is one of the reasons I originally stuck with Lektor.
- Not enough batteries included. Many integrations are abandoned or haven't been updated in forever.
- Bad writing ergonomics. The editing page isn't very helpful, and it doesn't actually help you create content faster. There once was a Electron app that theoretically a headless CMS for the software, but it was quickly abandoned.

## Build & Deploy

This site is now built and deployed using [Github Actions](https://github.com/features/actions), which are similar to Gitlab CI in form and function but are much easier to get up and going with if your repository is hosted there.
