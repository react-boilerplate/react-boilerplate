/**
 * @param {number} pageNumber
 * @return {Object}
 */
export var createEllipsisItem = function createEllipsisItem(pageNumber) {
  return {
    active: false,
    type: 'ellipsisItem',
    value: pageNumber
  };
};
/**
 * @return {Object}
 */

export var createFirstPage = function createFirstPage() {
  return {
    active: false,
    type: 'firstItem',
    value: 1
  };
};
/**
 * @param {number} activePage
 * @return {Object}
 */

export var createPrevItem = function createPrevItem(activePage) {
  return {
    active: false,
    type: 'prevItem',
    value: Math.max(1, activePage - 1)
  };
};
/**
 * @param {number} activePage
 * @return {function}
 */

export var createPageFactory = function createPageFactory(activePage) {
  return function (pageNumber) {
    return {
      active: activePage === pageNumber,
      type: 'pageItem',
      value: pageNumber
    };
  };
};
/**
 * @param {number} activePage
 * @param {number} totalPages
 * @return {Object}
 */

export var createNextItem = function createNextItem(activePage, totalPages) {
  return {
    active: false,
    type: 'nextItem',
    value: Math.min(activePage + 1, totalPages)
  };
};
/**
 * @param {number} totalPages
 * @return {Object}
 */

export var createLastItem = function createLastItem(totalPages) {
  return {
    active: false,
    type: 'lastItem',
    value: totalPages
  };
};