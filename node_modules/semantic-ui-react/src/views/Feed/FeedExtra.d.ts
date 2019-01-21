import * as React from 'react'
import {
  HtmlImageProps,
  SemanticShorthandContent,
  SemanticShorthandCollection,
} from '../../generic'

export interface FeedExtraProps extends StrictFeedExtraProps {
  [key: string]: any
}

export interface StrictFeedExtraProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent

  /** An event can contain additional information like a set of images. */
  images?: boolean | SemanticShorthandCollection<HtmlImageProps>[]

  /** An event can contain additional text information. */
  text?: boolean
}

declare const FeedExtra: React.StatelessComponent<FeedExtraProps>

export default FeedExtra
