import { createEllipsisItem } from './itemFactories';
export var createInnerPrefix = function createInnerPrefix(firstGroupEnd, innerGroupStart, pageFactory) {
  var prefixPage = innerGroupStart - 1;
  var showEllipsis = prefixPage !== firstGroupEnd + 1;
  var prefixFactory = showEllipsis ? createEllipsisItem : pageFactory;
  return prefixFactory(prefixPage);
};
export var createInnerSuffix = function createInnerSuffix(innerGroupEnd, lastGroupStart, pageFactory) {
  var suffixPage = innerGroupEnd + 1;
  var showEllipsis = suffixPage !== lastGroupStart - 1;
  var suffixFactory = showEllipsis ? createEllipsisItem : pageFactory;
  return suffixFactory(suffixPage);
};