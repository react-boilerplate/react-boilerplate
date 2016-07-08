const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const entry = {
  server: path.join(process.cwd(), 'server', 'index.js'),
};

/* eslint-disable */
const nodeModuleNames = () => (
  fs.readdirSync(path.join(process.cwd(), 'node_modules'))
    .filter((i) => i !== '.bin')
    .reduce((memo, item) => {
      memo[item] = `commonjs ${item}`;
      return memo;
    }, {})
);

/* eslint-enable */
module.exports = {
  entry,
  target: 'node',
  devtool: 'sourcemap',
  debug: true,
  output: {
    path: path.join(process.cwd(), 'lib'),
    filename: 'server.js',
  },
  externals: {
    ...nodeModuleNames(),
  },
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less|jpg|png|gif|mp4|webm|html|eot|svg|ttf|woff|woff2)$/),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
    new webpack.HotModuleReplacementPlugin({ quiet: true }),
  ],
  node: {
    __dirname: true,
    __filename: true,
    process: true,
  },
  resolve: {
    modules: ['app', 'node_modules'],
    extensions: [
      '',
      '.js',
      '.jsx',
      '.react.js',
    ],
    packageMains: [
      'jsnext:main',
      'main',
    ],
  },
  module: {
    loaders: [{
      test: /\.js$/, // Transform all .js files required somewhere with Babel
      loader: 'babel',
      exclude: /node_modules/,
      query: { presets: ['react-hmre'] },
    }, {
      test: /\.json$/,
      loader: 'json',
    }],
  },
};
