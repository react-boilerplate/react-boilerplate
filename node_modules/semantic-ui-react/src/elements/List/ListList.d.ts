import * as React from 'react'
import { SemanticShorthandContent } from '../../generic'

export interface ListListProps extends StrictListListProps {
  [key: string]: any
}

export interface StrictListListProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent
}

declare const ListList: React.StatelessComponent<ListListProps>

export default ListList
