# Gotchas

These are some things to be aware of when using this boilerplate.

## Special images in HTML files

If you specify your images in the `.html` files using the `<img>` tag, everything will work fine. The problem comes up if you try to include images using anything except that tag, like meta tags:

```HTML
<!-- Meta tags -->
<meta property="og:image" content="img/yourimg.png" />
<!-- ... -->
```

If you simply do this, webpack will not transfer the image to the build folder. To get webpack to transfer them, you have to import them with the file loader in your JavaScript somewhere, e.g.:

```JavaScript
import 'file?name=[name].[ext]!../img/yourimg.png';
```

Then webpack will correctly transfer the image to the build folder.
