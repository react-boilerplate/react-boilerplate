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
 * A statistic can contain a numeric, icon, image, or text value.
 */
function StatisticValue(props) {
  const { children, className, content, text } = props

  const classes = cx(useKeyOnly(text, 'text'), 'value', className)
  const rest = getUnhandledProps(StatisticValue, props)
  const ElementType = getElementType(StatisticValue, props)

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
}

StatisticValue.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Format the value with smaller font size to fit nicely beside number values. */
  text: PropTypes.bool,
}

StatisticValue.create = createShorthandFactory(StatisticValue, content => ({ content }))

export default StatisticValue
