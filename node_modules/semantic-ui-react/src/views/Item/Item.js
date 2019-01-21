import cx from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import { childrenUtils, customPropTypes, getElementType, getUnhandledProps } from '../../lib'
import ItemContent from './ItemContent'
import ItemDescription from './ItemDescription'
import ItemExtra from './ItemExtra'
import ItemGroup from './ItemGroup'
import ItemHeader from './ItemHeader'
import ItemImage from './ItemImage'
import ItemMeta from './ItemMeta'

/**
 * An item view presents large collections of site content for display.
 */
function Item(props) {
  const { children, className, content, description, extra, header, image, meta } = props

  const classes = cx('item', className)
  const rest = getUnhandledProps(Item, props)
  const ElementType = getElementType(Item, props)

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    )
  }

  return (
    <ElementType {...rest} className={classes}>
      {ItemImage.create(image, { autoGenerateKey: false })}

      <ItemContent
        content={content}
        description={description}
        extra={extra}
        header={header}
        meta={meta}
      />
    </ElementType>
  )
}

Item.Content = ItemContent
Item.Description = ItemDescription
Item.Extra = ItemExtra
Item.Group = ItemGroup
Item.Header = ItemHeader
Item.Image = ItemImage
Item.Meta = ItemMeta

Item.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for ItemContent component. */
  content: customPropTypes.contentShorthand,

  /** Shorthand for ItemDescription component. */
  description: customPropTypes.itemShorthand,

  /** Shorthand for ItemExtra component. */
  extra: customPropTypes.itemShorthand,

  /** Shorthand for ItemHeader component. */
  header: customPropTypes.itemShorthand,

  /** Shorthand for ItemImage component. */
  image: customPropTypes.itemShorthand,

  /** Shorthand for ItemMeta component. */
  meta: customPropTypes.itemShorthand,
}

export default Item
