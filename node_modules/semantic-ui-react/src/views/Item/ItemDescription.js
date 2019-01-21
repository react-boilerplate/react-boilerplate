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
 * An item can contain a description with a single or multiple paragraphs.
 */
function ItemDescription(props) {
  const { children, className, content } = props
  const classes = cx('description', className)
  const rest = getUnhandledProps(ItemDescription, props)
  const ElementType = getElementType(ItemDescription, props)

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
}

ItemDescription.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,
}

ItemDescription.create = createShorthandFactory(ItemDescription, content => ({ content }))

export default ItemDescription
