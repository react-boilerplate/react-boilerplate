# Frequently Asked Questions

## Why does this project exist?

The JavaScript ecosystem evolves at incredible speed: staying current can feel
overwhelming. So, instead of you having to stay on top of every new tool,
feature and technique to hit the headlines, this project aims to lighten the
load by providing a curated baseline of the most valuable ones.

Using React Boilerplate, you get to start your app with our community's current
ideas on what represents optimal developer experience, best practice, most
efficient tooling and cleanest project structure.

## Where are the files coming from when I run `$ npm start`?

Webpack compiles your application to memory and serves it from there, no data
used on your hard drive. Only when you run `$ npm run build` will it write to
your physical medium and preserve your bundled application across computer
restarts.

## Can I use Sass with this boilerplate?

Yes, although we advise against it and **do not support this**. PostCSS has a
plugin called `PreCSS` that you can install, it can do the exact same things
Sass can do. This way you can use Sass features, but still get the benefit of
Autoprefixer, postcss-focus, etc.

If you _really_ want to use Sass then

1. Change `internals/webpack/webpack.base.babel.js` so that line 22 reads
    ```JavaScript
    test: /\.s?css$/,
    ```

1. Update each of

    - `internals/webpack/webpack.dev.babel.js`
    - `internals/webpack/webpack.prod.babel.js`

    changing the config option for cssLoaders to

    ```JavaScript
    cssLoaders: 'style-loader!css-loader?modules&importLoaders=1&sourceMap!postcss-loader!sass-loader',
    ```

    Then run `npm i -D sass-loader`

...and you should be good to go!

## How do I fix `Error: listen EADDRINUSE 127.0.0.1:3000`?

This simply means that there's another process already listening on port 3000.
The fix is to kill the process and rerun `npm start`.

### OS X:

1. Find the process id (PID):
    ```Shell
    $ ps aux | grep node
    ```
    > This will return the PID as the value following your username:
    > ```Shell
    > $ janedoe    29811  49.1  2.1  3394936 356956 s004  S+    4:45pm   2:40.07 node internals/webpack/server.dev.js
    > ```

1. Then run
    ```Shell
    $ kill -9 YOUR_PID
    ```
    > e.g. given the output from the example above, `YOUR_PID` is `29811`, hence
    that would mean you would run `kill -9 29811`

### Windows

1. Find the process id (PID):
    ```Shell
    C:\> netstat -a -o -n
    ```

    > This will return a list of running processes and the ports they're
    listening on:
    > ```
    > Proto     Local Address     Foreign Address   State       PID
    > TCP       0.0.0.0:25        0.0.0.0:0         Listening   4196
    > ...
    > TCP       0.0.0.0:3000      0.0.0.0:0         Listening   28344
    ```

1. Then run
    ```Shell
    C:\> taskkill /F /PID YOUR_PID
    ```
    > e.g. given the output from the example above, `YOUR_PID` is `28344`, hence
    that would mean you would run `taskkill /F /PID 28344`

## Have another question?

Submit an [issue](https://github.com/mxstbr/react-boilerplate/issues),
hop onto the [Gitter channel](https://gitter.im/mxstbr/react-boilerplate)
or contact Max on [twitter](https://twitter.com/mxstbr)!
