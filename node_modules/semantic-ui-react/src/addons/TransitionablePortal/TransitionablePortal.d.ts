import * as React from 'react'

import { TransitionEventData, TransitionProps } from '../../modules/Transition/Transition'
import { PortalProps } from '../Portal/Portal'

export interface TransitionablePortalProps extends StrictTransitionablePortalProps {
  [key: string]: any
}

export interface StrictTransitionablePortalProps {
  /** Primary content. */
  children: React.ReactNode

  /**
   * Called when a close event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and internal state.
   */
  onClose?: (nothing: null, data: PortalProps & TransitionablePortalState) => void

  /**
   * Callback on each transition that changes visibility to hidden.
   *
   * @param {null}
   * @param {object} data - All props with status.
   */
  onHide?: (nothing: null, data: TransitionEventData & TransitionablePortalState) => void

  /**
   * Called when an open event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and internal state.
   */
  onOpen?: (nothing: null, data: PortalProps & TransitionablePortalState) => void

  /**
   * Callback on animation start.
   *
   * @param {null}
   * @param {object} data - All props with status.
   */
  onStart?: (nothing: null, data: TransitionEventData & TransitionablePortalState) => void

  /** Controls whether or not the portal is displayed. */
  open?: boolean

  /** Transition props. */
  transition?: TransitionProps
}

export interface TransitionablePortalState {
  portalOpen: boolean
  transitionVisible: boolean
}

declare const TransitionablePortal: React.ComponentClass<TransitionablePortalProps>

export default TransitionablePortal
