# Can I use Sass with this boilerplate?

Yes, although we advise against it and **do not support this**.

As an alternative, consider installing a PostCSS plugin called `PreCSS`: it lets
you use familiar syntax - $variables, nesting, mixins, etc. - but still benefit
from Autoprefixer, postcss-focus, etc.

If you _really_ still want to use Sass then...

1. Change `internals/webpack/webpack.base.babel.js` so that line 22 reads
    ```JavaScript
    test: /\.s?css$/,
    ```

    This means that both `.scss` and `.css` will be picked up by the compiler

1. Update each of

    - `internals/webpack/webpack.dev.babel.js`
    - `internals/webpack/webpack.prod.babel.js`

    changing the config option for cssLoaders to

    ```JavaScript
    cssLoaders: 'style-loader!css-loader?modules&importLoaders=1&sourceMap!postcss-loader!sass-loader',
    ```

    Then run `npm i -D sass-loader`

...and you should be good to go!
