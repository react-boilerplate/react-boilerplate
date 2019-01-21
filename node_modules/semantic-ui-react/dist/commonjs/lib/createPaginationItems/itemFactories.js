"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLastItem = exports.createNextItem = exports.createPageFactory = exports.createPrevItem = exports.createFirstPage = exports.createEllipsisItem = void 0;

/**
 * @param {number} pageNumber
 * @return {Object}
 */
var createEllipsisItem = function createEllipsisItem(pageNumber) {
  return {
    active: false,
    type: 'ellipsisItem',
    value: pageNumber
  };
};
/**
 * @return {Object}
 */


exports.createEllipsisItem = createEllipsisItem;

var createFirstPage = function createFirstPage() {
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


exports.createFirstPage = createFirstPage;

var createPrevItem = function createPrevItem(activePage) {
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


exports.createPrevItem = createPrevItem;

var createPageFactory = function createPageFactory(activePage) {
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


exports.createPageFactory = createPageFactory;

var createNextItem = function createNextItem(activePage, totalPages) {
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


exports.createNextItem = createNextItem;

var createLastItem = function createLastItem(totalPages) {
  return {
    active: false,
    type: 'lastItem',
    value: totalPages
  };
};

exports.createLastItem = createLastItem;