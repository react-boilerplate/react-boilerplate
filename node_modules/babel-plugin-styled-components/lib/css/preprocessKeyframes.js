'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _placeholderUtils = require('./placeholderUtils');

var _preprocessUtils = require('./preprocessUtils');

exports.default = function (cssArr, interpolationNodes) {
  return (0, _preprocessUtils.convertOutputToBabelTypes)((0, _preprocessUtils.preprocessHelper)(cssArr, interpolationNodes, function (x) {
    return `@keyframes ${_placeholderUtils.temporaryClassname} { ${x} }`;
  }, '' // no namespace
  ));
};