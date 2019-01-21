import cx from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import {
  childrenUtils,
  createShorthand,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  SUI,
  useKeyOnly,
  useTextAlignProp,
} from '../../lib'
import CardDescription from './CardDescription'
import CardHeader from './CardHeader'
import CardMeta from './CardMeta'

/**
 * A card can contain blocks of content or extra content meant to be formatted separately from the main content.
 */
function CardContent(props) {
  const { children, className, content, description, extra, header, meta, textAlign } = props

  const classes = cx(useKeyOnly(extra, 'extra'), useTextAlignProp(textAlign), 'content', className)
  const rest = getUnhandledProps(CardContent, props)
  const ElementType = getElementType(CardContent, props)

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
      {createShorthand(CardHeader, val => ({ content: val }), header, { autoGenerateKey: false })}
      {createShorthand(CardMeta, val => ({ content: val }), meta, { autoGenerateKey: false })}
      {createShorthand(CardDescription, val => ({ content: val }), description, {
        autoGenerateKey: false,
      })}
    </ElementType>
  )
}

CardContent.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Shorthand for CardDescription. */
  description: customPropTypes.itemShorthand,

  /** A card can contain extra content meant to be formatted separately from the main content. */
  extra: PropTypes.bool,

  /** Shorthand for CardHeader. */
  header: customPropTypes.itemShorthand,

  /** Shorthand for CardMeta. */
  meta: customPropTypes.itemShorthand,

  /** A card content can adjust its text alignment. */
  textAlign: PropTypes.oneOf(_.without(SUI.TEXT_ALIGNMENTS, 'justified')),
}

export default CardContent
