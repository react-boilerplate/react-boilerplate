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
 * A PopupContent displays the content body of a Popover.
 */
export default function PopupContent(props) {
  const { children, className, content } = props
  const classes = cx('content', className)
  const rest = getUnhandledProps(PopupContent, props)
  const ElementType = getElementType(PopupContent, props)

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
}

PopupContent.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** The content of the Popup */
  children: PropTypes.node,

  /** Classes to add to the Popup content className. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,
}

PopupContent.create = createShorthandFactory(PopupContent, children => ({ children }))
