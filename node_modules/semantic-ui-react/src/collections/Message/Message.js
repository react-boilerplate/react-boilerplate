import cx from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import {
  childrenUtils,
  createHTMLParagraph,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  SUI,
  useKeyOnly,
  useKeyOrValueAndKey,
} from '../../lib'
import Icon from '../../elements/Icon'
import MessageContent from './MessageContent'
import MessageHeader from './MessageHeader'
import MessageList from './MessageList'
import MessageItem from './MessageItem'

/**
 * A message displays information that explains nearby content.
 * @see Form
 */
export default class Message extends Component {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** A message can be formatted to attach itself to other content. */
    attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['bottom', 'top'])]),

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** A message can be formatted to be different colors. */
    color: PropTypes.oneOf(SUI.COLORS),

    /** A message can only take up the width of its content. */
    compact: PropTypes.bool,

    /** Shorthand for primary content. */
    content: customPropTypes.contentShorthand,

    /** A message may be formatted to display a negative message. Same as `negative`. */
    error: PropTypes.bool,

    /** A message can float above content that it is related to. */
    floating: PropTypes.bool,

    /** Shorthand for MessageHeader. */
    header: customPropTypes.itemShorthand,

    /** A message can be hidden. */
    hidden: PropTypes.bool,

    /** A message can contain an icon. */
    icon: PropTypes.oneOfType([customPropTypes.itemShorthand, PropTypes.bool]),

    /** A message may be formatted to display information. */
    info: PropTypes.bool,

    /** Array shorthand items for the MessageList. Mutually exclusive with children. */
    list: customPropTypes.collectionShorthand,

    /** A message may be formatted to display a negative message. Same as `error`. */
    negative: PropTypes.bool,

    /**
     * A message that the user can choose to hide.
     * Called when the user clicks the "x" icon. This also adds the "x" icon.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onDismiss: PropTypes.func,

    /** A message may be formatted to display a positive message.  Same as `success`. */
    positive: PropTypes.bool,

    /** A message can have different sizes. */
    size: PropTypes.oneOf(_.without(SUI.SIZES, 'medium')),

    /** A message may be formatted to display a positive message.  Same as `positive`. */
    success: PropTypes.bool,

    /** A message can be set to visible to force itself to be shown. */
    visible: PropTypes.bool,

    /** A message may be formatted to display warning messages. */
    warning: PropTypes.bool,
  }

  static Content = MessageContent
  static Header = MessageHeader
  static List = MessageList
  static Item = MessageItem

  handleDismiss = (e) => {
    const { onDismiss } = this.props

    if (onDismiss) onDismiss(e, this.props)
  }

  render() {
    const {
      attached,
      children,
      className,
      color,
      compact,
      content,
      error,
      floating,
      header,
      hidden,
      icon,
      info,
      list,
      negative,
      onDismiss,
      positive,
      size,
      success,
      visible,
      warning,
    } = this.props

    const classes = cx(
      'ui',
      color,
      size,
      useKeyOnly(compact, 'compact'),
      useKeyOnly(error, 'error'),
      useKeyOnly(floating, 'floating'),
      useKeyOnly(hidden, 'hidden'),
      useKeyOnly(icon, 'icon'),
      useKeyOnly(info, 'info'),
      useKeyOnly(negative, 'negative'),
      useKeyOnly(positive, 'positive'),
      useKeyOnly(success, 'success'),
      useKeyOnly(visible, 'visible'),
      useKeyOnly(warning, 'warning'),
      useKeyOrValueAndKey(attached, 'attached'),
      'message',
      className,
    )

    const dismissIcon = onDismiss && <Icon name='close' onClick={this.handleDismiss} />
    const rest = getUnhandledProps(Message, this.props)
    const ElementType = getElementType(Message, this.props)

    if (!childrenUtils.isNil(children)) {
      return (
        <ElementType {...rest} className={classes}>
          {dismissIcon}
          {children}
        </ElementType>
      )
    }

    return (
      <ElementType {...rest} className={classes}>
        {dismissIcon}
        {Icon.create(icon, { autoGenerateKey: false })}
        {(!_.isNil(header) || !_.isNil(content) || !_.isNil(list)) && (
          <MessageContent>
            {MessageHeader.create(header, { autoGenerateKey: false })}
            {MessageList.create(list, { autoGenerateKey: false })}
            {createHTMLParagraph(content, { autoGenerateKey: false })}
          </MessageContent>
        )}
      </ElementType>
    )
  }
}
