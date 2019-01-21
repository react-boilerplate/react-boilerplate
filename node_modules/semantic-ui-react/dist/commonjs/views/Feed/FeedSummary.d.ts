import * as React from 'react'

import { SemanticShorthandContent, SemanticShorthandItem } from '../../generic'
import { FeedDateProps } from './FeedDate'
import { FeedUserProps } from './FeedUser'

export interface FeedSummaryProps extends StrictFeedSummaryProps {
  [key: string]: any
}

export interface StrictFeedSummaryProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent

  /** Shorthand for FeedDate. */
  date?: SemanticShorthandItem<FeedDateProps>

  /** Shorthand for FeedUser. */
  user?: SemanticShorthandItem<FeedUserProps>
}

declare const FeedSummary: React.StatelessComponent<FeedSummaryProps>

export default FeedSummary
