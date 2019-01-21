import * as React from 'react'
import { default as PortalInner } from './PortalInner'

export interface PortalProps extends StrictPortalProps {
  [key: string]: any
}

export interface StrictPortalProps {
  /** Primary content. */
  children?: React.ReactNode

  /** Controls whether or not the portal should close on a click outside. */
  closeOnDocumentClick?: boolean

  /** Controls whether or not the portal should close when escape is pressed is displayed. */
  closeOnEscape?: boolean

  /**
   * Controls whether or not the portal should close when mousing out of the portal.
   * NOTE: This will prevent `closeOnTriggerMouseLeave` when mousing over the
   * gap from the trigger to the portal.
   */
  closeOnPortalMouseLeave?: boolean

  /** Controls whether or not the portal should close on blur of the trigger. */
  closeOnTriggerBlur?: boolean

  /** Controls whether or not the portal should close on click of the trigger. */
  closeOnTriggerClick?: boolean

  /** Controls whether or not the portal should close when mousing out of the trigger. */
  closeOnTriggerMouseLeave?: boolean

  /** Initial value of open. */
  defaultOpen?: boolean

  /** Event pool namespace that is used to handle component events. */
  eventPool?: string

  /** The node where the portal should mount. */
  mountNode?: any

  /** Milliseconds to wait before opening on mouse over */
  mouseEnterDelay?: number

  /** Milliseconds to wait before closing on mouse leave */
  mouseLeaveDelay?: number

  /**
   * Called when a close event happens
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClose?: (event: React.MouseEvent<HTMLElement>, data: PortalProps) => void

  /**
   * Called when the portal is mounted on the DOM
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onMount?: (nothing: null, data: PortalProps) => void

  /**
   * Called when an open event happens
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onOpen?: (event: React.MouseEvent<HTMLElement>, data: PortalProps) => void

  /**
   * Called when the portal is unmounted from the DOM
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onUnmount?: (nothing: null, data: PortalProps) => void

  /** Controls whether or not the portal is displayed. */
  open?: boolean

  /** Controls whether or not the portal should open when the trigger is clicked. */
  openOnTriggerClick?: boolean

  /** Controls whether or not the portal should open on focus of the trigger. */
  openOnTriggerFocus?: boolean

  /** Controls whether or not the portal should open when mousing over the trigger. */
  openOnTriggerMouseEnter?: boolean

  /** Element to be rendered in-place where the portal is defined. */
  trigger?: React.ReactNode

  /**
   * Called when componentDidMount.
   *
   * @param {HTMLElement} node - Referred node.
   */
  triggerRef?: (node: HTMLElement) => void
}

declare class Portal extends React.Component<PortalProps, {}> {
  static Inner: typeof PortalInner
}

export default Portal
