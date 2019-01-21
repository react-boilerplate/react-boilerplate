import * as React from 'react'
import { SemanticShorthandContent } from '../../generic'

export interface StepDescriptionProps extends StrictStepDescriptionProps {
  [key: string]: any
}

export interface StrictStepDescriptionProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent
}

declare const StepDescription: React.StatelessComponent<StepDescriptionProps>

export default StepDescription
