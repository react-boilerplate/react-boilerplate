
# webpack-pwa-manifest

> [_Click here and take a look at my latest project: **Organi**ser_](https://github.com/fatec-taquaritinga/organiser)

`webpack-pwa-manifest` is a webpack plugin that generates a 'manifest.json' for your Progressive Web Application, with auto icon resizing and fingerprinting support.

If you are using `inject` on your configuration, ensure that [`HtmlWebpackPlugin`](https://github.com/jantimon/html-webpack-plugin) appears *before* `WebpackPwaManifest` in the `plugins` array!

# features

 ✔ Auto icon resizing

 ✔ Icon fingerprinting

 ✔ Manifest fingerprinting

 ✔ Auto manifest injection on HTML

 ✔ Hot Reload support

 ✔ ES6+ ready

# install
```javascript
npm install --save-dev webpack-pwa-manifest
```

# usage
In your `webpack.config.js`:
```javascript
// ES6+
import WebpackPwaManifest from 'webpack-pwa-manifest'

// ES5
var WebpackPwaManifest = require('webpack-pwa-manifest')

...

plugins: [
  new WebpackPwaManifest({
    name: 'My Progressive Web App',
    short_name: 'MyPWA',
    description: 'My awesome Progressive Web App!',
    background_color: '#ffffff',
    icons: [
      {
        src: path.resolve('src/assets/icon.png'),
        sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
      },
      {
        src: path.resolve('src/assets/large-icon.png'),
        size: '1024x1024' // you can also use the specifications pattern
      }
    ]
  })
]
```

# output

`manifest.<fingerprint>.json`
```json
{
  "name": "My Progressive Web App",
  "orientation": "portrait",
  "display": "standalone",
  "start_url": ".",
  "short_name": "MyPWA",
  "description": "My awesome Progressive Web App!",
  "background_color": "#ffffff",
  "icons": [
    {
      "src": "icon_1024x1024.<fingerprint>.png",
      "sizes": "1024x1024",
      "type": "image/png"
    },
    {
      "src": "icon_512x512.<fingerprint>.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "icon_384x384.<fingerprint>.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "icon_256x256.<fingerprint>.png",
      "sizes": "256x256",
      "type": "image/png"
    },
    {
      "src": "icon_192x192.<fingerprint>.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon_128x128.<fingerprint>.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "icon_96x96.<fingerprint>.png",
      "sizes": "96x96",
      "type": "image/png"
    }
  ]
}
```

# API

### WebpackPwaManifest([options])

**options**

Type: `object`

You can follow the [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) [specification](https://w3c.github.io/manifest/).

The difference here is that, when defining icons, you can specify one icon with multiple sizes, using an array of integers, just as the example above.

You can also change the output's filename with the `filename` property.

Presets of `options`:

```javascript
{
  filename: "manifest.json",
  name: "App",
  orientation: "portrait",
  display: "standalone",
  start_url: ".",
  inject: true,
  fingerprints: true,
  ios: false,
  publicPath: null,
  includeDirectory: true
}
```

By default, HTML injection and fingerprint generation are on.
With `inject: false` and `fingerprints: false`, respectively, you can turn them off.

If `inject: true` and `'theme-color'` property is not defined, it wil try to use `theme_color` as default. Otherwise, no `theme-color` meta tag will be injected.

With `includeDirectory: true`, we will use `filename`'s directory to export the manifest file.

When `inject: true` and `ios: true`, specific Apple meta tags will be injected to the HTML code when possible, as requested at [issue #13](https://github.com/arthurbergmz/webpack-pwa-manifest/issues/13). You can see Apple's [Configuring Web Application](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html) for more information. Instead of using a boolean value, you can also use an object to specify certain link or meta tag, for instance:

```javascript
  ...
  ios: {
    'apple-mobile-web-app-title': 'AppTitle',
    'apple-mobile-web-app-status-bar-style': 'black'
  }
```

If `publicPath` option is not given, this plugin fallbacks to [Webpack's public path](https://webpack.js.org/configuration/output/#output-publicpath) definition.

When defining an icon object, you can also specify its output directory using a property called `destination`. Using `ios: true` in an icon object makes it eligible to the `apple-touch-icon` meta tag injection. Using `ios: 'startup'` in an icon object makes it eligible to the `apple-touch-startup-image` meta tag injection.

```javascript
  ...
  icons: [
    {
      src: path.resolve('src/assets/icons/ios-icon.png'),
      sizes: [120, 152, 167, 180, 1024],
      destination: path.join('icons', 'ios'),
      ios: true
    },
    {
      src: path.resolve('src/assets/icons/ios-icon.png'),
      size: 1024,
      destination: path.join('icons', 'ios'),
      ios: 'startup'
    },
    {
      src: path.resolve('src/assets/icons/android-icon.png'),
      sizes: [36, 48, 72, 96, 144, 192, 512],
      destination: path.join('icons', 'android')
    }
  ]
}
```
