import * as React from 'react'

import {
  SemanticShorthandContent,
  SemanticShorthandItem,
  SemanticVERTICALALIGNMENTS,
} from '../../generic'
import { ItemDescriptionProps } from './ItemDescription'
import { ItemExtraProps } from './ItemExtra'
import { ItemHeaderProps } from './ItemHeader'
import { ItemMetaProps } from './ItemMeta'

export interface ItemContentProps extends StrictItemContentProps {
  [key: string]: any
}

export interface StrictItemContentProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent

  /** Shorthand for ItemDescription component. */
  description?: SemanticShorthandItem<ItemDescriptionProps>

  /** Shorthand for ItemExtra component. */
  extra?: SemanticShorthandItem<ItemExtraProps>

  /** Shorthand for ItemHeader component. */
  header?: SemanticShorthandItem<ItemHeaderProps>

  /** Shorthand for ItemMeta component. */
  meta?: SemanticShorthandItem<ItemMetaProps>

  /** Content can specify its vertical alignment. */
  verticalAlign?: SemanticVERTICALALIGNMENTS
}

declare const ItemContent: React.ComponentClass<ItemContentProps>

export default ItemContent
