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

var _SegmentGroup = _interopRequireDefault(require("./SegmentGroup"));

var _SegmentInline = _interopRequireDefault(require("./SegmentInline"));

/**
 * A segment is used to create a grouping of related content.
 */
function Segment(props) {
  var attached = props.attached,
      basic = props.basic,
      children = props.children,
      circular = props.circular,
      className = props.className,
      clearing = props.clearing,
      color = props.color,
      compact = props.compact,
      content = props.content,
      disabled = props.disabled,
      floated = props.floated,
      inverted = props.inverted,
      loading = props.loading,
      placeholder = props.placeholder,
      padded = props.padded,
      piled = props.piled,
      raised = props.raised,
      secondary = props.secondary,
      size = props.size,
      stacked = props.stacked,
      tertiary = props.tertiary,
      textAlign = props.textAlign,
      vertical = props.vertical;
  var classes = (0, _classnames.default)('ui', color, size, (0, _lib.useKeyOnly)(basic, 'basic'), (0, _lib.useKeyOnly)(circular, 'circular'), (0, _lib.useKeyOnly)(clearing, 'clearing'), (0, _lib.useKeyOnly)(compact, 'compact'), (0, _lib.useKeyOnly)(disabled, 'disabled'), (0, _lib.useKeyOnly)(inverted, 'inverted'), (0, _lib.useKeyOnly)(loading, 'loading'), (0, _lib.useKeyOnly)(placeholder, 'placeholder'), (0, _lib.useKeyOnly)(piled, 'piled'), (0, _lib.useKeyOnly)(raised, 'raised'), (0, _lib.useKeyOnly)(secondary, 'secondary'), (0, _lib.useKeyOnly)(stacked, 'stacked'), (0, _lib.useKeyOnly)(tertiary, 'tertiary'), (0, _lib.useKeyOnly)(vertical, 'vertical'), (0, _lib.useKeyOrValueAndKey)(attached, 'attached'), (0, _lib.useKeyOrValueAndKey)(padded, 'padded'), (0, _lib.useTextAlignProp)(textAlign), (0, _lib.useValueAndKey)(floated, 'floated'), 'segment', className);
  var rest = (0, _lib.getUnhandledProps)(Segment, props);
  var ElementType = (0, _lib.getElementType)(Segment, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), _lib.childrenUtils.isNil(children) ? content : children);
}

Segment.handledProps = ["as", "attached", "basic", "children", "circular", "className", "clearing", "color", "compact", "content", "disabled", "floated", "inverted", "loading", "padded", "piled", "placeholder", "raised", "secondary", "size", "stacked", "tertiary", "textAlign", "vertical"];
Segment.Group = _SegmentGroup.default;
Segment.Inline = _SegmentInline.default;
Segment.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Attach segment to other content, like a header. */
  attached: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['top', 'bottom'])]),

  /** A basic segment has no special formatting. */
  basic: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** A segment can be circular. */
  circular: _propTypes.default.bool,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** A segment can clear floated content. */
  clearing: _propTypes.default.bool,

  /** Segment can be colored. */
  color: _propTypes.default.oneOf(_lib.SUI.COLORS),

  /** A segment may take up only as much space as is necessary. */
  compact: _propTypes.default.bool,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** A segment may show its content is disabled. */
  disabled: _propTypes.default.bool,

  /** Segment content can be floated to the left or right. */
  floated: _propTypes.default.oneOf(_lib.SUI.FLOATS),

  /** A segment can have its colors inverted for contrast. */
  inverted: _propTypes.default.bool,

  /** A segment may show its content is being loaded. */
  loading: _propTypes.default.bool,

  /** A segment can increase its padding. */
  padded: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['very'])]),

  /** A segment can be used to reserve space for conditionally displayed content. */
  placeholder: _propTypes.default.bool,

  /** Formatted to look like a pile of pages. */
  piled: _propTypes.default.bool,

  /** A segment may be formatted to raise above the page. */
  raised: _propTypes.default.bool,

  /** A segment can be formatted to appear less noticeable. */
  secondary: _propTypes.default.bool,

  /** A segment can have different sizes. */
  size: _propTypes.default.oneOf((0, _without2.default)(_lib.SUI.SIZES, 'medium')),

  /** Formatted to show it contains multiple pages. */
  stacked: _propTypes.default.bool,

  /** A segment can be formatted to appear even less noticeable. */
  tertiary: _propTypes.default.bool,

  /** Formats content to be aligned as part of a vertical group. */
  textAlign: _propTypes.default.oneOf((0, _without2.default)(_lib.SUI.TEXT_ALIGNMENTS, 'justified')),

  /** Formats content to be aligned vertically. */
  vertical: _propTypes.default.bool
} : {};
var _default = Segment;
exports.default = _default;