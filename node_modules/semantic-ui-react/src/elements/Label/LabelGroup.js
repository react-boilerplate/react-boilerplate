import cx from 'classnames'
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
 * A label can be grouped.
 */
function LabelGroup(props) {
  const { children, circular, className, color, content, size, tag } = props

  const classes = cx(
    'ui',
    color,
    size,
    useKeyOnly(circular, 'circular'),
    useKeyOnly(tag, 'tag'),
    'labels',
    className,
  )
  const rest = getUnhandledProps(LabelGroup, props)
  const ElementType = getElementType(LabelGroup, props)

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
}

LabelGroup.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Labels can share shapes. */
  circular: PropTypes.bool,

  /** Additional classes. */
  className: PropTypes.string,

  /** Label group can share colors together. */
  color: PropTypes.oneOf(SUI.COLORS),

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Label group can share sizes together. */
  size: PropTypes.oneOf(SUI.SIZES),

  /** Label group can share tag formatting. */
  tag: PropTypes.bool,
}

export default LabelGroup
