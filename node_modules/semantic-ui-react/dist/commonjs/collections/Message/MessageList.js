"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _MessageItem = _interopRequireDefault(require("./MessageItem"));

/**
 * A message can contain a list of items.
 */
function MessageList(props) {
  var children = props.children,
      className = props.className,
      items = props.items;
  var classes = (0, _classnames.default)('list', className);
  var rest = (0, _lib.getUnhandledProps)(MessageList, props);
  var ElementType = (0, _lib.getElementType)(MessageList, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), _lib.childrenUtils.isNil(children) ? (0, _map2.default)(items, _MessageItem.default.create) : children);
}

MessageList.handledProps = ["as", "children", "className", "items"];
MessageList.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand Message.Items. */
  items: _lib.customPropTypes.collectionShorthand
} : {};
MessageList.defaultProps = {
  as: 'ul'
};
MessageList.create = (0, _lib.createShorthandFactory)(MessageList, function (val) {
  return {
    items: val
  };
});
var _default = MessageList;
exports.default = _default;