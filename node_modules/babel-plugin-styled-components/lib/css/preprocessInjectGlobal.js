'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preprocessUtils = require('./preprocessUtils');

exports.default = function (cssArr, interpolationNodes) {
  return (0, _preprocessUtils.convertOutputToBabelTypes)((0, _preprocessUtils.preprocessHelper)(cssArr, interpolationNodes, function (x) {
    return '{' + x + '}';
  }, '', // no namespace
  true // fix globals
  ));
};