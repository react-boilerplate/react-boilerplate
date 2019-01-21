import cx from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import {
  childrenUtils,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  useKeyOnly,
  useKeyOrValueAndKey,
} from '../../lib'
import Item from './Item'

/**
 * A group of items.
 */
function ItemGroup(props) {
  const { children, className, content, divided, items, link, relaxed, unstackable } = props

  const classes = cx(
    'ui',
    useKeyOnly(divided, 'divided'),
    useKeyOnly(link, 'link'),
    useKeyOnly(unstackable, 'unstackable'),
    useKeyOrValueAndKey(relaxed, 'relaxed'),
    'items',
    className,
  )
  const rest = getUnhandledProps(ItemGroup, props)
  const ElementType = getElementType(ItemGroup, props)

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
    const { childKey, ...itemProps } = item
    const finalKey =
      childKey ||
      [itemProps.content, itemProps.description, itemProps.header, itemProps.meta].join('-')

    return <Item {...itemProps} key={finalKey} />
  })

  return (
    <ElementType {...rest} className={classes}>
      {itemsJSX}
    </ElementType>
  )
}

ItemGroup.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Items can be divided to better distinguish between grouped content. */
  divided: PropTypes.bool,

  /** Shorthand array of props for Item. */
  items: customPropTypes.collectionShorthand,

  /** An item can be formatted so that the entire contents link to another page. */
  link: PropTypes.bool,

  /** A group of items can relax its padding to provide more negative space. */
  relaxed: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['very'])]),

  /** Prevent items from stacking on mobile. */
  unstackable: PropTypes.bool,
}

export default ItemGroup
