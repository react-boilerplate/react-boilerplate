/**
 * Checks the possibility of using simple range generation, if number of generated pages is equal
 * or greater than total pages to show.
 *
 * @param {object} options
 * @param {number} options.boundaryRange Number of always visible pages at the beginning and end.
 * @param {number} options.siblingRange Number of always visible pages before and after the current one.
 * @param {number} options.totalPages Total number of pages.
 * @return {boolean}
 */
export var isSimplePagination = function isSimplePagination(_ref) {
  var boundaryRange = _ref.boundaryRange,
      hideEllipsis = _ref.hideEllipsis,
      siblingRange = _ref.siblingRange,
      totalPages = _ref.totalPages;
  var boundaryRangeSize = 2 * boundaryRange;
  var ellipsisSize = hideEllipsis ? 0 : 2;
  var siblingRangeSize = 2 * siblingRange;
  return 1 + ellipsisSize + siblingRangeSize + boundaryRangeSize >= totalPages;
};
export var typifyOptions = function typifyOptions(_ref2) {
  var activePage = _ref2.activePage,
      boundaryRange = _ref2.boundaryRange,
      hideEllipsis = _ref2.hideEllipsis,
      siblingRange = _ref2.siblingRange,
      totalPages = _ref2.totalPages;
  return {
    activePage: +activePage,
    boundaryRange: +boundaryRange,
    hideEllipsis: !!hideEllipsis,
    siblingRange: +siblingRange,
    totalPages: +totalPages
  };
};