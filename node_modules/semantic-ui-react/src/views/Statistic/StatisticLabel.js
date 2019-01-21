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

/**
 * A statistic can contain a label to help provide context for the presented value.
 */
function StatisticLabel(props) {
  const { children, className, content } = props
  const classes = cx('label', className)
  const rest = getUnhandledProps(StatisticLabel, props)
  const ElementType = getElementType(StatisticLabel, props)

  return (
    <ElementType {...rest} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
}

StatisticLabel.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,
}

StatisticLabel.create = createShorthandFactory(StatisticLabel, content => ({ content }))

export default StatisticLabel
