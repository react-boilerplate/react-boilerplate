"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _without2 = _interopRequireDefault(require("lodash/without"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

/**
 * Comments can be grouped.
 */
function CommentGroup(props) {
  var className = props.className,
      children = props.children,
      collapsed = props.collapsed,
      content = props.content,
      minimal = props.minimal,
      size = props.size,
      threaded = props.threaded;
  var classes = (0, _classnames.default)('ui', size, (0, _lib.useKeyOnly)(collapsed, 'collapsed'), (0, _lib.useKeyOnly)(minimal, 'minimal'), (0, _lib.useKeyOnly)(threaded, 'threaded'), 'comments', className);
  var rest = (0, _lib.getUnhandledProps)(CommentGroup, props);
  var ElementType = (0, _lib.getElementType)(CommentGroup, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), _lib.childrenUtils.isNil(children) ? content : children);
}

CommentGroup.handledProps = ["as", "children", "className", "collapsed", "content", "minimal", "size", "threaded"];
CommentGroup.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Comments can be collapsed, or hidden from view. */
  collapsed: _propTypes.default.bool,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** Comments can hide extra information unless a user shows intent to interact with a comment. */
  minimal: _propTypes.default.bool,

  /** Comments can have different sizes. */
  size: _propTypes.default.oneOf((0, _without2.default)(_lib.SUI.SIZES, 'medium')),

  /** A comment list can be threaded to showing the relationship between conversations. */
  threaded: _propTypes.default.bool
} : {};
var _default = CommentGroup;
exports.default = _default;