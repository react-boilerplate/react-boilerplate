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
  useTextAlignProp,
  useWidthProp,
} from '../../lib'
import Card from './Card'

/**
 * A group of cards.
 */
function CardGroup(props) {
  const {
    centered,
    children,
    className,
    content,
    doubling,
    items,
    itemsPerRow,
    stackable,
    textAlign,
  } = props

  const classes = cx(
    'ui',
    useKeyOnly(centered, 'centered'),
    useKeyOnly(doubling, 'doubling'),
    useKeyOnly(stackable, 'stackable'),
    useTextAlignProp(textAlign),
    useWidthProp(itemsPerRow),
    'cards',
    className,
  )
  const rest = getUnhandledProps(CardGroup, props)
  const ElementType = getElementType(CardGroup, props)

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

  const itemsJSX = _.map(items, (item) => {
    const key = item.key || [item.header, item.description].join('-')
    return <Card key={key} {...item} />
  })

  return (
    <ElementType {...rest} className={classes}>
      {itemsJSX}
    </ElementType>
  )
}

CardGroup.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** A group of cards can center itself inside its container. */
  centered: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A group of cards can double its column width for mobile. */
  doubling: PropTypes.bool,

  /** Shorthand array of props for Card. */
  items: customPropTypes.collectionShorthand,

  /** A group of cards can set how many cards should exist in a row. */
  itemsPerRow: PropTypes.oneOf(SUI.WIDTHS),

  /** A group of cards can automatically stack rows to a single columns on mobile devices. */
  stackable: PropTypes.bool,

  /** A card group can adjust its text alignment. */
  textAlign: PropTypes.oneOf(_.without(SUI.TEXT_ALIGNMENTS, 'justified')),
}

export default CardGroup
