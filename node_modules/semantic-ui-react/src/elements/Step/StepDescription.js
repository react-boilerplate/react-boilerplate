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

function StepDescription(props) {
  const { children, className, content } = props
  const classes = cx('description', className)
  const rest = getUnhandledProps(StepDescription, props)
  const ElementType = getElementType(StepDescription, props)

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
}

StepDescription.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,
}

StepDescription.create = createShorthandFactory(StepDescription, content => ({ content }))

export default StepDescription
