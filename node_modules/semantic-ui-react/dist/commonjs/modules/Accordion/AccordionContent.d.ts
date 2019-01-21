import * as React from 'react'
import { SemanticShorthandContent } from '../../generic'

export interface AccordionContentProps extends StrictAccordionContentProps {
  [key: string]: any
}

export interface StrictAccordionContentProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Whether or not the content is visible. */
  active?: boolean

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent
}

declare const AccordionContent: React.StatelessComponent<AccordionContentProps>

export default AccordionContent
