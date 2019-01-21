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
 * A loader alerts a user to wait for an activity to complete.
 * @see Dimmer
 */
function Loader(props) {
  var active = props.active,
      children = props.children,
      className = props.className,
      content = props.content,
      disabled = props.disabled,
      indeterminate = props.indeterminate,
      inline = props.inline,
      inverted = props.inverted,
      size = props.size;
  var classes = (0, _classnames.default)('ui', size, (0, _lib.useKeyOnly)(active, 'active'), (0, _lib.useKeyOnly)(disabled, 'disabled'), (0, _lib.useKeyOnly)(indeterminate, 'indeterminate'), (0, _lib.useKeyOnly)(inverted, 'inverted'), (0, _lib.useKeyOnly)(children || content, 'text'), (0, _lib.useKeyOrValueAndKey)(inline, 'inline'), 'loader', className);
  var rest = (0, _lib.getUnhandledProps)(Loader, props);
  var ElementType = (0, _lib.getElementType)(Loader, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), _lib.childrenUtils.isNil(children) ? content : children);
}

Loader.handledProps = ["active", "as", "children", "className", "content", "disabled", "indeterminate", "inline", "inverted", "size"];
Loader.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** A loader can be active or visible. */
  active: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** A loader can be disabled or hidden. */
  disabled: _propTypes.default.bool,

  /** A loader can show it's unsure of how long a task will take. */
  indeterminate: _propTypes.default.bool,

  /** Loaders can appear inline with content. */
  inline: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['centered'])]),

  /** Loaders can have their colors inverted. */
  inverted: _propTypes.default.bool,

  /** Loaders can have different sizes. */
  size: _propTypes.default.oneOf(_lib.SUI.SIZES)
} : {};
var _default = Loader;
exports.default = _default;