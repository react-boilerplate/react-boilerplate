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
 * A modal can contain content.
 */
function ModalContent(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      image = props.image,
      scrolling = props.scrolling;
  var classes = (0, _classnames.default)(className, (0, _lib.useKeyOnly)(image, 'image'), (0, _lib.useKeyOnly)(scrolling, 'scrolling'), 'content');
  var rest = (0, _lib.getUnhandledProps)(ModalContent, props);
  var ElementType = (0, _lib.getElementType)(ModalContent, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), _lib.childrenUtils.isNil(children) ? content : children);
}

ModalContent.handledProps = ["as", "children", "className", "content", "image", "scrolling"];
ModalContent.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** A modal can contain image content. */
  image: _propTypes.default.bool,

  /** A modal can use the entire size of the screen. */
  scrolling: _propTypes.default.bool
} : {};
ModalContent.create = (0, _lib.createShorthandFactory)(ModalContent, function (content) {
  return {
    content: content
  };
});
var _default = ModalContent;
exports.default = _default;