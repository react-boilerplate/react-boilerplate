import * as React from 'react'

import {
  SemanticCOLORS,
  SemanticShorthandCollection,
  SemanticShorthandContent,
  SemanticShorthandItem,
} from '../../generic'
import MessageContent from './MessageContent'
import { default as MessageHeader, MessageHeaderProps } from './MessageHeader'
import { default as MessageItem, MessageItemProps } from './MessageItem'
import MessageList from './MessageList'

export type MessageSizeProp = 'mini' | 'tiny' | 'small' | 'large' | 'big' | 'huge' | 'massive'

export interface MessageProps extends StrictMessageProps {
  [key: string]: any
}

export interface StrictMessageProps {
  /** An element type to render as (string or function). */
  as?: any

  /** A message can be formatted to attach itself to other content. */
  attached?: boolean | 'bottom' | 'top'

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** A message can be formatted to be different colors. */
  color?: SemanticCOLORS

  /** A message can only take up the width of its content. */
  compact?: boolean

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent

  /** A message may be formatted to display a negative message. Same as `negative`. */
  error?: boolean

  /** A message can float above content that it is related to. */
  floating?: boolean

  /** Shorthand for MessageHeader. */
  header?: SemanticShorthandItem<MessageHeaderProps>

  /** A message can be hidden. */
  hidden?: boolean

  /** Add an icon by icon name or pass an <Icon /.> */
  icon?: any | boolean

  /** A message may be formatted to display information. */
  info?: boolean

  /** Array shorthand items for the MessageList. Mutually exclusive with children. */
  list?: SemanticShorthandCollection<MessageItemProps>

  /** A message may be formatted to display a negative message. Same as `error`. */
  negative?: boolean

  /**
   * A message that the user can choose to hide.
   * Called when the user clicks the "x" icon. This also adds the "x" icon.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onDismiss?: (event: React.MouseEvent<HTMLElement>, data: MessageProps) => void

  /** A message may be formatted to display a positive message.  Same as `success`. */
  positive?: boolean

  /** A message can have different sizes. */
  size?: MessageSizeProp

  /** A message may be formatted to display a positive message.  Same as `positive`. */
  success?: boolean

  /** A message can be set to visible to force itself to be shown. */
  visible?: boolean

  /** A message may be formatted to display warning messages. */
  warning?: boolean
}

interface MessageComponent extends React.ComponentClass<MessageProps> {
  Content: typeof MessageContent
  Header: typeof MessageHeader
  List: typeof MessageList
  Item: typeof MessageItem
}

declare const Message: MessageComponent

export default Message
