import * as React from 'react'
import { SemanticShorthandContent } from '../../generic'

export interface ItemDescriptionProps extends StrictItemDescriptionProps {
  [key: string]: any
}

export interface StrictItemDescriptionProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent
}

declare const ItemDescription: React.StatelessComponent<ItemDescriptionProps>

export default ItemDescription
