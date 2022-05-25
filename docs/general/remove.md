### Removing add to homescreen functionality

Delete `webpack-pwa-manifest` from the the list of plugins in
[`webpack.prod.babel.js`](../../internals/webpack/webpack.prod.babel.js).

### Removing performant web font loading

**Careful** about removing this, as perceived performance might be highly impacted.

To remove `FontFaceObserver`, don't import it in [`app.js`](../../app/app.js) and
remove it from the [`package.json`](../../package.json).

### Removing image optimization

To remove image optimization, delete the `image-webpack-loader` from the
[`package.json`](../../package.json), and remove the `image-loader` from [`webpack.base.babel.js`](../../internals/webpack/webpack.base.babel.js):

```
…
{
  test: /\.(jpg|png|gif)$/,
  loaders: [
    'file-loader',
    'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
  ],
}
…
```

Then replace it with classic `file-loader`:

```
…
{
  test: /\.(jpg|png|gif)$/,
  loader: 'file-loader',
}
…
```
