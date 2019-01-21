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
 * A list can contain a sub list.
 */
function ListList(props) {
  var children = props.children,
      className = props.className,
      content = props.content;
  var rest = (0, _lib.getUnhandledProps)(ListList, props);
  var ElementType = (0, _lib.getElementType)(ListList, props);
  var classes = (0, _classnames.default)((0, _lib.useKeyOnly)(ElementType !== 'ul' && ElementType !== 'ol', 'list'), className);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), _lib.childrenUtils.isNil(children) ? content : children);
}

ListList.handledProps = ["as", "children", "className", "content"];
ListList.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand
} : {};
var _default = ListList;
exports.default = _default;