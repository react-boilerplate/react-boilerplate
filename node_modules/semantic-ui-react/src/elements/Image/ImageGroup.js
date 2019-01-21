import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, SUI } from '../../lib'

/**
 * A group of images.
 */
function ImageGroup(props) {
  const { children, className, content, size } = props
  const classes = cx('ui', size, className, 'images')
  const rest = getUnhandledProps(ImageGroup, props)
  const ElementType = getElementType(ImageGroup, props)

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
}

ImageGroup.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A group of images can be formatted to have the same size. */
  size: PropTypes.oneOf(SUI.SIZES),
}

export default ImageGroup
