# PostCSS

PostCSS is a modular CSS preprocessor based on JavaScript. It comes pre-
configured with the plugins listed below.

See the [official documentation](https://github.com/postcss/postcss) for more
information!

## Plugins

This boilerplate bundles a few of the most useful PostCSS plugins by default:

- [`postcss-focus`](https://github.com/postcss/postcss-focus): Adds a `:focus`
  selector to every `:hover` selector for keyboard accessibility.
- [`autoprefixer`](https://github.com/postcss/autoprefixer): Prefixes your CSS
  automatically for the last two versions of all major browsers and IE10+.
- [`cssnext`](https://github.com/moox/postcss-cssnext): Use tomorrow's CSS
  features today. Transpiles CSS4 features down to CSS3.
- [`cssnano`](https://github.com/ben-eb/cssnano): Optimizes your CSS file. For a
  full list of optimizations check [the official website](http://cssnano.co/optimisations/).

For more awesome features that the PostCSS ecosystem offers, check out the
comprehensive, fully-searchable catalog of available plugins at [postcss.parts](http://postcss.parts).

## Adding a new PostCSS plugin

1. Add the plugin to your project (e.g. `npm install --save-dev postcss-super-plugin`).
2. Modify `internals/webpack/webpack.dev.babel.js`:
   - Add `const postcssSuperPlugin = require('postcss-super-plugin');`
     to `// PostCSS plugins` section.
   - Find `postcss: () => [/* ... current set of plugins ... */]` and add
     the new plugin to the list: `postcssPlugins: [/* ... */, postcssSuperPlugin()]`.
3. Restart the server (`CTRL+C`, `npm start`) for the new plugin to become available
  (webpack does not pick config changes while running).

Before installing a new plugin, make sure that you are not trying to add a feature
that is already available. It is likely that what you are looking for
[is supported by `cssnext`](http://cssnext.io/features/), which is a part of the boilerplate.

---

_Don't like this feature? [Click here](remove.md)_
