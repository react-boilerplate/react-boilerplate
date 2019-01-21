import * as React from 'react'
import { SemanticShorthandContent } from '../../generic'

import SidebarPushable from './SidebarPushable'
import SidebarPusher from './SidebarPusher'

export interface SidebarProps extends StrictSidebarProps {
  [key: string]: any
}

export interface StrictSidebarProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Animation style. */
  animation?: 'overlay' | 'push' | 'scale down' | 'uncover' | 'slide out' | 'slide along'

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent

  /** Direction the sidebar should appear on. */
  direction?: 'top' | 'right' | 'bottom' | 'left'

  /** Duration of sidebar animation. */
  duration?: number | string

  /**
   * Called before a sidebar begins to animate out.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onHide?: (event: React.MouseEvent<HTMLElement>, data: SidebarProps) => void

  /**
   * Called after a sidebar has finished animating out.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onHidden?: (event: React.MouseEvent<HTMLElement>, data: SidebarProps) => void

  /**
   * Called when a sidebar has finished animating in.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onShow?: (event: React.MouseEvent<HTMLElement>, data: SidebarProps) => void

  /**
   * Called when a sidebar begins animating in.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onVisible?: (event: React.MouseEvent<HTMLElement>, data: SidebarProps) => void

  /** A sidebar can handle clicks on the passed element. */
  target?: object

  /** Controls whether or not the sidebar is visible on the page. */
  visible?: boolean

  /** Sidebar width. */
  width?: 'very thin' | 'thin' | 'wide' | 'very wide'
}

interface SidebarComponent extends React.ComponentClass<SidebarProps> {
  Pushable: typeof SidebarPushable
  Pusher: typeof SidebarPusher
}

declare const Sidebar: SidebarComponent

export default Sidebar
