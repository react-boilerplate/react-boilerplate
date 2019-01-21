import * as React from 'react'

import { SemanticShorthandItem } from '../../generic'
import { FeedContentProps } from './FeedContent'
import { FeedDateProps } from './FeedDate'
import { FeedLabelProps } from './FeedLabel'
import { FeedMetaProps } from './FeedMeta'
import { FeedSummaryProps } from './FeedSummary'
import { FeedExtraProps } from './FeedExtra'

export interface FeedEventProps extends StrictFeedEventProps {
  [key: string]: any
}

export interface StrictFeedEventProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for FeedContent. */
  content?: SemanticShorthandItem<FeedContentProps>

  /** Shorthand for FeedDate. */
  date?: SemanticShorthandItem<FeedDateProps>

  /** Shorthand for FeedExtra with images. */
  extraImages?: SemanticShorthandItem<FeedExtraProps>

  /** Shorthand for FeedExtra with content. */
  extraText?: SemanticShorthandItem<FeedExtraProps>

  /** An event can contain icon label. */
  icon?: SemanticShorthandItem<FeedLabelProps>

  /** An event can contain image label. */
  image?: SemanticShorthandItem<FeedLabelProps>

  /** Shorthand for FeedMeta. */
  meta?: SemanticShorthandItem<FeedMetaProps>

  /** Shorthand for FeedSummary. */
  summary?: SemanticShorthandItem<FeedSummaryProps>
}

declare const FeedEvent: React.StatelessComponent<FeedEventProps>

export default FeedEvent
