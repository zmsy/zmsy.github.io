---
title: "Bye Hugo, Hello Astro"
description: "Hugo lost out in terms of developer experience and understandability. Let's see how Astro."
publishDate: 2023-01-28T13:35:56-08:00
draft: true
---

Look, I get that I don't publish too much blog content. I'm rarely in the mood to actually write blog posts, and I rarely have content that warrants them. When that does happen, it's great, but it sure does seem like every third or fourth post here is me migrating the site to a new static site generator or web framework.

One of my key frustrations is that I've never actually achieved a good writing + developing experience for this website. It's for a number of reasons. I've been pretty bad at picking technologies that don't hamper how productive I _could_ be when the mood to write strikes.

## Changing Needs, Changing Technologies

Let's see what happened for the different versions...

### 1st Iteration - Lektor

[Launch post for the Lektor version](https://zmsy.co/blog/blog-versions/)

_(Note: If you click that link, you'll actually notice that there are three more pre-Lektor versions that never made it live onto the internet. So yeah, I re-write this site a lot.)_

Written in [Lektor](https://jamstack.org/generators/lektor/). I chose this because I was pretty familiar with the web ecosystem in Python that it ran with. Jinja templates, Flask server, etc. I was primarily developing Python at that time in my life, and this seemed to make a lot of sense. I recall a lot of fanfare when this was first announced, with a "Flat File CMS" written in Electron that was almost immediately abandonware.

My goals for this site when I chose this were:

- **Create an online presence** - For this site, I went with what I knew. I enumerated these explicitly in that post, but this was an easy in.
- **Build a completely static website** - I didn't have anywhere to host a backend, nor did I want to. The goal was to publish this using an AWS static host ([which I understood pretty well at that point](https://zmsy.co/blog/hosting-static-site-s3-cloudfront/)).

### 2nd Iteration - Hugo

[Launch post for the Hugo version](https://zmsy.co/blog/hugo/)

Written in [Hugo](https://jamstack.org/generators/hugo/). I literally called this _"a revolution in how personally productive I can be"_ (LOL), and published that article _right_ before the COVID-19 pandemic and before all will to spend my personal time publishing long-form content about technology fell off a cliff. I've written exactly 3 posts since that version launched. That timing meant Hugo's usefulness to me was curtailed for a lot of personal reasons, [some of which I opined on at length](https://zmsy.co/blog/dev-in-the-time-of-covid-19/).

I didn't love Hugo for many reasons I'll go into below. I was actually [_quite aware_ of the things that I didn't like about Hugo](https://zmsy.co/blog/hugo/#why-_not_-hugo) when I first launched it, and for the most part all of those held true to the point where it wasn't very useful to me any longer.

My goals for the Hugo version were:

- **Fast build times** - Why? I'm not entirely sure. But it seemed incredibly important at the time. 
- **No Webpack** - I hate webpack. I won't really go into it because I don't think my arguments for why I hate it are entirely defensible, but I just... do. The UX of it is terrible. [Hugo Pipes](https://gohugo.io/hugo-pipes/) with built-in Sass and TS/JS bundling using esbuild seemed awesome. And they are awesome. This was actually one of my favorite parts.
- **Fully static** - I still didn't intend at the point I chose Hugo for there to be much in the way of interactivity on the site, outside of some sprinkles of Javascript here and there.
- **Sprinkles of interactivity without a full React runtime** - This is still something I'm working out, even after I've moved off of Hugo.
    - My conundrum: After being spoiled by frameworks, I don't want direct DOM manipulation. Vanilla JS holds no particular sway for me. On the flipside, I don't love the idea of a dinky little personal site like mine having to load several hundred kilobytes of JS. It's not an app. I want something lean, but modern.
    - I wrote this version using [preact](https://preactjs.com/) as the view framework and [zustand](https://zustand-demo.pmnd.rs/) for managing state. It worked ok, but it was quite confusing to get working.
- **Easy integration with Github Actions & Github Pages** - Hugo's story here is awesome. I had a very easy time publishing new content out to the ether. I've got a [Menu page](/menu) that is used to show the house menu when guests come over and want me to make them drinks. Almost all of my quick little content updates are new drink options I'm putting there.

### 3rd Iteration - Astro.build

This... I suppose is the launch post for the Astro version!

I'm going with [Astro.build](https://astro.build/) as my static site generator and I'm hoping to make the developer experience better. It met a number of criteria I was looking for. I was inspired after reading through [the launch post for Astro 2.0](https://astro.build/blog/astro-2/).

- **Good Developer Experience** - This was the primary goal this time around. I want developing this site to be intuitive and enjoyable.
- **Typescript integration** - After using Typescript in my frontend and backend-related work for the past few years, it's hard to go back. I want everything typed, I want as much of that generated for me as possible, and I don't want to have to 
- **Vite-based builds** - I love Vite as a devtool and want to use it more.
- **Ship less code to the client** - This was quite appealing for my own conundrum of 1. framework-based interactivity but 2. no heavy runtime.
- **Preact support** - I've wanted to continue using Preact if I could. I think it's just an incredible technology, in how much of the React API it supports while being so small. The best part is how compatible it is with React, so if I find it too incompatible I'll just switch Astro to use React itself.

### Alternatives I Considered

- **SvelteKit** - I do love Svelte and I'm impressed by [SvelteKit](https://kit.svelte.dev/). I found that writing it at on a project or two at work was incredibly fun. The difficult thing here is that I've got years more experience with React, and I don't find React particularly burdensome or tired like many do right now. I think I'll probably adopt Svelte more heavily at some point, but not yet. I love the compiler, and it's quite cool to see how it works.
- **Next.js** - I also love [Next.js](https://nextjs.org/). I've used it extensively at this point. Almost all of my work development is done with Next. I might regret my choice to not go with it, but I really think that Astro and Next are similar enough to where switching between the two would be quite quick and easy. Let's see if you see me eat these words in the _inevitable upcoming migration post in two years_!
- **Gatsby** - I'm not sure what it is but [the GraphQL-everything of Gatsby](https://www.gatsbyjs.com/docs/how-to/querying-data/) didn't ever seem to work for me. I've never been _that_ into GraphQL as a technology (I don't mind it, but I'm not fervently for/against it) and it seemed to distract from actually writing a blog. I wasn't sold by the [Gatsby without the unifying GraphQL layer](https://www.gatsbyjs.com/docs/how-to/querying-data/using-gatsby-without-graphql/) story compared to just using Astro or other tools.
- **Stay with Hugo, but use Alpine.js** - There's always the option that I just didn't like the frontend setup I'd figured out. I [actually migrated all of the existing code to Alpine.js](https://github.com/zmsy/zmsy.github.io/pull/114) as a way to see if I could rig together some simple, declarative UI bits without having to use a full frontend framework runtime. However, the interactivity-via-string-expressions bit was frustrating when I had been used to Typescript everywhere. I installed [the existing types](https://www.npmjs.com/package/@types/alpinejs), but they're not comprehensive for things like `$store` or other data containers.

## Hugo Wasn't For Me

It really wasn't. I wasn't ever particularly happy with it. I re-designed the entire site while I was using Hugo, but it never felt intuitive and it was just drastically harder than the more web-based tools like Next I've used.

#### The Bad Parts of Hugo

- **Steep learning curve** - It's just hard to learn. The setup of a Hugo site is complex, and it's got a very poor feedback loop. Try something -> error pops up -> cryptic feedback -> try something else. It feels like it's from an era of developer tools where it wasn't commonplace to have things automatically scaffolded out, or comprehensively typed, or auto-completed. I want those things.
- **Lack of good VS Code plugins** - There's _some_ plugins for Hugo, but they don't work well and none of them are particularly popular.
- **Documentation is very confusing** - Hugo's documentation is quite labyrinthian, and [I'm not the only one to notice that](https://sagar.se/blog/hugo-documentation/) (and the [associated discussion](https://news.ycombinator.com/item?id=30527884)). In particular, I find that the examples almost never match my intended use case.
- **Templates are a nightmare** - I really hate Go html templates. I want stuff to auto-complete for me, I want to be able to hit tab and see all of the properties of an object, and I just straight up do not like the syntax. I hate having to dump entire objects out with `printf` to see what properties they contain. JSX is a breeze compared to this.
- **Build tooling is good when not using NPM tooling, but bad when you are** - Once you use stuff that you have to install with NPM, the whole build process becomes a pretty tedious experience. I used PostCSS somewhat heavily when setting up this site, and it made the whole build experience ~10-20sec longer per iteration unless you disabled it. If you did disable it, you might occasionally ship broken code. I certainly did.
- **I don't really need build performance** - This was a big revelation! I don't know why I cared so much about this. I have a small site, and full compiles are real quick most of the time.

I think that Hugo is _still the best static site generator for those who aren't interested in the web development ecosystem_. It's much better than my experience with Jekyll. If you want truly static content, if you don't care about Typescript/React/etc, if you just want to publish content and maybe edit the styles a little bit. It's great for that. I've never been _fully_ of that mindset, so the friction eventually caused me to jump ship.

## Current Goals for This Site

Since I'm now building one or two more interactive sections (like the [Recipes page](/recipes)), my goals for the build tools here are a little different.

1. Fast client experience - I'd like pages to load extremely quickly, and have a snappy user experience. 
1. Fully static - I want to build the site with Github Actions and serve it via Github Pages.
1. Intuitive DX & Editing experience
1. Ability to build rich interactive experience in some parts of the site (the "Recipes" section primarily), and not pay a page size penalty on areas of the site that don't need it.

Let's see how Astro does in that regard!
