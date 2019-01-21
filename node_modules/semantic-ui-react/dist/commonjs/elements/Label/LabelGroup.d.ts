import * as React from 'react'
import { SemanticCOLORS, SemanticShorthandContent, SemanticSIZES } from '../../generic'

export interface LabelGroupProps extends StrictLabelGroupProps {
  [key: string]: any
}

export interface StrictLabelGroupProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Labels can share shapes. */
  circular?: boolean

  /** Additional classes. */
  className?: string

  /** Label group can share colors together. */
  color?: SemanticCOLORS

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent

  /** Label group can share sizes together. */
  size?: SemanticSIZES

  /** Label group can share tag formatting. */
  tag?: boolean
}

declare const LabelGroup: React.StatelessComponent<LabelGroupProps>

export default LabelGroup
