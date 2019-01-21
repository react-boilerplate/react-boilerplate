import * as React from 'react'
import { SemanticShorthandContent } from '../../generic'

export interface PlaceholderParagraphProps extends StrictPlaceholderParagraphProps {
  [key: string]: any
}

export interface StrictPlaceholderParagraphProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent
}

interface PlaceholderParagraphComponent
  extends React.StatelessComponent<PlaceholderParagraphProps> {}

declare const PlaceholderParagraph: PlaceholderParagraphComponent

export default PlaceholderParagraph
