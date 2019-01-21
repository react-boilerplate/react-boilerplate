import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import {
  childrenUtils,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  useKeyOnly,
} from '../../lib'

/**
 * A placeholder can contain a header.
 */
function PlaceholderHeader(props) {
  const { children, className, content, image } = props
  const classes = cx(useKeyOnly(image, 'image'), 'header', className)
  const rest = getUnhandledProps(PlaceholderHeader, props)
  const ElementType = getElementType(PlaceholderHeader, props)

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
}

PlaceholderHeader.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A placeholder can contain an image. */
  image: PropTypes.bool,
}

export default PlaceholderHeader
