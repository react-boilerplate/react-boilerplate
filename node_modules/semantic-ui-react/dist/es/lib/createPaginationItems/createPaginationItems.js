import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import { createFirstPage, createLastItem, createNextItem, createPageFactory, createPrevItem } from './itemFactories';
import { createComplexRange, createSimpleRange } from './rangeFactories';
import { isSimplePagination, typifyOptions } from './paginationUtils';
/**
 * @param {object} rawOptions
 * @param {number|string} rawOptions.activePage
 * @param {number|string} rawOptions.boundaryRange Number of always visible pages at the beginning and end.
 * @param {boolean} rawOptions.hideEllipsis Marks if ellipsis should be hidden.
 * @param {number|string} rawOptions.siblingRange Number of always visible pages before and after the current one.
 * @param {number|string} rawOptions.totalPages Total number of pages.
 */

var createPaginationItems = function createPaginationItems(rawOptions) {
  var options = typifyOptions(rawOptions);
  var activePage = options.activePage,
      totalPages = options.totalPages;
  var pageFactory = createPageFactory(activePage);
  var innerRange = isSimplePagination(options) ? createSimpleRange(1, totalPages, pageFactory) : createComplexRange(options, pageFactory);
  return [createFirstPage(), createPrevItem(activePage)].concat(_toConsumableArray(innerRange), [createNextItem(activePage, totalPages), createLastItem(totalPages)]);
};

export default createPaginationItems;