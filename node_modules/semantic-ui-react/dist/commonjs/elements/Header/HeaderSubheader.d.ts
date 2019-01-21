import * as React from 'react'
import { SemanticShorthandContent } from '../../generic'

export interface HeaderSubheaderProps extends StrictHeaderSubheaderProps {
  [key: string]: any
}

export interface StrictHeaderSubheaderProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent
}

declare const HeaderSubHeader: React.StatelessComponent<HeaderSubheaderProps>

export default HeaderSubHeader
