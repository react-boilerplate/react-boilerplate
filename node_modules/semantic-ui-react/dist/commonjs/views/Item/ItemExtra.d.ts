import * as React from 'react'
import { SemanticShorthandContent } from '../../generic'

export interface ItemExtraProps extends StrictItemExtraProps {
  [key: string]: any
}

export interface StrictItemExtraProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent
}

declare const ItemExtra: React.StatelessComponent<ItemExtraProps>

export default ItemExtra
