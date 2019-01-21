import * as React from 'react'

import { SemanticShorthandCollection } from '../../generic'
import FeedContent from './FeedContent'
import FeedDate from './FeedDate'
import { default as FeedEvent, FeedEventProps } from './FeedEvent'
import FeedExtra from './FeedExtra'
import FeedLabel from './FeedLabel'
import FeedMeta from './FeedMeta'
import FeedLike from './FeedLike'
import FeedSummary from './FeedSummary'
import FeedUser from './FeedUser'

export interface FeedProps extends StrictFeedProps {
  [key: string]: any
}

export interface StrictFeedProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand array of props for FeedEvent. */
  events?: SemanticShorthandCollection<FeedEventProps>

  /** A feed can have different sizes. */
  size?: 'small' | 'large'
}

interface FeedComponent extends React.StatelessComponent<FeedProps> {
  Content: typeof FeedContent
  Date: typeof FeedDate
  Event: typeof FeedEvent
  Extra: typeof FeedExtra
  Label: typeof FeedLabel
  Meta: typeof FeedMeta
  Like: typeof FeedLike
  Summary: typeof FeedSummary
  User: typeof FeedUser
}

declare const Feed: FeedComponent

export default Feed
