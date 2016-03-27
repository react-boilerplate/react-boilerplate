# `sanitize.css`

Sanitize.css is a PostCSS plugin that makes browsers render elements more in
line with developer expectations (e.g. having the box model set to a cascading
`box-sizing: border-box`) and preferences (its defaults can be individually
overridden).

It was selected over older projects like `normalize.css` and `reset.css` due
to its greater flexibility and better alignment with CSSNext features such as CSS
variables.

See the [official documentation](https://github.com/10up/sanitize.css) for more
information.

## Removing `sanitize.css`

Delete [lines 44 and 45 in `app.js`](../../app/app.js#L44-L45) and remove it
from the `dependencies` in [`package.json`](../../package.json)!
