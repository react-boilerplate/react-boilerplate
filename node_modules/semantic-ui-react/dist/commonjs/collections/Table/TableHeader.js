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

/**
 * A table can have a header.
 */
function TableHeader(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      fullWidth = props.fullWidth;
  var classes = (0, _classnames.default)((0, _lib.useKeyOnly)(fullWidth, 'full-width'), className);
  var rest = (0, _lib.getUnhandledProps)(TableHeader, props);
  var ElementType = (0, _lib.getElementType)(TableHeader, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), _lib.childrenUtils.isNil(children) ? content : children);
}

TableHeader.handledProps = ["as", "children", "className", "content", "fullWidth"];
TableHeader.defaultProps = {
  as: 'thead'
};
TableHeader.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** A definition table can have a full width header or footer, filling in the gap left by the first column. */
  fullWidth: _propTypes.default.bool
} : {};
var _default = TableHeader;
exports.default = _default;