# Gotchas

These are some things to be aware of when using this boilerplate.

1. [Special images in HTML files](#special-images-in-html-files)
2. [Load reducers optimistically](#load-reducers-optimistically)
3. [Exclude modules from Babel processing](#exclude-modules-from-babel-processing)
4. [Running tests in watch mode](#running-tests-in-watch-mode)
5. [When in doubt, re-install!](#when-in-doubt-re-install)
6. [Cleaning up Jest cache](#cleaning-up-jest-cache)
7. [Using short_name in manifest.json](#using-short-name-in-manifest)

## Special images in HTML files

If you specify your images in the `.html` files using the `<img>` tag, everything
will work fine. The problem comes up if you try to include images using anything
except that tag, like meta tags:

```HTML
<meta property="og:image" content="img/yourimg.png" />
```

The webpack `html-loader` does not recognise this as an image file and will not
transfer the image to the build folder. To get webpack to transfer them, you
have to import them with the file loader in your JavaScript somewhere, e.g.:

```JavaScript
import 'file?name=[name].[ext]!../img/yourimg.png';
```

Then webpack will correctly transfer the image to the build folder.
