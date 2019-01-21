import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import { createShorthand, customPropTypes, getElementType, getUnhandledProps } from '../../lib'
import FeedContent from './FeedContent'
import FeedLabel from './FeedLabel'

/**
 * A feed contains an event.
 */
function FeedEvent(props) {
  const {
    content,
    children,
    className,
    date,
    extraImages,
    extraText,
    image,
    icon,
    meta,
    summary,
  } = props

  const classes = cx('event', className)
  const rest = getUnhandledProps(FeedEvent, props)
  const ElementType = getElementType(FeedEvent, props)

  const hasContentProp = content || date || extraImages || extraText || meta || summary
  const contentProps = { content, date, extraImages, extraText, meta, summary }

  return (
    <ElementType {...rest} className={classes}>
      {createShorthand(FeedLabel, val => ({ icon: val }), icon, { autoGenerateKey: false })}
      {createShorthand(FeedLabel, val => ({ image: val }), image, { autoGenerateKey: false })}
      {hasContentProp && <FeedContent {...contentProps} />}
      {children}
    </ElementType>
  )
}

FeedEvent.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for FeedContent. */
  content: customPropTypes.itemShorthand,

  /** Shorthand for FeedDate. */
  date: customPropTypes.itemShorthand,

  /** Shorthand for FeedExtra with images. */
  extraImages: customPropTypes.itemShorthand,

  /** Shorthand for FeedExtra with content. */
  extraText: customPropTypes.itemShorthand,

  /** An event can contain icon label. */
  icon: customPropTypes.itemShorthand,

  /** An event can contain image label. */
  image: customPropTypes.itemShorthand,

  /** Shorthand for FeedMeta. */
  meta: customPropTypes.itemShorthand,

  /** Shorthand for FeedSummary. */
  summary: customPropTypes.itemShorthand,
}

export default FeedEvent
