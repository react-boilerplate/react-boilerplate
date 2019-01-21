import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import { childrenUtils, customPropTypes, getElementType, getUnhandledProps } from '../../lib'

/**
 * A feed can contain a user element.
 */
function FeedUser(props) {
  const { children, className, content } = props
  const classes = cx('user', className)
  const rest = getUnhandledProps(FeedUser, props)
  const ElementType = getElementType(FeedUser, props)

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
}

FeedUser.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,
}

FeedUser.defaultProps = {
  as: 'a',
}

export default FeedUser
