import * as React from 'react'
import { SemanticShorthandContent } from '../../generic'

export interface ListDescriptionProps extends StrictListDescriptionProps {
  [key: string]: any
}

export interface StrictListDescriptionProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent
}

declare const ListDescription: React.StatelessComponent<ListDescriptionProps>

export default ListDescription
