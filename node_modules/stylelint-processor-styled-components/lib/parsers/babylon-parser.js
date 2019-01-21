'use strict';

var babylon = require('babylon');

module.exports = function (type) {
  return function (input) {
    return babylon.parse(input, {
      sourceType: 'module',
      plugins: ['jsx', type, 'objectRestSpread', 'decorators', 'classProperties', 'exportExtensions', 'asyncGenerators', 'functionBind', 'functionSent', 'dynamicImport', 'optionalCatchBinding']
    });
  };
};