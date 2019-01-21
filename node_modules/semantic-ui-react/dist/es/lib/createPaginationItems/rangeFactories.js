import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _range from "lodash/range";
import _map from "lodash/map";
import { createInnerPrefix, createInnerSuffix } from './suffixFactories';
export var createSimpleRange = function createSimpleRange(start, end, pageFactory) {
  return _map(_range(start, end + 1), pageFactory);
};
export var createComplexRange = function createComplexRange(options, pageFactory) {
  var activePage = options.activePage,
      boundaryRange = options.boundaryRange,
      siblingRange = options.siblingRange,
      totalPages = options.totalPages;
  var firstGroupEnd = boundaryRange;
  var firstGroup = createSimpleRange(1, firstGroupEnd, pageFactory);
  var lastGroupStart = totalPages + 1 - boundaryRange;
  var lastGroup = createSimpleRange(lastGroupStart, totalPages, pageFactory);
  var innerGroupStart = Math.min(Math.max(activePage - siblingRange, firstGroupEnd + 2), lastGroupStart - 1 - 2 * siblingRange - 1);
  var innerGroupEnd = innerGroupStart + 2 * siblingRange;
  var innerGroup = createSimpleRange(innerGroupStart, innerGroupEnd, pageFactory);
  return _toConsumableArray(firstGroup).concat([createInnerPrefix(firstGroupEnd, innerGroupStart, pageFactory)], _toConsumableArray(innerGroup), [createInnerSuffix(innerGroupEnd, lastGroupStart, pageFactory)], _toConsumableArray(lastGroup)).filter(Boolean);
};