'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = ['fonts-css'].reduce(function (result, loader) {
  var mod = require('./' + loader);
  result[loader] = mod['default'] || mod;
}, {});
module.exports = exports['default'];