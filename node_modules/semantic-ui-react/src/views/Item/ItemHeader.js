import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getElementType,
  getUnhandledProps,
} from '../../lib'

/**
 * An item can contain a header.
 */
function ItemHeader(props) {
  const { children, className, content } = props
  const classes = cx('header', className)
  const rest = getUnhandledProps(ItemHeader, props)
  const ElementType = getElementType(ItemHeader, props)

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
}

ItemHeader.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,
}

ItemHeader.create = createShorthandFactory(ItemHeader, content => ({ content }))

export default ItemHeader
