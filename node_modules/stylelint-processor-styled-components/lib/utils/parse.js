'use strict';

/**
 * Parsing helpers
 */

var parseImports = function parseImports(node, currentNames) {
  var names = Object.assign({}, currentNames);
  var imports = node.specifiers.filter(function (specifier) {
    return specifier.type === 'ImportDefaultSpecifier' || specifier.type === 'ImportSpecifier';
  });

  imports.forEach(function (singleImport) {
    if (singleImport.imported) {
      // Is helper method
      names[singleImport.imported.name] = singleImport.local.name;
    } else {
      // Is default import
      names.default = singleImport.local.name;
    }
  });

  return names;
};

var getSourceMap = function getSourceMap(fullCSS, fragmentCSS, startInSource) {
  var correction = {};
  // Save which line in the full CSS is which line in the source
  var fullCSSLength = fullCSS.split(/\n/).length;
  var currentCSSLength = fragmentCSS.split(/\n/).length;
  var currentCSSStart = fullCSSLength - currentCSSLength + 1;
  // eslint-disable-next-line no-plusplus
  for (var i = 0; i < currentCSSLength + 1; i++) {
    correction[currentCSSStart + i] = startInSource + i;
  }
  return correction;
};

exports.parseImports = parseImports;
exports.getSourceMap = getSourceMap;