import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import {
  childrenUtils,
  createShorthand,
  customPropTypes,
  getElementType,
  getUnhandledProps,
} from '../../lib'
import FeedDate from './FeedDate'
import FeedUser from './FeedUser'

/**
 * A feed can contain a summary.
 */
function FeedSummary(props) {
  const { children, className, content, date, user } = props

  const classes = cx('summary', className)
  const rest = getUnhandledProps(FeedSummary, props)
  const ElementType = getElementType(FeedSummary, props)

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    )
  }

  return (
    <ElementType {...rest} className={classes}>
      {createShorthand(FeedUser, val => ({ content: val }), user, { autoGenerateKey: false })}
      {content}
      {createShorthand(FeedDate, val => ({ content: val }), date, { autoGenerateKey: false })}
    </ElementType>
  )
}

FeedSummary.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Shorthand for FeedDate. */
  date: customPropTypes.itemShorthand,

  /** Shorthand for FeedUser. */
  user: customPropTypes.itemShorthand,
}

export default FeedSummary
