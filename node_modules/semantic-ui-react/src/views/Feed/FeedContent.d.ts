import * as React from 'react'

import { SemanticShorthandContent, SemanticShorthandItem } from '../../generic'
import { FeedDateProps } from './FeedDate'
import { FeedExtraProps } from './FeedExtra'
import { FeedMetaProps } from './FeedMeta'
import { FeedSummaryProps } from './FeedSummary'

export interface FeedContentProps extends StrictFeedContentProps {
  [key: string]: any
}

export interface StrictFeedContentProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent

  /** An event can contain a date. */
  date?: SemanticShorthandItem<FeedDateProps>

  /** Shorthand for FeedExtra with images. */
  extraImages?: SemanticShorthandItem<FeedExtraProps>

  /** Shorthand for FeedExtra with text. */
  extraText?: SemanticShorthandItem<FeedExtraProps>

  /** Shorthand for FeedMeta. */
  meta?: SemanticShorthandItem<FeedMetaProps>

  /** Shorthand for FeedSummary. */
  summary?: SemanticShorthandItem<FeedSummaryProps>
}

declare const FeedContent: React.StatelessComponent<FeedContentProps>

export default FeedContent
