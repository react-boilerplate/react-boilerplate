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
import CommentAction from './CommentAction'
import CommentActions from './CommentActions'
import CommentAuthor from './CommentAuthor'
import CommentAvatar from './CommentAvatar'
import CommentContent from './CommentContent'
import CommentGroup from './CommentGroup'
import CommentMetadata from './CommentMetadata'
import CommentText from './CommentText'

/**
 * A comment displays user feedback to site content.
 */
function Comment(props) {
  const { className, children, collapsed, content } = props

  const classes = cx(useKeyOnly(collapsed, 'collapsed'), 'comment', className)
  const rest = getUnhandledProps(Comment, props)
  const ElementType = getElementType(Comment, props)

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
}

Comment.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Comment can be collapsed, or hidden from view. */
  collapsed: PropTypes.bool,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,
}

Comment.Author = CommentAuthor
Comment.Action = CommentAction
Comment.Actions = CommentActions
Comment.Avatar = CommentAvatar
Comment.Content = CommentContent
Comment.Group = CommentGroup
Comment.Metadata = CommentMetadata
Comment.Text = CommentText

export default Comment
