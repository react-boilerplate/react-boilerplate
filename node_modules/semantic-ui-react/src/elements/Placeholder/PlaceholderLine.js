import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import { customPropTypes, getElementType, getUnhandledProps } from '../../lib'

/**
 * A placeholder can contain have lines of text.
 */
function PlaceholderLine(props) {
  const { className, length } = props
  const classes = cx('line', length, className)
  const rest = getUnhandledProps(PlaceholderLine, props)
  const ElementType = getElementType(PlaceholderLine, props)

  return <ElementType {...rest} className={classes} />
}

PlaceholderLine.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Additional classes. */
  className: PropTypes.string,

  /** A line can specify how long its contents should appear. */
  length: PropTypes.oneOf(['full', 'very long', 'long', 'medium', 'short', 'very short']),
}

export default PlaceholderLine
