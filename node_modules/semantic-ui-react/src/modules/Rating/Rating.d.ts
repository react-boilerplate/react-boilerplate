import * as React from 'react'
import RatingIcon from './RatingIcon'

export interface RatingProps extends StrictRatingProps {
  [key: string]: any
}

export interface StrictRatingProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Additional classes. */
  className?: string

  /**
   * You can clear the rating by clicking on the current start rating.
   * By default a rating will be only clearable if there is 1 icon.
   * Setting to `true`/`false` will allow or disallow a user to clear their rating.
   */
  clearable?: boolean | 'auto'

  /** The initial rating value. */
  defaultRating?: number | string

  /** You can disable or enable interactive rating.  Makes a read-only rating. */
  disabled?: boolean

  /** A rating can use a set of star or heart icons. */
  icon?: 'star' | 'heart'

  /** The total number of icons. */
  maxRating?: number | string

  /**
   * Called after user selects a new rating.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed rating.
   */
  onRate?: (event: React.MouseEvent<HTMLDivElement>, data: RatingProps) => void

  /** The current number of active icons. */
  rating?: number | string

  /** A progress bar can vary in size. */
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'huge' | 'massive'
}

interface RatingComponent extends React.ComponentClass<RatingProps> {
  Icon: typeof RatingIcon
}

declare const Rating: RatingComponent

export default Rating
