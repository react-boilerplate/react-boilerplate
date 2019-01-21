"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createComplexRange = exports.createSimpleRange = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _range2 = _interopRequireDefault(require("lodash/range"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _suffixFactories = require("./suffixFactories");

var createSimpleRange = function createSimpleRange(start, end, pageFactory) {
  return (0, _map2.default)((0, _range2.default)(start, end + 1), pageFactory);
};

exports.createSimpleRange = createSimpleRange;

var createComplexRange = function createComplexRange(options, pageFactory) {
  var activePage = options.activePage,
      boundaryRange = options.boundaryRange,
      hideEllipsis = options.hideEllipsis,
      siblingRange = options.siblingRange,
      totalPages = options.totalPages;
  var ellipsisSize = hideEllipsis ? 0 : 1;
  var firstGroupEnd = boundaryRange;
  var firstGroup = createSimpleRange(1, firstGroupEnd, pageFactory);
  var lastGroupStart = totalPages + 1 - boundaryRange;
  var lastGroup = createSimpleRange(lastGroupStart, totalPages, pageFactory);
  var innerGroupStart = Math.min(Math.max(activePage - siblingRange, firstGroupEnd + ellipsisSize + 1), lastGroupStart - ellipsisSize - 2 * siblingRange - 1);
  var innerGroupEnd = innerGroupStart + 2 * siblingRange;
  var innerGroup = createSimpleRange(innerGroupStart, innerGroupEnd, pageFactory);
  return (0, _toConsumableArray2.default)(firstGroup).concat([!hideEllipsis && (0, _suffixFactories.createInnerPrefix)(firstGroupEnd, innerGroupStart, pageFactory)], (0, _toConsumableArray2.default)(innerGroup), [!hideEllipsis && (0, _suffixFactories.createInnerSuffix)(innerGroupEnd, lastGroupStart, pageFactory)], (0, _toConsumableArray2.default)(lastGroup)).filter(Boolean);
};

exports.createComplexRange = createComplexRange;