"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uniq2 = _interopRequireDefault(require("lodash/fp/uniq"));

var _identity2 = _interopRequireDefault(require("lodash/fp/identity"));

var _filter2 = _interopRequireDefault(require("lodash/fp/filter"));

var _split2 = _interopRequireDefault(require("lodash/fp/split"));

var _flatMap2 = _interopRequireDefault(require("lodash/fp/flatMap"));

var _map2 = _interopRequireDefault(require("lodash/fp/map"));

var _toArray2 = _interopRequireDefault(require("lodash/fp/toArray"));

var _flow2 = _interopRequireDefault(require("lodash/fp/flow"));

var computeClassNames = (0, _flow2.default)(_toArray2.default, (0, _map2.default)('props.className'), (0, _flatMap2.default)((0, _split2.default)(/\s+/)), (0, _filter2.default)(_identity2.default), _uniq2.default);
var _default = computeClassNames;
exports.default = _default;