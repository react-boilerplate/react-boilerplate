import _extends from "@babel/runtime/helpers/extends";
import _without from "lodash/without";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, SUI, useKeyOnly, useKeyOrValueAndKey, useTextAlignProp, useValueAndKey } from '../../lib';
import SegmentGroup from './SegmentGroup';
import SegmentInline from './SegmentInline';
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
  var classes = cx('ui', color, size, useKeyOnly(basic, 'basic'), useKeyOnly(circular, 'circular'), useKeyOnly(clearing, 'clearing'), useKeyOnly(compact, 'compact'), useKeyOnly(disabled, 'disabled'), useKeyOnly(inverted, 'inverted'), useKeyOnly(loading, 'loading'), useKeyOnly(placeholder, 'placeholder'), useKeyOnly(piled, 'piled'), useKeyOnly(raised, 'raised'), useKeyOnly(secondary, 'secondary'), useKeyOnly(stacked, 'stacked'), useKeyOnly(tertiary, 'tertiary'), useKeyOnly(vertical, 'vertical'), useKeyOrValueAndKey(attached, 'attached'), useKeyOrValueAndKey(padded, 'padded'), useTextAlignProp(textAlign), useValueAndKey(floated, 'floated'), 'segment', className);
  var rest = getUnhandledProps(Segment, props);
  var ElementType = getElementType(Segment, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

Segment.handledProps = ["as", "attached", "basic", "children", "circular", "className", "clearing", "color", "compact", "content", "disabled", "floated", "inverted", "loading", "padded", "piled", "placeholder", "raised", "secondary", "size", "stacked", "tertiary", "textAlign", "vertical"];
Segment.Group = SegmentGroup;
Segment.Inline = SegmentInline;
Segment.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Attach segment to other content, like a header. */
  attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top', 'bottom'])]),

  /** A basic segment has no special formatting. */
  basic: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** A segment can be circular. */
  circular: PropTypes.bool,

  /** Additional classes. */
  className: PropTypes.string,

  /** A segment can clear floated content. */
  clearing: PropTypes.bool,

  /** Segment can be colored. */
  color: PropTypes.oneOf(SUI.COLORS),

  /** A segment may take up only as much space as is necessary. */
  compact: PropTypes.bool,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A segment may show its content is disabled. */
  disabled: PropTypes.bool,

  /** Segment content can be floated to the left or right. */
  floated: PropTypes.oneOf(SUI.FLOATS),

  /** A segment can have its colors inverted for contrast. */
  inverted: PropTypes.bool,

  /** A segment may show its content is being loaded. */
  loading: PropTypes.bool,

  /** A segment can increase its padding. */
  padded: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['very'])]),

  /** A segment can be used to reserve space for conditionally displayed content. */
  placeholder: PropTypes.bool,

  /** Formatted to look like a pile of pages. */
  piled: PropTypes.bool,

  /** A segment may be formatted to raise above the page. */
  raised: PropTypes.bool,

  /** A segment can be formatted to appear less noticeable. */
  secondary: PropTypes.bool,

  /** A segment can have different sizes. */
  size: PropTypes.oneOf(_without(SUI.SIZES, 'medium')),

  /** Formatted to show it contains multiple pages. */
  stacked: PropTypes.bool,

  /** A segment can be formatted to appear even less noticeable. */
  tertiary: PropTypes.bool,

  /** Formats content to be aligned as part of a vertical group. */
  textAlign: PropTypes.oneOf(_without(SUI.TEXT_ALIGNMENTS, 'justified')),

  /** Formats content to be aligned vertically. */
  vertical: PropTypes.bool
} : {};
export default Segment;