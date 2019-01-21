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

var _Icon = _interopRequireDefault(require("../../elements/Icon"));

/**
 * An event can contain an image or icon label.
 */
function FeedLabel(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      icon = props.icon,
      image = props.image;
  var classes = (0, _classnames.default)('label', className);
  var rest = (0, _lib.getUnhandledProps)(FeedLabel, props);
  var ElementType = (0, _lib.getElementType)(FeedLabel, props);

  if (!_lib.childrenUtils.isNil(children)) {
    return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: classes
    }), children);
  }

  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), content, _Icon.default.create(icon, {
    autoGenerateKey: false
  }), (0, _lib.createHTMLImage)(image));
}

FeedLabel.handledProps = ["as", "children", "className", "content", "icon", "image"];
FeedLabel.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** An event can contain icon label. */
  icon: _lib.customPropTypes.itemShorthand,

  /** An event can contain image label. */
  image: _lib.customPropTypes.itemShorthand
} : {};
var _default = FeedLabel;
exports.default = _default;