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
 * Several icons can be used together as a group.
 */
function IconGroup(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      size = props.size;
  var classes = (0, _classnames.default)(size, 'icons', className);
  var rest = (0, _lib.getUnhandledProps)(IconGroup, props);
  var ElementType = (0, _lib.getElementType)(IconGroup, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), _lib.childrenUtils.isNil(children) ? content : children);
}

IconGroup.handledProps = ["as", "children", "className", "content", "size"];
IconGroup.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** Size of the icon group. */
  size: _propTypes.default.oneOf((0, _without2.default)(_lib.SUI.SIZES, 'medium'))
} : {};
IconGroup.defaultProps = {
  as: 'i'
};
var _default = IconGroup;
exports.default = _default;