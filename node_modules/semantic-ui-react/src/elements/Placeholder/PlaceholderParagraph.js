import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import { childrenUtils, customPropTypes, getElementType, getUnhandledProps } from '../../lib'

/**
 * A placeholder can contain a paragraph.
 */
function PlaceholderParagraph(props) {
  const { children, className, content } = props
  const classes = cx('paragraph', className)
  const rest = getUnhandledProps(PlaceholderParagraph, props)
  const ElementType = getElementType(PlaceholderParagraph, props)

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
}

PlaceholderParagraph.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,
}

export default PlaceholderParagraph
