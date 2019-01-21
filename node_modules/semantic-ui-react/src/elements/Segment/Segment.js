import cx from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import {
  childrenUtils,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  SUI,
  useKeyOnly,
  useKeyOrValueAndKey,
  useTextAlignProp,
  useValueAndKey,
} from '../../lib'
import SegmentGroup from './SegmentGroup'
import SegmentInline from './SegmentInline'

/**
 * A segment is used to create a grouping of related content.
 */
function Segment(props) {
  const {
    attached,
    basic,
    children,
    circular,
    className,
    clearing,
    color,
    compact,
    content,
    disabled,
    floated,
    inverted,
    loading,
    placeholder,
    padded,
    piled,
    raised,
    secondary,
    size,
    stacked,
    tertiary,
    textAlign,
    vertical,
  } = props

  const classes = cx(
    'ui',
    color,
    size,
    useKeyOnly(basic, 'basic'),
    useKeyOnly(circular, 'circular'),
    useKeyOnly(clearing, 'clearing'),
    useKeyOnly(compact, 'compact'),
    useKeyOnly(disabled, 'disabled'),
    useKeyOnly(inverted, 'inverted'),
    useKeyOnly(loading, 'loading'),
    useKeyOnly(placeholder, 'placeholder'),
    useKeyOnly(piled, 'piled'),
    useKeyOnly(raised, 'raised'),
    useKeyOnly(secondary, 'secondary'),
    useKeyOnly(stacked, 'stacked'),
    useKeyOnly(tertiary, 'tertiary'),
    useKeyOnly(vertical, 'vertical'),
    useKeyOrValueAndKey(attached, 'attached'),
    useKeyOrValueAndKey(padded, 'padded'),
    useTextAlignProp(textAlign),
    useValueAndKey(floated, 'floated'),
    'segment',
    className,
  )
  const rest = getUnhandledProps(Segment, props)
  const ElementType = getElementType(Segment, props)

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
}

Segment.Group = SegmentGroup
Segment.Inline = SegmentInline

Segment.propTypes = {
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
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'medium')),

  /** Formatted to show it contains multiple pages. */
  stacked: PropTypes.bool,

  /** A segment can be formatted to appear even less noticeable. */
  tertiary: PropTypes.bool,

  /** Formats content to be aligned as part of a vertical group. */
  textAlign: PropTypes.oneOf(_.without(SUI.TEXT_ALIGNMENTS, 'justified')),

  /** Formats content to be aligned vertically. */
  vertical: PropTypes.bool,
}

export default Segment
