import cx from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import {
  childrenUtils,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  SUI,
  useTextAlignProp,
} from '../../lib'

/**
 * A card can contain a header.
 */
function CardHeader(props) {
  const { children, className, content, textAlign } = props
  const classes = cx(useTextAlignProp(textAlign), 'header', className)
  const rest = getUnhandledProps(CardHeader, props)
  const ElementType = getElementType(CardHeader, props)

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
}

CardHeader.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A card header can adjust its text alignment. */
  textAlign: PropTypes.oneOf(_.without(SUI.TEXT_ALIGNMENTS, 'justified')),
}

export default CardHeader
