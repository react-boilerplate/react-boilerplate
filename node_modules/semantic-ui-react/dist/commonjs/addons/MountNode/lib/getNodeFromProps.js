"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _lib = require("../../../lib");

/**
 * Given `this.props`, return a `node` value or undefined.
 *
 * @param {object} props Component's props
 * @return {HTMLElement|undefined}
 */
var getNodeFromProps = function getNodeFromProps(props) {
  var node = props.node;

  if ((0, _lib.isBrowser)()) {
    if ((0, _isNil2.default)(node)) return document.body;
    return node;
  }
};

var _default = getNodeFromProps;
exports.default = _default;