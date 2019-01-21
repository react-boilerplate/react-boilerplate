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
 * A group of segments can be formatted to appear together.
 */
function SegmentGroup(props) {
  var children = props.children,
      className = props.className,
      compact = props.compact,
      content = props.content,
      horizontal = props.horizontal,
      piled = props.piled,
      raised = props.raised,
      size = props.size,
      stacked = props.stacked;
  var classes = (0, _classnames.default)('ui', size, (0, _lib.useKeyOnly)(compact, 'compact'), (0, _lib.useKeyOnly)(horizontal, 'horizontal'), (0, _lib.useKeyOnly)(piled, 'piled'), (0, _lib.useKeyOnly)(raised, 'raised'), (0, _lib.useKeyOnly)(stacked, 'stacked'), 'segments', className);
  var rest = (0, _lib.getUnhandledProps)(SegmentGroup, props);
  var ElementType = (0, _lib.getElementType)(SegmentGroup, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), _lib.childrenUtils.isNil(children) ? content : children);
}

SegmentGroup.handledProps = ["as", "children", "className", "compact", "content", "horizontal", "piled", "raised", "size", "stacked"];
SegmentGroup.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** A segment may take up only as much space as is necessary. */
  compact: _propTypes.default.bool,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** Formats content to be aligned horizontally. */
  horizontal: _propTypes.default.bool,

  /** Formatted to look like a pile of pages. */
  piled: _propTypes.default.bool,

  /** A segment group may be formatted to raise above the page. */
  raised: _propTypes.default.bool,

  /** A segment group can have different sizes. */
  size: _propTypes.default.oneOf((0, _without2.default)(_lib.SUI.SIZES, 'medium')),

  /** Formatted to show it contains multiple pages. */
  stacked: _propTypes.default.bool
} : {};
var _default = SegmentGroup;
exports.default = _default;