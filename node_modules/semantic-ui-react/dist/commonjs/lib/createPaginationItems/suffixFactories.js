"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInnerSuffix = exports.createInnerPrefix = void 0;

var _itemFactories = require("./itemFactories");

var createInnerPrefix = function createInnerPrefix(firstGroupEnd, innerGroupStart, pageFactory) {
  var prefixPage = innerGroupStart - 1;
  var showEllipsis = prefixPage !== firstGroupEnd + 1;
  var prefixFactory = showEllipsis ? _itemFactories.createEllipsisItem : pageFactory;
  return prefixFactory(prefixPage);
};

exports.createInnerPrefix = createInnerPrefix;

var createInnerSuffix = function createInnerSuffix(innerGroupEnd, lastGroupStart, pageFactory) {
  var suffixPage = innerGroupEnd + 1;
  var showEllipsis = suffixPage !== lastGroupStart - 1;
  var suffixFactory = showEllipsis ? _itemFactories.createEllipsisItem : pageFactory;
  return suffixFactory(suffixPage);
};

exports.createInnerSuffix = createInnerSuffix;