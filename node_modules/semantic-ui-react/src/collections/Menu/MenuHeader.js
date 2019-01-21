import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import { childrenUtils, customPropTypes, getElementType, getUnhandledProps } from '../../lib'

/**
 * A menu item may include a header or may itself be a header.
 */
function MenuHeader(props) {
  const { children, className, content } = props
  const classes = cx('header', className)
  const rest = getUnhandledProps(MenuHeader, props)
  const ElementType = getElementType(MenuHeader, props)

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
}

MenuHeader.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,
}

export default MenuHeader
