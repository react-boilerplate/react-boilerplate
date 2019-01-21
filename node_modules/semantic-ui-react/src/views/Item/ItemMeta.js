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
 * An item can contain content metadata.
 */
function ItemMeta(props) {
  const { children, className, content } = props
  const classes = cx('meta', className)
  const rest = getUnhandledProps(ItemMeta, props)
  const ElementType = getElementType(ItemMeta, props)

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
}

ItemMeta.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,
}

ItemMeta.create = createShorthandFactory(ItemMeta, content => ({ content }))

export default ItemMeta
