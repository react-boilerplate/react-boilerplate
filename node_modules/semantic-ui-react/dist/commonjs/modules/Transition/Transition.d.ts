import * as React from 'react'

import { SemanticTRANSITIONS } from '../../generic'
import TransitionGroup from './TransitionGroup'

export type TRANSITION_STATUSES = 'ENTERED' | 'ENTERING' | 'EXITED' | 'EXITING' | 'UNMOUNTED'

export interface TransitionProps extends StrictTransitionProps {
  [key: string]: any
}

export interface StrictTransitionProps {
  /** Named animation event to used. Must be defined in CSS. */
  animation?: SemanticTRANSITIONS

  /** Primary content. */
  children?: React.ReactNode

  /** Duration of the CSS transition animation in milliseconds. */
  duration?: number | string | TransitionPropDuration

  /** Show the component; triggers the enter or exit animation. */
  visible?: boolean

  /** Wait until the first "enter" transition to mount the component (add it to the DOM). */
  mountOnShow?: boolean

  /**
   * Callback on each transition that changes visibility to shown.
   *
   * @param {null}
   * @param {object} data - All props with status.
   */
  onComplete?: (nothing: null, data: TransitionEventData) => void

  /**
   * Callback on each transition that changes visibility to hidden.
   *
   * @param {null}
   * @param {object} data - All props with status.
   */
  onHide?: (nothing: null, data: TransitionEventData) => void

  /**
   * Callback on each transition that changes visibility to shown.
   *
   * @param {null}
   * @param {object} data - All props with status.
   */
  onShow?: (nothing: null, data: TransitionEventData) => void

  /**
   * Callback on animation start.
   *
   * @param {null}
   * @param {object} data - All props with status.
   */
  onStart?: (nothing: null, data: TransitionEventData) => void

  /** React's key of the element. */
  reactKey?: string

  /** Run the enter animation when the component mounts, if it is initially shown. */
  transitionOnMount?: boolean

  /** Unmount the component (remove it from the DOM) when it is not shown. */
  unmountOnHide?: boolean
}

export interface TransitionEventData extends TransitionProps {
  status: TRANSITION_STATUSES
}

export interface TransitionPropDuration {
  hide: number
  show: number
}

interface TransitionComponent extends React.ComponentClass<TransitionProps> {
  Group: typeof TransitionGroup

  ENTERED: 'ENTERED'
  ENTERING: 'ENTERING'
  EXITED: 'EXITED'
  EXITING: 'EXITING'
  UNMOUNTED: 'UNMOUNTED'
}

declare const Transition: TransitionComponent

export default Transition
