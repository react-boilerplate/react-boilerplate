import * as React from 'react'
import { SemanticShorthandContent } from '../../generic'

export interface SegmentInlineProps extends StrictSegmentInlineProps {
  [key: string]: any
}

export interface StrictSegmentInlineProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent
}

interface SegmentInlineComponent extends React.StatelessComponent<SegmentInlineProps> {}

declare const SegmentInline: SegmentInlineComponent

export default SegmentInline
