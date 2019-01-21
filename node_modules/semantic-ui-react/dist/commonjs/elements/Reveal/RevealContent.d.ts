import * as React from 'react'
import { SemanticShorthandContent } from '../../generic'

export interface RevealContentProps extends StrictRevealContentProps {
  [key: string]: any
}

export interface StrictRevealContentProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent

  /** A reveal may contain content that is visible before interaction. */
  hidden?: boolean

  /** A reveal may contain content that is hidden before user interaction. */
  visible?: boolean
}

declare const RevealContent: React.StatelessComponent<RevealContentProps>

export default RevealContent
