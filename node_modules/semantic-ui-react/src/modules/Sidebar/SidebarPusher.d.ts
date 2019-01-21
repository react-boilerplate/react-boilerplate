import * as React from 'react'
import { SemanticShorthandContent } from '../../generic'

export interface SidebarPusherProps extends StrictSidebarPusherProps {
  [key: string]: any
}

export interface StrictSidebarPusherProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent

  /** Controls whether or not the dim is displayed. */
  dimmed?: boolean
}

declare const SidebarPusher: React.StatelessComponent<SidebarPusherProps>

export default SidebarPusher
