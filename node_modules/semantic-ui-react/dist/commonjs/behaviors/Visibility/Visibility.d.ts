import * as React from 'react'

export interface VisibilityProps extends StrictVisibilityProps {
  [key: string]: any
}

export interface StrictVisibilityProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Context which sticky element should stick to. */
  context?: object

  /**
   * When set to true a callback will occur anytime an element passes a condition not just immediately after the
   * threshold is met.
   */
  continuous?: boolean

  /** Fires callbacks immediately after mount. */
  fireOnMount?: boolean

  /**
   * Element's bottom edge has passed top of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onBottomPassed?: (nothing: null, data: VisibilityEventData) => void

  /**
   * Element's bottom edge has not passed top of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onBottomPassedReverse?: (nothing: null, data: VisibilityEventData) => void

  /**
   * Element's bottom edge has passed bottom of screen
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onBottomVisible?: (nothing: null, data: VisibilityEventData) => void

  /**
   * Element's bottom edge has not passed bottom of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onBottomVisibleReverse?: (nothing: null, data: VisibilityEventData) => void

  /**
   * Value that context should be adjusted in pixels. Useful for making content appear below content fixed to the
   * page.
   */
  offset?: number | string | (number | string)[]

  /** When set to false a callback will occur each time an element passes the threshold for a condition. */
  once?: boolean

  /** Element is not visible on the screen. */
  onPassed?: VisibilityOnPassed

  /**
   * Any part of an element is visible on screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onPassing?: (nothing: null, data: VisibilityEventData) => void

  /**
   * Element's top has not passed top of screen but bottom has.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onPassingReverse?: (nothing: null, data: VisibilityEventData) => void

  /**
   * Element is not visible on the screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onOffScreen?: (nothing: null, data: VisibilityEventData) => void

  /**
   * Element is visible on the screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onOnScreen?: (nothing: null, data: VisibilityEventData) => void

  /**
   * Element's top edge has passed top of the screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onTopPassed?: (nothing: null, data: VisibilityEventData) => void

  /**
   * Element's top edge has not passed top of the screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onTopPassedReverse?: (nothing: null, data: VisibilityEventData) => void

  /**
   * Element's top edge has passed bottom of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onTopVisible?: (nothing: null, data: VisibilityEventData) => void

  /**
   * Element's top edge has not passed bottom of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onTopVisibleReverse?: (nothing: null, data: VisibilityEventData) => void

  /**
   * Element's top edge has passed bottom of screen.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onUpdate?: (nothing: null, data: VisibilityEventData) => void

  /**
   * Allows to choose the mode of the position calculations:
   * - `events` - (default) update and fire callbacks only on scroll/resize events
   * - `repaint` - update and fire callbacks on browser repaint (animation frames)
   */
  updateOn?: 'events' | 'repaint'
}

export interface VisibilityCalculations {
  bottomPassed: boolean
  bottomVisible: boolean
  direction: 'down' | 'up'
  fits: boolean
  height: number
  passing: boolean
  percentagePassed: number
  pixelsPassed: number
  offScreen: boolean
  onScreen: boolean
  topPassed: boolean
  topVisible: boolean
  width: number
}

export interface VisibilityEventData extends VisibilityProps {
  calculations: VisibilityCalculations
}

export interface VisibilityOnPassed {
  [key: string]: (nothing: null, data: VisibilityEventData) => void
}

declare const Visibility: React.ComponentClass<VisibilityProps>

export default Visibility
