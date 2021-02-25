// Important modules this config uses
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WebpackPwaManifest = require('webpack-pwa-manifest');
const { ids: { HashedModuleIdsPlugin } } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = require('./webpack.base.babel')({
  mode: 'production',

  // In production, we skip all hot-reloading stuff
  entry: [
    require.resolve('react-app-polyfill/ie11'),
    path.join(process.cwd(), 'app/app.js'),
  ],

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: true,
        },
        parallel: true,
      }),
    ],
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 10,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1];
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },

  plugins: [
    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),

    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),

    // Until PWS functionality is restored (see https://github.com/seanlangbrown/react-boilerplate-2021/issues/13) this is not needed.
    // new WebpackPwaManifest({
    //   name: 'React Boilerplate',
    //   short_name: 'React BP',
    //   description: 'My React Boilerplate-based project!',
    //   background_color: '#fafafa',
    //   theme_color: '#b1624d',
    //   inject: true,
    //   ios: true,
    //   icons: [
    //     {
    //       src: path.resolve('app/images/icon-512x512.png'),
    //       sizes: [72, 96, 128, 144, 192, 384, 512],
    //     },
    //     {
    //       src: path.resolve('app/images/icon-512x512.png'),
    //       sizes: [120, 152, 167, 180],
    //       ios: true,
    //     },
    //   ],
    // }),

    new HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),
  ],

  performance: {
    assetFilter: assetFilename =>
      !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },

  stats: {
    // Examine all modules
    // maxModules: Infinity,
    // Display bailout reasons
    optimizationBailout: true,
  }
});
