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
 * A label can be grouped.
 */
function LabelGroup(props) {
  var children = props.children,
      circular = props.circular,
      className = props.className,
      color = props.color,
      content = props.content,
      size = props.size,
      tag = props.tag;
  var classes = (0, _classnames.default)('ui', color, size, (0, _lib.useKeyOnly)(circular, 'circular'), (0, _lib.useKeyOnly)(tag, 'tag'), 'labels', className);
  var rest = (0, _lib.getUnhandledProps)(LabelGroup, props);
  var ElementType = (0, _lib.getElementType)(LabelGroup, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), _lib.childrenUtils.isNil(children) ? content : children);
}

LabelGroup.handledProps = ["as", "children", "circular", "className", "color", "content", "size", "tag"];
LabelGroup.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Labels can share shapes. */
  circular: _propTypes.default.bool,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Label group can share colors together. */
  color: _propTypes.default.oneOf(_lib.SUI.COLORS),

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** Label group can share sizes together. */
  size: _propTypes.default.oneOf(_lib.SUI.SIZES),

  /** Label group can share tag formatting. */
  tag: _propTypes.default.bool
} : {};
var _default = LabelGroup;
exports.default = _default;