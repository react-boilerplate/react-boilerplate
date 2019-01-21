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
import FeedExtra from './FeedExtra'
import FeedMeta from './FeedMeta'
import FeedSummary from './FeedSummary'

function FeedContent(props) {
  const { children, className, content, extraImages, extraText, date, meta, summary } = props

  const classes = cx('content', className)
  const rest = getUnhandledProps(FeedContent, props)
  const ElementType = getElementType(FeedContent, props)

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    )
  }

  return (
    <ElementType {...rest} className={classes}>
      {createShorthand(FeedDate, val => ({ content: val }), date, { autoGenerateKey: false })}
      {createShorthand(FeedSummary, val => ({ content: val }), summary, { autoGenerateKey: false })}
      {content}
      {createShorthand(FeedExtra, val => ({ text: true, content: val }), extraText, {
        autoGenerateKey: false,
      })}
      {createShorthand(FeedExtra, val => ({ images: val }), extraImages, {
        autoGenerateKey: false,
      })}
      {createShorthand(FeedMeta, val => ({ content: val }), meta, { autoGenerateKey: false })}
    </ElementType>
  )
}

FeedContent.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** An event can contain a date. */
  date: customPropTypes.itemShorthand,

  /** Shorthand for FeedExtra with images. */
  extraImages: FeedExtra.propTypes.images,

  /** Shorthand for FeedExtra with text. */
  extraText: customPropTypes.itemShorthand,

  /** Shorthand for FeedMeta. */
  meta: customPropTypes.itemShorthand,

  /** Shorthand for FeedSummary. */
  summary: customPropTypes.itemShorthand,
}

export default FeedContent
