/**
 * WEBPACK DLL GENERATOR
 *
 * This profile is used to cache webpack's module
 * contexts for external library and framework type
 * dependencies which will usually not change often enough
 * to warrant building them from scratch every time we use
 * the webpack process.
 *
 * It makes sense to run this after npm install
 * or dependency changes.
 */

const { assign, keys } = Object;
const { resolve } = require('path');
const pkg = require(resolve(process.cwd(), 'package.json'));

if (!pkg.dllPlugin) {
  throw new Error('Usage of the Webpack DLL plugin depends on a dllPlugin key being present in your package.json');
}

const pullAll = require('lodash/pullAll');
const uniq = require('lodash/uniq');
const defaults = require('lodash/defaultsDeep');
const webpack = require('webpack');

const devConfig = require('./webpack.dev.babel.js');
const outputPath = resolve(process.cwd(), 'app/dlls');

/**
 * @todo discuss best configuration UI
 */
const dllPlugin = defaults(pkg.dllPlugin, {
  /**
   * By default the boilerplate dependencies will be
   * bundled as a DLL. However as the app grows and
   * dependencies change, there will need to be a way
   * for the user to have more control over the contents.
   */
  dlls: 'package.json',

  /**
   * Not all dependencies can be bundled
  */
  exclude: [
    'express',
    'chalk',
    'compression',
    'file-loader',
    'sanitize.css',
  ],

  /**
   * Some additional dependencies which aren't
   * in the production dependencies need to be bundled.
   */
  include: [
    'babel-polyfill',
    'eventsource-polyfill',
    'core-js',
  ],
});

if (dllPlugin.dlls !== 'package.json' && typeof dllPlugin.dlls !== 'object') {
  throw new Error('The Webpack DLL Plugin configuration in your package.json must contain a dlls property.');
}

const dependencyNames = keys(pkg.dependencies);
/**
 * Includes the package.json dependencies plus the module names
 * listed in the include / exclude list.
 */
const entry = dllPlugin.dlls === 'package.json' ?
  pullAll(uniq(dependencyNames.concat(dllPlugin.include)), dllPlugin.exclude) :
  dllPlugin.dlls;

module.exports = {
  context: process.cwd(),
  entry,
  devtool: 'eval',
  output: {
    filename: 'react-boilerplate-dependencies.js',
    library: 'main',
    path: outputPath,
  },
  plugins: [
    new webpack.DllPlugin({ name: '[name]', path: resolve(outputPath, 'react-boilerplate-dependencies-manifest.json') }), // eslint-disable-line no-new
  ],
};
