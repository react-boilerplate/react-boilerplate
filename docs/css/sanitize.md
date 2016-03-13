# `sanitize.css`

Sanitize.css styles browsers to render elements more consistently with developer
expectations and preferences. In comparison to that, `normalize.css` styles
browsers to render elements more consistently with each other and `reset.css`
unstyles every element. Each one has its own advantages and disadvantages, but
I prefer `sanitize.css`.

See the [official documentation](https://github.com/10up/sanitize.css) for more
information.

## Remove `sanitize.css`

Delete the `import '../node_modules/sanitize.css/sanitize.css';` in
[`app.js`](/app/app.js#L37-L38) and remove it from the `dependencies` in
[`package.json`](/package.json)!
