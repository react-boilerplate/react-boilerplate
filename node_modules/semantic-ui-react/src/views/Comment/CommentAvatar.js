import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import {
  createHTMLImage,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  htmlImageProps,
  partitionHTMLProps,
} from '../../lib'

/**
 * A comment can contain an image or avatar.
 */
function CommentAvatar(props) {
  const { className, src } = props

  const classes = cx('avatar', className)
  const rest = getUnhandledProps(CommentAvatar, props)
  const [imageProps, rootProps] = partitionHTMLProps(rest, { htmlProps: htmlImageProps })
  const ElementType = getElementType(CommentAvatar, props)

  return (
    <ElementType {...rootProps} className={classes}>
      {createHTMLImage(src, { autoGenerateKey: false, defaultProps: imageProps })}
    </ElementType>
  )
}

CommentAvatar.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Additional classes. */
  className: PropTypes.string,

  /** Specifies the URL of the image. */
  src: PropTypes.string,
}

export default CommentAvatar
