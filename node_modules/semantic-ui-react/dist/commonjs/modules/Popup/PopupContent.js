"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PopupContent;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

/**
 * A PopupContent displays the content body of a Popover.
 */
function PopupContent(props) {
  var children = props.children,
      className = props.className,
      content = props.content;
  var classes = (0, _classnames.default)('content', className);
  var rest = (0, _lib.getUnhandledProps)(PopupContent, props);
  var ElementType = (0, _lib.getElementType)(PopupContent, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), _lib.childrenUtils.isNil(children) ? content : children);
}

PopupContent.handledProps = ["as", "children", "className", "content"];
PopupContent.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** The content of the Popup */
  children: _propTypes.default.node,

  /** Classes to add to the Popup content className. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand
} : {};
PopupContent.create = (0, _lib.createShorthandFactory)(PopupContent, function (children) {
  return {
    children: children
  };
});