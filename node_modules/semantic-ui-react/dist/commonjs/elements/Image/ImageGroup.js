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
 * A group of images.
 */
function ImageGroup(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      size = props.size;
  var classes = (0, _classnames.default)('ui', size, className, 'images');
  var rest = (0, _lib.getUnhandledProps)(ImageGroup, props);
  var ElementType = (0, _lib.getElementType)(ImageGroup, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), _lib.childrenUtils.isNil(children) ? content : children);
}

ImageGroup.handledProps = ["as", "children", "className", "content", "size"];
ImageGroup.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** A group of images can be formatted to have the same size. */
  size: _propTypes.default.oneOf(_lib.SUI.SIZES)
} : {};
var _default = ImageGroup;
exports.default = _default;