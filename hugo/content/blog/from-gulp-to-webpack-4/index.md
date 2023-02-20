---
title: The Switch to Webpack 4
description: "In the era of React-driven pages, Webpack is a powerful tool to have in your belt. Here's how the transition worked for this site."
publishDate: 2018-06-09
---

{{< image src="gulp_to_webpack.png" alt="Gulp to Webpack Transition" >}}

I've always been interested in using Webpack to generate this site, but the heavily config-oriented earlier versions of  Webpack (2.x, 3.x) were a hassle. The [explicit pipelines from Gulp](https://gulpjs.com/) were always significantly easier. Yet, after using [Nuxt.js](https://nuxtjs.org/) for a recent project–which works exceedingly well with Webpack–I decided that it was time to jump on the bandwagon.
 
## Reasons for Switching

Gulp is very good at creating flexible tasks to be run on a regular basis. Webpack and Gulp, however, are two separate tools with completely different aims.

### The Good

- Outside of NPM itself, [Webpack is the most popular build tool today](https://stateofjs.com/2017/build-tools/results), with about a 45% increase in users who have used it and would like to use it again.
- [Webpack has a built-in integration with Lektor](https://github.com/lektor/lektor-webpack-support), it made for a better development story once all the kinks were worked out.
- Webpack is a module bundler by default. If you orient your assets in a way that Webpack can consume them, you'll end up bundling their outputs nicely into a single file like you expected.
- [Webpack 4 has 'zero config' options](https://medium.com/webpack/webpack-4-released-today-6cdb994702d4#dfa8). The configuration file is a well-known pain point for Webpack, as it tends to create a lot of headaches very quickly. Being able to replace my ailing, convoluted Webpack 2/3 config files with defaults was appealing to me.
- The move to 'convention over configuration' is approaching. Sane defaults, opinionated by common methods, and tooling built for the majority of use cases.
- Includes splitting into 'prod' and 'dev' modes by default. It was always possible, but this is a major part of the webpack API now.

### The Bad

- Webpack documentation is confusing, sparse, and littered with examples that either make no sense or have been broken by version upgrades. Finding working examples is _very_ difficult.
- NPM module configuration for Webpack is a major source of frustration, because libraries are getting replaced & deprecated so quickly that what may have worked today is not guaranteed to work a few months from now.
- NPM package installation and management is still more difficult than it seems like it should be. Since NPM packages take a more Unix-like 'single function' approach, it drastically increases the amount of dependencies per project (this website has 754 dependencies right now).
- Transitioning from a working Webpack 2/3 config to Webpack 4 (either using config or zero-config options) is difficult.


## What does it look like?

#### Previously - Gulp

Gulp pipelines usually have 1 or more inputs of the same filetype, and then produce explicit outputs using pipes.

```js
// Process main scss for the site.
gulp.task('main-css', function() {
    return gulp.src('./src/index.scss')
        .pipe(rename('main.min.css'))
        .pipe(source_maps.init())
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(clean_css())
        .pipe(source_maps.write('.'))
        .pipe(gulp.dest('../assets/css/'));
});
```

Gulp tasks operate on inputs and outputs, so you don't necessarily need to set things up so that they rely on one another.

#### Now - Webpack

Whereas Webpack configs look to an entrypoint (normally `./src/index.js` by convention) and bundle all of the dependencies for that file.

```js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: "production",
  output: {
    path: path.dirname(__dirname) + '/assets/static/gen',
    filename: "[name].js"
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "main.css",
      chunkFilename: "[name].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'style-loader',
          'sass-loader'
        ]
      }
    ]
  }
};
```

In prior versions of Webpack it was required to make many more things explicit, compared to now where you can opt to use conventional inputs/outputs instead of specifying them.

## Lessons Learned

The biggest struggle in using Webpack is bridging the gap between the concepts and the implementation. 

- The concepts are well established and internally consistent. [Check out the documentation](https://webpack.js.org/concepts/) if you're curious about what any of the terms / verbs used in Webpack-speak mean.
- The implementation is where things are difficult. It's very tough to translate the concepts espoused in how Webpack _should_ operate to how it actually _does_ operate.
  - Things like 'entry' or 'loaders' are simple enough to understand, but are difficult to translate into working functionality.
  - Error messages need improvement. It's very tough to take information there and use it.

That said, considering the difficulties, module bundling with Webpack is _still_ worth it even after all of that. Simplifying your build process from separate pipelines using Gulp/Grunt/etc into a single build process using a dependency graph is a drastic improvement in paradigm.

If you're just trying to process some Sass files, I would stick to Gulp.
