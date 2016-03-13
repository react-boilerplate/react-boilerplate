# PostCSS

PostCSS is a modular CSS preprocessor based on JavaScript. It comes fully
configured with the plugins listed below and ready to go.

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
full list of optimizations check [the offical website](http://cssnano.co/optimisations/).

For a full, searchable catalog of possible plugins go to [postcss.parts](http://postcss.parts).

## Removing PostCSS

To remove PostCSS, delete the `postcssPlugins` option and remove all occurences
of the `postcss-loader` from

- [`webpack.dev.babel.js`](/internals/webpack/webpack.dev.babel.js)
- [`webpack.prod.babel.js`](/internals/webpack/webpack.prod.babel.js)
- [`webpack.base.babel.js`](/internals/webpack/webpack.base.babel.js)

When that is done - and you've verified that everything is still working - remove
all related dependencies from [`package.json`](/package.json)!
