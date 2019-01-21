import * as React from 'react'

import { SemanticShorthandItem } from '../../generic'
import { default as TabPane, TabPaneProps } from './TabPane'

export interface TabProps extends StrictTabProps {
  [key: string]: any
}

export interface StrictTabProps {
  /** An element type to render as (string or function). */
  as?: any

  /** The initial activeIndex. */
  defaultActiveIndex?: number | string

  /** Index of the currently active tab. */
  activeIndex?: number | string

  /** Shorthand props for the Menu. */
  menu?: any

  /** Align vertical menu */
  menuPosition?: 'left' | 'right'

  /** Shorthand props for the Grid. */
  grid?: any

  /**
   * Called on tab change.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - The proposed new Tab.Pane.
   * @param {object} data.activeIndex - The new proposed activeIndex.
   * @param {object} data.panes - Props of the new proposed active pane.
   */
  onTabChange?: (event: React.MouseEvent<HTMLDivElement>, data: TabProps) => void

  /**
   * Array of objects describing each Menu.Item and Tab.Pane:
   * {
   *   menuItem: 'Home',
   *   render: () => <Tab.Pane>Welcome!</Tab.Pane>,
   * }
   * or
   * {
   *   menuItem: 'Home',
   *   pane: 'Welcome',
   * }
   */
  panes?: {
    content?: SemanticShorthandItem<TabPaneProps>;
    menuItem?: any;
    render?: () => React.ReactNode;
  }[]

  /** A Tab can render only active pane. */
  renderActiveOnly?: boolean
}

interface TabComponent extends React.ComponentClass<TabProps> {
  Pane: typeof TabPane
}

declare const Tab: TabComponent

export default Tab
