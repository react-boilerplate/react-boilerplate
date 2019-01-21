import * as React from 'react'

import { SemanticShorthandItem, SemanticShorthandContent } from '../../generic'
import { StepDescriptionProps } from './StepDescription'
import { StepTitleProps } from './StepTitle'

export interface StepContentProps extends StrictStepContentProps {
  [key: string]: any
}

export interface StrictStepContentProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent

  /** Shorthand for StepDescription. */
  description?: SemanticShorthandItem<StepDescriptionProps>

  /** Shorthand for StepTitle. */
  title?: SemanticShorthandItem<StepTitleProps>
}

declare const StepContent: React.StatelessComponent<StepContentProps>

export default StepContent
