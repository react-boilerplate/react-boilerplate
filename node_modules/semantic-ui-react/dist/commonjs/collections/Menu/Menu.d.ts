import * as React from 'react'

import { SemanticCOLORS, SemanticShorthandCollection, SemanticWIDTHS } from '../../generic'
import MenuHeader from './MenuHeader'
import { default as MenuItem, MenuItemProps } from './MenuItem'
import MenuMenu from './MenuMenu'

export interface MenuProps extends StrictMenuProps {
  [key: string]: any
}

export interface StrictMenuProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Index of the currently active item. */
  activeIndex?: number | string

  /** A menu may be attached to other content segments. */
  attached?: boolean | 'bottom' | 'top'

  /** A menu item or menu can have no borders. */
  borderless?: boolean

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Additional colors can be specified. */
  color?: SemanticCOLORS

  /** A menu can take up only the space necessary to fit its content. */
  compact?: boolean

  /** Initial activeIndex value. */
  defaultActiveIndex?: number | string

  /** A menu can be fixed to a side of its context. */
  fixed?: 'left' | 'right' | 'bottom' | 'top'

  /** A menu can be floated. */
  floated?: boolean | 'right'

  /** A vertical menu may take the size of its container. */
  fluid?: boolean

  /** A menu may have labeled icons. */
  icon?: boolean | 'labeled'

  /** A menu may have its colors inverted to show greater contrast. */
  inverted?: boolean

  /** Shorthand array of props for Menu. */
  items?: SemanticShorthandCollection<MenuItemProps>

  /**
   * onClick handler for MenuItem. Mutually exclusive with children.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All item props.
   */
  onItemClick?: (event: React.MouseEvent<HTMLAnchorElement>, data: MenuItemProps) => void

  /** A pagination menu is specially formatted to present links to pages of content. */
  pagination?: boolean

  /** A menu can point to show its relationship to nearby content. */
  pointing?: boolean

  /** A menu can adjust its appearance to de-emphasize its contents. */
  secondary?: boolean

  /** A menu can vary in size. */
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'huge' | 'massive'

  /** A menu can stack at mobile resolutions. */
  stackable?: boolean

  /** A menu can be formatted to show tabs of information. */
  tabular?: boolean | 'right'

  /** A menu can be formatted for text content. */
  text?: boolean

  /** A vertical menu displays elements vertically. */
  vertical?: boolean

  /** A menu can have its items divided evenly. */
  widths?: SemanticWIDTHS
}

interface MenuComponent extends React.ComponentClass<MenuProps> {
  Header: typeof MenuHeader
  Item: typeof MenuItem
  Menu: typeof MenuMenu
}

declare const Menu: MenuComponent

export default Menu
