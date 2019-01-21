# CSS processors

The linter supports current and future CSS syntax. This includes all standard CSS but also special features that use standard CSS syntactic structures, e.g. special at-rules, special properties, and special functions. Some CSS-*like* language extensions --   features that use non-standard syntactic structures --   are, as such, supported; however, since there are infinite processing possibilities, the linter cannot support everything.

You can run the linter before or after your css processors. Depending on which processors you use, each approach has caveats:

1.  *Before*: Some plugins/processors might enable a syntax that isn't compatible with the linter.
2.  *After*: Some plugins/processors might generate CSS that is invalid against your linter config, causing violations that do not correspond to your original stylesheets.

*In both cases you can either turn off the incompatible linter rule, or stop using the incompatible plugin/processor.* You could also approach plugin/processor authors and request alternate formatting options that will make their plugin/processor compatible with stylelint.

## Parsing non-standard syntax

By default, the linter can *parse* any the following non-standard syntaxes by using special PostCSS parsers:

-   Sass (using [`postcss-sass`](https://github.com/AleshaOleg/postcss-sass))
-   SCSS (using [`postcss-scss`](https://github.com/postcss/postcss-scss))
-   Less (using [`postcss-less`](https://github.com/shellscape/postcss-less))
-   SugarSS (using [`sugarss`](https://github.com/postcss/sugarss))

*Non-standard syntaxes can automatically be inferred from the following file extensions, values for the `lang` or `type` attribute on `<style>` tags, and markers for Markdown code fences: `css`, `less`, `scss`, and `sss`.* If you would need to specify your non-standard syntax, though, both the [CLI](cli.md) and the [Node API](node-api.md) expose a `syntax` option.

-   If you're using the CLI, use the `syntax` flag like so:  `stylelint ... --syntax scss`.
-   If you're using the Node API, pass in the `syntax` option like so: `stylelint.lint({ syntax: "sugarss", ... })`.

Additionally, stylelint can accept a custom [PostCSS-compatible syntax](https://github.com/postcss/postcss#syntaxes) when using the CLI or Node API. For custom syntaxes, please use the `custom-syntax` and `customSyntax` options, respectively.

-   If you're using the CLI, use the `custom-syntax` flag like so:  `stylelint ... --custom-syntax custom-syntax-module` or `stylelint ... --custom-syntax ./path/to/custom-syntax-module`.
-   If you're using the Node API, pass in the `customSyntax` option like so: `stylelint.lint({ customSyntax: path.join(process.cwd(), './path/to/custom-syntax-module') , ... })`.

If you're using the linter as a [PostCSS Plugin](postcss-plugin.md), you'll need to use the special parser directly with PostCSS's `syntax` option like so:

```js
var postcss = require("postcss")
// "postcss-syntax" can automatically switch PostCSS syntax by file extensions
// or use "postcss-less", "sugarss", "postcss-scss", or any PostCSS-compatible syntax
var syntax = require("postcss-syntax")

postcss([
  require("stylelint"),
  require("reporter")
])
  .process(css, {
    from: "lib/app.css",
    syntax: syntax
  })
})
```
