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

function LabelDetail(props) {
  const { children, className, content } = props
  const classes = cx('detail', className)
  const rest = getUnhandledProps(LabelDetail, props)
  const ElementType = getElementType(LabelDetail, props)

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
}

LabelDetail.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,
}

LabelDetail.create = createShorthandFactory(LabelDetail, val => ({ content: val }))

export default LabelDetail
