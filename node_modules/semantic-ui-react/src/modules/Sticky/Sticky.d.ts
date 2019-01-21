import * as React from 'react'

export interface StickyProps extends StrictStickyProps {
  [key: string]: any
}

export interface StrictStickyProps {
  /** An element type to render as (string or function). */
  as?: any

  /** A Sticky can be active. */
  active?: boolean

  /** Offset in pixels from the bottom of the screen when fixing element to viewport. */
  bottomOffset?: number

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Context which sticky element should stick to. */
  context?: object

  /** Offset in pixels from the top of the screen when fixing element to viewport. */
  offset?: number

  /**
   * Callback when element is bound to bottom of parent container.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onBottom?: (event: React.MouseEvent<HTMLElement>, data: StickyProps) => void

  /**
   * Callback when element is fixed to page.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onStick?: (event: React.MouseEvent<HTMLElement>, data: StickyProps) => void

  /**
   * Callback when element is bound to top of parent container.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onTop?: (event: React.MouseEvent<HTMLElement>, data: StickyProps) => void

  /**
   * Callback when element is unfixed from page.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onUnstick?: (event: React.MouseEvent<HTMLElement>, data: StickyProps) => void

  /** Whether element should be "pushed" by the viewport, attaching to the bottom of the screen when scrolling up. */
  pushing?: boolean

  /** Context which sticky should attach onscroll events. */
  scrollContext?: object
}

declare const Sticky: React.ComponentClass<StickyProps>

export default Sticky
