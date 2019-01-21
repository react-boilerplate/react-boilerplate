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
  useKeyOnly,
  useWidthProp,
} from '../../lib'
import Statistic from './Statistic'

/**
 * A group of statistics.
 */
function StatisticGroup(props) {
  const { children, className, color, content, horizontal, inverted, items, size, widths } = props

  const classes = cx(
    'ui',
    color,
    size,
    useKeyOnly(horizontal, 'horizontal'),
    useKeyOnly(inverted, 'inverted'),
    useWidthProp(widths),
    'statistics',
    className,
  )
  const rest = getUnhandledProps(StatisticGroup, props)
  const ElementType = getElementType(StatisticGroup, props)

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
      {_.map(items, item => Statistic.create(item))}
    </ElementType>
  )
}

StatisticGroup.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** A statistic group can be formatted to be different colors. */
  color: PropTypes.oneOf(SUI.COLORS),

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A statistic group can present its measurement horizontally. */
  horizontal: PropTypes.bool,

  /** A statistic group can be formatted to fit on a dark background. */
  inverted: PropTypes.bool,

  /** Array of props for Statistic. */
  items: customPropTypes.collectionShorthand,

  /** A statistic group can vary in size. */
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'big', 'massive', 'medium')),

  /** A statistic group can have its items divided evenly. */
  widths: PropTypes.oneOf(SUI.WIDTHS),
}

export default StatisticGroup
