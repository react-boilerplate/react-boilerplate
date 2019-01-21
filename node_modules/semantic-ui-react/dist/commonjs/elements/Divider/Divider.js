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
 * A divider visually segments content into groups.
 */
function Divider(props) {
  var children = props.children,
      className = props.className,
      clearing = props.clearing,
      content = props.content,
      fitted = props.fitted,
      hidden = props.hidden,
      horizontal = props.horizontal,
      inverted = props.inverted,
      section = props.section,
      vertical = props.vertical;
  var classes = (0, _classnames.default)('ui', (0, _lib.useKeyOnly)(clearing, 'clearing'), (0, _lib.useKeyOnly)(fitted, 'fitted'), (0, _lib.useKeyOnly)(hidden, 'hidden'), (0, _lib.useKeyOnly)(horizontal, 'horizontal'), (0, _lib.useKeyOnly)(inverted, 'inverted'), (0, _lib.useKeyOnly)(section, 'section'), (0, _lib.useKeyOnly)(vertical, 'vertical'), 'divider', className);
  var rest = (0, _lib.getUnhandledProps)(Divider, props);
  var ElementType = (0, _lib.getElementType)(Divider, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), _lib.childrenUtils.isNil(children) ? content : children);
}

Divider.handledProps = ["as", "children", "className", "clearing", "content", "fitted", "hidden", "horizontal", "inverted", "section", "vertical"];
Divider.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Divider can clear the content above it. */
  clearing: _propTypes.default.bool,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** Divider can be fitted without any space above or below it. */
  fitted: _propTypes.default.bool,

  /** Divider can divide content without creating a dividing line. */
  hidden: _propTypes.default.bool,

  /** Divider can segment content horizontally. */
  horizontal: _propTypes.default.bool,

  /** Divider can have its colours inverted. */
  inverted: _propTypes.default.bool,

  /** Divider can provide greater margins to divide sections of content. */
  section: _propTypes.default.bool,

  /** Divider can segment content vertically. */
  vertical: _propTypes.default.bool
} : {};
var _default = Divider;
exports.default = _default;