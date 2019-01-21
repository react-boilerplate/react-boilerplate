import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import {
  childrenUtils,
  createHTMLImage,
  customPropTypes,
  getElementType,
  getUnhandledProps,
} from '../../lib'
import Icon from '../../elements/Icon'

/**
 * An event can contain an image or icon label.
 */
function FeedLabel(props) {
  const { children, className, content, icon, image } = props

  const classes = cx('label', className)
  const rest = getUnhandledProps(FeedLabel, props)
  const ElementType = getElementType(FeedLabel, props)

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    )
  }

  return (
    <ElementType {...rest} className={classes}>
      {content}
      {Icon.create(icon, { autoGenerateKey: false })}
      {createHTMLImage(image)}
    </ElementType>
  )
}

FeedLabel.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** An event can contain icon label. */
  icon: customPropTypes.itemShorthand,

  /** An event can contain image label. */
  image: customPropTypes.itemShorthand,
}

export default FeedLabel
