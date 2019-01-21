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
 * A PopupHeader displays a header in a Popover.
 */
export default function PopupHeader(props) {
  const { children, className, content } = props
  const classes = cx('header', className)
  const rest = getUnhandledProps(PopupHeader, props)
  const ElementType = getElementType(PopupHeader, props)

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
}

PopupHeader.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,
}

PopupHeader.create = createShorthandFactory(PopupHeader, children => ({ children }))
