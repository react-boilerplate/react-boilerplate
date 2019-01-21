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
 * A modal can have a header.
 */
function ModalHeader(props) {
  const { children, className, content } = props
  const classes = cx(className, 'header')
  const rest = getUnhandledProps(ModalHeader, props)
  const ElementType = getElementType(ModalHeader, props)

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
}

ModalHeader.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,
}

ModalHeader.create = createShorthandFactory(ModalHeader, content => ({ content }))

export default ModalHeader
