import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  useKeyOnly,
} from '../../lib'

/**
 * A modal can contain content.
 */
function ModalContent(props) {
  const { children, className, content, image, scrolling } = props

  const classes = cx(
    className,
    useKeyOnly(image, 'image'),
    useKeyOnly(scrolling, 'scrolling'),
    'content',
  )
  const rest = getUnhandledProps(ModalContent, props)
  const ElementType = getElementType(ModalContent, props)

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
}

ModalContent.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A modal can contain image content. */
  image: PropTypes.bool,

  /** A modal can use the entire size of the screen. */
  scrolling: PropTypes.bool,
}

ModalContent.create = createShorthandFactory(ModalContent, content => ({ content }))

export default ModalContent
