# `CSS`

All `.css` files in one of the five subfolders of the `css/` folder get compiled into one big file. You can write in existing files and add new ones and they'll get imported automatically.

## PostCSS Plugins

The boilerplate uses PostCSS, and includes a few plugins by default:

* `postcss-import`: Inlines `@import`ed stylesheets to create one big stylesheet.

* `postcss-simple-vars`: Makes it possible to use `$variables in your CSS.

* `postcss-focus`: Adds a `:focus` selector to every `:hover`.

* `autoprefixer-core`: Prefixes your CSS automatically, supporting the last two versions of all major browsers and IE 8 and up.

* `cssnano`: Optimizes your CSS file. For a full list of optimizations check [the offical website](http://cssnano.co/optimisations/).

* `postcss-reporter`: Makes warnings by the above plugins visible in the console.

For a full, searchable catalog of plugins go to [postcss.parts](http://postcss.parts).

## Folder structure

The boilerplate comes with a basic folder structure to keep the CSS files organized. This is what the folders are for:

* `base`: Global styling, e.g. typography

* `components`: Component specific styling, e.g. buttons, modals,...

* `pages`: Pages, e.g. Homepage, About Page,...

* `utils`: Utility files, e.g. variables, mixins, functions,...

* `vendor`: External files, e.g. a CSS reset

* `main.css`: All CSS files from the above directories are `@import`ed into this file and inlined with `postcss-import`.
