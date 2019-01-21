import * as React from 'react'
import { SemanticShorthandContent } from '../../generic'

export interface MenuHeaderProps extends StrictMenuHeaderProps {
  [key: string]: any
}

export interface StrictMenuHeaderProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent
}

declare const MenuHeader: React.ComponentClass<MenuHeaderProps>

export default MenuHeader
