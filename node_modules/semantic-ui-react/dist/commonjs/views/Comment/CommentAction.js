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
 * A comment can contain an action.
 */
function CommentAction(props) {
  var active = props.active,
      className = props.className,
      children = props.children,
      content = props.content;
  var classes = (0, _classnames.default)((0, _lib.useKeyOnly)(active, 'active'), className);
  var rest = (0, _lib.getUnhandledProps)(CommentAction, props);
  var ElementType = (0, _lib.getElementType)(CommentAction, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), _lib.childrenUtils.isNil(children) ? content : children);
}

CommentAction.handledProps = ["active", "as", "children", "className", "content"];
CommentAction.defaultProps = {
  as: 'a'
};
CommentAction.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Style as the currently active action. */
  active: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand
} : {};
var _default = CommentAction;
exports.default = _default;