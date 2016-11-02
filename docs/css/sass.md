# Can I use Sass with this boilerplate?

Yes, although we advise against it and **do not support this**. We selected
[`styled-components`](https://github.com/styled-components/styled-components)
over Sass because its approach is more powerful: instead of trying to
give a styling language programmatic abilities, it pulls logic and configuration
out into JS where we believe those features belong.

If you _really_ still want (or need) to use Sass then...

1. You will need to add a [sass-loader](https://github.com/jtangelder/sass-loader)
to the loaders section in `internals/webpack/webpack.base.babel.js` so it reads something like
   ```javascript
   {
      test: /\.scss$/,
      exclude: /node_modules/,
      loaders: ['style', 'css', 'sass']
    }
    ```

    Then run `npm i -D sass-loader node-sass`

...and you should be good to go!
