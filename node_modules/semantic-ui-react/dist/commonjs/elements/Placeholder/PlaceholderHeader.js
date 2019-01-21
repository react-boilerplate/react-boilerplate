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
 * A placeholder can contain a header.
 */
function PlaceholderHeader(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      image = props.image;
  var classes = (0, _classnames.default)((0, _lib.useKeyOnly)(image, 'image'), 'header', className);
  var rest = (0, _lib.getUnhandledProps)(PlaceholderHeader, props);
  var ElementType = (0, _lib.getElementType)(PlaceholderHeader, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), _lib.childrenUtils.isNil(children) ? content : children);
}

PlaceholderHeader.handledProps = ["as", "children", "className", "content", "image"];
PlaceholderHeader.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** A placeholder can contain an image. */
  image: _propTypes.default.bool
} : {};
var _default = PlaceholderHeader;
exports.default = _default;