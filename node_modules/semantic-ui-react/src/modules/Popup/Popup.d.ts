import * as React from 'react'

import { SemanticShorthandItem } from '../../generic'
import { StrictPortalProps } from '../../addons/Portal'
import { default as PopupContent, PopupContentProps } from './PopupContent'
import { default as PopupHeader, PopupHeaderProps } from './PopupHeader'

export interface PopupProps extends StrictPopupProps {
  [key: string]: any
}

export interface StrictPopupProps extends StrictPortalProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Display the popup without the pointing arrow */
  basic?: boolean

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Simple text content for the popover. */
  content?: SemanticShorthandItem<PopupContentProps>

  /** Existing element the pop-up should be bound to. */
  context?: object

  /** A flowing Popup has no maximum width and continues to flow to fit its content. */
  flowing?: boolean

  /** Header displayed above the content in bold. */
  header?: SemanticShorthandItem<PopupHeaderProps>

  /** The node where the popup should mount. */
  hideOnScroll?: boolean

  /** Whether the popup should not close on hover. */
  hoverable?: boolean

  /** Invert the colors of the popup */
  inverted?: boolean

  /** Horizontal offset in pixels to be applied to the popup. */
  horizontalOffset?: number

  /** Vertical offset in pixels to be applied to the popup. */
  verticalOffset?: number

  /** Events triggering the popup. */
  on?: 'hover' | 'click' | 'focus' | ('hover' | 'click' | 'focus')[]

  /**
   * Called when a close event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClose?: (event: React.MouseEvent<HTMLElement>, data: PopupProps) => void

  /**
   * Called when the portal is mounted on the DOM.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onMount?: (nothing: null, data: PopupProps) => void

  /**
   * Called when an open event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onOpen?: (event: React.MouseEvent<HTMLElement>, data: PopupProps) => void

  /**
   * Called when the portal is unmounted from the DOM.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onUnmount?: (nothing: null, data: PopupProps) => void

  /** Position for the popover. */
  position?:
    | 'top left'
    | 'top right'
    | 'bottom right'
    | 'bottom left'
    | 'right center'
    | 'left center'
    | 'top center'
    | 'bottom center'

  /** Popup size. */
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'huge'

  /** Custom Popup style. */
  style?: Object

  /** Element to be rendered in-place where the popup is defined. */
  trigger?: React.ReactNode

  /** Popup width. */
  wide?: boolean | 'very'

  /** Element to be rendered within the confines of the viewport whenever possible. */
  keepInViewPort?: boolean
}

interface PopupComponent extends React.ComponentClass<PopupProps> {
  Content: typeof PopupContent
  Header: typeof PopupHeader
}

declare const Popup: PopupComponent

export default Popup
