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
 * A message list can contain an item.
 */
function MessageItem(props) {
  var children = props.children,
      className = props.className,
      content = props.content;
  var classes = (0, _classnames.default)('content', className);
  var rest = (0, _lib.getUnhandledProps)(MessageItem, props);
  var ElementType = (0, _lib.getElementType)(MessageItem, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), _lib.childrenUtils.isNil(children) ? content : children);
}

MessageItem.handledProps = ["as", "children", "className", "content"];
MessageItem.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand
} : {};
MessageItem.defaultProps = {
  as: 'li'
};
MessageItem.create = (0, _lib.createShorthandFactory)(MessageItem, function (content) {
  return {
    content: content
  };
});
var _default = MessageItem;
exports.default = _default;