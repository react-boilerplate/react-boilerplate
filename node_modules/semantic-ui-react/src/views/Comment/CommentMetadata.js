import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import { childrenUtils, customPropTypes, getElementType, getUnhandledProps } from '../../lib'

/**
 * A comment can contain metadata about the comment, an arbitrary amount of metadata may be defined.
 */
function CommentMetadata(props) {
  const { className, children, content } = props
  const classes = cx('metadata', className)
  const rest = getUnhandledProps(CommentMetadata, props)
  const ElementType = getElementType(CommentMetadata, props)

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
}

CommentMetadata.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,
}

export default CommentMetadata
