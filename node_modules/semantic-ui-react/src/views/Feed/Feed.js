import cx from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, SUI } from '../../lib'
import FeedContent from './FeedContent'
import FeedDate from './FeedDate'
import FeedEvent from './FeedEvent'
import FeedExtra from './FeedExtra'
import FeedLabel from './FeedLabel'
import FeedLike from './FeedLike'
import FeedMeta from './FeedMeta'
import FeedSummary from './FeedSummary'
import FeedUser from './FeedUser'

/**
 * A feed presents user activity chronologically.
 */
function Feed(props) {
  const { children, className, events, size } = props

  const classes = cx('ui', size, 'feed', className)
  const rest = getUnhandledProps(Feed, props)
  const ElementType = getElementType(Feed, props)

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    )
  }

  const eventElements = _.map(events, (eventProps) => {
    const { childKey, date, meta, summary, ...eventData } = eventProps
    const finalKey = childKey || [date, meta, summary].join('-')

    return <FeedEvent date={date} key={finalKey} meta={meta} summary={summary} {...eventData} />
  })

  return (
    <ElementType {...rest} className={classes}>
      {eventElements}
    </ElementType>
  )
}

Feed.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand array of props for FeedEvent. */
  events: customPropTypes.collectionShorthand,

  /** A feed can have different sizes. */
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'mini', 'tiny', 'medium', 'big', 'huge', 'massive')),
}

Feed.Content = FeedContent
Feed.Date = FeedDate
Feed.Event = FeedEvent
Feed.Extra = FeedExtra
Feed.Label = FeedLabel
Feed.Like = FeedLike
Feed.Meta = FeedMeta
Feed.Summary = FeedSummary
Feed.User = FeedUser

export default Feed
