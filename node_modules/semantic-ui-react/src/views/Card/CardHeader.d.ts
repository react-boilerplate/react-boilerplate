import * as React from 'react'
import { SemanticShorthandContent } from '../../generic'

export interface CardHeaderProps extends StrictCardHeaderProps {
  [key: string]: any
}

export interface StrictCardHeaderProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent

  /** A card header can adjust its text alignment. */
  textAlign?: 'center' | 'left' | 'right'
}

declare const CardHeader: React.StatelessComponent<CardHeaderProps>

export default CardHeader
