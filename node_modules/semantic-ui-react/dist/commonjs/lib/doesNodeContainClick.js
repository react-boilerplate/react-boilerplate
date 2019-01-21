"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _inRange2 = _interopRequireDefault(require("lodash/inRange"));

var _first3 = _interopRequireDefault(require("lodash/first"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _some2 = _interopRequireDefault(require("lodash/some"));

/**
 * Determines if a click's coordinates are within the bounds of a node.
 *
 * @see https://github.com/Semantic-Org/Semantic-UI-React/pull/2384
 *
 * @param {object} node - A DOM node.
 * @param {object} e - A SyntheticEvent or DOM Event.
 * @returns {boolean}
 */
var doesNodeContainClick = function doesNodeContainClick(node, e) {
  if ((0, _some2.default)([e, node], _isNil2.default)) return false; // if there is an e.target and it is in the document, use a simple node.contains() check

  if (e.target) {
    (0, _invoke2.default)(e.target, 'setAttribute', 'data-suir-click-target', true);

    if (document.querySelector('[data-suir-click-target=true]')) {
      (0, _invoke2.default)(e.target, 'removeAttribute', 'data-suir-click-target');
      return node.contains(e.target);
    }
  } // Below logic handles cases where the e.target is no longer in the document.
  // The result of the click likely has removed the e.target node.
  // Instead of node.contains(), we'll identify the click by X/Y position.
  // return early if the event properties aren't available
  // prevent measuring the node and repainting if we don't need to


  var clientX = e.clientX,
      clientY = e.clientY;
  if ((0, _some2.default)([clientX, clientY], _isNil2.default)) return false; // false if the node is not visible

  var clientRects = node.getClientRects(); // Heads Up!
  // getClientRects returns a DOMRectList, not an array nor a plain object
  // We explicitly avoid _.isEmpty and check .length to cover all possible shapes

  if (!node.offsetWidth || !node.offsetHeight || !clientRects || !clientRects.length) return false; // false if the node doesn't have a valid bounding rect

  var _first2 = (0, _first3.default)(clientRects),
      top = _first2.top,
      bottom = _first2.bottom,
      left = _first2.left,
      right = _first2.right;

  if ((0, _some2.default)([top, bottom, left, right], _isNil2.default)) return false; // we add a small decimal to the upper bound just to make it inclusive
  // don't add an whole pixel (1) as the event/node values may be decimal sensitive

  return (0, _inRange2.default)(clientY, top, bottom + 0.001) && (0, _inRange2.default)(clientX, left, right + 0.001);
};

var _default = doesNodeContainClick;
exports.default = _default;