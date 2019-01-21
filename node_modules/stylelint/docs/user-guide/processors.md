# Processors

Processors are community packages that enable stylelint to lint the CSS within non-stylesheet files. For example, you could lint the CSS within `<style>` tags in HTML, code blocks in Markdown, or strings in JavaScript.

*These processors can only be used with the CLI and the Node API, not with the PostCSS plugin.* (The PostCSS plugin will ignore them.)

-   [stylelint-processor-arbitrary-tags](https://github.com/mapbox/stylelint-processor-arbitrary-tags): Lint within user-specified tags.
-   [stylelint-processor-glamorous](https://github.com/zabute/stylelint-processor-glamorous): Lint [glamorous](https://github.com/paypal/glamorous) and related css-in-js libraries using object literals.
-   [stylelint-processor-markdown](https://github.com/mapbox/stylelint-processor-markdown): Lint within Markdown's [fenced code blocks](https://help.github.com/articles/creating-and-highlighting-code-blocks/).
-   [stylelint-processor-styled-components](https://github.com/styled-components/stylelint-processor-styled-components): Lint [styled-components](https://styled-components.com) and related CSS-in-JS libraries using tagged template literals.
