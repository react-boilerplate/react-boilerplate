"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

var _has2 = _interopRequireDefault(require("lodash/has"));

var _transform2 = _interopRequireDefault(require("lodash/transform"));

/**
 * Naive and inefficient object difference, intended for development / debugging use only.
 * Deleted keys are shown as [DELETED].
 * @param {{}} source The source object
 * @param {{}} target The target object.
 * @returns {{}} A new object containing new/modified/deleted keys.
 * @example
 * import { objectDiff } from 'src/lib'
 *
 * const a = { key: 'val', foo: 'bar' }
 * const b = { key: 'val', foo: 'baz' }
 *
 * objectDiff(a, b)
 * //=> { foo: 'baz' }
 */
var _default = function _default(source, target) {
  return (0, _transform2.default)(source, function (res, val, key) {
    // deleted keys
    if (!(0, _has2.default)(target, key)) res[key] = '[DELETED]'; // new keys / changed values
    // Note, we tolerate isEqual here as this is a dev only utility and not included in production code
    else if (!(0, _isEqual2.default)(val, target[key])) res[key] = target[key];
  }, {});
};

exports.default = _default;