"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

function TableBody(props) {
  var children = props.children,
      className = props.className;
  var classes = (0, _classnames.default)(className);
  var rest = (0, _lib.getUnhandledProps)(TableBody, props);
  var ElementType = (0, _lib.getElementType)(TableBody, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), children);
}

TableBody.handledProps = ["as", "children", "className"];
TableBody.defaultProps = {
  as: 'tbody'
};
TableBody.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string
} : {};
var _default = TableBody;
exports.default = _default;