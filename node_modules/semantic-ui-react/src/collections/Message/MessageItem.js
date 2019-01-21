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
 * A message list can contain an item.
 */
function MessageItem(props) {
  const { children, className, content } = props
  const classes = cx('content', className)
  const rest = getUnhandledProps(MessageItem, props)
  const ElementType = getElementType(MessageItem, props)

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
}

MessageItem.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,
}

MessageItem.defaultProps = {
  as: 'li',
}

MessageItem.create = createShorthandFactory(MessageItem, content => ({ content }))

export default MessageItem
