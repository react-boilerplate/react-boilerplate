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

var _RevealContent = _interopRequireDefault(require("./RevealContent"));

/**
 * A reveal displays additional content in place of previous content when activated.
 */
function Reveal(props) {
  var active = props.active,
      animated = props.animated,
      children = props.children,
      className = props.className,
      content = props.content,
      disabled = props.disabled,
      instant = props.instant;
  var classes = (0, _classnames.default)('ui', animated, (0, _lib.useKeyOnly)(active, 'active'), (0, _lib.useKeyOnly)(disabled, 'disabled'), (0, _lib.useKeyOnly)(instant, 'instant'), 'reveal', className);
  var rest = (0, _lib.getUnhandledProps)(Reveal, props);
  var ElementType = (0, _lib.getElementType)(Reveal, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), _lib.childrenUtils.isNil(children) ? content : children);
}

Reveal.handledProps = ["active", "animated", "as", "children", "className", "content", "disabled", "instant"];
Reveal.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** An active reveal displays its hidden content. */
  active: _propTypes.default.bool,

  /** An animation name that will be applied to Reveal. */
  animated: _propTypes.default.oneOf(['fade', 'small fade', 'move', 'move right', 'move up', 'move down', 'rotate', 'rotate left']),

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** A disabled reveal will not animate when hovered. */
  disabled: _propTypes.default.bool,

  /** An element can show its content without delay. */
  instant: _propTypes.default.bool
} : {};
Reveal.Content = _RevealContent.default;
var _default = Reveal;
exports.default = _default;