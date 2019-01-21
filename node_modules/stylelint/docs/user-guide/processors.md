# Processors

Processors are community packages that enable stylelint to extract styles from within non-stylesheet files.

*These processors can only be used with the CLI and the Node API, not with the PostCSS plugin.* (The PostCSS plugin will ignore them.)

-   [stylelint-processor-arbitrary-tags](https://github.com/mapbox/stylelint-processor-arbitrary-tags): Lint within user-specified tags.

stylelint now has built-in support for many common non-stylesheet files. You may no longer need to use the following processors:

-   [stylelint-processor-glamorous](https://github.com/zabute/stylelint-processor-glamorous): Lint [glamorous](https://github.com/paypal/glamorous) and related css-in-js libraries using object literals.
-   [stylelint-processor-markdown](https://github.com/mapbox/stylelint-processor-markdown): Lint within Markdown's [fenced code blocks](https://help.github.com/articles/creating-and-highlighting-code-blocks/).
-   [stylelint-processor-styled-components](https://github.com/styled-components/stylelint-processor-styled-components): Lint [styled-components](https://styled-components.com) and related CSS-in-JS libraries using tagged template literals.
