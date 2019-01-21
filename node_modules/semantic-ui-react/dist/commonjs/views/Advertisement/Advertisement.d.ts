import * as React from 'react'
import { SemanticShorthandContent } from '../../generic'

export interface AdvertisementProps extends StrictAdvertisementProps {
  [key: string]: any
}

export interface StrictAdvertisementProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Center the advertisement. */
  centered?: boolean

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent

  /** Text to be displayed on the advertisement. */
  test?: boolean | string | number

  /** Varies the size of the advertisement. */
  unit:
    | 'medium rectangle'
    | 'large rectangle'
    | 'vertical rectangle'
    | 'small rectangle'
    | 'mobile banner'
    | 'banner'
    | 'vertical banner'
    | 'top banner'
    | 'half banner'
    | 'button'
    | 'square button'
    | 'small button'
    | 'skyscraper'
    | 'wide skyscraper'
    | 'leaderboard'
    | 'large leaderboard'
    | 'mobile leaderboard'
    | 'billboard'
    | 'panorama'
    | 'netboard'
    | 'half page'
    | 'square'
    | 'small square'
}

declare const Advertisement: React.StatelessComponent<AdvertisementProps>

export default Advertisement
