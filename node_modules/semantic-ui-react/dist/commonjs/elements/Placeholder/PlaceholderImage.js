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
 * A placeholder can contain an image.
 */
function PlaceholderImage(props) {
  var className = props.className,
      square = props.square,
      rectangular = props.rectangular;
  var classes = (0, _classnames.default)((0, _lib.useKeyOnly)(square, 'square'), (0, _lib.useKeyOnly)(rectangular, 'rectangular'), 'image', className);
  var rest = (0, _lib.getUnhandledProps)(PlaceholderImage, props);
  var ElementType = (0, _lib.getElementType)(PlaceholderImage, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }));
}

PlaceholderImage.handledProps = ["as", "className", "rectangular", "square"];
PlaceholderImage.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** An image can modify size correctly with responsive styles. */
  square: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['rectangular']), _propTypes.default.bool]),

  /** An image can modify size correctly with responsive styles. */
  rectangular: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['square']), _propTypes.default.bool])
} : {};
var _default = PlaceholderImage;
exports.default = _default;