"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _computeClassNames = _interopRequireDefault(require("./computeClassNames"));

var _computeClassNamesDifference = _interopRequireDefault(require("./computeClassNamesDifference"));

var prevClassNames = new Map();

var handleClassNamesChange = function handleClassNamesChange(node, components) {
  var currentClassNames = (0, _computeClassNames.default)(components);

  var _computeClassNamesDif = (0, _computeClassNamesDifference.default)(prevClassNames.get(node), currentClassNames),
      _computeClassNamesDif2 = (0, _slicedToArray2.default)(_computeClassNamesDif, 2),
      forAdd = _computeClassNamesDif2[0],
      forRemoval = _computeClassNamesDif2[1];

  (0, _forEach2.default)(forAdd, function (className) {
    return node.classList.add(className);
  });
  (0, _forEach2.default)(forRemoval, function (className) {
    return node.classList.remove(className);
  });
  prevClassNames.set(node, currentClassNames);
};

var _default = handleClassNamesChange;
exports.default = _default;