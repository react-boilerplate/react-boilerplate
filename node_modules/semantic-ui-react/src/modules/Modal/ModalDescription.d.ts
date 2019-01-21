import * as React from 'react'
import { SemanticShorthandContent } from '../../generic'

export interface ModalDescriptionProps extends StrictModalDescriptionProps {
  [key: string]: any
}

export interface StrictModalDescriptionProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent
}

declare const ModalDescription: React.StatelessComponent<ModalDescriptionProps>

export default ModalDescription
