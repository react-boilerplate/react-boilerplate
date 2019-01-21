/* This loader renders the template with underscore if no other loader was found */
'use strict';

const _ = require('lodash');
const loaderUtils = require('loader-utils');

module.exports = function (source) {
  if (this.cacheable) {
    this.cacheable();
  }
  const allLoadersButThisOne = this.loaders.filter(function (loader) {
    // Loader API changed from `loader.module` to `loader.normal` in Webpack 2.
    return (loader.module || loader.normal) !== module.exports;
  });
  // This loader shouldn't kick in if there is any other loader
  if (allLoadersButThisOne.length > 0) {
    return source;
  }
  // Skip .js files
  if (/\.js$/.test(this.resourcePath)) {
    return source;
  }

  // The following part renders the tempalte with lodash as aminimalistic loader
  //
  // Get templating options
  const options = this.query !== '' ? loaderUtils.parseQuery(this.query) : {};
  const template = _.template(source, _.defaults(options, { variable: 'data' }));
  // Require !!lodash - using !! will disable all loaders (e.g. babel)
  return 'var _ = require(' + loaderUtils.stringifyRequest(this, '!!' + require.resolve('lodash')) + ');' +
    'module.exports = function (templateParams) { with(templateParams) {' +
      // Execute the lodash template
      'return (' + template.source + ')();' +
    '}}';
};
