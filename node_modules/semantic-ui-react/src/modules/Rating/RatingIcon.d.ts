import * as React from 'react'

export interface RatingIconProps extends StrictRatingIconProps {
  [key: string]: any
}

export interface StrictRatingIconProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Indicates activity of an icon. */
  active?: boolean

  /** Additional classes. */
  className?: string

  /** An index of icon inside Rating. */
  index?: number

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed rating.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>, data: RatingIconProps) => void

  /**
   * Called on keyup.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed rating.
   */
  onKeyUp?: (event: React.MouseEvent<HTMLElement>, data: RatingIconProps) => void

  /**
   * Called on mouseenter.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed rating.
   */
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>, data: RatingIconProps) => void

  /** Indicates selection of an icon. */
  selected?: boolean
}

declare const RatingIcon: React.ComponentClass<RatingIconProps>

export default RatingIcon
