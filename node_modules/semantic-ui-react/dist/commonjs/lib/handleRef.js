"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

/**
 * The function that correctly handles passing refs.
 *
 * @param {Function|Object} ref An ref object or function
 * @param {HTMLElement} node A node that should be passed by ref
 */
var handleRef = function handleRef(ref, node) {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof ref === 'string') {
      throw new Error(['We do not support refs as string, this is a legacy API and will be likely to be removed in', 'one of the future releases of React.'].join(' '));
    }
  }

  if (typeof ref === 'function') {
    ref(node);
    return;
  }

  if (ref !== null && (0, _typeof2.default)(ref) === 'object') {
    // The `current` property is defined as readonly, however it's a valid way because `ref` is a mutable object
    // eslint-disable-next-line no-param-reassign
    ref.current = node;
  }
};

var _default = handleRef;
exports.default = _default;