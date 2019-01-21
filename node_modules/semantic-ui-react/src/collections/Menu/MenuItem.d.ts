import * as React from 'react'

import { SemanticCOLORS, SemanticShorthandContent, SemanticShorthandItem } from '../../generic'
import { IconProps } from '../../elements/Icon'

export interface MenuItemProps extends StrictMenuItemProps {
  [key: string]: any
}

export interface StrictMenuItemProps {
  /** An element type to render as (string or function). */
  as?: any

  /** A menu item can be active. */
  active?: boolean

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Additional colors can be specified. */
  color?: SemanticCOLORS

  /** Shorthand for primary content. */
  content?: SemanticShorthandContent

  /** A menu item can be disabled. */
  disabled?: boolean

  /** A menu item or menu can remove element padding, vertically or horizontally. */
  fitted?: boolean | 'horizontally' | 'vertically'

  /** A menu item may include a header or may itself be a header. */
  header?: boolean

  /** MenuItem can be only icon. */
  icon?: boolean | SemanticShorthandItem<IconProps>

  /** MenuItem index inside Menu. */
  index?: number

  /** A menu item can be link. */
  link?: boolean

  /** Internal name of the MenuItem. */
  name?: string

  /**
   * Called on click. When passed, the component will render as an `a`
   * tag by default instead of a `div`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>, data: MenuItemProps) => void

  /** A menu item can take left or right position. */
  position?: 'left' | 'right'
}

declare const MenuItem: React.ComponentClass<MenuItemProps>

export default MenuItem
