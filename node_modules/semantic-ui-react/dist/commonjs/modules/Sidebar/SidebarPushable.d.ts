import * as React from 'react'
import { SemanticShorthandContent } from '../../generic'

export interface SidebarPushableProps extends StrictSidebarPushableProps {
  [key: string]: any
}

export interface StrictSidebarPushableProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent
}

declare const SidebarPushable: React.StatelessComponent<SidebarPushableProps>

export default SidebarPushable
