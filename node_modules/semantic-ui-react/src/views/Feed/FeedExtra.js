import cx from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import {
  childrenUtils,
  createHTMLImage,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  useKeyOnly,
} from '../../lib'

/**
 * A feed can contain an extra content.
 */
function FeedExtra(props) {
  const { children, className, content, images, text } = props

  const classes = cx(
    useKeyOnly(images, 'images'),
    useKeyOnly(content || text, 'text'),
    'extra',
    className,
  )
  const rest = getUnhandledProps(FeedExtra, props)
  const ElementType = getElementType(FeedExtra, props)

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    )
  }

  // TODO need a "collection factory" to handle creating multiple image elements and their keys
  const imageElements = _.map(images, (image, index) => {
    const key = [index, image].join('-')
    return createHTMLImage(image, { key })
  })

  return (
    <ElementType {...rest} className={classes}>
      {content}
      {imageElements}
    </ElementType>
  )
}

FeedExtra.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** An event can contain additional information like a set of images. */
  images: customPropTypes.every([
    customPropTypes.disallow(['text']),
    PropTypes.oneOfType([PropTypes.bool, customPropTypes.collectionShorthand]),
  ]),

  /** An event can contain additional text information. */
  text: PropTypes.bool,
}

export default FeedExtra
