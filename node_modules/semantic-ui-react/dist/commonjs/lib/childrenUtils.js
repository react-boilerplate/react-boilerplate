"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNil = exports.findByType = exports.someByType = void 0;

var _find2 = _interopRequireDefault(require("lodash/find"));

var _some2 = _interopRequireDefault(require("lodash/some"));

var _react = require("react");

/**
 * Determine if child by type exists in children.
 * @param {Object} children The children prop of a component.
 * @param {string|Function} type An html tag name string or React component.
 * @returns {Boolean}
 */
var someByType = function someByType(children, type) {
  return (0, _some2.default)(_react.Children.toArray(children), {
    type: type
  });
};
/**
 * Find child by type.
 * @param {Object} children The children prop of a component.
 * @param {string|Function} type An html tag name string or React component.
 * @returns {undefined|Object}
 */


exports.someByType = someByType;

var findByType = function findByType(children, type) {
  return (0, _find2.default)(_react.Children.toArray(children), {
    type: type
  });
};
/**
 * Tests if children are nil in React and Preact.
 * @param {Object} children The children prop of a component.
 * @returns {Boolean}
 */


exports.findByType = findByType;

var isNil = function isNil(children) {
  return children === null || children === undefined || Array.isArray(children) && children.length === 0;
};

exports.isNil = isNil;