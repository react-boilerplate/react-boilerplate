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
 * A dimmable sub-component for Dimmer.
 */
function DimmerDimmable(props) {
  var blurring = props.blurring,
      className = props.className,
      children = props.children,
      content = props.content,
      dimmed = props.dimmed;
  var classes = (0, _classnames.default)((0, _lib.useKeyOnly)(blurring, 'blurring'), (0, _lib.useKeyOnly)(dimmed, 'dimmed'), 'dimmable', className);
  var rest = (0, _lib.getUnhandledProps)(DimmerDimmable, props);
  var ElementType = (0, _lib.getElementType)(DimmerDimmable, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), _lib.childrenUtils.isNil(children) ? content : children);
}

DimmerDimmable.handledProps = ["as", "blurring", "children", "className", "content", "dimmed"];
DimmerDimmable.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** A dimmable element can blur its contents. */
  blurring: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** Controls whether or not the dim is displayed. */
  dimmed: _propTypes.default.bool
} : {};
var _default = DimmerDimmable;
exports.default = _default;