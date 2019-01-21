"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _itemFactories = require("./itemFactories");

var _rangeFactories = require("./rangeFactories");

var _paginationUtils = require("./paginationUtils");

/**
 * @param {object} rawOptions
 * @param {number|string} rawOptions.activePage
 * @param {number|string} rawOptions.boundaryRange Number of always visible pages at the beginning and end.
 * @param {boolean} rawOptions.hideEllipsis Marks if ellipsis should be hidden.
 * @param {number|string} rawOptions.siblingRange Number of always visible pages before and after the current one.
 * @param {number|string} rawOptions.totalPages Total number of pages.
 */
var createPaginationItems = function createPaginationItems(rawOptions) {
  var options = (0, _paginationUtils.typifyOptions)(rawOptions);
  var activePage = options.activePage,
      totalPages = options.totalPages;
  var pageFactory = (0, _itemFactories.createPageFactory)(activePage);
  var innerRange = (0, _paginationUtils.isSimplePagination)(options) ? (0, _rangeFactories.createSimpleRange)(1, totalPages, pageFactory) : (0, _rangeFactories.createComplexRange)(options, pageFactory);
  return [(0, _itemFactories.createFirstPage)(), (0, _itemFactories.createPrevItem)(activePage)].concat((0, _toConsumableArray2.default)(innerRange), [(0, _itemFactories.createNextItem)(activePage, totalPages), (0, _itemFactories.createLastItem)(totalPages)]);
};

var _default = createPaginationItems;
exports.default = _default;