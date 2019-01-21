import * as React from 'react'
import { SemanticShorthandContent } from '../../generic'

export interface HeaderContentProps extends StrictHeaderContentProps {
  [key: string]: any
}

export interface StrictHeaderContentProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent
}

declare const HeaderContent: React.StatelessComponent<HeaderContentProps>

export default HeaderContent
