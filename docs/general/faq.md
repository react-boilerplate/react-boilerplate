# Frequently Asked Questions

## Why does this exist?

The JavaScript ecosystem moves at an incredible speed, and staying up to date on best practices and new tools is time intensive. Instead of you having research the news for every project you do, I'll do it for you. I'll then package it nicely and you start your application with the best developer experience and structure possible by using react-boilerplate.

## Where are the files coming from when I run `$ npm start`?

Webpack compiles your application to memory and serves it from there, no data used on your hard drive. Only when you run `$ npm run build` will it write to your physical medium and preserve your bundled application across computer restarts.

## Can I use Sass with this boilerplate?

Of course you can do that, though I'd advise against it. PostCSS has a plugin called `PreCSS` that you can install, it can do the exact same things Sass can do. This way you can use Sass features, but still get the benefit of Autoprefix, postcss-focus, etc.

If you're really serious about not wanting to use PostCSS replace the `postcss-loader` in the webpack config files with `sass-loader` and that should be good to go! (untested and provided you don't use any PostCSS features)

## Have another question?

Submit an [issue](https://github.com/mxstbr/react-boilerplate/issues) or contact me on [twitter](https://twitter.com/mxstbr)!
