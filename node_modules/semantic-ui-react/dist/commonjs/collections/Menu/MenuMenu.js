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
 * A menu can contain a sub menu.
 */
function MenuMenu(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      position = props.position;
  var classes = (0, _classnames.default)(position, 'menu', className);
  var rest = (0, _lib.getUnhandledProps)(MenuMenu, props);
  var ElementType = (0, _lib.getElementType)(MenuMenu, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), _lib.childrenUtils.isNil(children) ? content : children);
}

MenuMenu.handledProps = ["as", "children", "className", "content", "position"];
MenuMenu.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** A sub menu can take left or right position. */
  position: _propTypes.default.oneOf(['left', 'right'])
} : {};
var _default = MenuMenu;
exports.default = _default;