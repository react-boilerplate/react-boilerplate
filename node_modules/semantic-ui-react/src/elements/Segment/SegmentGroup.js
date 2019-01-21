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
} from '../../lib'

/**
 * A group of segments can be formatted to appear together.
 */
function SegmentGroup(props) {
  const { children, className, compact, content, horizontal, piled, raised, size, stacked } = props

  const classes = cx(
    'ui',
    size,
    useKeyOnly(compact, 'compact'),
    useKeyOnly(horizontal, 'horizontal'),
    useKeyOnly(piled, 'piled'),
    useKeyOnly(raised, 'raised'),
    useKeyOnly(stacked, 'stacked'),
    'segments',
    className,
  )
  const rest = getUnhandledProps(SegmentGroup, props)
  const ElementType = getElementType(SegmentGroup, props)

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
}

SegmentGroup.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** A segment may take up only as much space as is necessary. */
  compact: PropTypes.bool,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Formats content to be aligned horizontally. */
  horizontal: PropTypes.bool,

  /** Formatted to look like a pile of pages. */
  piled: PropTypes.bool,

  /** A segment group may be formatted to raise above the page. */
  raised: PropTypes.bool,

  /** A segment group can have different sizes. */
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'medium')),

  /** Formatted to show it contains multiple pages. */
  stacked: PropTypes.bool,
}

export default SegmentGroup
