import cx from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getElementType,
  getUnhandledProps,
} from '../../lib'
import MessageItem from './MessageItem'

/**
 * A message can contain a list of items.
 */
function MessageList(props) {
  const { children, className, items } = props
  const classes = cx('list', className)
  const rest = getUnhandledProps(MessageList, props)
  const ElementType = getElementType(MessageList, props)

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? _.map(items, MessageItem.create) : children}
    </ElementType>
  )
}

MessageList.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand Message.Items. */
  items: customPropTypes.collectionShorthand,
}

MessageList.defaultProps = {
  as: 'ul',
}

MessageList.create = createShorthandFactory(MessageList, val => ({ items: val }))

export default MessageList
