import * as React from 'react'
import { SemanticShorthandContent } from '../../generic'

export interface FeedDateProps extends StrictFeedDateProps {
  [key: string]: any
}

export interface StrictFeedDateProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent
}

declare const FeedDate: React.StatelessComponent<FeedDateProps>

export default FeedDate
