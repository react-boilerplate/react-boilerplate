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
import StepDescription from './StepDescription'
import StepTitle from './StepTitle'

/**
 * A step can contain a content.
 */
function StepContent(props) {
  const { children, className, content, description, title } = props
  const classes = cx('content', className)
  const rest = getUnhandledProps(StepContent, props)
  const ElementType = getElementType(StepContent, props)

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    )
  }
  if (!childrenUtils.isNil(content)) {
    return (
      <ElementType {...rest} className={classes}>
        {content}
      </ElementType>
    )
  }

  return (
    <ElementType {...rest} className={classes}>
      {StepTitle.create(title, { autoGenerateKey: false })}
      {StepDescription.create(description, { autoGenerateKey: false })}
    </ElementType>
  )
}

StepContent.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Shorthand for StepDescription. */
  description: customPropTypes.itemShorthand,

  /** Shorthand for StepTitle. */
  title: customPropTypes.itemShorthand,
}

StepContent.create = createShorthandFactory(StepContent, content => ({ content }))

export default StepContent
