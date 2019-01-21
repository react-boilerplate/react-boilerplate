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
 * An item can contain extra content meant to be formatted separately from the main content.
 */
function ItemExtra(props) {
  const { children, className, content } = props
  const classes = cx('extra', className)
  const rest = getUnhandledProps(ItemExtra, props)
  const ElementType = getElementType(ItemExtra, props)

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
}

ItemExtra.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,
}

ItemExtra.create = createShorthandFactory(ItemExtra, content => ({ content }))

export default ItemExtra
