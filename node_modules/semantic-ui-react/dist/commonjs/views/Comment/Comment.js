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

var _CommentAction = _interopRequireDefault(require("./CommentAction"));

var _CommentActions = _interopRequireDefault(require("./CommentActions"));

var _CommentAuthor = _interopRequireDefault(require("./CommentAuthor"));

var _CommentAvatar = _interopRequireDefault(require("./CommentAvatar"));

var _CommentContent = _interopRequireDefault(require("./CommentContent"));

var _CommentGroup = _interopRequireDefault(require("./CommentGroup"));

var _CommentMetadata = _interopRequireDefault(require("./CommentMetadata"));

var _CommentText = _interopRequireDefault(require("./CommentText"));

/**
 * A comment displays user feedback to site content.
 */
function Comment(props) {
  var className = props.className,
      children = props.children,
      collapsed = props.collapsed,
      content = props.content;
  var classes = (0, _classnames.default)((0, _lib.useKeyOnly)(collapsed, 'collapsed'), 'comment', className);
  var rest = (0, _lib.getUnhandledProps)(Comment, props);
  var ElementType = (0, _lib.getElementType)(Comment, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), _lib.childrenUtils.isNil(children) ? content : children);
}

Comment.handledProps = ["as", "children", "className", "collapsed", "content"];
Comment.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Comment can be collapsed, or hidden from view. */
  collapsed: _propTypes.default.bool,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand
} : {};
Comment.Author = _CommentAuthor.default;
Comment.Action = _CommentAction.default;
Comment.Actions = _CommentActions.default;
Comment.Avatar = _CommentAvatar.default;
Comment.Content = _CommentContent.default;
Comment.Group = _CommentGroup.default;
Comment.Metadata = _CommentMetadata.default;
Comment.Text = _CommentText.default;
var _default = Comment;
exports.default = _default;