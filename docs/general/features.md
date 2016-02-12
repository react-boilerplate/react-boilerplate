# Features

## Offline First

Using a `ServiceWorker` and the `Application Cache`, your application is cached for offline usage. This is done using the [`offline-plugin`](https://github.com/NekR/offline-plugin) for webpack, so all your files are included automatically. No manual intervention needed!

### Removing offline access

**Careful** about removing this, as there is no real downside to having your application available when the users network connection isn't perfect.

To remove offline capability, delete the `offline-plugin` from the [`package.json`](package.json), remove the import of the plugin in [`app.js`](app/js/app.js) and remove the plugin from the [`webpack.prod.babel.js`](webpack/webpack.prod.babel.js).

### Add To Homescreen

On Chrome for Android (soon hopefully more browsers), users can add a webpage to the homescreen. Combined with offline caching, this means your web app can be used exactly like a native application.

The name and icon to be displayed are set in the `app/manifest.json` file. Change them to your project name and icon, and try it!

#### Removing add to homescreen functionality

Delete [`manifest.json`](app/manifest.json) and remove the `<link rel="manifest" href="manifest.json">` tag from the [`index.html`](../../app/index.html).

## Performant Web Font Loading

If you simply use web fonts in your project, the page will stay blank until these fonts are downloaded. That means a lot of waiting time in which users could already read the content.

[FontFaceObserver](https://github.com/bramstein/fontfaceobserver) adds a class to the `body` when the fonts have loaded. (see [`app.js`](../../app/app.js#L29-L39) and [`App/styles.css`](../../app/containers/App/styles.css))

### Adding a new font

1. Either add the `@font-face` declaration to `App/styles.css` or add a `<link>` tag to the [`index.html`](app/index.html). (Don't forget to remove the `<link>` for Open Sans from the [`index.html`](app/index.html)!)

2. In `App/styles.css`, specify your initial `font-family` in the `body` tag with only web-save fonts. In the `body.jsFontLoaded` tag, specify your `font-family` stack with your web font.

3. In `app.js` add a `<fontName>Observer` for your font.

### Removing performant web font loading

**Careful** about removing this, as perceived performance might be highly impacted.

To remove `FontFaceObserver`, don't import it in [`app.js`](app/js/app.js) and remove it from the [`package.json`](package.json).

## Server Configuration

### Apache

This boilerplate includes a `.htaccess` file that does two things:

1. Redirect all traffic to HTTPS because ServiceWorker only works for encrypted traffic.

2. Rewrite all pages (e.g. `yourdomain.com/subpage`) to `yourdomain.com/index.html` to let `react-router` take care of presenting the correct page.
