/**
 * WEBPACK DLL GENERATOR
 *
 * This profile is used to cache webpack's module
 * contexts for external library and framework type
 * dependencies which will usually not change often enough
 * to warrant building them from scratch every time we use
 * the webpack process.
 */

const { keys } = Object;
const { resolve } = require('path');
const pkg = require(resolve(process.cwd(), 'package.json'));

if (!pkg.dllPlugin) {
  throw new Error('Usage of the Webpack DLL plugin depends on a dllPlugin key being present in your package.json');
}

const pullAll = require('lodash/pullAll');
const uniq = require('lodash/uniq');
const defaults = require('lodash/defaultsDeep');
const webpack = require('webpack');

const outputPath = resolve(process.cwd(), 'app/dlls');

/**
 * @todo discuss best configuration UI
 */
const dllPlugin = defaults(pkg.dllPlugin, {
  /**
   * Not all dependencies can be bundled
  */
  exclude: [
    'express',
    'chalk',
    'compression',
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

if (dllPlugin.dlls && typeof dllPlugin.dlls !== 'object') {
  throw new Error('The Webpack DLL Plugin configuration in your package.json must contain a dlls property.');
}

const dependencyNames = keys(pkg.dependencies);
/**
 * Includes the package.json dependencies plus the module names
 * listed in the include / exclude list.
 */
const entry = typeof dllPlugin.dlls === 'undefined' ?
  { reactBoilerplateDeps: pullAll(uniq(dependencyNames.concat(dllPlugin.include)), dllPlugin.exclude) } :
  dllPlugin.dlls;

module.exports = {
  context: process.cwd(),
  entry,
  devtool: 'eval',
  output: {
    filename: '[name].js',
    path: outputPath,
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({ name: '[name]', path: resolve(outputPath, '[name].json') }), // eslint-disable-line no-new
  ],
};
